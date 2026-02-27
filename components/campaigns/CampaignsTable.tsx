'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Campaign, Platform, Status } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import { api } from '@/lib/api';
import { toast } from "sonner";

interface CampaignsTableProps {
  initialCampaigns: Campaign[];
}

export function CampaignsTable({ initialCampaigns }: CampaignsTableProps) {
  const router = useRouter();
  const [campaignsList, setCampaignsList] = useState<Campaign[]>(initialCampaigns);
  
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const itemsPerPage = 8;

  const handleDelete = async (id: string) => {
    try {
      await api.deleteCampaign(id);
      setCampaignsList(prev => prev.filter(c => c.id !== id));
      toast.success("Campaign deleted successfully");
    } catch (error) {
      console.error('Failed to delete campaign:', error);
      toast.error("Failed to delete campaign");
    } finally {
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    try {
      
      setCampaignsList(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      await api.updateCampaign(id, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update status:', error);
      
      const original = campaignsList.find(c => c.id === id);
      if (original) {
        setCampaignsList(prev => prev.map(c => c.id === id ? { ...c, status: original.status } : c));
      }
      toast.error("Failed to update status");
    }
  };

  
  const filteredCampaigns = campaignsList.filter(campaign => {
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    const matchesPlatform = platformFilter === 'All' || campaign.platform === platformFilter;
    return matchesStatus && matchesPlatform;
  });

  
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  const getPlatformColor = (platform: Platform) => {
    switch (platform) {
      case 'Google Ads': return 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/50';
      case 'Facebook': return 'bg-indigo-500/20 text-indigo-500 hover:bg-indigo-500/30 border-indigo-500/50';
      case 'Instagram': return 'bg-pink-500/20 text-pink-500 hover:bg-pink-500/30 border-pink-500/50';
      case 'LinkedIn': return 'bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-cyan-500/50';
      case 'Email': return 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 border-orange-500/50';
      default: return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30 border-gray-500/50';
    }
  };

  
  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/50';
      case 'Paused': return 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-yellow-500/50';
      case 'Completed': return 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/50';
      case 'Draft': return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30 border-gray-500/50';
    }
  };

  
  const getROIColor = (roi: number) => {
    if (roi > 2) return 'text-green-500';
    if (roi >= 1) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#2A2A2A] text-white hover:bg-[#2A2A2A] hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-500 text-white hover:bg-red-600 border-none"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-white">All Campaigns</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as Status | 'All')}>
            <SelectTrigger className="w-full sm:w-[130px] bg-[#1A1A1A] border-[#2A2A2A]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={platformFilter} onValueChange={(value) => setPlatformFilter(value as Platform | 'All')}>
            <SelectTrigger className="w-full sm:w-[130px] bg-[#1A1A1A] border-[#2A2A2A]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
              <SelectItem value="All">All Platforms</SelectItem>
              <SelectItem value="Google Ads">Google Ads</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
            </SelectContent>
          </Select>

          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/campaigns/new">
              <Plus className="mr-2 h-4 w-4" /> New Campaign
            </Link>
          </Button>
        </div>
      </div>

      
      <div className="rounded-xl border border-[#2A2A2A] bg-[#111111]/80 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#1A1A1A]">
            <TableRow className="border-b-[#2A2A2A] hover:bg-[#1A1A1A]">
              <TableHead className="text-gray-400">Campaign Name</TableHead>
              <TableHead className="text-gray-400">Platform</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Budget</TableHead>
              <TableHead className="text-gray-400">Spent</TableHead>
              <TableHead className="text-gray-400">ROI</TableHead>
              <TableHead className="text-gray-400">Dates</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCampaigns.length > 0 ? (
                paginatedCampaigns.map((campaign, index) => (
                <TableRow 
                  key={campaign.id} 
                  onClick={() => router.push(`/campaigns/${campaign.id}`)}
                  className="cursor-pointer hover:bg-[#1A1A1A]/50 border-[#2A2A2A] transition-colors"
                >
                  <TableCell className="font-medium text-white">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-normal", getPlatformColor(campaign.platform))}>
                      {campaign.platform}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none focus:outline-none">
                        <Badge variant="outline" className={cn("rounded-full font-normal hover:opacity-80 cursor-pointer", getStatusColor(campaign.status))}>
                          {campaign.status}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                        <DropdownMenuItem className="text-white hover:bg-[#2A2A2A] cursor-pointer focus:bg-[#2A2A2A] focus:text-white" onClick={() => handleStatusChange(campaign.id, 'Active')}>Active</DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-[#2A2A2A] cursor-pointer focus:bg-[#2A2A2A] focus:text-white" onClick={() => handleStatusChange(campaign.id, 'Paused')}>Paused</DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-[#2A2A2A] cursor-pointer focus:bg-[#2A2A2A] focus:text-white" onClick={() => handleStatusChange(campaign.id, 'Completed')}>Completed</DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-[#2A2A2A] cursor-pointer focus:bg-[#2A2A2A] focus:text-white" onClick={() => handleStatusChange(campaign.id, 'Draft')}>Draft</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-gray-300">${campaign.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">${campaign.amountSpent.toLocaleString()}</TableCell>
                  <TableCell className={cn("font-medium", getROIColor(campaign.roi))}>
                    {campaign.roi}x
                  </TableCell>
                  <TableCell className="text-gray-400 text-sm">
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10">
                        <Link href={`/campaigns/${campaign.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(campaign.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </div>
      </div>

      
      <div className="flex justify-center items-center gap-4 text-sm text-gray-400 mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")} 
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
