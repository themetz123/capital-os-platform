'use client';

import { useEffect, useState } from 'react';

/**
 * LiveVelocityMetrics Component
 *
 * Displays real-time GP velocity metrics fetched from BigQuery.
 * Shows tier breakdown, capital raised, and sync status.
 *
 * Features:
 * - Auto-refresh every 60 seconds
 * - Loading skeleton while fetching
 * - Error state with retry
 * - Animated counters
 */

// ============================================================================
// Types
// ============================================================================

interface VelocityMetrics {
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

interface ApiResponse {
  success: boolean;
  data?: VelocityMetrics;
  cached?: boolean;
  cacheAge?: number;
  error?: string;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Format USD in compact notation ($1.2M, $500K, etc.)
 */
function formatUSD(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

/**
 * Get human-readable tier label
 */
function getTierLabel(tier: string): string {
  const labels: Record<string, string> = {
    high_velocity_gp: 'High Velocity',
    stable_but_leaking: 'Stable',
    high_distress: 'Needs Help',
  };
  return labels[tier] || tier;
}

/**
 * Get tier color (for visual differentiation)
 */
function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    high_velocity_gp: 'text-green-400',
    stable_but_leaking: 'text-yellow-400',
    high_distress: 'text-red-400',
  };
  return colors[tier] || 'text-gray-400';
}

/**
 * Format relative time (e.g., "5 minutes ago")
 */
function formatRelativeTime(isoString: string | null): string {
  if (!isoString) return 'Unknown';
  
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// ============================================================================
// Loading Skeleton
// ============================================================================

function MetricsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <div className="h-10 bg-gray-700 rounded-lg mb-2 mx-auto w-24" />
            <div className="h-4 bg-gray-800 rounded w-20 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function LiveVelocityMetrics() {
  const [metrics, setMetrics] = useState<VelocityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch metrics function
  const fetchMetrics = async (refresh = false) => {
    try {
      setError(null);
      const url = refresh ? '/api/velocity?refresh=true' : '/api/velocity';
      const response = await fetch(url);
      const data: ApiResponse = await response.json();
      
      if (data.success && data.data) {
        setMetrics(data.data);
        setLastUpdated(new Date());
      } else {
        setError(data.error || 'Failed to fetch metrics');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and auto-refresh
  useEffect(() => {
    fetchMetrics();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchMetrics();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Error state
  if (error && !metrics) {
    return (
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchMetrics(true);
            }}
            className="px-4 py-2 bg-[#ffb800] text-black font-bold hover:bg-opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading && !metrics) {
    return (
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-[#ffb800]">Live</span> Platform Metrics
          </h2>
          <MetricsSkeleton />
        </div>
      </section>
    );
  }

  if (!metrics) return null;

  // Calculate percentages for tier breakdown
  const total = metrics.totalCompanies || 1;
  const tierPercentages = {
    high_velocity_gp: Math.round((metrics.tierBreakdown.high_velocity_gp / total) * 100),
    stable_but_leaking: Math.round((metrics.tierBreakdown.stable_but_leaking / total) * 100),
    high_distress: Math.round((metrics.tierBreakdown.high_distress / total) * 100),
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#ffb800]">Live</span> Platform Metrics
          </h2>
          <p className="text-gray-400">
            Real-time data from {metrics.totalCompanies} fund managers using Capital OS
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-600 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()} 
              {metrics.lastSyncedAt && ` • HubSpot sync: ${formatRelativeTime(metrics.lastSyncedAt)}`}
            </p>
          )}
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {/* Total GPs */}
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {metrics.totalCompanies}+
            </div>
            <div className="text-gray-400 text-sm">Fund Managers</div>
          </div>

          {/* Total Capital Raised */}
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="text-4xl md:text-5xl font-bold text-[#ffb800] mb-2">
              {formatUSD(metrics.totalCapitalRaised)}
            </div>
            <div className="text-gray-400 text-sm">Total Capital Tracked</div>
          </div>

          {/* Average Capital */}
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {formatUSD(metrics.averageCapitalRaised)}
            </div>
            <div className="text-gray-400 text-sm">Avg. Raised per Fund</div>
          </div>

          {/* Average Months */}
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {metrics.averageMonthsFundraising}
            </div>
            <div className="text-gray-400 text-sm">Avg. Months Fundraising</div>
          </div>
        </div>

        {/* Velocity Tier Breakdown */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-center mb-6">GP Velocity Distribution</h3>
          
          {/* Progress Bar */}
          <div className="h-4 rounded-full overflow-hidden flex mb-6 bg-gray-700">
            <div 
              className="bg-green-500 transition-all duration-1000"
              style={{ width: `${tierPercentages.high_velocity_gp}%` }}
            />
            <div 
              className="bg-yellow-500 transition-all duration-1000"
              style={{ width: `${tierPercentages.stable_but_leaking}%` }}
            />
            <div 
              className="bg-red-500 transition-all duration-1000"
              style={{ width: `${tierPercentages.high_distress}%` }}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-green-400 font-bold text-lg">
                  {metrics.tierBreakdown.high_velocity_gp}
                </span>
              </div>
              <div className="text-gray-400 text-sm">High Velocity</div>
              <div className="text-gray-600 text-xs">≥100% benchmark</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-yellow-400 font-bold text-lg">
                  {metrics.tierBreakdown.stable_but_leaking}
                </span>
              </div>
              <div className="text-gray-400 text-sm">Stable</div>
              <div className="text-gray-600 text-xs">50-99% benchmark</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-red-400 font-bold text-lg">
                  {metrics.tierBreakdown.high_distress}
                </span>
              </div>
              <div className="text-gray-400 text-sm">Needs Help</div>
              <div className="text-gray-600 text-xs">&lt;50% benchmark</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-400 mb-4">
            Find out where you stand compared to your peers
          </p>
          <a
            href="https://v0-fund-manager-quiz-git-v2-lpb-official.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ffb800] text-black px-8 py-4 font-bold text-lg hover:bg-opacity-90 transition"
          >
            TAKE THE DIAGNOSTIC →
          </a>
        </div>
      </div>
    </section>
  );
}

