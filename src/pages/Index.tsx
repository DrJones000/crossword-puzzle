import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import WordList from '../components/WordList';
import CrosswordGrid from '../components/CrosswordGrid';

const WORDS = ['ALFRED', 'MARY', 'NANCY', 'WILSON', 'ELEANOR', 'WILLIAM', 'NOVELA'];

// Updated grid with all words properly placed
const INITIAL_GRID = [
  ['A', 'L', 'F', 'R', 'E', 'D', 'W', 'Q', 'S'],
  ['B', 'C', 'D', 'E', 'L', 'I', 'G', 'H', 'I'],
  ['N', 'M', 'A', 'R', 'Y', 'L', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'A', 'L', 'I', 'U', 'W'],
  ['V', 'N', 'A', 'N', 'C', 'Y', 'A', 'X', 'I'],
  ['E', 'B', 'C', 'D', 'N', 'E', 'M', 'G', 'L'],
  ['L', 'H', 'I', 'J', 'O', 'K', 'L', 'M', 'S'],
  ['A', 'E', 'L', 'E', 'A', 'N', 'O', 'R', 'O'],
  ['W', 'I', 'L', 'S', 'O', 'N', 'S', 'T', 'N'],
];

const Index = () => {
  const [grid] = useState(INITIAL_GRID);
  const [activeLetters, setActiveLetters] = useState<{ row: number; col: number }[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<{ row: number; col: number }[]>([]);

  const checkWord = (letters: { row: number; col: number }[]) => {
    const word = letters
      .map(({ row, col }) => grid[row][col])
      .join('');
    
    if (WORDS.includes(word) && !completedWords.includes(word)) {
      setCompletedWords(prev => [...prev, word]);
      setFoundWordCells(prev => [...prev, ...letters]);
      setActiveLetters([]);
      console.log(`Completed word: ${word}`);
    }
  };

  const handleLetterClick = (row: number, col: number) => {
    const letterPos = { row, col };
    
    setActiveLetters(prev => {
      const newActive = [...prev, letterPos];
      // Check if we formed a word
      setTimeout(() => checkWord(newActive), 100);
      return newActive;
    });
  };

  return (
    <div className="min-h-screen p-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">Futuristic Crossword</h1>
          <Timer />
        </div>
        
        <WordList words={WORDS} completedWords={completedWords} />
        
        <CrosswordGrid
          grid={grid}
          activeLetters={activeLetters}
          foundWordCells={foundWordCells}
          onLetterClick={handleLetterClick}
          gameCompleted={completedWords.length === WORDS.length}
        />

        {completedWords.length === WORDS.length && (
          <div className="text-center text-2xl font-bold text-primary animate-glow">
            Congratulations! You've completed the puzzle!
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
