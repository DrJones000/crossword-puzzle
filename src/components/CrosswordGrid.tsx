import React from 'react';

interface CrosswordGridProps {
  grid: string[][];
  activeLetters: { row: number; col: number }[];
  onLetterClick: (row: number, col: number) => void;
}

const CrosswordGrid = ({ grid, activeLetters, onLetterClick }: CrosswordGridProps) => {
  const isActive = (row: number, col: number) => {
    return activeLetters.some(pos => pos.row === row && pos.col === col);
  };

  return (
    <div className="grid gap-1 mx-auto w-fit">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`letter-cell ${isActive(rowIndex, colIndex) ? 'active' : ''} 
                         ${letter ? 'bg-primary/5' : 'bg-transparent'}`}
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