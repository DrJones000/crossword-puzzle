import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CrosswordGridProps {
  grid: string[][];
  activeLetters: { row: number; col: number }[];
  foundWordCells: { row: number; col: number }[];
  onLetterClick: (row: number, col: number) => void;
  gameCompleted: boolean;
  isHidden: boolean;
}

const CrosswordGrid = ({ 
  grid, 
  activeLetters, 
  foundWordCells,
  onLetterClick,
  gameCompleted,
  isHidden
}: CrosswordGridProps) => {
  const isMobile = useIsMobile();
  
  const isActive = (row: number, col: number) => {
    return activeLetters.some(pos => pos.row === row && pos.col === col);
  };

  const isFoundWord = (row: number, col: number) => {
    return foundWordCells.some(pos => pos.row === row && pos.col === col);
  };

  return (
    <div className="w-full max-w-full overflow-x-auto pb-4">
      <div className={`grid gap-1 md:gap-1.5 mx-auto w-fit`}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 md:gap-1.5">
            {row.map((letter, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-[min(9vw,4.5rem)] h-[min(9vw,4.5rem)] md:w-[min(7vw,5rem)] md:h-[min(7vw,5rem)]
                  text-lg md:text-2xl lg:text-3xl
                  letter-cell 
                  ${isActive(rowIndex, colIndex) ? 'active' : ''} 
                  ${isFoundWord(rowIndex, colIndex) ? 'found-word' : ''}
                  ${letter ? 'bg-primary/5' : 'bg-transparent'}
                  ${gameCompleted ? 'animate-fallOff' : ''}
                  ${isHidden ? 'bg-secondary text-transparent' : ''}
                  ${isHidden ? 'animate-pulse' : 'animate-fadeIn'}
                `}
                style={{
                  animationDelay: gameCompleted 
                    ? `${(rowIndex * row.length + colIndex) * 0.05}s` 
                    : isHidden 
                      ? '0s'
                      : `${(rowIndex * row.length + colIndex) * 0.02}s`
                }}
                onClick={() => !isHidden && letter && onLetterClick(rowIndex, colIndex)}
              >
                {letter || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrosswordGrid;