# Campaign Tracker API Documentation

This document outlines the API endpoints required to support the Campaign Tracker frontend, including the Dashboard, Campaigns management, and the new Monthly Performance tracking features.

**Base URL**: `https://campaign-tracker-backend-eight.vercel.app/api`

---

## 1. Dashboard

### Get Dashboard Statistics
Returns aggregated statistics for the main dashboard cards.

- **Endpoint**: `/dashboard/stats/`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "total_campaigns": 15,
    "active_campaigns": 8,
    "total_budget": 50000,
    "avg_roi": 12.5
  }
  ```

### Get Performance Metrics (Optional/Optimized)
*Note: The frontend currently aggregates this from individual campaign performance data, but a dedicated endpoint is recommended for performance.*

- **Endpoint**: `/dashboard/performance/`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "name": "Summer Sale 2024",
      "impressions": 15000,
      "clicks": 3200,
      "conversions": 450
    }
  ]
  ```

---

## 2. Campaigns Management

### Get All Campaigns
Retrieves a list of all campaigns.

- **Endpoint**: `/campaigns/`
- **Method**: `GET`
- **Response**: Array of Campaign objects.
  ```json
  [
    {
      "id": "1",
      "name": "Q1 Marketing",
      "platform": "Google Ads",
      "status": "Active",
      "budget": 5000,
      "amount_spent": 1200,
      "start_date": "2024-01-01",
      "end_date": "2024-03-31",
      "target_audience": "Tech enthusiasts",
      "goal": "Sales",
      "created_at": "2023-12-25T10:00:00Z"
    }
  ]
  ```

### Get Single Campaign
Retrieves details for a specific campaign.

- **Endpoint**: `/campaigns/{id}/`
- **Method**: `GET`
- **Response**: Single Campaign object (same structure as above).

### Create Campaign
Creates a new campaign.

- **Endpoint**: `/campaigns/`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "New Campaign",
    "platform": "Facebook",
    "status": "Draft",
    "budget": 1000,
    "start_date": "2024-06-01",
    "end_date": "2024-06-30",
    "target_audience": "Gen Z",
    "goal": "Brand Awareness"
  }
  ```

### Update Campaign
Updates an existing campaign.

- **Endpoint**: `/campaigns/{id}/`
- **Method**: `PATCH`
- **Body**: Partial Campaign object (e.g., just status or budget).
  ```json
  {
    "status": "Active",
    "budget": 1500
  }
  ```

### Delete Campaign
Removes a campaign.

- **Endpoint**: `/campaigns/{id}/`
- **Method**: `DELETE`

---

## 3. Monthly Performance (New)

These endpoints manage the granular monthly data for each campaign, which powers the ROI calculations and performance charts.

### Get Monthly Performance
Retrieves the list of monthly performance records for a specific campaign.

- **Endpoint**: `/campaigns/{id}/performance`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "campaignId": "1",
      "month": "2024-01",
      "impressions": 5000,
      "clicks": 200,
      "conversions": 15,
      "spend": 1000,
      "revenue": 3000
    },
    {
      "campaignId": "1",
      "month": "2024-02",
      "impressions": 6000,
      "clicks": 250,
      "conversions": 20,
      "spend": 1200,
      "revenue": 4000
    }
  ]
  ```

### Update Monthly Performance
Updates the monthly performance records for a campaign. This should replace/upsert the provided records.

- **Endpoint**: `/campaigns/{id}/performance`
- **Method**: `PUT`
- **Body**: Array of Monthly Performance objects.
  ```json
  [
    {
      "campaignId": "1",
      "month": "2024-01",
      "impressions": 5500,
      "clicks": 220,
      "conversions": 18,
      "spend": 1100,
      "revenue": 3200
    }
  ]
  ```

---

## 4. Insights

### Get AI Insights
Retrieves market insights based on a query.

- **Endpoint**: `/insights/?query={query}`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "trend_score": 85,
    "search_volume": "High",
    "competition": "Medium",
    "interest_over_time": [
      { "name": "Jan", "value": 40 },
      { "name": "Feb", "value": 65 }
    ],
    "related_keywords": [
      { "name": "digital marketing", "volume": 5000 }
    ],
    "trending_topics": [
      { "id": 1, "name": "AI Tools", "category": "Tech", "score": 92, "volume": "10k+" }
    ]
  }
  ```
