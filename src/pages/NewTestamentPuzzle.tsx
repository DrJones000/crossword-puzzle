import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NewTestamentPuzzle = () => {
  const navigate = useNavigate();
  console.log("Rendering New Testament Puzzle page");

  const handleBackToMenu = () => {
    console.log("Navigating back to puzzle selection");
    navigate("/puzzles");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-primary/20 to-secondary/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button 
          variant="ghost" 
          onClick={handleBackToMenu}
          className="text-primary hover:text-primary/80"
        >
          ← Back to Menu
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
          New Testament Books
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
          {[
            "Matthew", "Mark", "Luke", "John", "Acts",
            "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
            "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
            "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
            "James", "1 Peter", "2 Peter", "1 John", "2 John",
            "3 John", "Jude", "Revelation"
          ].map((book) => (
            <div 
              key={book}
              className="p-4 bg-white/50 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {book}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewTestamentPuzzle;