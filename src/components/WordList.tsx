import React from 'react';

interface WordListProps {
  words: string[];
  completedWords: string[];
}

const WordList = ({ words, completedWords }: WordListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-full">
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