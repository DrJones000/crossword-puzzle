import React from 'react';

interface WordListProps {
  words: string[];
  completedWords: string[];
}

const WordList = ({ words, completedWords }: WordListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 max-w-full px-2 md:px-4">
      {words.map((word) => (
        <span
          key={word}
          className={`word-list-item ${completedWords.includes(word) ? 'completed' : ''}`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default WordList;