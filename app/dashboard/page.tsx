import { api } from '@/lib/api';
import { DashboardView } from '@/components/dashboard/DashboardView';

export const runtime = 'edge';

export default async function DashboardPage() {
  const [stats, performanceData, campaigns] = await Promise.all([
    api.getDashboardStats(),
    api.getPerformanceMetrics(),
    api.getCampaigns()
  ]);

  return (
    <DashboardView 
      initialStats={stats}
      performanceData={performanceData}
      initialCampaigns={campaigns}
    />
  );
}
