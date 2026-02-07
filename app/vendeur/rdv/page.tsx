"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    CalendarDays, Clock, MapPin, Car, Phone,
    CheckCircle2, XCircle, Calendar,
    MessageCircle,
} from "lucide-react"

interface Rdv {
    id: number
    client: string
    clientPhone: string
    clientAvatar: string
    vehicule: string
    date: string
    heure: string
    lieu: string
    type: "visite" | "essai" | "finalisation" | "livraison"
    statut: "a_venir" | "passé" | "annulé"
    notes: string
}

const CARD = "rounded-2xl md:rounded-3xl shadow-xl border border-border/40 overflow-hidden bg-card/50 backdrop-blur-sm"

const rdvs: Rdv[] = [
    { id: 1, client: "Diallo Amadou", clientPhone: "+225 07 12 34 56", clientAvatar: "DA", vehicule: "Toyota RAV4 2024", date: "03 Fév 2025", heure: "10:00", lieu: "Cocody Riviera Palmeraie", type: "visite", statut: "a_venir", notes: "Premier contact, intéressé par la version hybride" },
    { id: 2, client: "Ouattara Seydou", clientPhone: "+225 05 98 76 54", clientAvatar: "OS", vehicule: "BMW X3 2023", date: "04 Fév 2025", heure: "14:30", lieu: "Plateau, près du CHU", type: "essai", statut: "a_venir", notes: "Souhaite essayer sur autoroute" },
    { id: 3, client: "N'Guessan Ahou", clientPhone: "+225 01 23 45 67", clientAvatar: "NA", vehicule: "Peugeot 3008 2024", date: "05 Fév 2025", heure: "09:00", lieu: "Marcory zone 4", type: "finalisation", statut: "a_venir", notes: "Documents prêts, signature du contrat" },
    { id: 4, client: "Bamba Issa", clientPhone: "+225 07 65 43 21", clientAvatar: "BI", vehicule: "Mercedes Classe C", date: "06 Fév 2025", heure: "16:00", lieu: "Cocody Angré", type: "livraison", statut: "a_venir", notes: "Livraison du véhicule après paiement" },
    { id: 5, client: "Konan Yves", clientPhone: "+225 05 11 22 33", clientAvatar: "KY", vehicule: "Mercedes Classe C", date: "28 Jan 2025", heure: "10:00", lieu: "Plateau", type: "finalisation", statut: "passé", notes: "Vente finalisée avec succès" },
    { id: 6, client: "Coulibaly Marie", clientPhone: "+225 07 44 55 66", clientAvatar: "CM", vehicule: "Hyundai Tucson 2023", date: "25 Jan 2025", heure: "11:30", lieu: "Cocody Riviera", type: "essai", statut: "passé", notes: "Essai concluant, à relancer" },
    { id: 7, client: "Soro Ibrahim", clientPhone: "+225 01 77 88 99", clientAvatar: "SI", vehicule: "Volkswagen Golf 2023", date: "20 Jan 2025", heure: "15:00", lieu: "Yopougon", type: "visite", statut: "annulé", notes: "Client a annulé pour raison personnelle" },
    { id: 8, client: "Koffi Jean", clientPhone: "+225 05 33 22 11", clientAvatar: "KJ", vehicule: "Audi Q5 2022", date: "18 Jan 2025", heure: "09:30", lieu: "Treichville", type: "visite", statut: "passé", notes: "Visite effectuée, en réflexion" },
]

