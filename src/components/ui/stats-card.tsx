
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
  change?: number;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  className,
  trend,
  change,
}: StatsCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-elegant",
      className
    )}>
      <div className="p-6 flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon && <div className="text-muted-foreground/60">{icon}</div>}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {(trend || description) && (
            <div className="flex items-center gap-1">
              {trend && change !== undefined && (
                <div className={cn(
                  "text-xs font-medium inline-flex items-center px-1.5 py-0.5 rounded-sm",
                  trend === "up" ? "text-emerald-700 bg-emerald-50" : 
                  trend === "down" ? "text-rose-700 bg-rose-50" : 
                  "text-slate-700 bg-slate-50"
                )}>
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "·"} {Math.abs(change)}%
                </div>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
