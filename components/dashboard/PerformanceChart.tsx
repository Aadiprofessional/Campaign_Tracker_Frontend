'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceChartProps {
  data: {
    name: string;
    impressions: number;
    clicks: number;
    conversions: number;
  }[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  const toggleSeries = (dataKey: string) => {
    setHiddenSeries(prev => 
      prev.includes(dataKey) 
        ? prev.filter(key => key !== dataKey)
        : [...prev, dataKey]
    );
  };

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#A1A1AA" 
                tick={{ fill: '#A1A1AA' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#A1A1AA"
                tick={{ fill: '#A1A1AA' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{ stroke: '#2A2A2A', strokeWidth: 1 }}
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', cursor: 'pointer' }}
                onClick={(e) => toggleSeries(e.dataKey as string)}
                formatter={(value, entry: any) => (
                  <span style={{ 
                    color: hiddenSeries.includes(entry.dataKey) ? '#666' : '#fff',
                    textDecoration: hiddenSeries.includes(entry.dataKey) ? 'line-through' : 'none'
                  }}>
                    {value}
                  </span>
                )}
              />
              <Area 
                type="monotone" 
                dataKey="impressions" 
                stroke="#F97316" 
                fillOpacity={1}
                fill="url(#colorImpressions)"
                name="Impressions"
                hide={hiddenSeries.includes('impressions')}
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stroke="#FFFFFF" 
                fillOpacity={1}
                fill="url(#colorClicks)"
                name="Clicks"
                hide={hiddenSeries.includes('clicks')}
              />
              <Area 
                type="monotone" 
                dataKey="conversions" 
                stroke="#22C55E" 
                fillOpacity={1}
                fill="url(#colorConversions)"
                name="Conversions"
                hide={hiddenSeries.includes('conversions')}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
