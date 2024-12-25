const generateEmptyGrid = (size: number) => {
  return Array(size).fill(null).map(() => 
    Array(size).fill('')
  );
};

const canPlaceWord = (
  grid: string[][], 
  word: string, 
  row: number, 
  col: number, 
  isVertical: boolean
) => {
  if (isVertical && row + word.length > grid.length) return false;
  if (!isVertical && col + word.length > grid[0].length) return false;

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

export const generateRandomGrid = (words: string[], gridSize: number) => {
  let grid = generateEmptyGrid(gridSize);
  const placedWords: string[] = [];

  // Try to place each word
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const isVertical = Math.random() > 0.5;
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

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
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!grid[i][j]) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
};

export const calculateScore = (timeInSeconds: number) => {
  const score = Math.max(1000 - (timeInSeconds * 10), 100);
  return Math.round(score);
};