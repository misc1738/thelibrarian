
import { useState, useRef } from "react";
import { Book } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookMarked, PlusCircle, SaveIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface VirtualBookshelfProps {
  readingList?: {
    id: string;
    name: string;
    books: Book[];
  };
}

export function VirtualBookshelf({ readingList }: VirtualBookshelfProps) {
  const [currentView, setCurrentView] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBook, setDraggedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>(readingList?.books || []);
  const shelfRef = useRef<HTMLDivElement>(null);

  const booksPerView = 5;
  const totalViews = Math.ceil((books.length || 1) / booksPerView);

  const handlePrevView = () => {
    setCurrentView((prev) => Math.max(0, prev - 1));
  };

  const handleNextView = () => {
    setCurrentView((prev) => Math.min(totalViews - 1, prev + 1));
  };

  const handleDragStart = (book: Book) => {
    setIsDragging(true);
    setDraggedBook(book);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedBook(null);
  };

  const handleDrop = (index: number) => {
    if (draggedBook) {
      const newBooks = [...books];
      const draggedIndex = books.findIndex((b) => b.id === draggedBook.id);
      
      if (draggedIndex !== -1) {
        newBooks.splice(draggedIndex, 1);
        newBooks.splice(index, 0, draggedBook);
        setBooks(newBooks);
        
        toast({
          title: "Bookshelf Updated",
          description: "Your virtual bookshelf has been rearranged!",
        });
      }
    }
  };

  const currentBooks = books.slice(currentView * booksPerView, (currentView + 1) * booksPerView);

  const handleSaveArrangement = () => {
    // Would connect to backend in a real app
    toast({
      title: "Arrangement Saved",
      description: "Your bookshelf arrangement has been saved!",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-primary" />
          Virtual Bookshelf
        </CardTitle>
        <CardDescription>
          Arrange your books in a customizable 3D bookshelf
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 relative perspective h-52">
          <div 
            ref={shelfRef}
            className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted rounded-lg transform rotate-x-5 shadow-xl"
          >
            <div className="flex justify-between items-end h-full p-4 pb-8">
              {currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <div 
                    key={book.id}
                    className={cn(
                      "h-36 w-16 rounded cursor-move transform transition-all duration-200",
                      isDragging && draggedBook?.id === book.id ? "opacity-50 scale-110" : ""
                    )}
                    draggable
                    onDragStart={() => handleDragStart(book)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    style={{
                      backgroundImage: `url(${book.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="h-full w-full flex items-end justify-center pb-1">
                      <Badge variant="outline" className="bg-background/80 text-xs">
                        {book.title.split(' ')[0]}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <p className="text-muted-foreground mb-2">Your bookshelf is empty</p>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add books
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevView}
            disabled={currentView === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Shelf
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Shelf {currentView + 1} of {totalViews}
          </span>
          
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSaveArrangement}
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Arrangement
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextView}
              disabled={currentView === totalViews - 1}
            >
              Next Shelf
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
