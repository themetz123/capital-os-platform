/**
 * BigQuery Client Module
 *
 * Provides connection to BigQuery for querying real-time velocity data.
 * Data is synced from HubSpot via Fivetran.
 *
 * @module lib/bigquery
 */

import { BigQuery } from "@google-cloud/bigquery";

// ============================================================================
// Configuration
// ============================================================================

const config = {
  projectId: process.env.BIGQUERY_PROJECT_ID || "adam-mmt-finance-092124",
  dataset: process.env.BIGQUERY_DATASET || "hubspot",
  table: process.env.BIGQUERY_TABLE || "company",
};

// ============================================================================
// Client Initialization
// ============================================================================

/**
 * Create BigQuery client.
 * 
 * Authentication options (in order of precedence):
 * 1. GOOGLE_APPLICATION_CREDENTIALS env var pointing to service account JSON file
 * 2. BIGQUERY_SERVICE_ACCOUNT_KEY env var containing JSON string of service account
 * 3. Application Default Credentials (if running on GCP)
 */
function createBigQueryClient(): BigQuery {
  // Check for service account key in environment variable
  const serviceAccountKey = process.env.BIGQUERY_SERVICE_ACCOUNT_KEY;
  
  if (serviceAccountKey) {
    try {
      const credentials = JSON.parse(serviceAccountKey);
      return new BigQuery({
        projectId: config.projectId,
        credentials,
      });
    } catch (error) {
      console.error("[BigQuery] Failed to parse service account key:", error);
      throw new Error("Invalid BIGQUERY_SERVICE_ACCOUNT_KEY format");
    }
  }
  
  // Fall back to default credentials
  return new BigQuery({
    projectId: config.projectId,
  });
}

// Lazy initialization - only create client when needed
let bigQueryClient: BigQuery | null = null;

function getClient(): BigQuery {
  if (!bigQueryClient) {
    bigQueryClient = createBigQueryClient();
  }
  return bigQueryClient;
}

// ============================================================================
// Types
// ============================================================================

export interface VelocityRecord {
  id: string;
  portal_id: string | null;
  fivetran_synced: string | null;
  velocity_tier: string | null;
  active_gps: number | null;
  months_fundraising: number | null;
  capital_raised_usd: number | null;
}

export interface VelocityMetrics {
  totalCompanies: number;
  tierBreakdown: {
    high_velocity_gp: number;
    stable_but_leaking: number;
    high_distress: number;
  };
  averageCapitalRaised: number;
  averageMonthsFundraising: number;
  totalCapitalRaised: number;
  lastSyncedAt: string | null;
}

// ============================================================================
// Query Functions
// ============================================================================

/**
 * Query velocity data from BigQuery.
 * 
 * Executes the query specified in the requirements:
 * SELECT id, portal_id, _fivetran_synced, property_velocity_tier,
 *        property_active_general_partners_gps, property_months_fundraising,
 *        property_total_capital_raised_usd
 * FROM `adam-mmt-finance-092124.hubspot.company`
 * WHERE property_velocity_tier IS NOT NULL;
 */
export async function queryVelocityData(): Promise<VelocityRecord[]> {
  console.log("[BigQuery] Querying velocity data...");
  
  const client = getClient();
  
  const query = `
    SELECT
      id,
      portal_id,
      _fivetran_synced,
      property_velocity_tier,
      property_active_general_partners_gps,
      property_months_fundraising,
      property_total_capital_raised_usd
    FROM
      \`${config.projectId}.${config.dataset}.${config.table}\`
    WHERE
      property_velocity_tier IS NOT NULL
  `;
  
  console.log("[BigQuery] Executing query:", query);
  
  const [rows] = await client.query({ query });
  
  console.log(`[BigQuery] Retrieved ${rows.length} records`);
  
  return rows.map((row: any) => ({
    id: row.id,
    portal_id: row.portal_id,
    fivetran_synced: row._fivetran_synced?.value || row._fivetran_synced,
    velocity_tier: row.property_velocity_tier,
    active_gps: row.property_active_general_partners_gps ? Number(row.property_active_general_partners_gps) : null,
    months_fundraising: row.property_months_fundraising ? Number(row.property_months_fundraising) : null,
    capital_raised_usd: row.property_total_capital_raised_usd ? Number(row.property_total_capital_raised_usd) : null,
  }));
}

/**
 * Calculate aggregated velocity metrics from raw data.
 */
export function calculateMetrics(records: VelocityRecord[]): VelocityMetrics {
  console.log("[BigQuery] Calculating metrics from", records.length, "records");
  
  const tierBreakdown = {
    high_velocity_gp: 0,
    stable_but_leaking: 0,
    high_distress: 0,
  };
  
  let totalCapitalRaised = 0;
  let totalMonthsFundraising = 0;
  let capitalCount = 0;
  let monthsCount = 0;
  let latestSync: string | null = null;
  
  for (const record of records) {
    // Count by tier
    if (record.velocity_tier === "high_velocity_gp") {
      tierBreakdown.high_velocity_gp++;
    } else if (record.velocity_tier === "stable_but_leaking") {
      tierBreakdown.stable_but_leaking++;
    } else if (record.velocity_tier === "high_distress") {
      tierBreakdown.high_distress++;
    }
    
    // Sum capital raised
    if (record.capital_raised_usd && record.capital_raised_usd > 0) {
      totalCapitalRaised += record.capital_raised_usd;
      capitalCount++;
    }
    
    // Sum months fundraising
    if (record.months_fundraising && record.months_fundraising > 0) {
      totalMonthsFundraising += record.months_fundraising;
      monthsCount++;
    }
    
    // Track latest sync time
    if (record.fivetran_synced && (!latestSync || record.fivetran_synced > latestSync)) {
      latestSync = record.fivetran_synced;
    }
  }
  
  const metrics: VelocityMetrics = {
    totalCompanies: records.length,
    tierBreakdown,
    averageCapitalRaised: capitalCount > 0 ? Math.round(totalCapitalRaised / capitalCount) : 0,
    averageMonthsFundraising: monthsCount > 0 ? Math.round(totalMonthsFundraising / monthsCount) : 0,
    totalCapitalRaised,
    lastSyncedAt: latestSync,
  };
  
  console.log("[BigQuery] Calculated metrics:", metrics);
  return metrics;
}

/**
 * Get velocity metrics (combined query + calculation).
 * This is the main function to call from API routes.
 */
export async function getVelocityMetrics(): Promise<VelocityMetrics> {
  const records = await queryVelocityData();
  return calculateMetrics(records);
}

