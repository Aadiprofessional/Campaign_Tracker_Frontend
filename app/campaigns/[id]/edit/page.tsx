import { notFound } from 'next/navigation';
import { CampaignForm } from '@/components/campaigns/CampaignForm';
import { api } from '@/lib/api';

interface PageProps {
  params: { id: string };
}

export const runtime = 'edge';

export default async function EditCampaignPage({ params }: PageProps) {
  try {
    const campaign = await api.getCampaign(params.id);

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
  } catch (error) {
    notFound();
  }
}
