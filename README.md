# Campaign Tracker Frontend

A modern, responsive dashboard for tracking marketing campaigns, visualizing performance metrics, and managing advertising budgets across multiple platforms. Built with Next.js 14, Tailwind CSS, and Recharts.

## Features

- **Interactive Dashboard**: Real-time overview of campaign performance, budget allocation, and recent activity.
- **Campaign Management**: Full CRUD operations for marketing campaigns.
- **Data Visualization**: Beautiful, responsive charts for impressions, clicks, conversions, and ROI analysis.
- **Trend Insights**: Integration with Google Trends-like data for market analysis.
- **News Aggregation**: Real-time marketing news updates.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Radix UI (via shadcn/ui patterns)

## Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campaign-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your backend API URL if running locally (default points to production API):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend & Database Setup

This frontend connects to a backend service. To run the full stack locally:

1. **Backend Setup**: Refer to the backend repository documentation for setting up the Python/FastAPI server.
2. **Database**: The backend handles database connections (PostgreSQL/SQLite). Ensure your backend is running and migrations are applied:
   ```bash
   # In the backend repository
   alembic upgrade head
   ```
3. **Connection**: Ensure `NEXT_PUBLIC_API_URL` in this repo points to your running backend instance.

## Deployment

### Vercel (Recommended for Frontend)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Add environment variables (e.g., `NEXT_PUBLIC_API_URL`).
4. Deploy.

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages using `@cloudflare/next-on-pages`.

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build for Cloudflare**:
   ```bash
   npm run pages:build
   ```

3. **Deploy**:
   Connect your repository to Cloudflare Pages and use the following settings:
   - **Build command**: `npm run pages:build` (or `npx @cloudflare/next-on-pages`)
   - **Build output directory**: `.vercel/output/static`
   - **Compatibility flags**: `nodejs_compat`

   Alternatively, deploy via CLI:
   ```bash
   npm run pages:deploy
   ```

   **Note on Telemetry**:
   To disable Next.js telemetry during build, set the environment variable:
   `NEXT_TELEMETRY_DISABLED=1`
   
   In Cloudflare Pages dashboard: Settings -> Environment Variables -> Add variable.

### Google Cloud Platform (Cloud Run)

You can containerize and deploy this application to Google Cloud Run.

1. **Build the Docker image**
   ```bash
   docker build -t gcr.io/[PROJECT-ID]/campaign-tracker-frontend .
   ```

2. **Push to Container Registry**
   ```bash
   docker push gcr.io/[PROJECT-ID]/campaign-tracker-frontend
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy campaign-tracker-frontend \
     --image gcr.io/[PROJECT-ID]/campaign-tracker-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```

## How to Test

### UI Flow Testing (Manual CRUD)

1. **Create Campaign**:
   - Navigate to **Campaigns** page via sidebar.
   - Click **New Campaign**.
   - Fill in details (Name, Budget, Platform, etc.) and save.
   - Verify the new campaign appears in the list.

2. **View Details & Charts**:
   - Click on the newly created campaign.
   - Verify the **Performance Chart** loads data (impressions/clicks/conversions).
   - Check that the "Monthly Performance" table allows adding/editing monthly data.

3. **Edit Campaign**:
   - Click the **Edit** button on the details page.
   - Change the status (e.g., from Active to Paused).
   - Save and verify the status update is reflected on the details page.

4. **Delete Campaign**:
   - Click the **Delete** button on the details page.
   - Confirm the deletion.
   - Verify you are redirected to the Campaigns list and the item is gone.

### Visualization & Reporting Path

- **Dashboard**: `http://localhost:3000/dashboard` - Main overview with aggregate charts.
- **Campaign Details**: `http://localhost:3000/campaigns/[id]` - Specific campaign performance visualization.
- **Comparison**: The dashboard provides a comparative view of budget vs. spend across campaigns.

### Third-Party API Features

- **News Updates**: `http://localhost:3000/news-updates`
  - Fetches real-time marketing news.
  - Test by searching for keywords like "SEO" or "AI Marketing".
- **Insights**: `http://localhost:3000/campaigns` (Create/Edit flow)
  - When creating a campaign, the "Target Audience" suggestions or trends data (if enabled) pulls from external insight APIs.

## Project Structure

```
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── campaigns/        # Campaign-specific components
│   ├── dashboard/        # Dashboard widgets and charts
│   ├── layout/           # Sidebar, Navbar, etc.
│   └── ui/               # Reusable UI primitives
├── lib/                  # Utilities and API functions
└── public/               # Static assets
```
