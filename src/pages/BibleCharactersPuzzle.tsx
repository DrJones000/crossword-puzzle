import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Timer from "@/components/Timer";
import WordList from "@/components/WordList";
import CrosswordGrid from "@/components/CrosswordGrid";
import { playSound } from "@/utils/sounds";

const GRID_SIZE = 15;
const WORDS = [
  "JESUS", "ADAM", "EVE", "NOAH", "ABRAHAM", "SARAH", "MOSES", "AARON",
  "DAVID", "SOLOMON", "ESTHER", "JOB", "ISAIAH", "JEREMIAH", "DANIEL",
  "RUTH", "SAMUEL", "ELIJAH", "ELISHA", "PETER", "PAUL"
];

const generateGrid = () => {
  // Initialize grid with empty spaces
  const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  const usedCells: { [key: string]: boolean } = {};
  const placedWords: { word: string; cells: { row: number; col: number }[] }[] = [];

  // Helper function to check if a word can be placed at a position
  const canPlaceWord = (
    word: string,
    startRow: number,
    startCol: number,
    isVertical: boolean
  ) => {
    if (isVertical && startRow + word.length > GRID_SIZE) return false;
    if (!isVertical && startCol + word.length > GRID_SIZE) return false;

    for (let i = 0; i < word.length; i++) {
      const row = isVertical ? startRow + i : startRow;
      const col = isVertical ? startCol : startCol + i;
      const cell = grid[row][col];
      const cellKey = `${row}-${col}`;

      if (cell && cell !== word[i]) return false;
      if (usedCells[cellKey] && cell !== word[i]) return false;
    }
    return true;
  };

  // Place words on the grid
  for (const word of WORDS) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const isVertical = Math.random() > 0.5;
      const startRow = Math.floor(Math.random() * GRID_SIZE);
      const startCol = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(word, startRow, startCol, isVertical)) {
        const wordCells = [];
        for (let i = 0; i < word.length; i++) {
          const row = isVertical ? startRow + i : startRow;
          const col = isVertical ? startCol : startCol + i;
          grid[row][col] = word[i];
          usedCells[`${row}-${col}`] = true;
          wordCells.push({ row, col });
        }
        placedWords.push({ word, cells: wordCells });
        placed = true;
      }
      attempts++;
    }
  }

  // Fill remaining cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (!grid[i][j]) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placedWords };
};

const BibleCharactersPuzzle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [grid, setGrid] = useState<string[][]>([]);
  const [placedWords, setPlacedWords] = useState<{ word: string; cells: { row: number; col: number }[] }[]>([]);
  const [activeLetters, setActiveLetters] = useState<{ row: number; col: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<{ row: number; col: number }[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const { grid: newGrid, placedWords: newPlacedWords } = generateGrid();
    setGrid(newGrid);
    setPlacedWords(newPlacedWords);
    console.log("Grid generated with placed words:", newPlacedWords);
  }, []);

  const checkForWord = useCallback(() => {
    if (activeLetters.length < 2) return;

    const word = activeLetters
      .map(pos => grid[pos.row][pos.col])
      .join('');

    console.log("Checking word:", word);
    console.log("Active letters:", activeLetters);

    const foundWord = placedWords.find(({ word: placedWord, cells }) => {
      const lettersMatch = word === placedWord;
      const cellsMatch = activeLetters.length === cells.length && 
        activeLetters.every((pos, index) => 
          pos.row === cells[index].row && pos.col === cells[index].col
        );
      return lettersMatch && cellsMatch;
    });

    if (foundWord && !foundWords.includes(foundWord.word)) {
      console.log("Found word:", foundWord.word);
      playSound("correct");
      setFoundWords(prev => [...prev, foundWord.word]);
      setFoundWordCells(prev => [...prev, ...foundWord.cells]);
      
      if (foundWords.length + 1 === WORDS.length) {
        setGameCompleted(true);
        playSound("victory");
        toast({
          title: "Congratulations!",
          description: `You found all ${WORDS.length} Bible characters in ${time} seconds!`,
        });
      } else {
        toast({
          title: "Word Found!",
          description: `You found ${foundWord.word}!`,
        });
      }
    }
    setActiveLetters([]);
  }, [activeLetters, grid, placedWords, foundWords, time, toast]);

  const handleLetterClick = (row: number, col: number) => {
    if (!isGameStarted || gameCompleted) return;

    setActiveLetters(prev => {
      const isAlreadySelected = prev.some(pos => pos.row === row && pos.col === col);
      
      if (isAlreadySelected) {
        return prev.filter(pos => !(pos.row === row && pos.col === col));
      }
      
      const lastLetter = prev[prev.length - 1];
      if (!lastLetter || (
        Math.abs(row - lastLetter.row) <= 1 && 
        Math.abs(col - lastLetter.col) <= 1
      )) {
        return [...prev, { row, col }];
      }
      
      return [{ row, col }];
    });
  };

  useEffect(() => {
    checkForWord();
  }, [activeLetters, checkForWord]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/puzzles")}
            className="mb-4"
          >
            Back to Puzzles
          </Button>
          <Timer 
            isRunning={isGameStarted && !gameCompleted}
            onTimeUpdate={setTime}
            onCountdownComplete={() => setIsGameStarted(true)}
          />
        </div>

        <div className="space-y-8">
          <CrosswordGrid
            grid={grid}
            activeLetters={activeLetters}
            foundWordCells={foundWordCells}
            onLetterClick={handleLetterClick}
            gameCompleted={gameCompleted}
            isHidden={!isGameStarted}
          />

          <WordList 
            words={WORDS} 
            completedWords={foundWords}
          />
        </div>
      </div>
    </div>
  );
};

export default BibleCharactersPuzzle;