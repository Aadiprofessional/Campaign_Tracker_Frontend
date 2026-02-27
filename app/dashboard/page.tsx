import { api } from '@/lib/api';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default async function DashboardPage() {
  const [stats, performanceData, campaigns] = await Promise.all([
    api.getDashboardStats({ cache: 'force-cache' }),
    api.getPerformanceMetrics({ cache: 'force-cache' }),
    api.getCampaigns({ cache: 'force-cache' })
  ]);

  return (
    <DashboardView 
      initialStats={stats}
      performanceData={performanceData}
      initialCampaigns={campaigns}
    />
  );
}
