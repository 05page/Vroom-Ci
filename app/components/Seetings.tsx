"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Settings, User, Bell, Shield, Eye, Palette,
    MapPin, Phone, Mail, Save, Globe, Lock,
    Smartphone, BellRing, BellOff, MessageCircle,
    Calendar, Car, LogOut, Trash2, ChevronRight,
} from "lucide-react"

interface SettingsProfile {
    nom: string
    prenom: string
    email: string
    telephone: string
    adresse: string
    ville: string
    bio: string
}

interface NotifSetting {
    id: string
    label: string
    description: string
    enabled: boolean
    icon: React.ElementType
}

const CARD = "rounded-2xl md:rounded-3xl shadow-xl border border-border/40 overflow-hidden bg-card/50 backdrop-blur-sm"

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState<SettingsProfile>({
        nom: "Kouassi",
        prenom: "Bernard",
        email: "bernard.kouassi@gmail.com",
        telephone: "+225 07 89 12 34 56",
        adresse: "Cocody Riviera Palmeraie",
        ville: "Abidjan",
        bio: "Vendeur automobile professionnel à Abidjan. Spécialisé dans les véhicules premium et les locations longue durée.",
    })

    const [notifications, setNotifications] = useState<NotifSetting[]>([
        { id: "new_message", label: "Nouveaux messages", description: "Recevoir une notification à chaque nouveau message", enabled: true, icon: MessageCircle },
        { id: "new_rdv", label: "Rendez-vous", description: "Rappels de rendez-vous à venir", enabled: true, icon: Calendar },
        { id: "new_fav", label: "Favoris", description: "Quand un client ajoute votre véhicule en favori", enabled: false, icon: Car },
        { id: "promo", label: "Promotions", description: "Offres et conseils pour booster vos ventes", enabled: true, icon: BellRing },
    ])

    useEffect(() => {
        const toastId = toast.loading("Chargement des paramètres...")
        const load = async () => {
            await new Promise(r => setTimeout(r, 1500))
            setIsLoading(false)
            toast.dismiss(toastId)
        }
        load()
    }, [])

    const updateProfile = (key: keyof SettingsProfile, value: string) => {
        setProfile(prev => ({ ...prev, [key]: value }))
    }

    const toggleNotif = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, enabled: !n.enabled } : n
        ))
    }

    const handleSave = () => {
        toast.success("Paramètres enregistrés avec succès")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 px-4 md:px-6 pb-12">
                <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-64 rounded-2xl" />
                    <Skeleton className="h-48 rounded-2xl" />
                    <Skeleton className="h-48 rounded-2xl" />
                    <Skeleton className="h-32 rounded-2xl" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 px-4 md:px-6 pb-12">
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between animate-in fade-in slide-in-from-left duration-500">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                            <Settings className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Paramètres</h1>
                            <p className="text-muted-foreground text-sm">Gérez votre compte et vos préférences</p>
                        </div>
                    </div>
                    <Button onClick={handleSave} className="gap-2 bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer rounded-xl">
                        <Save className="h-4 w-4" /> Enregistrer
                    </Button>
                </div>

                {/* Profile */}
                <Card className={cn(CARD, "animate-in fade-in slide-in-from-bottom duration-500")}>
                    <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Informations personnelles</CardTitle>
                                <p className="text-sm text-muted-foreground">Modifiez vos informations de profil</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Nom</Label>
                                <Input
                                    value={profile.nom}
                                    onChange={e => updateProfile("nom", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Prénom</Label>
                                <Input
                                    value={profile.prenom}
                                    onChange={e => updateProfile("prenom", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1">
                                    <Mail className="h-3 w-3" /> Email
                                </Label>
                                <Input
                                    type="email"
                                    value={profile.email}
                                    onChange={e => updateProfile("email", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1">
                                    <Phone className="h-3 w-3" /> Téléphone
                                </Label>
                                <Input
                                    value={profile.telephone}
                                    onChange={e => updateProfile("telephone", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> Adresse
                                </Label>
                                <Input
                                    value={profile.adresse}
                                    onChange={e => updateProfile("adresse", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-1">
                                    <Globe className="h-3 w-3" /> Ville
                                </Label>
                                <Input
                                    value={profile.ville}
                                    onChange={e => updateProfile("ville", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <Label className="text-sm font-medium">Bio / Description</Label>
                            <textarea
                                value={profile.bio}
                                onChange={e => updateProfile("bio", e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className={cn(CARD, "animate-in fade-in slide-in-from-bottom duration-500 delay-100")}>
                    <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Notifications</CardTitle>
                                <p className="text-sm text-muted-foreground">Choisissez les notifications que vous souhaitez recevoir</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-4 space-y-2">
                        {notifications.map((n, i) => (
                            <div key={n.id}>
                                <button
                                    type="button"
                                    onClick={() => toggleNotif(n.id)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 text-left cursor-pointer"
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        n.enabled ? "bg-green-500/10 text-green-600" : "bg-muted/50 text-muted-foreground"
                                    )}>
                                        <n.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm">{n.label}</p>
                                        <p className="text-xs text-muted-foreground">{n.description}</p>
                                    </div>
                                    <div className={cn(
                                        "w-11 h-6 rounded-full p-0.5 transition-all duration-300 shrink-0",
                                        n.enabled ? "bg-green-500" : "bg-muted"
                                    )}>
                                        <div className={cn(
                                            "w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300",
                                            n.enabled ? "translate-x-5" : "translate-x-0"
                                        )} />
                                    </div>
                                </button>
                                {i < notifications.length - 1 && <Separator className="my-1" />}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Sécurité */}
                <Card className={cn(CARD, "animate-in fade-in slide-in-from-bottom duration-500 delay-200")}>
                    <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Sécurité & Confidentialité</CardTitle>
                                <p className="text-sm text-muted-foreground">Gérez la sécurité de votre compte</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-4 space-y-2">
                        {[
                            { label: "Changer le mot de passe", desc: "Dernière modification il y a 3 mois", icon: Lock, color: "bg-blue-500/10 text-blue-600" },
                            { label: "Vérification en deux étapes", desc: "Ajouter une couche de sécurité", icon: Smartphone, color: "bg-green-500/10 text-green-600" },
                            { label: "Visibilité du profil", desc: "Votre profil est visible publiquement", icon: Eye, color: "bg-purple-500/10 text-purple-600" },
                        ].map((item, i) => (
                            <button
                                key={item.label}
                                type="button"
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 text-left cursor-pointer"
                                onClick={() => toast.info("Fonctionnalité à venir")}
                            >
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.color)}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Zone de danger */}
                <Card className={cn(CARD, "border-red-500/20 animate-in fade-in slide-in-from-bottom duration-500 delay-300")}>
                    <CardHeader className="p-4 md:p-6 pb-2 md:pb-2">
                        <CardTitle className="text-lg text-red-600">Zone de danger</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-4 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-muted/30">
                            <div>
                                <p className="font-semibold text-sm">Se déconnecter</p>
                                <p className="text-xs text-muted-foreground">Vous serez déconnecté de votre compte</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 cursor-pointer rounded-lg text-amber-600 hover:text-amber-700 hover:border-amber-200"
                                onClick={() => toast.info("Déconnexion...")}
                            >
                                <LogOut className="h-3 w-3" /> Déconnexion
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                            <div>
                                <p className="font-semibold text-sm text-red-600">Supprimer le compte</p>
                                <p className="text-xs text-muted-foreground">Cette action est irréversible</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 cursor-pointer rounded-lg text-red-500 hover:text-red-600 hover:border-red-200"
                                onClick={() => toast.error("Fonctionnalité à venir")}
                            >
                                <Trash2 className="h-3 w-3" /> Supprimer
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
