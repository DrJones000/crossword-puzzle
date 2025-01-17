import React, { useState, useEffect } from 'react';
import PuzzleHeader from '../components/puzzle/PuzzleHeader';
import PuzzleGrid from '../components/puzzle/PuzzleGrid';
import PuzzleWords from '../components/puzzle/PuzzleWords';
import { generateRandomGrid, calculateScore } from '../utils/gridUtils';
import { playClickSound, playCompleteSound, playVictorySound } from '../utils/sounds';

const WORDS = ['ALFRED', 'MARY', 'NANCY', 'WILSON', 'ELEANOR', 'WILLIAM', 'NOVELA'];
const GRID_SIZE = 10; // Changed from previous value to 10

const BumuhPuzzle = () => {
  console.log('Rendering BumuhPuzzle component');
  const [grid, setGrid] = useState<string[][]>(() => generateRandomGrid(WORDS, GRID_SIZE));
  const [activeLetters, setActiveLetters] = useState<{ row: number; col: number }[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<{ row: number; col: number }[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [isGridHidden, setIsGridHidden] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (completedWords.length === WORDS.length) {
      console.log('All words found! Playing victory sound...');
      setIsTimerRunning(false);
      const score = calculateScore(finalTime);
      setFinalScore(score);
      playVictorySound();
    }
  }, [completedWords, finalTime]);

  const handleTimeUpdate = (time: number) => {
    setFinalTime(time);
  };

  const checkWord = (letters: { row: number; col: number }[]) => {
    const word = letters
      .map(({ row, col }) => grid[row][col])
      .join('');
    
    const reversedWord = word.split('').reverse().join('');
    console.log(`Checking word: ${word}, Reversed word: ${reversedWord}`);
    
    const upperWord = word.toUpperCase();
    const upperReversedWord = reversedWord.toUpperCase();
    
    const foundWord = WORDS.find(w => {
      const match = w === upperWord || w === upperReversedWord;
      console.log(`Comparing ${w} with ${upperWord} and ${upperReversedWord}: ${match}`);
      return match;
    });
    
    if (foundWord && !completedWords.includes(foundWord)) {
      console.log(`Found word: ${foundWord}`);
      playCompleteSound();
      setCompletedWords(prev => [...prev, foundWord]);
      setFoundWordCells(prev => [...prev, ...letters]);
      setActiveLetters([]);
    } else {
      console.log('Word not found in list or already completed');
    }
  };

  const handleLetterClick = (row: number, col: number) => {
    playClickSound();
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

  const handleCountdownComplete = () => {
    console.log('Countdown complete, revealing grid');
    setIsGridHidden(false);
  };

  const resetGame = () => {
    console.log('Resetting game...');
    const newGrid = generateRandomGrid(WORDS, GRID_SIZE);
    console.log('New grid generated');
    setGrid(newGrid);
    setActiveLetters([]);
    setCompletedWords([]);
    setFoundWordCells([]);
    setIsTimerRunning(true);
    setFinalTime(0);
    setFinalScore(0);
    setIsGridHidden(true);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen p-2 md:p-4 animate-fadeIn flex flex-col">
      <div className="max-w-7xl w-full mx-auto space-y-6 md:space-y-8 flex-1 flex flex-col">
        <PuzzleHeader
          title="BUMUH CROSSWORD PUZZLE"
          isTimerRunning={isTimerRunning}
          onTimeUpdate={handleTimeUpdate}
          onBackToMenu={resetGame}
          finalScore={finalScore}
          onCountdownComplete={handleCountdownComplete}
          resetKey={resetKey}
        />
        
        <div className="flex-1 flex flex-col justify-between gap-6 md:gap-8">
          <PuzzleWords 
            words={WORDS} 
            completedWords={completedWords} 
          />
          
          <div className="flex-1 flex items-center justify-center">
            <PuzzleGrid
              grid={grid}
              activeLetters={activeLetters}
              foundWordCells={foundWordCells}
              onLetterClick={handleLetterClick}
              gameCompleted={completedWords.length === WORDS.length}
              isHidden={isGridHidden}
            />
          </div>
        </div>

        {completedWords.length === WORDS.length && (
          <div className="text-center text-2xl font-bold text-primary animate-glow">
            Congratulations! You've completed the puzzle!
          </div>
        )}
      </div>
    </div>
  );
};

export default BumuhPuzzle;
