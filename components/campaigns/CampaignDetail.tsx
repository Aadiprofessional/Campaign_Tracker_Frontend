'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Pencil, 
  Trash2, 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  Clock,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign, PerformanceData } from '@/lib/types';
import { MonthlyPerformance } from '@/lib/types-performance';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { MonthlyPerformanceManager } from './MonthlyPerformanceManager';

interface CampaignDetailProps {
  campaign: Campaign;
  performanceData: MonthlyPerformance[];
}

export function CampaignDetail({ campaign, performanceData }: CampaignDetailProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      try {
        await api.deleteCampaign(campaign.id);
        router.push('/campaigns');
        router.refresh();
      } catch (error) {
        console.error('Failed to delete campaign:', error);
        alert('Failed to delete campaign');
      }
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Google Ads': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'Facebook': return 'bg-indigo-500/20 text-indigo-500 border-indigo-500/50';
      case 'Instagram': return 'bg-pink-500/20 text-pink-500 border-pink-500/50';
      case 'LinkedIn': return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50';
      case 'Email': return 'bg-orange-500/20 text-orange-500 border-orange-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'Paused': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Completed': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'Draft': return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  const activityFeed = [
    {
      id: 'created',
      text: `Campaign "${campaign.name}" created`,
      timestamp: formatDate(campaign.createdAt),
    },
    {
      id: 'started',
      text: `Campaign scheduled start date`,
      timestamp: formatDate(campaign.startDate),
    }
  ];

  const chartData = performanceData.map(item => ({
    name: item.month,
    impressions: item.impressions,
    clicks: item.clicks,
    conversions: item.conversions
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-3">
        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
          <Link href={`/campaigns/${campaign.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" /> Edit Campaign
          </Link>
        </Button>
        <Button 
          variant="outline" 
          className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-white">{campaign.name}</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={cn("rounded-full", getStatusColor(campaign.status))}>
                {campaign.status}
              </Badge>
              <Badge variant="outline" className={cn(getPlatformColor(campaign.platform))}>
                {campaign.platform}
              </Badge>
              <Badge variant="outline" className="bg-[#1A1A1A] text-gray-300 border-[#2A2A2A]">
                <Target className="w-3 h-3 mr-1" /> {campaign.goal}
              </Badge>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {campaign.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">Budget</span>
                <DollarSign className="h-4 w-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">${campaign.budget.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">Spent</span>
                <PieChart className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">${campaign.amountSpent.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">ROI</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">{campaign.roi}x</div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm">Remaining</span>
                <Clock className="h-4 w-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">{daysRemaining} Days</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
        <CardHeader>
          <CardTitle className="text-white">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="name" stroke="#A1A1AA" tickLine={false} axisLine={false} />
                <YAxis stroke="#A1A1AA" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#F97316" 
                  fillOpacity={1} 
                  fill="url(#colorImpressions)" 
                  name="Impressions"
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#22C55E" 
                  fillOpacity={1} 
                  fill="url(#colorClicks)" 
                  name="Clicks"
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#FFFFFF" 
                  fill="transparent" 
                  strokeWidth={2}
                  name="Conversions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <MonthlyPerformanceManager campaign={campaign} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#111111] border-[#2A2A2A] text-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <div>
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
