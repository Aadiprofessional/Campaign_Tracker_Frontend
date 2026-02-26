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
import { Campaign, weeklyPerformance, activityFeed } from '@/lib/mockData';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CampaignDetailProps {
  campaign: Campaign;
}

export function CampaignDetail({ campaign }: CampaignDetailProps) {
  // Helper for Platform Badge Color
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

  // Helper for Status Badge Color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'Paused': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Completed': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'Draft': return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  // Calculate days remaining
  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-end gap-3">
        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
          <Link href={`/campaigns/${campaign.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" /> Edit Campaign
          </Link>
        </Button>
        <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Campaign
        </Button>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Info */}
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

        {/* Right Section: Mini Metrics */}
        <div className="grid grid-cols-2 gap-4">
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

      {/* MIDDLE SECTION: Performance Chart */}
      <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
        <CardHeader>
          <CardTitle className="text-white">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Campaign Details */}
        <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-white">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
              <span className="text-gray-400">Platform</span>
              <span className="text-white font-medium">{campaign.platform}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
              <span className="text-gray-400">Target Audience</span>
              <span className="text-white font-medium">{campaign.targetAudience}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
              <span className="text-gray-400">Start Date</span>
              <span className="text-white font-medium">{new Date(campaign.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
              <span className="text-gray-400">End Date</span>
              <span className="text-white font-medium">{new Date(campaign.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
              <span className="text-gray-400">Goal</span>
              <span className="text-white font-medium">{campaign.goal}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Created At</span>
              <span className="text-white font-medium">{new Date(campaign.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Right: Activity Timeline */}
        <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-white">Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 pl-2">
              {activityFeed.map((activity, index) => (
                <div key={activity.id} className="relative flex gap-4 items-start">
                  {/* Timeline Line */}
                  {index !== activityFeed.length - 1 && (
                    <div className="absolute left-[5px] top-6 bottom-[-24px] w-[2px] bg-[#1E1E1E]" />
                  )}
                  
                  {/* Dot */}
                  <div className={cn(
                    "mt-1.5 h-3 w-3 rounded-full shrink-0 z-10 ring-4 ring-[#111111]",
                    index === 0 ? "bg-orange-500" : "bg-[#2A2A2A]"
                  )} />
                  
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-white leading-tight">
                      {activity.text}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
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
