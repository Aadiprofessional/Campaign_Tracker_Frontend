'use client';

import { Megaphone, Play, DollarSign, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { StatusDonutChart } from '@/components/dashboard/StatusDonutChart';
import { BudgetBarChart } from '@/components/dashboard/BudgetBarChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { dashboardStats } from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* SECTION 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Campaigns"
          value={dashboardStats.totalCampaigns}
          subtitle="All time"
          icon={Megaphone}
          iconBgColor="bg-orange-500/20 text-orange-500"
          trend="+12%"
        />
        <StatCard
          title="Active Campaigns"
          value={dashboardStats.activeCampaigns}
          subtitle="Currently running"
          icon={Play}
          iconBgColor="bg-green-500/20 text-green-500"
        />
        <StatCard
          title="Total Budget"
          value={`$${dashboardStats.totalBudget.toLocaleString()}`}
          subtitle="Allocated"
          icon={DollarSign}
          iconBgColor="bg-blue-500/20 text-blue-500"
        />
        <StatCard
          title="Avg ROI"
          value={`${dashboardStats.avgROI}x`}
          subtitle="Across active campaigns"
          icon={TrendingUp}
          iconBgColor="bg-orange-500/20 text-orange-500"
          trend="+0.8x"
        />
      </div>

      {/* SECTION 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-[400px]">
        <div className="lg:col-span-6 h-full">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-4 h-full">
          <StatusDonutChart />
        </div>
      </div>

      {/* SECTION 3: Budget & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-[400px]">
        <div className="lg:col-span-6 h-full">
          <BudgetBarChart />
        </div>
        <div className="lg:col-span-4 h-full">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
