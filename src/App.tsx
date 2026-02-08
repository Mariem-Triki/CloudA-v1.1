"use client";

import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const CloudAccounts = lazy(() => import("./pages/CloudAccounts"));
const IaCScanner = lazy(() => import("./pages/IaCScanner"));
const Findings = lazy(() => import("./pages/Findings"));
const CSPM = lazy(() => import("./pages/CSPM"));
const ContainerSecurity = lazy(() => import("./pages/ContainerSecurity"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('cloud_armor_token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <Loader2 className="text-cyan-500 animate-spin" size={48} />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;