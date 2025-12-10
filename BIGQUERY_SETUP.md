# BigQuery Setup Guide (Job 6: Real-Time Velocity Calculations)

This document explains how to configure BigQuery integration for the live velocity metrics feature.

## Overview

The landing page now displays real-time GP velocity metrics fetched from BigQuery. Data is synced from HubSpot via Fivetran.

## Environment Variables

Add these to your Vercel environment (or `.env.local` for local development):

```bash
# GCP Project ID where BigQuery dataset is located
BIGQUERY_PROJECT_ID=adam-mmt-finance-092124

# BigQuery dataset name (Fivetran syncs HubSpot data here)
BIGQUERY_DATASET=hubspot

# BigQuery table name for company data
BIGQUERY_TABLE=company

# Service Account Key (JSON string) - REQUIRED for Vercel
BIGQUERY_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

## Authentication Options

### Option 1: Service Account Key (Recommended for Vercel)

Set `BIGQUERY_SERVICE_ACCOUNT_KEY` environment variable with the JSON content of your service account key file.

### Option 2: Application Default Credentials (Local Development)

Set `GOOGLE_APPLICATION_CREDENTIALS` to point to a service account JSON file:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

## How to Get BigQuery Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: `adam-mmt-finance-092124`
3. Navigate to: **IAM & Admin > Service Accounts**
4. Create or select a service account
5. Grant it the **"BigQuery Data Viewer"** role
6. Create a key (JSON format)
7. Copy the JSON content for the environment variable

## Query Being Executed

```sql
SELECT
  id,
  portal_id,
  _fivetran_synced,
  property_velocity_tier,
  property_active_general_partners_gps,
  property_months_fundraising,
  property_total_capital_raised_usd
FROM
  `adam-mmt-finance-092124.hubspot.company`
WHERE
  property_velocity_tier IS NOT NULL;
```

## API Endpoint

The velocity data is available via API:

- **GET `/api/velocity`** - Returns aggregated metrics (cached for 60 seconds)
- **GET `/api/velocity?refresh=true`** - Force cache refresh
- **GET `/api/velocity?raw=true`** - Returns raw records

## Response Example

```json
{
  "success": true,
  "data": {
    "totalCompanies": 144,
    "tierBreakdown": {
      "high_velocity_gp": 45,
      "stable_but_leaking": 67,
      "high_distress": 32
    },
    "averageCapitalRaised": 15000000,
    "averageMonthsFundraising": 14,
    "totalCapitalRaised": 2160000000,
    "lastSyncedAt": "2024-12-09T15:30:00Z"
  },
  "cached": false,
  "timestamp": "2024-12-09T15:35:00Z"
}
```

## Files Created

- `lib/bigquery.ts` - BigQuery client and query functions
- `app/api/velocity/route.ts` - API endpoint for velocity metrics
- `components/LiveVelocityMetrics.tsx` - React component for landing page

## Testing

1. Set up environment variables
2. Run `npm run dev`
3. Visit the landing page - the "Live Platform Metrics" section should appear after Hero
4. Check the `/api/velocity` endpoint directly for raw data

