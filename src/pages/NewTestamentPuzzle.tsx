import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WordList from '../components/WordList';
import CrosswordGrid from '../components/CrosswordGrid';
import PuzzleHeader from '../components/puzzle/PuzzleHeader';
import { playSound } from '../utils/sounds';
import { generateRandomGrid, calculateScore } from '../utils/gridUtils';
import { NEW_TESTAMENT_BOOKS, GRID_SIZE } from '../constants/newTestamentBooks';

const NewTestamentPuzzle = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState<string[][]>(() => generateRandomGrid(NEW_TESTAMENT_BOOKS, GRID_SIZE));
  const [activeLetters, setActiveLetters] = useState<{ row: number; col: number }[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<{ row: number; col: number }[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [isGridHidden, setIsGridHidden] = useState(true);

  const handleBackToMenu = () => {
    console.log('Navigating back to puzzle selection');
    navigate('/puzzles');
  };

  useEffect(() => {
    if (completedWords.length === NEW_TESTAMENT_BOOKS.length) {
      console.log('All words found! Playing victory sound...');
      setIsTimerRunning(false);
      const score = calculateScore(finalTime);
      setFinalScore(score);
      playSound('victory');
      
      const timer = setTimeout(() => {
        console.log('Navigating back to puzzle selection');
        navigate('/puzzles');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [completedWords, finalTime, navigate]);

  const handleTimeUpdate = (time: number) => {
    setFinalTime(time);
  };

  const checkWord = (letters: { row: number; col: number }[]) => {
    const word = letters
      .map(({ row, col }) => grid[row][col])
      .join('');
    
    const reversedWord = word.split('').reverse().join('');
    
    console.log(`Checking word: ${word}`);
    
    const upperWord = word.toUpperCase();
    const upperReversedWord = reversedWord.toUpperCase();
    
    const foundWord = NEW_TESTAMENT_BOOKS.find(w => w === upperWord || w === upperReversedWord);
    
    if (foundWord && !completedWords.includes(foundWord)) {
      console.log(`Found word: ${foundWord}`);
      playSound('complete');
      setCompletedWords(prev => [...prev, foundWord]);
      setFoundWordCells(prev => [...prev, ...letters]);
      setActiveLetters([]);
    } else {
      console.log('Word not found in list');
    }
  };

  const handleLetterClick = (row: number, col: number) => {
    playSound('click');
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

  return (
    <div className="min-h-screen p-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-12 flex flex-col items-center">
        <PuzzleHeader
          title="NEW TESTAMENT PUZZLE"
          isTimerRunning={isTimerRunning}
          onTimeUpdate={handleTimeUpdate}
          onBackToMenu={handleBackToMenu}
          finalScore={finalScore}
          onCountdownComplete={handleCountdownComplete}
        />
        
        <div className="w-full px-4">
          <WordList words={NEW_TESTAMENT_BOOKS} completedWords={completedWords} />
        </div>
        
        <div className="w-full flex justify-center px-4 overflow-x-auto">
          <CrosswordGrid
            grid={grid}
            activeLetters={activeLetters}
            foundWordCells={foundWordCells}
            onLetterClick={handleLetterClick}
            gameCompleted={completedWords.length === NEW_TESTAMENT_BOOKS.length}
            isHidden={isGridHidden}
          />
        </div>

        {completedWords.length === NEW_TESTAMENT_BOOKS.length && (
          <div className="text-center text-2xl font-bold text-primary animate-glow">
            Congratulations! You've completed the puzzle!
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTestamentPuzzle;