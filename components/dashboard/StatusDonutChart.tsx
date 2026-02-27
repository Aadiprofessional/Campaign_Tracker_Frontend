'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/lib/types';

interface StatusDonutChartProps {
  campaigns: Campaign[];
}

export function StatusDonutChart({ campaigns }: StatusDonutChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);

  // Keep all data but filter values for display
  const data = [
    { name: 'Active', value: campaigns.filter(c => c.status === 'Active').length, color: '#F97316' },
    { name: 'Completed', value: campaigns.filter(c => c.status === 'Completed').length, color: '#22C55E' },
    { name: 'Paused', value: campaigns.filter(c => c.status === 'Paused').length, color: '#EAB308' },
    { name: 'Draft', value: campaigns.filter(c => c.status === 'Draft').length, color: '#A1A1AA' },
  ].filter(item => item.value > 0);

  const toggleSeries = (dataKey: string) => {
    setHiddenSeries(prev => 
      prev.includes(dataKey) 
        ? prev.filter(key => key !== dataKey)
        : [...prev, dataKey]
    );
  };

  const chartData = data.map(item => ({
    ...item,
    value: hiddenSeries.includes(item.name) ? 0 : item.value
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Campaigns by Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center relative p-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <g>
                          <text x={viewBox.cx} y={viewBox.cy! - 25} textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                            {total}
                          </text>
                          <text x={viewBox.cx} y={viewBox.cy! + 2} textAnchor="middle" dominantBaseline="middle" className="text-xs fill-muted-foreground" style={{ fontSize: '12px' }}>
                            Campaigns
                          </text>
                        </g>
                      );
                    }
                    return null;
                  }}
                />
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
                wrapperStyle={{ paddingTop: '20px', cursor: 'pointer' }}
                onClick={(e) => e && e.value && toggleSeries(String(e.value))}
                formatter={(value, entry: any) => (
                  <span style={{ 
                    color: hiddenSeries.includes(value) ? '#666' : '#fff',
                    textDecoration: hiddenSeries.includes(value) ? 'line-through' : 'none'
                  }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
