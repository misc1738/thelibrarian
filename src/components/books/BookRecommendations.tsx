
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCard } from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, BookOpen, Users } from "lucide-react";
import { books } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

export function BookRecommendations() {
  const [recommendations, setRecommendations] = useState<typeof books>([]);
  const [recommendationType, setRecommendationType] = useState("popular");

  useEffect(() => {
    // Simulate recommendation algorithm
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 3));
  }, [recommendationType]);

  const handleChangeRecommendationType = (type: string) => {
    setRecommendationType(type);
    toast({
      title: "Recommendations updated",
      description: `Showing ${type} book recommendations`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Book Recommendations
        </CardTitle>
        <CardDescription>
          Personalized book suggestions based on reading patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="popular" className="mb-6" onValueChange={handleChangeRecommendationType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="similar">Similar</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendations.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm">
          View More Recommendations
        </Button>
      </CardFooter>
    </Card>
  );
}
