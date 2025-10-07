import { Home, LayoutDashboard, Bell, Car, Heart, Settings, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Véhicules", url: "/vehicles", icon: Car },
  { title: "Favoris", url: "/favorites", icon: Heart },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-20" : "w-72"} collapsible="icon">
      <SidebarContent>
        <div className="px-7 py-9">
          <div className={`flex items-center gap-4 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="h-14 w-14 rounded-lg bg-primary flex items-center justify-center">
              <Car className="h-8 w-8 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="font-heading text-3xl font-bold text-primary">Vroom CI</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : "text-base font-medium"}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-5 rounded-lg px-5 py-3.5 transition-smooth ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/80 hover:bg-accent hover:text-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-7 w-7" />
                      {!isCollapsed && <span className="text-lg leading-none">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
