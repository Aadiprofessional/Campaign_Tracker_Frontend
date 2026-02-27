'use client';

import { Megaphone, Play, DollarSign, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { StatusDonutChart } from '@/components/dashboard/StatusDonutChart';
import { BudgetBarChart } from '@/components/dashboard/BudgetBarChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Campaign, DashboardStats, PerformanceData } from '@/lib/types';

interface DashboardViewProps {
  initialStats: DashboardStats;
  performanceData: PerformanceData[];
  initialCampaigns: Campaign[];
}

export function DashboardView({ initialStats, performanceData, initialCampaigns }: DashboardViewProps) {
  const stats = initialStats;
  const campaigns = initialCampaigns;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Campaigns"
          value={stats.totalCampaigns}
          subtitle="All time"
          icon={Megaphone}
          iconBgColor="bg-orange-500/20 text-orange-500"
          trend="+12%"
        />
        <StatCard
          title="Active Campaigns"
          value={stats.activeCampaigns}
          subtitle="Currently running"
          icon={Play}
          iconBgColor="bg-green-500/20 text-green-500"
        />
        <StatCard
          title="Total Budget"
          value={`$${stats.totalBudget.toLocaleString()}`}
          subtitle="Allocated"
          icon={DollarSign}
          iconBgColor="bg-blue-500/20 text-blue-500"
        />
        <StatCard
          title="Avg ROI"
          value={`${stats.avgROI}x`}
          subtitle="Across active campaigns"
          icon={TrendingUp}
          iconBgColor="bg-orange-500/20 text-orange-500"
          trend="+0.8x"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6 h-full">
          <PerformanceChart data={performanceData} />
        </div>
        <div className="lg:col-span-4 h-full">
          <StatusDonutChart campaigns={campaigns} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6 h-full">
          <BudgetBarChart campaigns={campaigns} />
        </div>
        <div className="lg:col-span-4 h-full">
          <RecentActivity campaigns={campaigns} />
        </div>
      </div>
    </div>
  );
}
