
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Timer, PauseCircle, PlayCircle, RotateCw, BookOpen, Trophy, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ReadingTimer() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [goalTime, setGoalTime] = useState(30 * 60); // 30 minutes in seconds
  const [dailyStreak, setDailyStreak] = useState(3);
  const [bookTitle, setBookTitle] = useState("Current book");

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime + 1 >= goalTime) {
            handleGoalReached();
            return prevTime + 1;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else if (interval) {
      window.clearInterval(interval);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, goalTime]);

  const handleGoalReached = () => {
    setIsActive(false);
    setDailyStreak(dailyStreak + 1);
    toast({
      title: "Reading Goal Reached! 🎉",
      description: `Congratulations! You've reached your reading goal of ${formatTime(goalTime)}`,
    });
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    toast({
      title: "Timer Reset",
      description: "The reading timer has been reset.",
    });
  };

  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive && time === 0) {
      toast({
        title: "Timer Started",
        description: `Reading ${bookTitle}. Keep going!`,
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Achievement Shared",
      description: "Your reading streak has been shared with your friends!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <span>Reading Timer</span>
          </div>
          <Badge variant="outline" className="gap-1">
            <Trophy className="h-3 w-3 text-amber-500" />
            {dailyStreak} day streak
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2 font-mono">{formatTime(time)}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <BookOpen className="h-3 w-3" />
            Currently reading: {bookTitle}
          </div>
        </div>
        
        <Progress 
          value={(time / goalTime) * 100} 
          className="h-2"
          aria-label="Reading progress"
        />
        
        <div className="text-xs text-muted-foreground text-center">
          {formatTime(time)} of {formatTime(goalTime)} goal time
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        
        <div className="space-x-2">
          <Button 
            variant={isActive ? "outline" : "default"}
            size="sm" 
            onClick={handleToggle}
          >
            {isActive ? (
              <>
                <PauseCircle className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
