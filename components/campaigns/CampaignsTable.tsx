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
import { Pencil, Trash2, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { campaigns, Campaign, Platform, Status } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function CampaignsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    const matchesPlatform = platformFilter === 'All' || campaign.platform === platformFilter;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper for Platform Badge Color
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

  // Helper for Status Badge Color
  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/50';
      case 'Paused': return 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-yellow-500/50';
      case 'Completed': return 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/50';
      case 'Draft': return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30 border-gray-500/50';
    }
  };

  // Helper for ROI Color
  const getROIColor = (roi: number) => {
    if (roi > 2) return 'text-green-500';
    if (roi >= 1) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-white">All Campaigns</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[#1A1A1A] border-[#2A2A2A] focus:ring-orange-500 w-full sm:w-[200px]"
            />
          </div>
          
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

      {/* Table Card */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[#111111]/80 backdrop-blur-sm overflow-hidden">
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
                  className={cn(
                    "border-b-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors",
                    index % 2 === 0 ? "bg-transparent" : "bg-[#161616]"
                  )}
                >
                  <TableCell className="font-medium text-white">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-normal", getPlatformColor(campaign.platform))}>
                      {campaign.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("rounded-full font-normal", getStatusColor(campaign.status))}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">${campaign.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">${campaign.amountSpent.toLocaleString()}</TableCell>
                  <TableCell className={cn("font-medium", getROIColor(campaign.roi))}>
                    {campaign.roi}x
                  </TableCell>
                  <TableCell className="text-gray-400 text-sm">
                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10">
                        <Link href={`/campaigns/${campaign.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10">
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <div>
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length}
        </div>
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
