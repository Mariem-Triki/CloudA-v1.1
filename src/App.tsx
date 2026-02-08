"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CloudAccounts from "./pages/CloudAccounts";
import IaCScanner from "./pages/IaCScanner";
import Findings from "./pages/Findings";
import CSPM from "./pages/CSPM";
import ContainerSecurity from "./pages/ContainerSecurity";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simple Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('cloud_armor_token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><CloudAccounts /></ProtectedRoute>} />
          <Route path="/iac" element={<ProtectedRoute><IaCScanner /></ProtectedRoute>} />
          <Route path="/findings" element={<ProtectedRoute><Findings /></ProtectedRoute>} />
          <Route path="/cspm" element={<ProtectedRoute><CSPM /></ProtectedRoute>} />
          <Route path="/containers" element={<ProtectedRoute><ContainerSecurity /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;