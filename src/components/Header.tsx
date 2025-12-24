import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft, LogOut, Heart, MessageCircle, Bell, User, Home, ShoppingBag, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  showBack?: boolean;
  backUrl?: string;
}

const Header = ({ showBack = false, backUrl }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { label: "Accueil", icon: Home, path: "/dashboard" },
    { label: "Véhicules", icon: ShoppingBag, path: "/vehicles" },
    { label: "Espace Partenaire", icon: Store, path: "/partner/dashboard" },
  ];

  const userNavItems = [
    { label: "Favoris", icon: Heart, path: "/favorites" },
    { label: "Messages", icon: MessageCircle, path: "/messages" },
    { label: "Notifications", icon: Bell, path: "/notifications", badge: 3 },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="bg-primary rounded-xl p-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1
            className="text-2xl font-black tracking-tight cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">VROOM</span>
            <span className="text-[hsl(153,100%,36%)]"> CI</span>
          </h1>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              onClick={() => navigate(item.path)}
              className="rounded-xl font-semibold"
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* User Menu with Nav Items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
              <DropdownMenuLabel className="font-bold">Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => navigate("/account")} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Mon profil</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground font-medium md:hidden">Navigation</DropdownMenuLabel>
              
              {/* Navigation mobile dans le dropdown */}
              <div className="md:hidden">
                {mainNavItems.map((item) => (
                  <DropdownMenuItem
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`cursor-pointer ${isActive(item.path) ? "bg-primary/10 text-primary" : ""}`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
              
              {userNavItems.map((item) => (
                <DropdownMenuItem
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer relative"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto h-5 w-5 flex items-center justify-center bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
