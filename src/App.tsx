import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Favorites from "./pages/Favorites";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import BookingForm from "./pages/BookingForm";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/vehicles" element={<Layout><Vehicles /></Layout>} />
            <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
            <Route path="/messages" element={<Layout><Messages /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/account" element={<Layout><Account /></Layout>} />
            <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
            <Route path="/booking/:id" element={<Layout><BookingForm /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
