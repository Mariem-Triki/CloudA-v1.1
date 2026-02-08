import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CloudAccounts from "./pages/CloudAccounts";
import IaCScanner from "./pages/IaCScanner";
import Findings from "./pages/Findings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/accounts" element={<CloudAccounts />} />
          <Route path="/iac" element={<IaCScanner />} />
          <Route path="/findings" element={<Findings />} />
          {/* Placeholder routes for other features */}
          <Route path="/cspm" element={<Findings />} />
          <Route path="/containers" element={<Findings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;