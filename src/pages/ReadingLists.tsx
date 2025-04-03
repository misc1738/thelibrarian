
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, List, Grid3X3, BookMarked, Bookmark, Share2 } from "lucide-react";
import { books } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { VirtualBookshelf } from "@/components/reading-lists/VirtualBookshelf";
import { ReadingTimer } from "@/components/reading-tools/ReadingTimer";
import { BookRecommendations } from "@/components/books/BookRecommendations";

// Mock reading lists data
const readingLists = [
  {
    id: "1",
    name: "Summer Reading",
    description: "Books to read during summer vacation",
    books: books.slice(0, 3),
    isPublic: true,
  },
  {
    id: "2",
    name: "Sci-Fi Classics",
    description: "Must-read science fiction classics",
    books: books.slice(2, 5),
    isPublic: false,
  },
  {
    id: "3",
    name: "Personal Development",
    description: "Books for personal growth and skill improvement",
    books: books.slice(3, 6),
    isPublic: true,
  },
];

const ReadingLists = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [selectedList, setSelectedList] = useState(readingLists[0]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="flex-1 p-6 lg:p-8">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Reading Lists</h1>
                  <p className="text-muted-foreground">Create and manage curated book collections</p>
                </div>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create New List
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  {/* Virtual Bookshelf */}
                  <VirtualBookshelf readingList={selectedList} />
                  
                  {/* List management */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>Your Reading Lists</CardTitle>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => setViewMode("list")}
                          >
                            <List className={viewMode === "list" ? "text-primary" : "text-muted-foreground"} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => setViewMode("grid")}
                          >
                            <Grid3X3 className={viewMode === "grid" ? "text-primary" : "text-muted-foreground"} />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        Manage your curated book collections
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                        {readingLists.map((list) => (
                          <Card 
                            key={list.id} 
                            className={`cursor-pointer hover:border-primary transition-colors ${
                              selectedList.id === list.id ? "border-primary" : ""
                            }`}
                            onClick={() => setSelectedList(list)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <BookMarked className="h-4 w-4 text-primary" />
                                  {list.name}
                                </CardTitle>
                                <Badge variant={list.isPublic ? "outline" : "secondary"}>
                                  {list.isPublic ? "Public" : "Private"}
                                </Badge>
                              </div>
                              <CardDescription>{list.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm">
                                {list.books.length} books
                              </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button variant="ghost" size="sm">
                                <Bookmark className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {/* Reading Timer */}
                  <ReadingTimer />
                  
                  {/* Book Recommendations */}
                  <div className="hidden md:block">
                    <BookRecommendations />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ReadingLists;
