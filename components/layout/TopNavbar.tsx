'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Plus, Menu, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { searchCampaigns } from '@/app/actions';
import { Campaign } from '@/lib/types';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        setLoading(true);
        try {
          const data = await searchCampaigns(searchTerm);
          setResults(data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleResultClick = (campaignId: string) => {
    setSearchTerm('');
    setShowDropdown(false);
    router.push(`/campaigns/${campaignId}`);
  };

  return (
    <header className="h-16 border-b border-[#1E1E1E] bg-[#0A0A0A] flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex relative group flex-1 md:flex-none" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full md:w-64 md:focus:w-96 bg-[#111111] border border-[#2A2A2A] rounded-lg pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 placeholder:text-muted-foreground/50"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
          )}

          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 w-96 mt-2 bg-[#111111] border border-[#2A2A2A] rounded-lg shadow-xl overflow-hidden z-50">
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Top Results
                </div>
                {results.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => handleResultClick(campaign.id)}
                    className="w-full text-left px-4 py-3 hover:bg-[#1A1A1A] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                        {campaign.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.platform} • {campaign.status}
                      </div>
                    </div>
                    {campaign.status === 'Active' && (
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {pathname !== '/campaigns' && (
          <Link href="/campaigns/new">
            <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
              <Plus className="h-4 w-4" />
              <span>New Campaign</span>
            </button>
          </Link>
        )}

        <div className="md:hidden h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
          AB
        </div>
      </div>
    </header>
  );
}
