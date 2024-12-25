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
    <div className="w-full overflow-x-auto pb-4">
      <div className={`grid gap-0.5 md:gap-1 mx-auto w-fit`}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5 md:gap-1">
            {row.map((letter, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-6 h-6 md:w-12 md:h-12 
                  text-sm md:text-xl
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