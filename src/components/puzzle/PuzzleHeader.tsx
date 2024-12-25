import React from 'react';
import { Button } from '../ui/button';
import Timer from '../Timer';

interface PuzzleHeaderProps {
  title: string;
  isTimerRunning: boolean;
  onTimeUpdate: (time: number) => void;
  onBackToMenu: () => void;
  finalScore?: number;
  onCountdownComplete?: () => void;
}

const PuzzleHeader = ({
  title,
  isTimerRunning,
  onTimeUpdate,
  onBackToMenu,
  finalScore,
  onCountdownComplete
}: PuzzleHeaderProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-between w-full">
        <Button 
          variant="ghost" 
          onClick={onBackToMenu}
          className="text-primary hover:text-primary/80"
        >
          ← Back to Menu
        </Button>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
        {title}
      </h1>
      <div className="inline-block">
        <Timer 
          isRunning={isTimerRunning} 
          onTimeUpdate={onTimeUpdate}
          onCountdownComplete={onCountdownComplete}
        />
      </div>
      {!isTimerRunning && finalScore && finalScore > 0 && (
        <div className="text-2xl font-bold text-primary animate-bounce">
          Final Score: {finalScore} points!
        </div>
      )}
    </div>
  );
};

export default PuzzleHeader;