import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import PuzzleSelection from "./pages/PuzzleSelection";
import BumuhPuzzle from "./pages/BumuhPuzzle";

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
          <Route path="/puzzle/bible-books/old-testament" element={<Navigate to="/puzzles" replace />} />
          <Route path="/puzzle/bible-books/new-testament" element={<Navigate to="/puzzles" replace />} />
          <Route path="/puzzle/bible-characters" element={<Navigate to="/puzzles" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;