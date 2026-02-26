'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
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
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ fill: '#F97316', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Impressions"
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#FFFFFF" 
                strokeWidth={2}
                dot={{ fill: '#FFFFFF', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Clicks"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#22C55E" 
                strokeWidth={2}
                dot={{ fill: '#22C55E', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Conversions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
