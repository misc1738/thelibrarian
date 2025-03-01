
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BookTrends } from "@/components/dashboard/BookTrends";
import { BookCard } from "@/components/books/BookCard";
import { books } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const featuredBooks = books.slice(0, 6);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="flex-1 p-6 lg:p-8">
            <div className="space-y-8">
              <div>
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back to your library management system.</p>
              </div>
              
              <DashboardStats />
              
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <BookTrends />
                <RecentActivity />
              </div>
              
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Featured Books</h2>
                  <Button variant="ghost" size="sm" asChild className="gap-1">
                    <Link to="/books">
                      View all books
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  {featuredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
