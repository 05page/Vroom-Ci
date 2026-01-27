import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Bell, Calendar, Heart, Home, LayoutDashboard, LogOut, MessageCircle, User } from "lucide-react"

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-center px-4">
                <Menubar className="border-none bg-transparent shadow-none">
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            Accueil
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Heart className="mr-2 h-4 w-4" />
                            Favoris
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer">
                            <Calendar className="mr-2 h-4 w-4" />
                            Mes Rdv
                        </MenubarTrigger>
                    </MenubarMenu>

                    <div className="flex justify-end items-center">
                        <MenubarMenu>
                            <MenubarTrigger className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Profil
                            </MenubarTrigger>
                            <MenubarContent className="right-0">
                                <MenubarGroup>
                                    <MenubarItem>
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </MenubarItem>
                                    <MenubarItem>
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Mes Messages
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Deconnexion
                                    </MenubarItem>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                    </div>
                </Menubar>
            </div>
        </header>
    )
}

export default Header;