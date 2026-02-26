import { CampaignForm } from '@/components/campaigns/CampaignForm';

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Create New Campaign</h1>
          <p className="text-gray-400 mt-2">Launch a new marketing campaign.</p>
        </div>
      </div>
      
      <CampaignForm mode="create" />
    </div>
  );
}
