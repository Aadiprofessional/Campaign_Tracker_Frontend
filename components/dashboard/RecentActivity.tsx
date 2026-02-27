import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientOnly } from '@/components/ClientOnly';
import { Campaign } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';

interface RecentActivityProps {
  campaigns: Campaign[];
}

export function RecentActivity({ campaigns }: RecentActivityProps) {
  // Generate activity feed from campaigns (sorted by createdAt desc)
  const activities = campaigns
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((c, index) => ({
      id: c.id,
      text: `Campaign "${c.name}" was created`,
      timestamp: formatDate(c.createdAt),
    }));

  return (
    <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={activity.id} className="relative flex gap-4 items-start">
                {index !== activities.length - 1 && (
                  <div className="absolute left-[5px] top-6 bottom-[-24px] w-[2px] bg-[#1E1E1E]" />
                )}
                
                <div className={cn(
                  "mt-1.5 h-3 w-3 rounded-full shrink-0 z-10 ring-4 ring-[#111111]",
                  index === 0 ? "bg-orange-500" : "bg-[#2A2A2A]"
                )} />
                
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-white leading-tight">
                    {activity.text}
                  </p>
                  <ClientOnly>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </ClientOnly>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent activity.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
