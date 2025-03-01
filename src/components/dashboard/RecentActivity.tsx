
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowUpRight, RotateCw, Calendar, XCircle, Clock } from "lucide-react";
import { ActivityItem, recentActivities } from "@/lib/data";
import { cn } from "@/lib/utils";

const actionIcons = {
  checkout: ArrowUpRight,
  return: RotateCw,
  reserve: Calendar,
  cancel: XCircle,
  overdue: Clock,
};

const actionColors = {
  checkout: "text-emerald-500",
  return: "text-blue-500",
  reserve: "text-amber-500",
  cancel: "text-slate-500",
  overdue: "text-rose-500",
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Initialize with existing activities
  useEffect(() => {
    setActivities(recentActivities);
  }, []);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest library activities and events</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {activities.map((activity, index) => {
            const ActionIcon = actionIcons[activity.action];
            
            return (
              <div 
                key={activity.id}
                className={cn(
                  "flex items-start gap-3 px-6 py-3 transition-colors hover:bg-muted/50",
                  index === activities.length - 1 ? "" : "border-b"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background",
                  actionColors[activity.action].replace("text-", "bg-").replace("500", "100")
                )}>
                  <ActionIcon className={cn("h-4 w-4", actionColors[activity.action])} />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="font-medium text-sm">
                      {activity.patronName}
                    </span>
                    <span className="text-muted-foreground text-sm hidden sm:inline">
                      —
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {activity.action === "checkout" && "checked out"}
                      {activity.action === "return" && "returned"}
                      {activity.action === "reserve" && "reserved"}
                      {activity.action === "cancel" && "canceled reservation for"}
                      {activity.action === "overdue" && "has overdue book"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">"{activity.bookTitle}"</span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
