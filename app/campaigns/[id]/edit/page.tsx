import { notFound } from 'next/navigation';
import { CampaignForm } from '@/components/campaigns/CampaignForm';
import { campaigns } from '@/lib/mockData';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return campaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

export default function EditCampaignPage({ params }: PageProps) {
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Edit Campaign</h1>
          <p className="text-gray-400 mt-2">Update campaign details and settings.</p>
        </div>
      </div>
      
      <CampaignForm mode="edit" initialData={campaign} />
    </div>
  );
}
