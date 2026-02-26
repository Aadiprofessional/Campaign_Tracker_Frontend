import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  trend?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, iconBgColor, trend }: StatCardProps) {
  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-white">{value}</h2>
              {trend && (
                <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded", 
                  trend.startsWith('+') ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                )}>
                  {trend}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={cn("p-3 rounded-xl shadow-lg", iconBgColor)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
