import { Campaign, Platform, Status, Goal } from './mockData';

const API_BASE_URL = 'https://campaign-tracker-backend-eight.vercel.app/api';

// API Types (snake_case)
interface ApiCampaign {
  id: string;
  name: string;
  description?: string;
  platform: Platform;
  status: Status;
  budget: number;
  amount_spent: number;
  start_date: string;
  end_date: string;
  target_audience?: string;
  goal?: Goal;
  roi?: number | null;
  created_at: string;
}

interface ApiDashboardStats {
  total_campaigns: number;
  active_campaigns: number;
  total_budget: number;
  avg_roi: number;
}

interface ApiPerformanceData {
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

interface ApiInsightsData {
  trend_score: number;
  search_volume: string;
  competition: string;
  interest_over_time: { name: string; value: number }[];
  related_keywords: { name: string; volume: number }[];
  trending_topics: { id: number; name: string; category: string; score: number; volume: string }[];
}

// Mapper Functions
const mapCampaign = (apiCampaign: ApiCampaign): Campaign => ({
  id: apiCampaign.id,
  name: apiCampaign.name,
  description: apiCampaign.description || '',
  platform: apiCampaign.platform,
  status: apiCampaign.status,
  budget: apiCampaign.budget,
  amountSpent: apiCampaign.amount_spent,
  startDate: apiCampaign.start_date,
  endDate: apiCampaign.end_date,
  targetAudience: apiCampaign.target_audience || '',
  goal: apiCampaign.goal || 'Brand Awareness',
  roi: apiCampaign.roi || 0,
  createdAt: apiCampaign.created_at,
});

const mapToApiCampaign = (campaign: Partial<Campaign>): Partial<ApiCampaign> => {
  const apiData: any = { ...campaign };
  if (campaign.amountSpent !== undefined) apiData.amount_spent = campaign.amountSpent;
  if (campaign.startDate !== undefined) apiData.start_date = campaign.startDate;
  if (campaign.endDate !== undefined) apiData.end_date = campaign.endDate;
  if (campaign.targetAudience !== undefined) apiData.target_audience = campaign.targetAudience;
  if (campaign.createdAt !== undefined) apiData.created_at = campaign.createdAt;
  
  // Remove camelCase keys
  delete apiData.amountSpent;
  delete apiData.startDate;
  delete apiData.endDate;
  delete apiData.targetAudience;
  delete apiData.createdAt;
  
  return apiData;
};

const mapDashboardStats = (apiStats: ApiDashboardStats) => ({
  totalCampaigns: apiStats.total_campaigns,
  activeCampaigns: apiStats.active_campaigns,
  totalBudget: apiStats.total_budget,
  avgROI: apiStats.avg_roi,
});

const mapInsightsData = (apiInsights: ApiInsightsData) => ({
  trendScore: apiInsights.trend_score,
  searchVolume: apiInsights.search_volume,
  competition: apiInsights.competition,
  interestOverTime: apiInsights.interest_over_time,
  relatedKeywords: apiInsights.related_keywords,
  trendingTopics: apiInsights.trending_topics,
});

// API Functions
export const api = {
  // Campaigns
  getCampaigns: async (): Promise<Campaign[]> => {
    const res = await fetch(`${API_BASE_URL}/campaigns/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch campaigns');
    const data: ApiCampaign[] = await res.json();
    return data.map(mapCampaign);
  },

  getCampaign: async (id: string): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch campaign');
    const data: ApiCampaign = await res.json();
    return mapCampaign(data);
  },

  createCampaign: async (campaign: Partial<Campaign>): Promise<Campaign> => {
    const apiData = mapToApiCampaign(campaign);
    const res = await fetch(`${API_BASE_URL}/campaigns/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });
    if (!res.ok) throw new Error('Failed to create campaign');
    const data: ApiCampaign = await res.json();
    return mapCampaign(data);
  },

  updateCampaign: async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
    const apiData = mapToApiCampaign(campaign);
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });
    if (!res.ok) throw new Error('Failed to update campaign');
    const data: ApiCampaign = await res.json();
    return mapCampaign(data);
  },

  deleteCampaign: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}/`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete campaign');
  },

  // Dashboard
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    const data: ApiDashboardStats = await res.json();
    return mapDashboardStats(data);
  },

  getPerformanceMetrics: async (): Promise<ApiPerformanceData[]> => {
    const res = await fetch(`${API_BASE_URL}/dashboard/performance/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch performance metrics');
    return await res.json();
  },

  // Insights
  getTrends: async (query: string = 'marketing') => {
    const res = await fetch(`${API_BASE_URL}/insights/trends/?query=${encodeURIComponent(query)}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch trends');
    const data: ApiInsightsData = await res.json();
    return mapInsightsData(data);
  },
};
