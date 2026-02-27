export type Platform = 'Google Ads' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'Email';
export type Status = 'Active' | 'Paused' | 'Completed' | 'Draft';
export type Goal = 'Brand Awareness' | 'Lead Generation' | 'Sales' | 'Traffic' | 'Engagement';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  platform: Platform;
  status: Status;
  budget: number;
  amountSpent: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  goal: Goal;
  roi: number;
  impressions: number;
  clicks: number;
  conversions: number;
  createdAt: string;
}

export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalBudget: number;
  avgROI: number;
}

export interface PerformanceData {
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface InsightTopic {
  id: number;
  name: string;
  category: string;
  score: number;
  volume: string;
}

export interface InsightsData {
  trendScore: number;
  searchVolume: string;
  competition: string;
  interestOverTime: { name: string; value: number }[];
  relatedKeywords: { name: string; volume: number }[];
  trendingTopics: InsightTopic[];
}
