import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { recentActivities, books, patrons } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  RotateCw,
  Calendar,
  XCircle,
  Clock,
  ArrowRight,
  UserRoundSearch,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

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

const Circulation = () => {
  const [actionType, setActionType] = useState("checkout");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatron, setSelectedPatron] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const { toast } = useToast();
  
  const filteredActivities = recentActivities.filter((activity) => {
    const matchesSearch = 
      activity.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.patronName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleProcessCirculation = () => {
    const actionVerb = 
      actionType === "checkout" ? "checked out" : 
      actionType === "return" ? "returned" : 
      actionType === "reserve" ? "reserved" : "cancelled";
      
    toast({
      title: "Success!",
      description: `Book has been ${actionVerb} successfully.`,
      variant: "default",
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
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Circulation</h1>
                <p className="text-muted-foreground">Manage check-ins, check-outs, and reservations.</p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
                <Card className="overflow-hidden animate-fade-in">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Process check-ins, check-outs, and reservations.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="action-type">
                        Action Type
                      </label>
                      <Select value={actionType} onValueChange={setActionType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checkout">Check Out</SelectItem>
                          <SelectItem value="return">Return</SelectItem>
                          <SelectItem value="reserve">Reserve</SelectItem>
                          <SelectItem value="cancel">Cancel Reservation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="patron-select">
                        Select Patron
                      </label>
                      <div className="relative">
                        <UserRoundSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Select value={selectedPatron} onValueChange={setSelectedPatron}>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select patron" />
                          </SelectTrigger>
                          <SelectContent>
                            {patrons.map((patron) => (
                              <SelectItem key={patron.id} value={patron.id}>
                                {patron.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="book-select">
                        Select Book
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Select value={selectedBook} onValueChange={setSelectedBook}>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select book" />
                          </SelectTrigger>
                          <SelectContent>
                            {books.map((book) => (
                              <SelectItem key={book.id} value={book.id}>
                                {book.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {actionType === "checkout" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="due-date">
                          Due Date
                        </label>
                        <Input type="date" id="due-date" className="w-full" />
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleProcessCirculation}
                      disabled={!selectedPatron || !selectedBook} 
                      className="w-full mt-4">
                      {actionType === "checkout" ? "Check Out Book" : 
                       actionType === "return" ? "Return Book" : 
                       actionType === "reserve" ? "Reserve Book" : "Cancel Reservation"}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest circulation transactions</CardDescription>
                    </div>
                    <div className="relative w-56">
                      <Input
                        placeholder="Search activities..."
                        className="w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Action</TableHead>
                          <TableHead>Book</TableHead>
                          <TableHead>Patron</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredActivities.map((activity) => {
                          const ActionIcon = actionIcons[activity.action];
                          const formattedDate = new Date(activity.timestamp).toLocaleString();
                          
                          return (
                            <TableRow key={activity.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full",
                                    actionColors[activity.action].replace("text-", "bg-").replace("500", "100")
                                  )}>
                                    <ActionIcon className={cn("h-4 w-4", actionColors[activity.action])} />
                                  </div>
                                  <span className="capitalize">{activity.action}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{activity.bookTitle}</TableCell>
                              <TableCell>{activity.patronName}</TableCell>
                              <TableCell className="text-muted-foreground">{formattedDate}</TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Transaction Details</DialogTitle>
                                      <DialogDescription>
                                        Details about this circulation transaction.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <div className={cn(
                                          "flex h-10 w-10 items-center justify-center rounded-full",
                                          actionColors[activity.action].replace("text-", "bg-").replace("500", "100")
                                        )}>
                                          <ActionIcon className={cn("h-5 w-5", actionColors[activity.action])} />
                                        </div>
                                        <div>
                                          <h4 className="font-medium capitalize">{activity.action}</h4>
                                          <p className="text-sm text-muted-foreground">{formattedDate}</p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-[100px_1fr] gap-2">
                                        <div className="text-sm font-medium">Book:</div>
                                        <div>{activity.bookTitle}</div>
                                        <div className="text-sm font-medium">Patron:</div>
                                        <div>{activity.patronName}</div>
                                        <div className="text-sm font-medium">ID:</div>
                                        <div className="font-mono text-xs">{activity.id}</div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline">Print Receipt</Button>
                                      <Button>Close</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle>Overdue Books</CardTitle>
                  <CardDescription>Books that need attention or collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Patron</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Fine</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Thinking, Fast and Slow</TableCell>
                        <TableCell>James Wilson</TableCell>
                        <TableCell>June 1, 2024</TableCell>
                        <TableCell className="text-rose-500">5 days</TableCell>
                        <TableCell>$2.50</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Send Reminder</Button>
                            <Button size="sm">Collect</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">The Midnight Library</TableCell>
                        <TableCell>Emma Thompson</TableCell>
                        <TableCell>June 3, 2024</TableCell>
                        <TableCell className="text-rose-500">3 days</TableCell>
                        <TableCell>$1.50</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Send Reminder</Button>
                            <Button size="sm">Collect</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Circulation;
