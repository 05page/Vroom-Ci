"use client";

import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Bell, Calendar, Car, Heart, Home, LayoutDashboard, LogOut, Menu, MessageCircle, User } from "lucide-react"
import Link from "next/link";
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const Header = () => {
    const pathname = usePathname()
    const [user, setUser] = useState<User>({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "client",
    })
    const [mobileOpen, setMobileOpen] = useState(false)

    if (pathname.startsWith("/auth") || pathname.startsWith("/Auth") || pathname.startsWith("/partenaire")) return null

    const navItems = [
        { href: "/", label: "Accueil", icon: Home },
        { href: "/vehicles", label: "Véhicules", icon: Car },
        { href: "/client/favorites", label: "Favoris", icon: Heart },
        { href: "/notifications", label: "Notifications", icon: Bell },
    ]

    const menuItems = [
        { href: "/profile", label: user?.role === "client" ? "Mon compte" : "Mon dashboard", icon: LayoutDashboard },
        { href: "/client/rdv", label: "Mes Rendez-vous", icon: Calendar },
        { href: "/messages", label: "Messages", icon: MessageCircle },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/90 backdrop-blur-md">
            <div className="container mx-auto flex h-14 md:h-16 items-center justify-between md:justify-center px-4">
                {/* Mobile: Logo */}
                <Link href="/" className="flex items-center gap-2 md:hidden">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Car className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <span className="text-lg font-black text-foreground">Vroom CI</span>
                </Link>

                {/* Desktop: Menubar */}
                <Menubar className="border-none bg-transparent shadow-none hidden md:flex">
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Link href="/" className="flex">
                                <Home className="mr-2 h-4 w-4" />
                                Accueil
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Link href="/vehicles" className="flex">
                                <Car className="mr-2 h-4 w-4" />
                                Véhicules
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Link href="/client/favorites" className="flex">
                                <Heart className="mr-2 h-4 w-4" />
                                Favoris
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Link href="/notifications" className="flex">
                                <Bell className="mr-2 h-4 w-4" />
                                Notifications
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>

                    <div className="flex justify-end items-center">
                        <MenubarMenu>
                            <MenubarTrigger className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-sm font-medium">{user?.name}</span>
                                        <Badge className={`font-bold ${user?.role === "client" ? "bg-orange-100 text-orange-800" : "bg-emerald-100 text-emerald-800"}`}>
                                            {user?.role}
                                        </Badge>
                                    </div>
                                </div>
                            </MenubarTrigger>
                            <MenubarContent className="right-0">
                                <MenubarGroup>
                                    <MenubarItem className="cursor-pointer">
                                        <Link href="/profile" className="flex">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            {user?.role === "client" ? "Mon compte" : "Mon dashboard"}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem className="cursor-pointer">
                                        <Link href="/client/rdv" className="flex">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Mes Rendez-vous
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem className="cursor-pointer">
                                        <Link href="/messages" className="flex">
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Messages
                                        </Link>
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Deconnexion
                                    </MenubarItem>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                    </div>
                </Menubar>

                {/* Mobile: Hamburger + Sheet */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] p-0">
                        <SheetHeader className="p-5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${user?.role === "client" ? "border-orange-200" : "border-emerald-200"}`}>
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <SheetTitle className="text-sm font-bold">{user?.name}</SheetTitle>
                                    <Badge className={`font-bold text-[10px] ${user?.role === "client" ? "bg-orange-100 text-orange-800" : "bg-emerald-100 text-emerald-800"}`}>
                                        {user?.role}
                                    </Badge>
                                </div>
                            </div>
                        </SheetHeader>

                        <Separator />

                        <nav className="flex flex-col p-3 gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                        pathname === item.href
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-muted"
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <Separator className="mx-3" />

                        <nav className="flex flex-col p-3 gap-1">
                            <p className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Mon espace
                            </p>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                        pathname === item.href
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-muted"
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto p-3">
                            <Separator className="mb-3" />
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full cursor-pointer">
                                <LogOut className="h-4 w-4" />
                                Déconnexion
                            </button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header;
