import React, { useState, useEffect } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
}

const Timer = ({ isRunning, onTimeUpdate }: TimerProps) => {
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState<string | null>("3");

  useEffect(() => {
    if (isRunning && countdown !== null) {
      const countdownSequence = ["3", "2", "1", "GO!", null];
      let currentIndex = countdownSequence.indexOf(countdown);
      
      const timer = setTimeout(() => {
        console.log('Countdown:', countdownSequence[currentIndex + 1]);
        setCountdown(countdownSequence[currentIndex + 1]);
      }, 1000);
      
      return () => clearTimeout(timer);
    }

    if (isRunning && countdown === null) {
      console.log('Starting main timer');
      const interval = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, countdown, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      {countdown ? (
        <div className="text-4xl font-bold text-primary animate-bounce">
          {countdown}
        </div>
      ) : (
        formatTime(time)
      )}
    </div>
  );
};

export default Timer;