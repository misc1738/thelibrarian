
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur transition-all ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="md:hidden">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SidebarTrigger>
      </div>
      
      <Link to="/" className="flex items-center gap-2">
        <div className="hidden md:block">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="hsl(var(--primary))" />
            <path d="M21 8H11C9.9 8 9 8.9 9 10V22C9 23.1 9.9 24 11 24H21C22.1 24 23 23.1 23 22V10C23 8.9 22.1 8 21 8ZM11 10H16V16H11V10ZM11 18H16V22H11V18ZM21 22H17V18H21V22ZM21 16H17V10H21V16Z" fill="white" />
          </svg>
        </div>
        <span className="font-display text-xl font-medium">TheLibrarian</span>
      </Link>
      
      <div className="flex-1 md:ml-10">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for books, patrons, or resources..."
            className="w-full max-w-lg bg-background pl-9 focus-visible:ring-primary/20"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 font-medium">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs">
                Mark all as read
              </Button>
            </div>
            <div className="px-2 py-1.5">
              <DropdownMenuItem className="flex flex-col items-start gap-1 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">Book return overdue</p>
                    <p className="text-xs text-muted-foreground">
                      "Thinking, Fast and Slow" is 2 days overdue
                    </p>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  10 minutes ago
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">New member registration</p>
                    <p className="text-xs text-muted-foreground">
                      David Parker has registered as a new member
                    </p>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  2 hours ago
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">New book arrival</p>
                    <p className="text-xs text-muted-foreground">
                      10 new titles have been added to the catalog
                    </p>
                  </div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Yesterday at 3:45 PM
                </div>
              </DropdownMenuItem>
            </div>
            <div className="border-t px-4 py-2">
              <Button variant="ghost" size="sm" className="w-full justify-center text-sm">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
          <span className="text-sm font-medium text-primary-foreground">AD</span>
        </div>
      </div>
    </header>
  );
}
