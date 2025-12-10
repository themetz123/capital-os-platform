/**
 * Velocity Metrics API Route
 *
 * Returns real-time GP velocity metrics from BigQuery.
 * Data is synced from HubSpot via Fivetran.
 *
 * @route GET /api/velocity
 */

import { NextResponse } from "next/server";
import { getVelocityMetrics, queryVelocityData, type VelocityMetrics } from "@/lib/bigquery";

// ============================================================================
// Configuration
// ============================================================================

/**
 * Cache duration in seconds.
 * Set to 60 seconds to balance freshness with performance.
 * Fivetran typically syncs every 6-24 hours, so aggressive caching is fine.
 */
const CACHE_DURATION_SECONDS = 60;

// In-memory cache for velocity metrics
let cachedMetrics: VelocityMetrics | null = null;
let cacheTimestamp: number = 0;

// ============================================================================
// Helpers
// ============================================================================

/**
 * Check if cache is still valid.
 */
function isCacheValid(): boolean {
  if (!cachedMetrics) return false;
  const now = Date.now();
  const cacheAge = (now - cacheTimestamp) / 1000;
  return cacheAge < CACHE_DURATION_SECONDS;
}

// ============================================================================
// Route Handlers
// ============================================================================

/**
 * GET /api/velocity
 * 
 * Returns aggregated velocity metrics.
 * Uses in-memory cache to reduce BigQuery costs and improve latency.
 * 
 * Query params:
 * - refresh=true: Force cache refresh
 * - raw=true: Return raw records instead of aggregated metrics
 */
export async function GET(request: Request) {
  console.log("[Velocity API] GET /api/velocity");
  
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";
    const returnRaw = searchParams.get("raw") === "true";
    
    // Return raw records if requested
    if (returnRaw) {
      console.log("[Velocity API] Returning raw records");
      const records = await queryVelocityData();
      return NextResponse.json({
        success: true,
        data: records,
        count: records.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Check cache (unless force refresh)
    if (!forceRefresh && isCacheValid() && cachedMetrics) {
      console.log("[Velocity API] Returning cached metrics");
      return NextResponse.json({
        success: true,
        data: cachedMetrics,
        cached: true,
        cacheAge: Math.round((Date.now() - cacheTimestamp) / 1000),
        timestamp: new Date().toISOString(),
      });
    }
    
    // Fetch fresh data from BigQuery
    console.log("[Velocity API] Fetching fresh metrics from BigQuery");
    const metrics = await getVelocityMetrics();
    
    // Update cache
    cachedMetrics = metrics;
    cacheTimestamp = Date.now();
    
    return NextResponse.json({
      success: true,
      data: metrics,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Velocity API] Error:", error);
    
    // Return cached data if available, even if stale
    if (cachedMetrics) {
      console.log("[Velocity API] Returning stale cache due to error");
      return NextResponse.json({
        success: true,
        data: cachedMetrics,
        cached: true,
        stale: true,
        cacheAge: Math.round((Date.now() - cacheTimestamp) / 1000),
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
    
    // No cache available, return error
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch velocity metrics",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

