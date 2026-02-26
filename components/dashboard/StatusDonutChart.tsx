'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/lib/mockData';

interface StatusDonutChartProps {
  campaigns: Campaign[];
}

export function StatusDonutChart({ campaigns }: StatusDonutChartProps) {
  const data = [
    { name: 'Active', value: campaigns.filter(c => c.status === 'Active').length, color: '#F97316' },
    { name: 'Completed', value: campaigns.filter(c => c.status === 'Completed').length, color: '#22C55E' },
    { name: 'Paused', value: campaigns.filter(c => c.status === 'Paused').length, color: '#EAB308' },
    { name: 'Draft', value: campaigns.filter(c => c.status === 'Draft').length, color: '#A1A1AA' },
  ].filter(item => item.value > 0);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Campaigns by Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center relative">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A', 
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="text-3xl font-bold text-white block">{total}</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
