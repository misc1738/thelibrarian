
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CircleCheck,
  Clock,
  ArrowUpRight,
  MoreVertical,
  FileEdit,
  FileClock,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const statusIcons = {
  "available": <CircleCheck className="h-4 w-4 text-emerald-500" />,
  "checked-out": <ArrowUpRight className="h-4 w-4 text-blue-500" />,
  "reserved": <Clock className="h-4 w-4 text-amber-500" />,
  "processing": <Clock className="h-4 w-4 text-slate-500" />,
  "overdue": <AlertTriangle className="h-4 w-4 text-rose-500" />,
};

const statusLabels = {
  "available": "Available",
  "checked-out": "Checked Out",
  "reserved": "Reserved",
  "processing": "Processing",
};

interface BookCardProps {
  book: Book;
  onClick?: (book: Book) => void;
  className?: string;
}

export function BookCard({ book, onClick, className }: BookCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card 
        className={cn(
          "group overflow-hidden transition-all duration-200 hover:shadow-elegant hover-scale",
          className
        )}
        onClick={() => onClick?.(book)}
      >
        <div className="relative p-4">
          <AspectRatio ratio={2/3} className="mb-4 overflow-hidden rounded-md bg-muted">
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex items-center gap-1 text-white">
                {statusIcons[book.status as keyof typeof statusIcons]}
                <span className="text-xs">{statusLabels[book.status as keyof typeof statusLabels]}</span>
              </div>
            </div>
          </AspectRatio>
          
          <div className="absolute right-6 top-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <FileEdit className="mr-2 h-4 w-4" />
                  <span>Edit Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileClock className="mr-2 h-4 w-4" />
                  <span>View History</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Remove Book</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div>
            <h3 className="line-clamp-1 font-medium leading-tight">{book.title}</h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{book.publishedYear}</span>
              <span className="text-xs text-muted-foreground">{book.category}</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{book.title}</DialogTitle>
            <DialogDescription>{book.author}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <div className="overflow-hidden rounded-md">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {statusIcons[book.status as keyof typeof statusIcons]}
                <span className="text-sm">{statusLabels[book.status as keyof typeof statusLabels]}</span>
              </div>
              <p className="text-sm">
                <span className="font-medium">ISBN:</span> {book.isbn}
              </p>
              <p className="text-sm">
                <span className="font-medium">Publisher:</span> {book.publisher}
              </p>
              <p className="text-sm">
                <span className="font-medium">Year:</span> {book.publishedYear}
              </p>
              <p className="text-sm">
                <span className="font-medium">Category:</span> {book.category}
              </p>
              {book.dueDate && (
                <p className="text-sm text-rose-500">
                  <span className="font-medium">Due Date:</span> {book.dueDate}
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline">View Details</Button>
            {book.status === "available" ? (
              <Button>Check Out</Button>
            ) : book.status === "checked-out" ? (
              <Button>Return Book</Button>
            ) : book.status === "reserved" ? (
              <Button>Cancel Reservation</Button>
            ) : (
              <Button>Process Book</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
