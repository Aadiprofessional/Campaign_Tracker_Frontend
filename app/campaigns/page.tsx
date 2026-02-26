import { CampaignsTable } from '@/components/campaigns/CampaignsTable';

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Campaigns</h1>
          <p className="text-gray-400 mt-2">Manage and track your marketing campaigns across all platforms.</p>
        </div>
      </div>
      
      <CampaignsTable />
    </div>
  );
}
