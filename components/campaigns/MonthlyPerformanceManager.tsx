'use client';

import { useState, useEffect } from 'react';
import { Campaign } from '@/lib/types';
import { MonthlyPerformance } from '@/lib/types-performance';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

export interface MonthlyPerformanceManagerProps {
  campaign: Campaign;
}

export function MonthlyPerformanceManager({ campaign }: MonthlyPerformanceManagerProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [performanceData, setPerformanceData] = useState<MonthlyPerformance[]>([]);

  const generateMonths = () => {
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const months: string[] = [];
    
    let current = new Date(start);
    
    current.setDate(1);

    while (current <= end) {
      months.push(current.toISOString().slice(0, 10)); 
      current.setMonth(current.getMonth() + 1);
    }
    
    
    const endMonthDate = new Date(end);
    endMonthDate.setDate(1);
    const endMonth = endMonthDate.toISOString().slice(0, 10);
    
    if (!months.includes(endMonth)) {
        months.push(endMonth);
    }
    
    return months;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        
        const existingData = await api.getMonthlyPerformance(campaign.id);
        
        
        const requiredMonths = generateMonths();
        
        
        const mergedData: MonthlyPerformance[] = requiredMonths.map(month => {
          const existing = existingData.find(d => d.month === month);
          return existing || {
            campaignId: campaign.id,
            month,
            impressions: 0,
            clicks: 0,
            conversions: 0,
            spend: 0,
            revenue: 0
          };
        });
        
        setPerformanceData(mergedData);
      } catch (error) {
        console.error('Failed to load performance data:', error);
        toast.error('Failed to load monthly performance data');
      } finally {
        setLoading(false);
      }
    };

    if (campaign.id && campaign.startDate && campaign.endDate) {
      loadData();
    }
  }, [campaign.id, campaign.startDate, campaign.endDate]);

  const handleChange = (index: number, field: keyof MonthlyPerformance, value: string) => {
    const newData = [...performanceData];
    newData[index] = {
      ...newData[index],
      [field]: Number(value)
    };
    setPerformanceData(newData);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateMonthlyPerformance(campaign.id, performanceData);
      toast.success('Performance data saved successfully');
    } catch (error) {
      console.error('Failed to save performance data:', error);
      toast.error('Failed to save performance data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!campaign.startDate || !campaign.endDate) {
      return (
          <Card className="bg-[#111111] border-[#2A2A2A] text-white">
            <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400">Please set Start Date and End Date to manage monthly performance.</p>
            </CardContent>
          </Card>
      )
  }

  return (
    <Card className="bg-[#111111] border-[#2A2A2A] text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Monthly Performance</CardTitle>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-[#2A2A2A]">
          <Table>
            <TableHeader className="bg-[#1A1A1A]">
              <TableRow className="border-[#2A2A2A] hover:bg-[#1A1A1A]">
                <TableHead className="text-gray-400">Month</TableHead>
                <TableHead className="text-gray-400">Impressions</TableHead>
                <TableHead className="text-gray-400">Clicks</TableHead>
                <TableHead className="text-gray-400">Conversions</TableHead>
                <TableHead className="text-gray-400">Spend ($)</TableHead>
                <TableHead className="text-gray-400">Revenue ($)</TableHead>
                <TableHead className="text-gray-400">ROI (x)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((row, index) => (
                <TableRow key={row.month} className="border-[#2A2A2A] hover:bg-[#1A1A1A]/50">
                  <TableCell className="font-medium text-white">
                    {row.month}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.impressions}
                      onChange={(e) => handleChange(index, 'impressions', e.target.value)}
                      className="bg-[#0A0A0A] border-[#2A2A2A] text-white h-8"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.clicks}
                      onChange={(e) => handleChange(index, 'clicks', e.target.value)}
                      className="bg-[#0A0A0A] border-[#2A2A2A] text-white h-8"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.conversions}
                      onChange={(e) => handleChange(index, 'conversions', e.target.value)}
                      className="bg-[#0A0A0A] border-[#2A2A2A] text-white h-8"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.spend}
                      onChange={(e) => handleChange(index, 'spend', e.target.value)}
                      className="bg-[#0A0A0A] border-[#2A2A2A] text-white h-8"
                      min="0"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.revenue}
                      onChange={(e) => handleChange(index, 'revenue', e.target.value)}
                      className="bg-[#0A0A0A] border-[#2A2A2A] text-white h-8"
                      min="0"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {row.spend > 0 ? (row.revenue / row.spend).toFixed(2) : '0.00'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
