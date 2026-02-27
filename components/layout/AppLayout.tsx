'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { cn } from '@/lib/utils';
import { SearchProvider } from '@/components/context/SearchContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SearchProvider>
      <div className="min-h-screen bg-[#0A0A0A] flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          "md:pl-[240px]" 
        )}>
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
