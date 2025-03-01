
import { StatsCard } from "@/components/ui/stats-card";
import { dashboardStats } from "@/lib/data";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={<stat.icon className="h-5 w-5" />}
          trend={stat.trend}
          change={stat.change}
          className="animate-fade-in"
        />
      ))}
    </div>
  );
}
