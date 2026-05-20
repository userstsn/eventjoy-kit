import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/loan/i18n";

import Welcome from "@/loan/pages/Welcome";
import BasicInfo from "@/loan/pages/BasicInfo";
import Documents from "@/loan/pages/Documents";
import Income from "@/loan/pages/Income";
import Consent from "@/loan/pages/Consent";
import Review from "@/loan/pages/Review";
import Status from "@/loan/pages/Status";
import Dashboard from "@/loan/pages/Dashboard";
import Officer from "@/loan/pages/Officer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="app-theme">
      <LangProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/apply/basic-info" element={<BasicInfo />} />
              <Route path="/apply/documents" element={<Documents />} />
              <Route path="/apply/income" element={<Income />} />
              <Route path="/apply/consent" element={<Consent />} />
              <Route path="/apply/review" element={<Review />} />
              <Route path="/status" element={<Status />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/officer" element={<Officer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LangProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
