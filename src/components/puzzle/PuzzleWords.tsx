import React from 'react';
import WordList from '../WordList';

interface PuzzleWordsProps {
  words: string[];
  completedWords: string[];
}

const PuzzleWords = ({ words, completedWords }: PuzzleWordsProps) => {
  return (
    <div className="w-full px-4">
      <WordList words={words} completedWords={completedWords} />
    </div>
  );
};

export default PuzzleWords;