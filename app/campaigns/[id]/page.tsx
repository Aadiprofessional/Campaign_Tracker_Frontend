import { notFound } from 'next/navigation';
import { CampaignDetail } from '@/components/campaigns/CampaignDetail';
import { api } from '@/lib/api';
import { generateMockPerformanceData } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

export const runtime = 'edge';

export default async function CampaignDetailPage({ params }: PageProps) {
  try {
    const campaign = await api.getCampaign(params.id);
    const performanceData = await api.getMonthlyPerformance(params.id);
    
    return <CampaignDetail campaign={campaign} performanceData={performanceData} />;
  } catch (error) {
    notFound();
  }
}
