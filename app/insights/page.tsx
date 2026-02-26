'use client';

import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Search, TrendingUp, BarChart2, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { insightsData } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function InsightsPage() {
  const tags = [
    '#digitalmarketing', 
    '#SEO', 
    '#contentmarketing', 
    '#PPC', 
    '#socialmedia'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Market Insights</h1>
        <p className="text-gray-400 mt-2">Discover trending topics and align your campaigns.</p>
      </div>

      {/* Search Card */}
      <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for topics, keywords, or trends..."
                className="pl-10 h-11 bg-[#1A1A1A] border-[#2A2A2A] focus:ring-orange-500 text-lg"
              />
            </div>
            <Button className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium">
              Fetch Trends
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-colors py-1.5 px-3 text-sm bg-[#1A1A1A]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Top Row: Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trend Score</p>
                <div className="text-3xl font-bold text-white mt-1">{insightsData.trendScore}/100</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Search Volume</p>
                <div className="text-3xl font-bold text-white mt-1">{insightsData.searchVolume}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Competition</p>
                <div className="text-3xl font-bold text-white mt-1">{insightsData.competition}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interest Over Time */}
          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardHeader>
              <CardTitle className="text-white">Interest Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={insightsData.interestOverTime} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
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
                      itemStyle={{ color: '#F97316' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#F97316" 
                      fillOpacity={1} 
                      fill="url(#colorInterest)" 
                      name="Interest"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Related Keywords */}
          <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
            <CardHeader>
              <CardTitle className="text-white">Related Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={insightsData.relatedKeywords}
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={150}
                      tick={{ fill: '#A1A1AA', fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #2A2A2A',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                      itemStyle={{ color: '#F97316' }}
                    />
                    <Bar dataKey="volume" radius={[0, 4, 4, 0]} barSize={20}>
                      {insightsData.relatedKeywords.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#F97316" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trending Topics Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Trending Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insightsData.trendingTopics.map((topic) => (
              <Card 
                key={topic.id} 
                className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] group hover:border-orange-500/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="bg-[#2A2A2A] text-gray-300 hover:bg-[#333]">
                      {topic.category}
                    </Badge>
                    <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-1">{topic.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{topic.volume} searches</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Trend Score</span>
                      <span className="text-orange-500 font-medium">{topic.score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full" 
                        style={{ width: `${topic.score}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
