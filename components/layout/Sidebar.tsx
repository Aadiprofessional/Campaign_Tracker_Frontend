'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Megaphone, TrendingUp, Zap, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Campaigns',
    href: '/campaigns',
    icon: Megaphone,
  },
  {
    name: 'Insights',
    href: '/insights',
    icon: TrendingUp,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-[#0F0F0F] border-r border-[#1E1E1E] z-50 transition-all duration-300 flex flex-col",
          "w-[240px] md:w-[240px] md:translate-x-0", // Desktop fixed width
          isOpen ? "translate-x-0" : "-translate-x-full" // Mobile toggle
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-[#1E1E1E]">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="h-6 w-6 fill-primary" />
            <span className="font-bold text-xl tracking-tight text-white">CampaignIQ</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()} // Close on mobile when clicked
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:bg-[#1A1A1A] hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] bg-primary rounded-r-full" />
                )}
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                <span className="font-medium">{item.name}</span>
                
                {/* Active Glow Effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg bg-primary/5 shadow-[0_0_15px_rgba(249,115,22,0.1)] pointer-events-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#1E1E1E]">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
              AJ
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white truncate">Alex Johnson</span>
              <span className="text-xs text-muted-foreground truncate">Marketing Manager</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
