'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Campaign, Platform, Status, Goal } from '@/lib/mockData';
import Link from 'next/link';

interface CampaignFormProps {
  initialData?: Campaign;
  mode: 'create' | 'edit';
}

export function CampaignForm({ initialData, mode }: CampaignFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Campaign>>(
    initialData || {
      name: '',
      platform: 'Google Ads',
      status: 'Draft',
      budget: 0,
      amountSpent: 0,
      startDate: '',
      endDate: '',
      targetAudience: '',
      goal: 'Brand Awareness',
      description: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'amountSpent' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, this would call an API
    router.push('/campaigns');
  };

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row 1: Name & Platform */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs text-white">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Summer Sale 2024"
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-xs text-white">Platform</Label>
              <Select 
                value={formData.platform} 
                onValueChange={(value) => handleSelectChange('platform', value)}
              >
                <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] focus:ring-orange-500 text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 2: Goal & Status */}
            <div className="space-y-2">
              <Label htmlFor="goal" className="text-xs text-white">Goal</Label>
              <Select 
                value={formData.goal} 
                onValueChange={(value) => handleSelectChange('goal', value)}
              >
                <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] focus:ring-orange-500 text-white">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                  <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Traffic">Traffic</SelectItem>
                  <SelectItem value="Engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs text-white">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] focus:ring-orange-500 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 3: Budget & Amount Spent */}
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-xs text-white">Budget ($)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountSpent" className="text-xs text-white">Amount Spent ($)</Label>
              <Input
                id="amountSpent"
                name="amountSpent"
                type="number"
                value={formData.amountSpent}
                onChange={handleChange}
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                min="0"
                required
              />
            </div>

            {/* Row 4: Dates */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-xs text-white">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-xs text-white">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                required
              />
            </div>

            {/* Row 5: Target Audience */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="targetAudience" className="text-xs text-white">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="e.g. Age 18-35, Fashion enthusiasts"
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                required
              />
            </div>

            {/* Row 6: Description */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description" className="text-xs text-white">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your campaign..."
                className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white min-h-[100px]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" asChild className="text-gray-400 hover:text-white hover:bg-[#2A2A2A]">
              <Link href="/campaigns">Cancel</Link>
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-shadow">
              {mode === 'create' ? 'Create Campaign' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
