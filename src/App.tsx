import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import PartnerLayout from "./components/PartnerLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Favorites from "./pages/Favorites";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Locations from "./pages/Locations";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import BookingForm from "./pages/BookingForm";
import Account from "./pages/Account";
import Partnership from "./pages/Partnership";
import PartnerAuth from "./pages/partner/PartnerAuth";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerVehicles from "./pages/partner/PartnerVehicles";
import PartnerMessages from "./pages/partner/PartnerMessages";
import PartnerAnalytics from "./pages/partner/PartnerAnalytics";
import PartnerTrends from "./pages/partner/PartnerTrends";
import PartnerSubscription from "./pages/partner/PartnerSubscription";
import AddVehicleForm from "./pages/partner/AddVehicleForm";

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
            {/* Routes publiques */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element= {<Auth />} />
            <Route path="/partnership" element={<Layout><Partnership /></Layout>} />
            
            {/* Routes utilisateurs (particuliers) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<Layout><Vehicles /></Layout>} />
            <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
            <Route path="/messages" element={<Layout><Messages /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/locations" element={<Layout><Locations /></Layout>} />
            <Route path="/account" element={<Layout><Account /></Layout>} />
            <Route path="/booking/:id" element={<Layout><BookingForm /></Layout>} />
            
            {/* Routes partenaires (collaborateurs) */}
            <Route path="/partner/auth" element={<PartnerAuth />} />
            <Route path="/partner/dashboard" element={<PartnerLayout><PartnerDashboard /></PartnerLayout>} />
            <Route path="/partner/vehicles" element={<PartnerLayout><PartnerVehicles /></PartnerLayout>} />
            <Route path="/partner/vehicles/add" element={<PartnerLayout><AddVehicleForm /></PartnerLayout>} />
            <Route path="/partner/messages" element={<PartnerLayout><PartnerMessages /></PartnerLayout>} />
            <Route path="/partner/analytics" element={<PartnerLayout><PartnerAnalytics /></PartnerLayout>} />
            <Route path="/partner/trends" element={<PartnerLayout><PartnerTrends /></PartnerLayout>} />
            <Route path="/partner/subscription" element={<PartnerLayout><PartnerSubscription /></PartnerLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
