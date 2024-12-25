import React, { useState, useEffect, useCallback } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate: (time: number) => void;
  onCountdownComplete?: () => void;
}

const Timer = ({ isRunning, onTimeUpdate, onCountdownComplete }: TimerProps) => {
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(true);

  const handleCountdownComplete = useCallback(() => {
    setIsCountingDown(false);
    onCountdownComplete?.();
  }, [onCountdownComplete]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isCountingDown) {
      intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            handleCountdownComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1500);
    } else if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isCountingDown, onTimeUpdate, handleCountdownComplete]);

  if (isCountingDown) {
    return (
      <div className="text-4xl font-bold text-primary animate-bounce">
        {countdown === 0 ? 'GO!' : countdown}
      </div>
    );
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-2xl font-bold">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default Timer;