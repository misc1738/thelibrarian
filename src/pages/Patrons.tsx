
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { patrons } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { User, PlusCircle, Search, Check, Clock, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const statusIcons = {
  "active": <Check className="h-4 w-4 text-emerald-500" />,
  "suspended": <Ban className="h-4 w-4 text-rose-500" />,
  "expired": <Clock className="h-4 w-4 text-amber-500" />,
};

const statusClasses = {
  "active": "text-emerald-700 bg-emerald-50",
  "suspended": "text-rose-700 bg-rose-50",
  "expired": "text-amber-700 bg-amber-50",
};

const Patrons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filteredPatrons = patrons.filter((patron) => {
    const matchesSearch = 
      patron.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patron.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === "all" || patron.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
                  <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Patrons</h1>
                  <p className="text-muted-foreground">Manage library members and their accounts.</p>
                </div>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add New Patron
                </Button>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search patrons..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <Button
                    variant={view === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setView("grid")}
                    className="h-9 w-9"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 13V8H2V12.5C2 12.7761 2.22386 13 2.5 13H7ZM2 7H7V2H2.5C2.22386 2 2 2.22386 2 2.5V7ZM2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                  <Button
                    variant={view === "table" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setView("table")}
                    className="h-9 w-9"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 3.5H13.5V11.5H1.5V3.5ZM1 3C1 2.72386 1.22386 2.5 1.5 2.5H13.5C13.7761 2.5 14 2.72386 14 3V12C14 12.2761 13.7761 12.5 13.5 12.5H1.5C1.22386 12.5 1 12.2761 1 12V3ZM2 4.5H13V5.5H2V4.5ZM2 6.5H13V7.5H2V6.5ZM2 8.5H13V9.5H2V8.5ZM2 10.5H13V11.5H2V10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </div>
              </div>
              
              {filteredPatrons.length > 0 ? (
                view === "grid" ? (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPatrons.map((patron) => (
                      <Card key={patron.id} className="overflow-hidden animate-fade-in hover-scale">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className={cn(
                              "rounded-sm font-normal",
                              statusClasses[patron.status as keyof typeof statusClasses]
                            )}>
                              <span className="flex items-center gap-1">
                                {statusIcons[patron.status as keyof typeof statusIcons]}
                                {patron.status.charAt(0).toUpperCase() + patron.status.slice(1)}
                              </span>
                            </Badge>
                            {patron.fines !== undefined && (
                              <Badge variant="destructive" className="rounded-sm font-normal">
                                ${patron.fines.toFixed(2)} due
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-7 w-7 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{patron.name}</CardTitle>
                              <CardDescription className="text-sm">{patron.email}</CardDescription>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-muted-foreground">Member since</div>
                            <div className="text-right font-medium">{new Date(patron.memberSince).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">Books checked out</div>
                            <div className="text-right font-medium">{patron.booksCheckedOut}</div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 px-6 py-3">
                          <Button variant="ghost" size="sm" className="h-8 w-full gap-1">
                            View profile
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patron</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Member Since</TableHead>
                          <TableHead>Books Checked Out</TableHead>
                          <TableHead>Fines</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPatrons.map((patron) => (
                          <TableRow key={patron.id} className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                  <User className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">{patron.name}</div>
                                  <div className="text-xs text-muted-foreground">{patron.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={cn(
                                "rounded-sm font-normal",
                                statusClasses[patron.status as keyof typeof statusClasses]
                              )}>
                                <span className="flex items-center gap-1">
                                  {statusIcons[patron.status as keyof typeof statusIcons]}
                                  {patron.status.charAt(0).toUpperCase() + patron.status.slice(1)}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(patron.memberSince).toLocaleDateString()}</TableCell>
                            <TableCell>{patron.booksCheckedOut}</TableCell>
                            <TableCell>{patron.fines ? `$${patron.fines.toFixed(2)}` : "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                )
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-fade-in">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No patrons found</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    We couldn't find any patrons matching your search criteria. Try adjusting your filters or add new patrons to your library.
                  </p>
                  <Button className="mt-6 gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add New Patron
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Patrons;
