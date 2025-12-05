import { Button } from "@/components/ui/button";
import { LogOut, Menu, LayoutDashboard, Car, MessageCircle, BarChart3, TrendingUp, Crown, Settings, Bell } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";

interface PartnerLayoutProps {
  children: React.ReactNode;
}

const PartnerLayout = ({ children }: PartnerLayoutProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 border-r-2 bg-background">
                <PartnerSidebar onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-black tracking-tight">
                Espace Collaborateur
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={()=>navigate('/partner/auth')}
            className="rounded-xl font-bold hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar desktop - STICKY ET SCROLLABLE */}
        <aside className="hidden lg:block w-[280px] border-r-2 bg-background/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <PartnerSidebar />
        </aside>

        {/* Contenu principal - SCROLLABLE INDÉPENDAMMENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Sidebar spécifique aux partenaires
const PartnerSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { label: "Dashboard", path: "/partner/dashboard", icon: LayoutDashboard },
    { label: "Mes véhicules", path: "/partner/vehicles", icon: Car },
    { label: "Messages", path: "/partner/messages", icon: MessageCircle },
    { label: "Statistiques", path: "/partner/analytics", icon: BarChart3 },
    { label: "Tendances marché", path: "/partner/trends", icon: TrendingUp },
    { label: "Notifications", path: "/partner/notifications", icon: Bell },
    { label: "Paramètres", path: "/partner/settings", icon: Settings },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigate?.();
  };
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex flex-col gap-2 p-4 w-full">
      {/* Logo Section */}
      <div className="px-3 py-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
            <Car className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">VROOM</span>
            <span className="text-[hsl(153,100%,36%)]"> CI</span>
          </span>
        </div>
      </div>

      {/* Menu Items */}
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Button
            key={item.path}
            variant="ghost"
            className={`justify-start w-full h-12 rounded-xl font-bold transition-all ${active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-105"
              }`}
            onClick={() => handleNavigation(item.path)}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default PartnerLayout;