export default function RdvPage() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const toastId = toast.loading("Chargement des rendez-vous...")
        const load = async () => {
            await new Promise(r => setTimeout(r, 1500))
            setIsLoading(false)
            toast.dismiss(toastId)
        }
        load()
    }, [])

    const getTypeColor = (type: string) => {
        switch (type) {
            case "visite": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
            case "essai": return "bg-amber-500/10 text-amber-600 border-amber-500/20"
            case "finalisation": return "bg-green-500/10 text-green-600 border-green-500/20"
            case "livraison": return "bg-purple-500/10 text-purple-600 border-purple-500/20"
            default: return "bg-muted text-muted-foreground"
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "visite": return "Visite"
            case "essai": return "Essai routier"
            case "finalisation": return "Finalisation"
            case "livraison": return "Livraison"
            default: return type
        }
    }

    const stats = [
        { label: "Total", value: rdvs.length, icon: CalendarDays, color: "bg-green-500/10 text-green-600" },
        { label: "À venir", value: rdvs.filter(r => r.statut === "a_venir").length, icon: Clock, color: "bg-blue-500/10 text-blue-600" },
        { label: "Passés", value: rdvs.filter(r => r.statut === "passé").length, icon: CheckCircle2, color: "bg-green-500/10 text-green-600" },
        { label: "Annulés", value: rdvs.filter(r => r.statut === "annulé").length, icon: XCircle, color: "bg-red-500/10 text-red-600" },
    ]

    const filterRdvs = (tab: string) => {
        if (tab === "a_venir") return rdvs.filter(r => r.statut === "a_venir")
        if (tab === "passes") return rdvs.filter(r => r.statut === "passé")
        if (tab === "annules") return rdvs.filter(r => r.statut === "annulé")
        return rdvs
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 px-4 md:px-6 pb-12">
                <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
                    <Skeleton className="h-10 w-64" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
                    </div>
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
                </div>
            </div>
        )
    }

    const RdvCard = ({ rdv }: { rdv: Rdv }) => (
        <Card className={cn(CARD, "hover:shadow-lg transition-all duration-300",
            rdv.statut === "annulé" && "opacity-60"
        )}>
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Date block */}
                    <div className="flex md:flex-col items-center gap-2 md:gap-0 md:w-20 shrink-0">
                        <div className={cn("w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center",
                            rdv.statut === "a_venir" ? "bg-green-500/10 text-green-600" : "bg-muted/50 text-muted-foreground"
                        )}>
                            <Calendar className="h-4 w-4 mb-0.5" />
                            <span className="text-[10px] font-bold leading-none">{rdv.date.split(" ")[0]}</span>
                        </div>
                        <div className="text-xs text-muted-foreground md:mt-1 md:text-center">
                            <p className="font-medium">{rdv.date.split(" ").slice(1).join(" ")}</p>
                            <p>{rdv.heure}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={cn("rounded-full text-xs", getTypeColor(rdv.type))}>
                                {getTypeLabel(rdv.type)}
                            </Badge>
                            {rdv.statut === "annulé" && (
                                <Badge className="bg-red-500/10 text-red-600 border-red-500/20 rounded-full text-xs">
                                    Annulé
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 text-xs font-bold">
                                {rdv.clientAvatar}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{rdv.client}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Car className="h-3 w-3" /> {rdv.vehicule}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {rdv.lieu}</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {rdv.clientPhone}</span>
                        </div>

                        {rdv.notes && (
                            <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2 italic">
                                {rdv.notes}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    {rdv.statut === "a_venir" && (
                        <div className="flex md:flex-col gap-2 shrink-0">
                            <Button variant="outline" size="sm" className="gap-1 cursor-pointer rounded-lg text-xs">
                                <MessageCircle className="h-3 w-3" /> Message
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1 cursor-pointer rounded-lg text-xs text-red-500 hover:text-red-600">
                                <XCircle className="h-3 w-3" /> Annuler
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen pt-20 px-4 md:px-6 pb-12">
            <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-in fade-in slide-in-from-left duration-500">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                            <CalendarDays className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Rendez-vous</h1>
                            <p className="text-muted-foreground text-sm">Gérez vos rendez-vous avec les clients</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom duration-500">
                    {stats.map((s, i) => (
                        <Card key={i} className={cn(CARD, "hover:shadow-lg transition-all duration-300")}>
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", s.color)}>
                                    <s.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{s.value}</p>
                                    <p className="text-xs text-muted-foreground">{s.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tabs + RDV List */}
                <Tabs defaultValue="a_venir" className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
                    <TabsList className="bg-muted/50 rounded-xl p-1 mb-4">
                        <TabsTrigger value="tous" className="rounded-lg cursor-pointer data-[state=active]:bg-green-500 data-[state=active]:text-white">Tous</TabsTrigger>
                        <TabsTrigger value="a_venir" className="rounded-lg cursor-pointer data-[state=active]:bg-blue-500 data-[state=active]:text-white">À venir</TabsTrigger>
                        <TabsTrigger value="passes" className="rounded-lg cursor-pointer data-[state=active]:bg-green-500 data-[state=active]:text-white">Passés</TabsTrigger>
                        <TabsTrigger value="annules" className="rounded-lg cursor-pointer data-[state=active]:bg-red-500 data-[state=active]:text-white">Annulés</TabsTrigger>
                    </TabsList>

                    {["tous", "a_venir", "passes", "annules"].map(tab => (
                        <TabsContent key={tab} value={tab} className="space-y-3">
                            {filterRdvs(tab).map(r => <RdvCard key={r.id} rdv={r} />)}
                            {filterRdvs(tab).length === 0 && (
                                <Card className={CARD}>
                                    <CardContent className="p-12 text-center">
                                        <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                                        <p className="font-medium">Aucun rendez-vous</p>
                                        <p className="text-sm text-muted-foreground mt-1">Pas de rendez-vous dans cette catégorie</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}
