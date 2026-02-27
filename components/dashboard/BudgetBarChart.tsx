'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/lib/types';
import { ArrowRight, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface BudgetBarChartProps {
  campaigns: Campaign[];
}

export function BudgetBarChart({ campaigns }: BudgetBarChartProps) {
  // Sort by budget descending and take top 5
  const topCampaigns = campaigns
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 5);

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-white">Top Campaigns by Budget</CardTitle>
        <Link href="/campaigns" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto custom-scrollbar">
        <div className="space-y-5">
          {topCampaigns.map((campaign) => (
            <div key={campaign.id} className="space-y-2 group/item">
              <div className="flex items-center justify-between text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-white truncate max-w-[150px] group-hover/item:text-primary transition-colors">
                    {campaign.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {campaign.platform}
                  </span>
                </div>
                <span className="text-muted-foreground font-mono">
                  ${campaign.budget.toLocaleString()}
                </span>
              </div>
              
              <div className="relative group/bar">
                <div className="h-2 w-full bg-[#1A1A1A] rounded-full overflow-hidden relative cursor-pointer">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 ease-out group-hover/item:from-orange-400 group-hover/item:to-orange-500"
                    style={{ width: `${Math.min((campaign.amountSpent / campaign.budget) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/bar:block bg-[#1A1A1A] border border-[#2A2A2A] text-white text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap z-10 pointer-events-none">
                  Spent: ${campaign.amountSpent.toLocaleString()}
                </div>
              </div>
            </div>
          ))}

          {topCampaigns.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <DollarSign className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-sm">No campaigns found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
