import { notFound } from 'next/navigation';
import { CampaignDetail } from '@/components/campaigns/CampaignDetail';
import { campaigns } from '@/lib/mockData';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return campaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

export default function CampaignDetailPage({ params }: PageProps) {
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    notFound();
  }

  return <CampaignDetail campaign={campaign} />;
}
