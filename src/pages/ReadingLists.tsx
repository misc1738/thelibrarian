
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookmarkPlus,
  BookOpen,
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  BookCheck,
  X,
  Eye,
} from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ReadingList {
  id: string;
  name: string;
  description: string;
  books: string[]; // book ids
  isPublic: boolean;
  createdAt: string;
}

const ReadingLists = () => {
  const { toast } = useToast();
  const [lists, setLists] = useState<ReadingList[]>([
    {
      id: "list1",
      name: "Summer Reading",
      description: "Books I plan to read this summer",
      books: ["b1", "b3", "b6"],
      isPublic: true,
      createdAt: "2024-05-10T14:32:00Z",
    },
    {
      id: "list2",
      name: "Academic Research",
      description: "Materials for my psychology research",
      books: ["b2", "b4"],
      isPublic: false,
      createdAt: "2024-04-22T09:17:00Z",
    }
  ]);
  
  const [selectedList, setSelectedList] = useState<ReadingList | null>(lists[0]);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [newListIsPublic, setNewListIsPublic] = useState(true);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [isEditingList, setIsEditingList] = useState(false);
  const [bookToAdd, setBookToAdd] = useState("");
  
  const handleCreateList = () => {
    if (!newListName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your reading list",
        variant: "destructive",
      });
      return;
    }
    
    const newList: ReadingList = {
      id: `list${Date.now()}`,
      name: newListName,
      description: newListDescription,
      books: [],
      isPublic: newListIsPublic,
      createdAt: new Date().toISOString(),
    };
    
    setLists([...lists, newList]);
    setSelectedList(newList);
    setNewListName("");
    setNewListDescription("");
    setNewListIsPublic(true);
    setIsCreatingList(false);
    
    toast({
      title: "Success",
      description: `"${newListName}" reading list has been created`,
    });
  };
  
  const handleEditList = () => {
    if (!selectedList) return;
    if (!newListName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your reading list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedLists = lists.map((list) => {
      if (list.id === selectedList.id) {
        return {
          ...list,
          name: newListName,
          description: newListDescription,
          isPublic: newListIsPublic,
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    setSelectedList({
      ...selectedList,
      name: newListName,
      description: newListDescription,
      isPublic: newListIsPublic,
    });
    setIsEditingList(false);
    
    toast({
      title: "Success",
      description: `Reading list has been updated`,
    });
  };
  
  const handleDeleteList = (listId: string) => {
    const listToDelete = lists.find((list) => list.id === listId);
    if (!listToDelete) return;
    
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setSelectedList(updatedLists.length > 0 ? updatedLists[0] : null);
    
    toast({
      title: "List Deleted",
      description: `"${listToDelete.name}" has been deleted`,
    });
  };
  
  const handleAddBookToList = () => {
    if (!selectedList || !bookToAdd) return;
    
    if (selectedList.books.includes(bookToAdd)) {
      toast({
        title: "Book already in list",
        description: "This book is already in your selected reading list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedLists = lists.map((list) => {
      if (list.id === selectedList.id) {
        return {
          ...list,
          books: [...list.books, bookToAdd],
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    setSelectedList({
      ...selectedList,
      books: [...selectedList.books, bookToAdd],
    });
    
    setBookToAdd("");
    
    const bookAdded = books.find((book) => book.id === bookToAdd);
    
    toast({
      title: "Book Added",
      description: `"${bookAdded?.title}" has been added to "${selectedList.name}"`,
    });
  };
  
  const handleRemoveBookFromList = (bookId: string) => {
    if (!selectedList) return;
    
    const updatedLists = lists.map((list) => {
      if (list.id === selectedList.id) {
        return {
          ...list,
          books: list.books.filter((id) => id !== bookId),
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    setSelectedList({
      ...selectedList,
      books: selectedList.books.filter((id) => id !== bookId),
    });
    
    const bookRemoved = books.find((book) => book.id === bookId);
    
    toast({
      title: "Book Removed",
      description: `"${bookRemoved?.title}" has been removed from the list`,
    });
  };
  
  const startEditingList = () => {
    if (!selectedList) return;
    setNewListName(selectedList.name);
    setNewListDescription(selectedList.description);
    setNewListIsPublic(selectedList.isPublic);
    setIsEditingList(true);
  };
  
  // Get books in selected list
  const booksInSelectedList = selectedList
    ? books.filter((book) => selectedList.books.includes(book.id))
    : [];

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
                  <p className="text-muted-foreground">Organize your books into custom reading lists.</p>
                </div>
                <Button 
                  className="gap-2"
                  onClick={() => {
                    setNewListName("");
                    setNewListDescription("");
                    setNewListIsPublic(true);
                    setIsCreatingList(true);
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                  Create New List
                </Button>
              </div>
              
              <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Lists</CardTitle>
                      <CardDescription>Select a list to view or edit it</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {lists.map((list) => (
                          <Button
                            key={list.id}
                            variant={selectedList?.id === list.id ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedList(list)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <BookmarkPlus className="h-4 w-4" />
                                <span>{list.name}</span>
                              </div>
                              <Badge variant="outline" className="ml-auto">
                                {list.books.length}
                              </Badge>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        className="w-full gap-2"
                        onClick={() => {
                          setNewListName("");
                          setNewListDescription("");
                          setNewListIsPublic(true);
                          setIsCreatingList(true);
                        }}
                      >
                        <PlusCircle className="h-4 w-4" />
                        New List
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Book to List</CardTitle>
                      <CardDescription>Add a book to "{selectedList?.name || 'selected list'}"</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select value={bookToAdd} onValueChange={setBookToAdd}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a book" />
                        </SelectTrigger>
                        <SelectContent>
                          {books
                            .filter((book) => !selectedList?.books.includes(book.id))
                            .map((book) => (
                              <SelectItem key={book.id} value={book.id}>
                                {book.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        className="w-full gap-2" 
                        disabled={!selectedList || !bookToAdd}
                        onClick={handleAddBookToList}
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add to List
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {selectedList ? (
                    <>
                      <Card>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {selectedList.name}
                              {selectedList.isPublic ? (
                                <Badge variant="outline" className="ml-2">Public</Badge>
                              ) : (
                                <Badge variant="outline" className="ml-2 bg-muted">Private</Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="mt-1">{selectedList.description}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={startEditingList}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit List
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View as Public
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteList(selectedList.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete List
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            Created on {new Date(selectedList.createdAt).toLocaleDateString()} • {selectedList.books.length} books
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold">Books in this List</h2>
                        </div>
                        
                        {booksInSelectedList.length > 0 ? (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {booksInSelectedList.map((book) => (
                              <Card key={book.id} className="overflow-hidden animate-fade-in hover-scale">
                                <div className="aspect-[2/3] w-full overflow-hidden bg-muted">
                                  <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <CardContent className="p-4">
                                  <h3 className="font-medium line-clamp-1">{book.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-1">
                                    by {book.author}
                                  </p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex justify-between">
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <BookOpen className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 px-2 text-destructive hover:text-destructive"
                                    onClick={() => handleRemoveBookFromList(book.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <Card className="p-12">
                            <div className="flex flex-col items-center justify-center">
                              <BookOpen className="h-12 w-12 text-muted-foreground" />
                              <h3 className="mt-4 text-lg font-medium">No books in this list yet</h3>
                              <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
                                Use the "Add Book to List" panel on the left to start adding books to your reading list.
                              </p>
                            </div>
                          </Card>
                        )}
                      </div>
                    </>
                  ) : (
                    <Card className="p-12">
                      <div className="flex flex-col items-center justify-center">
                        <BookmarkPlus className="h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No reading list selected</h3>
                        <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm">
                          Select a reading list from the left panel or create a new one to get started.
                        </p>
                        <Button 
                          className="mt-6 gap-2"
                          onClick={() => {
                            setNewListName("");
                            setNewListDescription("");
                            setNewListIsPublic(true);
                            setIsCreatingList(true);
                          }}
                        >
                          <PlusCircle className="h-4 w-4" />
                          Create New List
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Create New List Dialog */}
      <Dialog open={isCreatingList} onOpenChange={setIsCreatingList}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Reading List</DialogTitle>
            <DialogDescription>
              Create a new list to organize your books and reading goals.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                List Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Summer Reading"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                placeholder="Optional description"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="visibility" className="text-sm font-medium">
                Visibility
              </label>
              <Select
                value={newListIsPublic ? "public" : "private"}
                onValueChange={(value) => setNewListIsPublic(value === "public")}
              >
                <SelectTrigger id="visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingList(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateList}>Create List</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit List Dialog */}
      <Dialog open={isEditingList} onOpenChange={setIsEditingList}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reading List</DialogTitle>
            <DialogDescription>
              Update the details of your reading list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                List Name
              </label>
              <Input
                id="edit-name"
                placeholder="e.g., Summer Reading"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="edit-description"
                placeholder="Optional description"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-visibility" className="text-sm font-medium">
                Visibility
              </label>
              <Select
                value={newListIsPublic ? "public" : "private"}
                onValueChange={(value) => setNewListIsPublic(value === "public")}
              >
                <SelectTrigger id="edit-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingList(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditList}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default ReadingLists;
