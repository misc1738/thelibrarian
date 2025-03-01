
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { books, recentActivities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  ArrowLeft,
  Star,
  User,
  BookmarkPlus,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BookDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  const book = books.find((b) => b.id === id);
  
  if (!book) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex w-full flex-col">
            <Header />
            <main className="flex-1 p-6 lg:p-8">
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-xl font-semibold">Book not found</h2>
                <p className="text-muted-foreground mt-2">
                  We couldn't find the book you're looking for.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/books">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Books
                  </Link>
                </Button>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }
  
  // Get book activities from recent activities
  const bookActivities = recentActivities.filter(
    (activity) => activity.bookTitle === book.title
  );
  
  const handleReserve = () => {
    toast({
      title: "Book Reserved",
      description: `You've successfully reserved "${book.title}"`,
    });
  };
  
  const handleAddToList = () => {
    toast({
      title: "Added to Reading List",
      description: `"${book.title}" has been added to your reading list`,
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="flex-1 p-6 lg:p-8">
            <div className="space-y-8">
              <div>
                <Link 
                  to="/books" 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Books
                </Link>
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {book.title}
                </h1>
                <p className="text-muted-foreground">by {book.author}</p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <Card className="overflow-hidden animate-fade-in">
                  <div className="aspect-[2/3] w-full overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant={book.status === 'available' ? 'success' : 
                                book.status === 'checked-out' ? 'destructive' : 
                                book.status === 'reserved' ? 'warning' : 'default'}
                        className="capitalize"
                      >
                        {book.status.replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 text-sm">
                        <span className="text-muted-foreground">ISBN:</span>
                        <span className="font-mono">{book.isbn}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <span className="text-muted-foreground">Publisher:</span>
                        <span>{book.publisher}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <span className="text-muted-foreground">Published:</span>
                        <span>{book.publishedYear}</span>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{book.category}</span>
                      </div>
                      {book.dueDate && (
                        <div className="grid grid-cols-2 text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span className="text-rose-500">{new Date(book.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 border-t p-6">
                    <Button 
                      className="w-full gap-2"
                      disabled={book.status !== 'available'}
                      onClick={handleReserve}
                    >
                      <Calendar className="h-4 w-4" />
                      {book.status === 'available' ? 'Reserve This Book' : 'Not Available'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      onClick={handleAddToList}
                    >
                      <BookmarkPlus className="h-4 w-4" />
                      Add to Reading List
                    </Button>
                    <Button variant="ghost" className="w-full gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="space-y-6">
                  <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-6 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>About this Book</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p>
                            {book.title} is a {book.category.toLowerCase()} book written by {book.author} and published by {book.publisher} in {book.publishedYear}.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc,
                            eget aliquam nisl nunc eget nisl. Nullam auctor, nisl eget
                            ultricies aliquam, nunc nisl aliquet nunc, eget aliquam nisl
                            nunc eget nisl.
                          </p>
                          <p>
                            Sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Subject Classification</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">
                              {book.category}
                            </Badge>
                            <Badge variant="outline">
                              Literature
                            </Badge>
                            <Badge variant="outline">
                              Non-fiction
                            </Badge>
                            <Badge variant="outline">
                              Educational
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="summary" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Book Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc,
                            eget aliquam nisl nunc eget nisl. Nullam auctor, nisl eget
                            ultricies aliquam, nunc nisl aliquet nunc, eget aliquam nisl
                            nunc eget nisl.
                          </p>
                          <p>
                            Sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                            aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est laborum. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="history" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Circulation History</CardTitle>
                          <CardDescription>Recent activity for this book</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {bookActivities.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Action</TableHead>
                                  <TableHead>Patron</TableHead>
                                  <TableHead>Date & Time</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {bookActivities.map((activity) => (
                                  <TableRow key={activity.id}>
                                    <TableCell className="capitalize">{activity.action}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {activity.patronName}
                                      </div>
                                    </TableCell>
                                    <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="py-8 text-center">
                              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">
                                No recent activity for this book
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BookDetails;
