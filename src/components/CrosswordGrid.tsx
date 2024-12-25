import React from 'react';

interface CrosswordGridProps {
  grid: string[][];
  activeLetters: { row: number; col: number }[];
  foundWordCells: { row: number; col: number }[];
  onLetterClick: (row: number, col: number) => void;
  gameCompleted: boolean;
}

const CrosswordGrid = ({ 
  grid, 
  activeLetters, 
  foundWordCells,
  onLetterClick,
  gameCompleted 
}: CrosswordGridProps) => {
  const isActive = (row: number, col: number) => {
    return activeLetters.some(pos => pos.row === row && pos.col === col);
  };

  const isFoundWord = (row: number, col: number) => {
    return foundWordCells.some(pos => pos.row === row && pos.col === col);
  };

  return (
    <div className="grid gap-1 mx-auto w-fit">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`letter-cell 
                ${isActive(rowIndex, colIndex) ? 'active' : ''} 
                ${isFoundWord(rowIndex, colIndex) ? 'found-word' : ''}
                ${letter ? 'bg-primary/5' : 'bg-transparent'}
                ${gameCompleted ? 'animate-fallOff' : ''}
              `}
              style={{
                animationDelay: gameCompleted ? `${(rowIndex * row.length + colIndex) * 0.05}s` : '0s'
              }}
              onClick={() => letter && onLetterClick(rowIndex, colIndex)}
            >
              {letter || ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;