import { Home, LayoutDashboard, Bell, Car, Heart, Settings, MessageCircle, User, Building2, Crown, BarChart3 } from "lucide-react";
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
  { title: "Véhicules", url: "/vehicles", icon: Car },
  { title: "Favoris", url: "/favorites", icon: Heart },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Mon compte", url: "/account", icon: User },
  { title: "Paramètres", url: "/settings", icon: Settings },
];

const partnerMenuItems = [
  { title: "Devenir partenaire", url: "/partnership", icon: Building2 },
  { title: "Abonnements", url: "/partner/subscription", icon: Crown },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="px-5 py-6">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <Car className="h-7 w-7 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="font-heading text-2xl font-bold">
                <span className="text-primary">VROOM</span>
                <span className="text-[hsl(153,100%,36%)]"> CI</span>
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : "text-sm font-medium"}>
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
                        `flex items-center gap-3 rounded-lg px-4 py-3.5 transition-smooth ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-[hsl(var(--nav-default))] hover:bg-primary/5 hover:text-primary"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="text-base leading-none">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : "text-sm font-medium"}>
            Collaboration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {partnerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3.5 transition-smooth ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-[hsl(var(--nav-default))] hover:bg-primary/5 hover:text-primary"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="text-base leading-none">{item.title}</span>}
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
