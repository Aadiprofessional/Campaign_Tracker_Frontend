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
  createdAt: string;
}

export const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    description: 'Promoting summer collection discounts across social media.',
    platform: 'Instagram',
    status: 'Active',
    budget: 5000,
    amountSpent: 2150,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    targetAudience: 'Age 18-35, Fashion enthusiasts',
    goal: 'Sales',
    roi: 3.5,
    createdAt: '2024-05-15',
  },
  {
    id: '2',
    name: 'Tech Gadget Launch',
    description: 'Introducing new smart home devices to tech-savvy users.',
    platform: 'Facebook',
    status: 'Active',
    budget: 12000,
    amountSpent: 4500,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    targetAudience: 'Homeowners, Tech lovers',
    goal: 'Lead Generation',
    roi: 2.8,
    createdAt: '2024-06-10',
  },
  {
    id: '3',
    name: 'B2B Software Solution',
    description: 'Targeting enterprise clients for our new SaaS platform.',
    platform: 'LinkedIn',
    status: 'Active',
    budget: 15000,
    amountSpent: 8000,
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    targetAudience: 'CTOs, IT Managers, Enterprise',
    goal: 'Lead Generation',
    roi: 4.2,
    createdAt: '2024-04-20',
  },
  {
    id: '4',
    name: 'Holiday Special',
    description: 'Early bird holiday deals and gift guides.',
    platform: 'Google Ads',
    status: 'Draft',
    budget: 8000,
    amountSpent: 0,
    startDate: '2024-11-01',
    endDate: '2024-12-25',
    targetAudience: 'General public, Gift shoppers',
    goal: 'Sales',
    roi: 0,
    createdAt: '2024-08-01',
  },
  {
    id: '5',
    name: 'Newsletter Q3',
    description: 'Quarterly newsletter with industry insights and updates.',
    platform: 'Email',
    status: 'Completed',
    budget: 2000,
    amountSpent: 1950,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    targetAudience: 'Subscribers, Existing customers',
    goal: 'Engagement',
    roi: 5.1,
    createdAt: '2024-06-25',
  },
  {
    id: '6',
    name: 'Brand Awareness Video',
    description: 'Viral video campaign showcasing brand values.',
    platform: 'Instagram',
    status: 'Paused',
    budget: 6000,
    amountSpent: 3200,
    startDate: '2024-06-15',
    endDate: '2024-08-15',
    targetAudience: 'Gen Z, Millennials',
    goal: 'Brand Awareness',
    roi: 1.8,
    createdAt: '2024-06-01',
  },
  {
    id: '7',
    name: 'Webinar Series',
    description: 'Educational webinar series on industry trends.',
    platform: 'LinkedIn',
    status: 'Active',
    budget: 4000,
    amountSpent: 1200,
    startDate: '2024-08-01',
    endDate: '2024-10-31',
    targetAudience: 'Professionals, Industry experts',
    goal: 'Traffic',
    roi: 2.5,
    createdAt: '2024-07-15',
  },
  {
    id: '8',
    name: 'Retargeting Campaign',
    description: 'Retargeting users who visited the checkout page.',
    platform: 'Google Ads',
    status: 'Active',
    budget: 3500,
    amountSpent: 2800,
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    targetAudience: 'Cart abandoners',
    goal: 'Sales',
    roi: 6.5,
    createdAt: '2024-04-25',
  },
];

export const dashboardStats = {
  totalCampaigns: 24,
  activeCampaigns: 12,
  totalBudget: 85000,
  avgROI: 3.2,
};

export const monthlyPerformance = [
  { name: 'Jan', impressions: 4000, clicks: 2400, conversions: 2400 },
  { name: 'Feb', impressions: 3000, clicks: 1398, conversions: 2210 },
  { name: 'Mar', impressions: 2000, clicks: 9800, conversions: 2290 },
  { name: 'Apr', impressions: 2780, clicks: 3908, conversions: 2000 },
  { name: 'May', impressions: 1890, clicks: 4800, conversions: 2181 },
  { name: 'Jun', impressions: 2390, clicks: 3800, conversions: 2500 },
];

export const weeklyPerformance = [
  { name: 'Week 1', impressions: 1200, clicks: 800, conversions: 150 },
  { name: 'Week 2', impressions: 1500, clicks: 950, conversions: 180 },
  { name: 'Week 3', impressions: 1100, clicks: 700, conversions: 120 },
  { name: 'Week 4', impressions: 1800, clicks: 1200, conversions: 250 },
];

export const activityFeed = [
  { id: 1, text: 'Campaign "Summer Sale" reached 10k impressions', timestamp: '2 hours ago' },
  { id: 2, text: 'New lead generated from "Tech Gadget Launch"', timestamp: '4 hours ago' },
  { id: 3, text: 'Budget increased for "B2B Software Solution"', timestamp: 'Yesterday' },
  { id: 4, text: 'Campaign "Holiday Special" status changed to Draft', timestamp: '2 days ago' },
  { id: 5, text: 'New creative added to "Brand Awareness Video"', timestamp: '3 days ago' },
];

// Insights Mock Data
export const insightsData = {
  trendScore: 87,
  searchVolume: '2.4M/month',
  competition: 'Medium',
  interestOverTime: [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 67 },
    { name: 'Jul', value: 72 },
    { name: 'Aug', value: 85 },
    { name: 'Sep', value: 82 },
    { name: 'Oct', value: 91 },
    { name: 'Nov', value: 95 },
    { name: 'Dec', value: 88 },
  ],
  relatedKeywords: [
    { name: 'digital marketing trends', volume: 8500 },
    { name: 'ai in marketing', volume: 7200 },
    { name: 'video content strategy', volume: 6800 },
    { name: 'influencer marketing', volume: 6100 },
    { name: 'voice search seo', volume: 5400 },
    { name: 'social commerce', volume: 4900 },
  ],
  trendingTopics: [
    { id: 1, name: 'AI Content Generation', category: 'Technology', score: 92, volume: '1.2M' },
    { id: 2, name: 'Short-form Video', category: 'Social Media', score: 88, volume: '3.5M' },
    { id: 3, name: 'Sustainable Branding', category: 'Branding', score: 76, volume: '850K' },
    { id: 4, name: 'Personalization at Scale', category: 'Strategy', score: 81, volume: '920K' },
    { id: 5, name: 'Data Privacy', category: 'Legal', score: 79, volume: '1.5M' },
    { id: 6, name: 'Podcast Advertising', category: 'Audio', score: 74, volume: '680K' },
  ]
};
