
import { Campaign } from './types';

export interface MonthlyPerformance {
  campaignId: string;
  month: string; 
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
}
