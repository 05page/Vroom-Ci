import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface PartnerLayoutProps {
  children: React.ReactNode;
}

const PartnerLayout = ({ children }: PartnerLayoutProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("partnerAuth");
    navigate("/partner/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header pour partenaires */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <PartnerSidebar onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">Espace Collaborateur</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex w-[280px] border-r min-h-[calc(100vh-4rem)]">
          <PartnerSidebar />
        </aside>

        {/* Contenu principal */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

// Sidebar spécifique aux partenaires
const PartnerSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/partner/dashboard", icon: "📊" },
    { label: "Mes véhicules", path: "/partner/vehicles", icon: "🚗" },
    { label: "Statistiques", path: "/partner/analytics", icon: "📈" },
    { label: "Tendances marché", path: "/partner/trends", icon: "🔥" },
    { label: "Abonnements", path: "/partner/subscription", icon: "👑" },
    { label: "Paramètres", path: "/partner/settings", icon: "⚙️" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <nav className="flex flex-col gap-2 p-4 w-full">
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className="justify-start"
          onClick={() => handleNavigation(item.path)}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

export default PartnerLayout;
