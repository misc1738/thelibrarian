
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  Repeat,
  BarChart4,
  Settings,
  Tags,
  CalendarDays,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart4,
  },
  {
    title: "Books",
    href: "/books",
    icon: BookOpen,
  },
  {
    title: "Patrons",
    href: "/patrons",
    icon: Users,
  },
  {
    title: "Circulation",
    href: "/circulation",
    icon: Repeat,
  },
];

const resourceNavItems = [
  {
    title: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group flex py-2 transition-colors",
                      pathname === item.href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Link to={item.href} className="flex items-center gap-3 px-3 py-1">
                      <item.icon className={cn(
                        "h-5 w-5 shrink-0",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      )} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group flex py-2 transition-colors",
                      pathname === item.href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Link to={item.href} className="flex items-center gap-3 px-3 py-1">
                      <item.icon className={cn(
                        "h-5 w-5 shrink-0",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      )} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Settings</span>
          </div>
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Help & Support</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
