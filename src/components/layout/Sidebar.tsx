
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import {
  Home,
  BookOpen,
  Users,
  ArrowRightLeft,
  Settings,
  Search,
  BookmarkPlus,
  BarChart4,
  Calendar,
  Clock,
  BookCheck,
  CreditCard,
} from "lucide-react";

export function AppSidebar() {
  const { pathname } = useLocation();

  const routes = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Books",
      icon: BookOpen,
      href: "/books",
    },
    {
      title: "Patrons",
      icon: Users,
      href: "/patrons",
    },
    {
      title: "Circulation",
      icon: ArrowRightLeft,
      href: "/circulation",
    },
    {
      title: "Advanced Search",
      icon: Search,
      href: "/search",
    },
    {
      title: "Reading Lists",
      icon: BookmarkPlus,
      href: "/reading-lists",
    },
    {
      title: "Analytics",
      icon: BarChart4,
      href: "/analytics",
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/events",
    },
    {
      title: "Reservations",
      icon: Clock,
      href: "/reservations",
    },
    {
      title: "Fines",
      icon: CreditCard,
      href: "/fines",
    },
    {
      title: "Inventory",
      icon: BookCheck,
      href: "/inventory",
    },
  ];

  return (
    <Sidebar className="border-r bg-muted/40">
      <div className="flex h-full flex-col gap-2 p-2">
        <div className="flex h-14 items-center gap-2 px-4 py-2"></div>
        <nav className="flex-1 space-y-1">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Button
                key={route.href}
                variant={pathname === route.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === route.href && "bg-primary text-primary-foreground"
                )}
                asChild
              >
                <Link to={route.href} className="gap-2">
                  <Icon className="h-5 w-5" />
                  {route.title}
                </Link>
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
