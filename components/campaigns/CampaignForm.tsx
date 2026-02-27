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
import { Campaign, Platform, Status, Goal } from '@/lib/types';
import Link from 'next/link';
import { api } from '@/lib/api';
import { toast } from "sonner";

interface CampaignFormProps {
  initialData?: Campaign;
  mode: 'create' | 'edit';
}

export function CampaignForm({ initialData, mode }: CampaignFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Campaign>>(
    initialData || {
      name: '',
      platform: 'Google Ads',
      status: 'Draft',
      budget: 0,
      amountSpent: 0,
      roi: 0,
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
      [name]: ['budget', 'amountSpent', 'roi'].includes(name) 
        ? Number(value) 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === 'create') {
        await api.createCampaign(formData);
        toast.success("Campaign created successfully");
      } else if (mode === 'edit' && initialData?.id) {
        await api.updateCampaign(initialData.id, formData);
        toast.success("Campaign updated successfully");
      }
      router.push('/campaigns');
      router.refresh();
    } catch (error) {
      console.error('Failed to save campaign:', error);
      toast.error("Failed to save campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <div className="space-y-2">
                <Label htmlFor="roi" className="text-xs text-white">ROI (x)</Label>
                <Input
                  id="roi"
                  name="roi"
                  type="number"
                  value={formData.roi}
                  onChange={handleChange}
                  className="bg-[#1A1A1A] border-[#2A2A2A] focus-visible:ring-orange-500 text-white"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

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
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-shadow"
            >
              {isSubmitting 
                ? (mode === 'create' ? 'Creating...' : 'Saving...') 
                : (mode === 'create' ? 'Create Campaign' : 'Save Changes')
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
