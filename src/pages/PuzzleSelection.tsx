import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PuzzleSelection = () => {
  const navigate = useNavigate();
  console.log("Rendering Puzzle Selection screen");

  const puzzles = [
    {
      id: "bumuh-family",
      title: "The Bumuh Family",
      description: "Find names from the Bumuh family tree",
      route: "/puzzle/bumuh-family"
    },
    {
      id: "bible-books",
      title: "Books of the Bible",
      description: "Find books from the Holy Bible",
      route: "/puzzle/bible-books"
    },
    {
      id: "bible-characters",
      title: "Bible Characters",
      description: "Find names of important Bible figures",
      route: "/puzzle/bible-characters"
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-primary/20 to-secondary/20">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
        Select Your Puzzle
      </h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles.map((puzzle) => (
          <Card 
            key={puzzle.id}
            className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform duration-200"
            onClick={() => {
              console.log(`Navigating to puzzle: ${puzzle.id}`);
              navigate(puzzle.route);
            }}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-xl mb-2">{puzzle.title}</CardTitle>
              <p className="text-sm text-gray-600">{puzzle.description}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PuzzleSelection;