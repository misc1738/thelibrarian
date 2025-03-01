
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { books } from "@/lib/data";
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
import { Search, Filter, ChevronRight, BookOpen } from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const AdvancedSearch = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [yearRange, setYearRange] = useState([1950, 2024]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof books>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const categories = [...new Set(books.map((book) => book.category))];
  const statuses = [...new Set(books.map((book) => book.status))];
  
  const handleSearch = () => {
    const filtered = books.filter((book) => {
      const matchesQuery = query.trim() === "" || 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query);
        
      const matchesCategory = !category || book.category === category;
      const matchesStatus = !status || book.status === status;
      const matchesYearRange = book.publishedYear >= yearRange[0] && book.publishedYear <= yearRange[1];
      const matchesAvailability = !showOnlyAvailable || book.status === 'available';
      
      return matchesQuery && matchesCategory && matchesStatus && matchesYearRange && matchesAvailability;
    });
    
    setSearchResults(filtered);
    setHasSearched(true);
  };
  
  const handleReset = () => {
    setQuery("");
    setCategory("");
    setStatus("");
    setYearRange([1950, 2024]);
    setShowOnlyAvailable(false);
    setSearchResults([]);
    setHasSearched(false);
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
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Advanced Search</h1>
                <p className="text-muted-foreground">Find books in the library using multiple search criteria.</p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="text-xl">Search Filters</CardTitle>
                    <CardDescription>Refine your search with multiple criteria</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="query">Search Term</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="query"
                          placeholder="Title, author, or ISBN..."
                          className="pl-10"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Statuses</SelectItem>
                          {statuses.map((stat) => (
                            <SelectItem key={stat} value={stat} className="capitalize">
                              {stat.replace('-', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Label>Publication Year</Label>
                        <span className="text-sm text-muted-foreground">
                          {yearRange[0]} - {yearRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={yearRange}
                        min={1900}
                        max={2024}
                        step={1}
                        value={yearRange}
                        onValueChange={setYearRange}
                        className="pt-2"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="available" 
                        checked={showOnlyAvailable}
                        onCheckedChange={(checked) => setShowOnlyAvailable(checked === true)}
                      />
                      <Label
                        htmlFor="available"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show only available books
                      </Label>
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-4">
                      <Button className="w-full gap-2" onClick={handleSearch}>
                        <Search className="h-4 w-4" />
                        Search
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full" 
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Search Results</CardTitle>
                        <CardDescription>
                          {hasSearched
                            ? `Found ${searchResults.length} ${searchResults.length === 1 ? "book" : "books"}`
                            : "Enter search criteria and click Search"}
                        </CardDescription>
                      </div>
                      <Filter className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      {hasSearched ? (
                        searchResults.length > 0 ? (
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {searchResults.map((book) => (
                              <BookCard key={book.id} book={book} />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12">
                            <BookOpen className="h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No books found</h3>
                            <p className="mt-2 text-center text-sm text-muted-foreground">
                              Try adjusting your search filters or try a different search term.
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Search className="h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">Search for Books</h3>
                          <p className="mt-2 text-center text-sm text-muted-foreground">
                            Use the filters on the left to find books in the library.
                          </p>
                          <Button className="mt-6 gap-2" onClick={handleSearch}>
                            <Search className="h-4 w-4" />
                            Start Searching
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdvancedSearch;
