import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import WordList from '../components/WordList';
import CrosswordGrid from '../components/CrosswordGrid';

const WORDS = ['ALFRED', 'MARY', 'NANCY', 'WILSON', 'ELEANOR', 'WILLIAM', 'NOVELA'];
const GRID_SIZE = 9;

const generateEmptyGrid = () => {
  return Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill('')
  );
};

const canPlaceWord = (
  grid: string[][], 
  word: string, 
  row: number, 
  col: number, 
  isVertical: boolean
) => {
  if (isVertical && row + word.length > GRID_SIZE) return false;
  if (!isVertical && col + word.length > GRID_SIZE) return false;

  for (let i = 0; i < word.length; i++) {
    const currentRow = isVertical ? row + i : row;
    const currentCol = isVertical ? col : col + i;
    const existingLetter = grid[currentRow][currentCol];
    
    if (existingLetter && existingLetter !== word[i]) {
      return false;
    }
  }
  return true;
};

const placeWord = (
  grid: string[][], 
  word: string, 
  row: number, 
  col: number, 
  isVertical: boolean
) => {
  const newGrid = grid.map(row => [...row]);
  for (let i = 0; i < word.length; i++) {
    if (isVertical) {
      newGrid[row + i][col] = word[i];
    } else {
      newGrid[row][col + i] = word[i];
    }
  }
  return newGrid;
};

const generateRandomGrid = () => {
  let grid = generateEmptyGrid();
  const placedWords: string[] = [];

  // Try to place each word
  for (const word of WORDS) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const isVertical = Math.random() > 0.5;
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(grid, word, row, col, isVertical)) {
        grid = placeWord(grid, word, row, col, isVertical);
        placed = true;
        placedWords.push(word);
      }
      attempts++;
    }
  }

  // Fill remaining empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (!grid[i][j]) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
};

const Index = () => {
  const [grid, setGrid] = useState<string[][]>(() => generateRandomGrid());
  const [activeLetters, setActiveLetters] = useState<{ row: number; col: number }[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<{ row: number; col: number }[]>([]);

  useEffect(() => {
    if (completedWords.length === WORDS.length) {
      const timer = setTimeout(() => {
        setGrid(generateRandomGrid());
        setCompletedWords([]);
        setFoundWordCells([]);
        setActiveLetters([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [completedWords]);

  const checkWord = (letters: { row: number; col: number }[]) => {
    const word = letters
      .map(({ row, col }) => grid[row][col])
      .join('');
    
    // Also check the reverse of the word
    const reversedWord = word.split('').reverse().join('');
    
    console.log(`Checking word: ${word} and reversed: ${reversedWord}`);
    
    if (WORDS.includes(word) && !completedWords.includes(word)) {
      setCompletedWords(prev => [...prev, word]);
      setFoundWordCells(prev => [...prev, ...letters]);
      setActiveLetters([]);
      console.log(`Completed word: ${word}`);
    } else if (WORDS.includes(reversedWord) && !completedWords.includes(reversedWord)) {
      setCompletedWords(prev => [...prev, reversedWord]);
      setFoundWordCells(prev => [...prev, ...letters]);
      setActiveLetters([]);
      console.log(`Completed word (reversed): ${reversedWord}`);
    }
  };

  const handleLetterClick = (row: number, col: number) => {
    const letterPos = { row, col };
    
    const letterIndex = activeLetters.findIndex(
      pos => pos.row === row && pos.col === col
    );

    setActiveLetters(prev => {
      if (letterIndex !== -1) {
        if (letterIndex === prev.length - 1) {
          const newActive = prev.slice(0, -1);
          console.log('Letter deselected');
          return newActive;
        }
        return prev;
      }
      
      const newActive = [...prev, letterPos];
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