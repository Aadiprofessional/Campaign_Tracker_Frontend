'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/campaigns/new')) return 'New Campaign';
    if (path.startsWith('/campaigns') && path.includes('/edit')) return 'Edit Campaign';
    if (path.startsWith('/campaigns') && path.split('/').length > 2) return 'Campaign Details';
    if (path.startsWith('/campaigns')) return 'Campaigns';
    if (path.startsWith('/insights')) return 'Insights';
    return 'Dashboard';
  };

  return (
    <header className="h-16 border-b border-[#1E1E1E] bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-white tracking-tight">
          {getPageTitle(pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-10 w-64 bg-[#111111] border border-[#2A2A2A] rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-white transition-colors rounded-lg hover:bg-[#1A1A1A]">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-[#0A0A0A]" />
        </button>

        {/* New Campaign Button */}
        <Link href="/campaigns/new">
          <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
            <Plus className="h-4 w-4" />
            <span>New Campaign</span>
          </button>
        </Link>

        {/* User Avatar (Mobile only, desktop is in sidebar) */}
        <div className="md:hidden h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
          AJ
        </div>
      </div>
    </header>
  );
}
