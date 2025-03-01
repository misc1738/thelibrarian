
import { Book, statusIcons } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const StatusIcon = statusIcons[book.status];
  
  return (
    <Card className="overflow-hidden animate-fade-in hover-scale">
      <div className="aspect-[2/3] w-full overflow-hidden bg-muted">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant={book.status === 'available' ? 'success' : 
                   book.status === 'checked-out' ? 'destructive' : 
                   book.status === 'reserved' ? 'warning' : 'default'}
            className="capitalize"
          >
            <StatusIcon className="mr-1 h-3 w-3" />
            {book.status.replace('-', ' ')}
          </Badge>
        </div>
        <h3 className="font-medium line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          by {book.author}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
          <BookOpen className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
          <Link to={`/books/${book.id}`}>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
