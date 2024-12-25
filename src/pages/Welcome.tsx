import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  console.log("Rendering Welcome screen");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/20 to-secondary/20 p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 text-center">
        Welcome to Bible Word Puzzles
      </h1>
      
      <Button 
        size="lg"
        className="text-xl px-8 py-6 animate-bounce"
        onClick={() => {
          console.log("Navigating to puzzle selection");
          navigate("/puzzles");
        }}
      >
        Choose a Puzzle
      </Button>
    </div>
  );
};

export default Welcome;