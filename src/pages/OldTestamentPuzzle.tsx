import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OldTestamentPuzzle = () => {
  const navigate = useNavigate();
  console.log("Rendering Old Testament Puzzle page");

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
          Old Testament Books
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
          {[
            "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
            "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
            "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
            "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
            "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
            "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
            "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
            "Zephaniah", "Haggai", "Zechariah", "Malachi"
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

export default OldTestamentPuzzle;