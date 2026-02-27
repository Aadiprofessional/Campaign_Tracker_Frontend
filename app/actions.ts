'use server';

import { api } from '@/lib/api';
import { Campaign } from '@/lib/types';

export async function searchCampaigns(query: string): Promise<Campaign[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const allCampaigns = await api.getCampaigns();
  const lowerQuery = query.toLowerCase();
  
  return allCampaigns
    .filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.platform.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 5);
}
