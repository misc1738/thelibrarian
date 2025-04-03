
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { books, statusIcons } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ChevronLeft, Download, Clock, User, BookOpen, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  
  // Find the book with the matching ID
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex w-full flex-col">
            <Header />
            <main className="flex-1 p-6 lg:p-8">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/books">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Books
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
                  <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
                  <Button asChild>
                    <Link to="/books">Browse Books</Link>
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const StatusIcon = statusIcons[book.status];

  const handleCheckout = () => {
    toast({
      title: "Book Checked Out",
      description: `You have successfully checked out "${book.title}"`,
    });
  };

  const handleReserve = () => {
    toast({
      title: "Book Reserved",
      description: `You have successfully reserved "${book.title}"`,
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
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/books">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Books
                  </Link>
                </Button>
                <Badge 
                  variant={book.status === 'available' ? 'default' : 
                         book.status === 'checked-out' ? 'destructive' : 
                         book.status === 'reserved' ? 'secondary' : 'outline'}
                  className="capitalize"
                >
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {book.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted md:col-span-1">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="space-y-6 md:col-span-2">
                  <div>
                    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{book.title}</h1>
                    <p className="text-lg text-muted-foreground">by {book.author}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={book.status === 'available' ? handleCheckout : handleReserve}>
                      {book.status === 'available' ? (
                        <>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Check Out
                        </>
                      ) : (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          {book.status === 'reserved' ? 'Cancel Reservation' : 'Reserve'}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleAddToList}>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Add to List
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Preview
                    </Button>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Publication Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">Publisher:</dt>
                                <dd>{book.publisher}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">Published Year:</dt>
                                <dd>{book.publishedYear}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">ISBN:</dt>
                                <dd>{book.isbn}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">Category:</dt>
                                <dd>{book.category}</dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Availability</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">Status:</dt>
                                <dd className="capitalize">{book.status.replace('-', ' ')}</dd>
                              </div>
                              {book.dueDate && (
                                <div className="flex justify-between">
                                  <dt className="text-muted-foreground">Due Date:</dt>
                                  <dd>{book.dueDate}</dd>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">Location:</dt>
                                <dd>Section B, Shelf 12</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="text-muted-foreground">Copies Available:</dt>
                                <dd>{book.status === 'available' ? '1' : '0'} of 1</dd>
                              </div>
                            </dl>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam
                            tincidunt, nisl nunc tincidunt nisl, eget aliquam nisl nunc sit amet nisl. Sed euismod, nunc sit
                            amet aliquam tincidunt, nisl nunc tincidunt nisl, eget aliquam nisl nunc sit amet nisl.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="reviews">
                      <Card>
                        <CardHeader>
                          <CardTitle>Reader Reviews</CardTitle>
                          <CardDescription>See what other readers think about this book</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <div className="flex items-start gap-4 pb-4 border-b">
                              <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                                <User className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">Alex Johnson</h4>
                                  <div className="flex items-center">
                                    {[1, 2, 3, 4].map((star) => (
                                      <ThumbsUp key={star} className="h-3 w-3 fill-primary text-primary" />
                                    ))}
                                    <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  <CalendarDays className="inline h-3 w-3 mr-1" />
                                  June 2, 2024
                                </p>
                                <p className="text-sm">
                                  Great book! I couldn't put it down once I started reading.
                                  The characters are well-developed and the plot keeps you engaged.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                              <div className="rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                                <User className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">Maria Garcia</h4>
                                  <div className="flex items-center">
                                    {[1, 2, 3].map((star) => (
                                      <ThumbsUp key={star} className="h-3 w-3 fill-primary text-primary" />
                                    ))}
                                    {[1, 2].map((star) => (
                                      <ThumbsUp key={star} className="h-3 w-3 text-muted-foreground" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  <CalendarDays className="inline h-3 w-3 mr-1" />
                                  May 28, 2024
                                </p>
                                <p className="text-sm">
                                  It was a decent read but I expected more from the ending.
                                  The first half of the book was much stronger than the second half.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            Read All Reviews
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="history">
                      <Card>
                        <CardHeader>
                          <CardTitle>Circulation History</CardTitle>
                          <CardDescription>Past checkouts and reservations</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border-l-2 border-muted pl-4 space-y-1">
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                May 15, 2024
                              </div>
                              <p className="text-sm">Checked out by patron #3642</p>
                              <p className="text-xs text-muted-foreground">Returned on May 29, 2024</p>
                            </div>
                            
                            <div className="border-l-2 border-muted pl-4 space-y-1">
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                April 3, 2024
                              </div>
                              <p className="text-sm">Checked out by patron #2195</p>
                              <p className="text-xs text-muted-foreground">Returned on April 17, 2024</p>
                            </div>
                            
                            <div className="border-l-2 border-muted pl-4 space-y-1">
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                March 10, 2024
                              </div>
                              <p className="text-sm">Checked out by patron #4018</p>
                              <p className="text-xs text-muted-foreground">Returned on March 24, 2024</p>
                            </div>
                          </div>
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
