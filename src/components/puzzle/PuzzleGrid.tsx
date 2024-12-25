import React from 'react';
import CrosswordGrid from '../CrosswordGrid';

interface PuzzleGridProps {
  grid: string[][];
  activeLetters: { row: number; col: number }[];
  foundWordCells: { row: number; col: number }[];
  onLetterClick: (row: number, col: number) => void;
  gameCompleted: boolean;
  isHidden: boolean;
}

const PuzzleGrid = ({
  grid,
  activeLetters,
  foundWordCells,
  onLetterClick,
  gameCompleted,
  isHidden
}: PuzzleGridProps) => {
  return (
    <div className="w-full flex justify-center px-4 overflow-x-auto">
      <CrosswordGrid
        grid={grid}
        activeLetters={activeLetters}
        foundWordCells={foundWordCells}
        onLetterClick={onLetterClick}
        gameCompleted={gameCompleted}
        isHidden={isHidden}
      />
    </div>
  );
};

export default PuzzleGrid;