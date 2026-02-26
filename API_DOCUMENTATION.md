# API Documentation for Campaign Tracker

This document outlines the API endpoints and data structures required to power the Campaign Tracker frontend. These endpoints should be implemented in the Python backend (Django/FastAPI).

## 1. Core Entity: Campaign

### Data Structure (JSON)
```json
{
  "id": "uuid-string",
  "name": "string",
  "description": "string",
  "platform": "enum('Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Email')",
  "status": "enum('Active', 'Paused', 'Completed', 'Draft')",
  "budget": "number (float)",
  "amount_spent": "number (float)",
  "start_date": "date (YYYY-MM-DD)",
  "end_date": "date (YYYY-MM-DD)",
  "target_audience": "string",
  "goal": "enum('Brand Awareness', 'Lead Generation', 'Sales', 'Traffic', 'Engagement')",
  "roi": "number (float)",
  "created_at": "datetime (ISO 8601)"
}
```

---

## 2. API Endpoints

### A. Campaign Management (CRUD)

#### 1. List Campaigns
- **Endpoint**: `GET /api/campaigns/`
- **Query Parameters**:
  - `search`: string (filters by name)
  - `status`: string (filter by status)
  - `platform`: string (filter by platform)
  - `page`: integer (pagination)
  - `limit`: integer (items per page, default 10)
- **Response**:
  ```json
  {
    "count": 24,
    "next": "http://api.example.com/campaigns/?page=2",
    "previous": null,
    "results": [
      {
        "id": "1",
        "name": "Summer Sale 2024",
        "platform": "Instagram",
        "status": "Active",
        "budget": 5000,
        "amount_spent": 2150,
        "roi": 3.5,
        "start_date": "2024-06-01",
        "end_date": "2024-08-31"
      }
      // ... more items
    ]
  }
  ```

#### 2. Create Campaign
- **Endpoint**: `POST /api/campaigns/`
- **Body**:
  ```json
  {
    "name": "New Campaign",
    "description": "Campaign description...",
    "platform": "Google Ads",
    "status": "Draft",
    "budget": 1000,
    "amount_spent": 0,
    "start_date": "2024-10-01",
    "end_date": "2024-12-31",
    "target_audience": "Young Adults",
    "goal": "Traffic"
  }
  ```
- **Response**: `201 Created` with the full Campaign object.

#### 3. Retrieve Campaign Detail
- **Endpoint**: `GET /api/campaigns/{id}/`
- **Response**: `200 OK` with the full Campaign object.

#### 4. Update Campaign
- **Endpoint**: `PUT /api/campaigns/{id}/` or `PATCH /api/campaigns/{id}/`
- **Body**: Partial or full Campaign object.
- **Response**: `200 OK` with the updated Campaign object.

#### 5. Delete Campaign
- **Endpoint**: `DELETE /api/campaigns/{id}/`
- **Response**: `204 No Content`

---

### B. Dashboard & Analytics

#### 1. Dashboard Statistics
- **Endpoint**: `GET /api/dashboard/stats/`
- **Response**:
  ```json
  {
    "total_campaigns": 24,
    "active_campaigns": 12,
    "total_budget": 85000,
    "avg_roi": 3.2
  }
  ```

#### 2. Monthly Performance (Dashboard Chart)
- **Endpoint**: `GET /api/dashboard/performance/`
- **Response**:
  ```json
  [
    { "name": "Jan", "impressions": 4000, "clicks": 2400, "conversions": 2400 },
    { "name": "Feb", "impressions": 3000, "clicks": 1398, "conversions": 2210 }
    // ... more months
  ]
  ```

#### 3. Campaign Performance (Detail Page Chart)
- **Endpoint**: `GET /api/campaigns/{id}/performance/`
- **Response**:
  ```json
  [
    { "name": "Week 1", "impressions": 1200, "clicks": 800, "conversions": 150 },
    { "name": "Week 2", "impressions": 1500, "clicks": 950, "conversions": 180 }
    // ... more weeks
  ]
  ```

---

### C. Third-Party Integration (Insights)

This endpoint aggregates data from external sources (e.g., Google Trends, Twitter API, or a mock service) to provide market insights.

#### 1. Get Market Trends
- **Endpoint**: `GET /api/insights/trends/`
- **Query Parameters**:
  - `query`: string (optional, e.g., "digital marketing")
- **Response**:
  ```json
  {
    "trend_score": 87,
    "search_volume": "2.4M/month",
    "competition": "Medium",
    "interest_over_time": [
      { "name": "Jan", "value": 45 },
      { "name": "Feb", "value": 52 }
      // ... 12 months data
    ],
    "related_keywords": [
      { "name": "digital marketing trends", "volume": 8500 },
      { "name": "ai in marketing", "volume": 7200 }
    ],
    "trending_topics": [
      { 
        "id": 1, 
        "name": "AI Content Generation", 
        "category": "Technology", 
        "score": 92, 
        "volume": "1.2M" 
      }
    ]
  }
  ```

## 3. Implementation Notes (Backend Task)

1.  **Framework**: Use Django (with Django REST Framework) or FastAPI.
2.  **Database**: PostgreSQL is required.
    - Model: `Campaign`
    - Fields should map to the JSON structure above.
3.  **Third-Party API**:
    - For the `GET /api/insights/trends/` endpoint, integrate with a real external API (e.g., NewsAPI, Google Trends via `pytrends`, or OpenAI) OR create a robust mock service if API keys are unavailable.
4.  **CORS**: Ensure CORS is enabled to allow requests from the Next.js frontend (running on `localhost:3000`).
