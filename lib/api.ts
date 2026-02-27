import { Campaign, Platform, Status, Goal, DashboardStats, InsightsData, PerformanceData } from './types';
import { MonthlyPerformance } from './types-performance';

const API_BASE_URL = 'https://campaign-tracker-backend-eight.vercel.app/api';

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
  impressions?: number | null;
  clicks?: number | null;
  conversions?: number | null;
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
  impressions: apiCampaign.impressions || 0,
  clicks: apiCampaign.clicks || 0,
  conversions: apiCampaign.conversions || 0,
  createdAt: apiCampaign.created_at,
});

const mapToApiCampaign = (campaign: Partial<Campaign>): Partial<ApiCampaign> => {
  const apiData: any = { ...campaign };
  if (campaign.amountSpent !== undefined) apiData.amount_spent = campaign.amountSpent;
  if (campaign.startDate !== undefined) apiData.start_date = campaign.startDate;
  if (campaign.endDate !== undefined) apiData.end_date = campaign.endDate;
  if (campaign.targetAudience !== undefined) apiData.target_audience = campaign.targetAudience;
  if (campaign.createdAt !== undefined) apiData.created_at = campaign.createdAt;
  
  delete apiData.amountSpent;
  delete apiData.startDate;
  delete apiData.endDate;
  delete apiData.targetAudience;
  delete apiData.createdAt;
  
  return apiData;
};

const mapDashboardStats = (apiStats: ApiDashboardStats): DashboardStats => ({
  totalCampaigns: apiStats.total_campaigns,
  activeCampaigns: apiStats.active_campaigns,
  totalBudget: apiStats.total_budget,
  avgROI: apiStats.avg_roi,
});

const mapInsightsData = (apiInsights: ApiInsightsData): InsightsData => ({
  trendScore: apiInsights.trend_score,
  searchVolume: apiInsights.search_volume,
  competition: apiInsights.competition,
  interestOverTime: apiInsights.interest_over_time,
  relatedKeywords: apiInsights.related_keywords,
  trendingTopics: apiInsights.trending_topics,
});

export const api = {
  getCampaigns: async (): Promise<Campaign[]> => {
    const res = await fetch(`${API_BASE_URL}/campaigns`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch campaigns');
    const data: ApiCampaign[] = await res.json();
    return data.map(mapCampaign);
  },

  getCampaign: async (id: string): Promise<Campaign> => {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch campaign');
    const data: ApiCampaign = await res.json();
    return mapCampaign(data);
  },

  createCampaign: async (campaign: Partial<Campaign>): Promise<Campaign> => {
    const apiData = mapToApiCampaign(campaign);
    const res = await fetch(`${API_BASE_URL}/campaigns`, {
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
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });
    if (!res.ok) throw new Error('Failed to update campaign');
    const data: ApiCampaign = await res.json();
    return mapCampaign(data);
  },

  deleteCampaign: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete campaign');
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    const data: ApiDashboardStats = await res.json();
    return mapDashboardStats(data);
  },

  getPerformanceMetrics: async (): Promise<PerformanceData[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/performance`, { cache: 'no-store' });
      if (!res.ok) {
        return [];
      }
      const data: ApiPerformanceData[] = await res.json();
      
      return data.map(item => {
        let date: Date;
        if (item.name.includes('-')) {
          const [year, month, day] = item.name.split('-').map(Number);
          date = new Date(year, month - 1, day);
        } else {
          date = new Date(item.name);
        }
        
        return {
          name: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          impressions: item.impressions,
          clicks: item.clicks,
          conversions: item.conversions
        };
      });
    } catch (error) {
      return [];
    }
  },

  getInsights: async (query: string = ''): Promise<InsightsData> => {
    const res = await fetch(`${API_BASE_URL}/insights/trends/?query=${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch insights');
    const data: ApiInsightsData = await res.json();
    return mapInsightsData(data);
  },

  getMonthlyPerformance: async (campaignId: string): Promise<MonthlyPerformance[]> => {
    const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/performance`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error('Failed to fetch monthly performance');
    }
    const data = await res.json();
    return data.map((item: any) => ({
      campaignId: item.campaign_id || campaignId,
      month: item.month,
      impressions: item.impressions,
      clicks: item.clicks,
      conversions: item.conversions,
      spend: item.spend,
      revenue: item.revenue
    }));
  },

  updateMonthlyPerformance: async (campaignId: string, data: MonthlyPerformance[]): Promise<void> => {
    const apiData = data.map(({ month, impressions, clicks, conversions, spend, revenue }) => ({
      month,
      impressions,
      clicks,
      conversions,
      spend,
      revenue
    }));

    const res = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/performance`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });
    if (!res.ok) throw new Error('Failed to update monthly performance');
  },

  getNews: async (
    query: string,
    filters?: {
      limit?: string;
      time_published?: string;
      country?: string;
      lang?: string;
    }
  ): Promise<NewsArticle[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/news/search/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          limit: filters?.limit || "10",
          time_published: filters?.time_published || "anytime",
          country: filters?.country || "US",
          lang: filters?.lang || "en"
        }),
      });
      
      if (!res.ok) {
        return [];
      }
      
      const data = await res.json();
      return data.data || [];
    } catch (error) {
      return [];
    }
  },
};

export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  snippet: string;
  photo_url: string;
  thumbnail_url: string;
  published_datetime_utc: string;
  source_url: string;
  source_name: string;
  source_logo_url: string;
  source_favicon_url: string;
}
