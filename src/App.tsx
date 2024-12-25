import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import PuzzleSelection from "./pages/PuzzleSelection";
import BumuhPuzzle from "./pages/BumuhPuzzle";
import OldTestamentPuzzle from "./pages/OldTestamentPuzzle";
import NewTestamentPuzzle from "./pages/NewTestamentPuzzle";
import BibleCharactersPuzzle from "./pages/BibleCharactersPuzzle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/puzzles" element={<PuzzleSelection />} />
          <Route path="/puzzle/bumuh-family" element={<BumuhPuzzle />} />
          <Route path="/puzzle/bible-books/old-testament" element={<OldTestamentPuzzle />} />
          <Route path="/puzzle/bible-books/new-testament" element={<NewTestamentPuzzle />} />
          <Route path="/puzzle/bible-characters" element={<BibleCharactersPuzzle />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;