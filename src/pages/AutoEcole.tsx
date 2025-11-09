import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Car, CircleDollarSign, Clock, MapPin, Navigation, Phone, GraduationCap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RdvDialog } from "@/components/RdvDialog"

const AutoEcole = () => {
    const [searchAgency, setSearchAgency] = useState("");
    const [selectAgency, setSelectAgency] = useState("all");
    const [rdvDialogOpen, setRdvDialogOpen] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState("");

    const agencies = [
        {
            name: "VROOM Abidjan Plateau",
            address: "Boulevard Clozel, Plateau",
            city: "Abidjan",
            price: '500000',
            phone: "+225 27 20 30 40 50",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 5.3164, lng: -4.0305 },
        },
        {
            name: "VROOM Abidjan Cocody",
            address: "Cocody Riviera 2",
            city: "Abidjan",
            price: '200000',
            phone: "+225 27 20 30 40 51",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 5.3599, lng: -3.9810 },
        },
        {
            name: "VROOM Abidjan Yopougon",
            address: "Yopougon Sicogi",
            city: "Abidjan",
            price: '150000',
            phone: "+225 27 20 30 40 52",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 5.3364, lng: -4.0886 },
        },
        {
            name: "VROOM Bouaké Centre",
            address: "Avenue Général de Gaulle",
            city: "Bouaké",
            price: '200000',
            phone: "+225 27 31 60 70 80",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 7.6900, lng: -5.0300 },
        },
        {
            name: "VROOM San Pedro",
            address: "Boulevard du Port",
            city: "San Pedro",
            price: '200000',
            phone: "+225 27 34 71 80 90",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 4.7500, lng: -6.6333 },
        },
        {
            name: "VROOM Yamoussoukro",
            address: "Boulevard Houphouët-Boigny",
            city: "Yamoussoukro",
            price: '250000',
            phone: "+225 27 30 64 50 60",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 6.8206, lng: -5.2767 },
        },
    ];

    const prices = ["all", ...new Set(agencies.map((a) => a.price))];

    const filterAgencies = agencies.filter((agency) => {
        const matchesCity = selectAgency === "all" || agency.price === selectAgency;
        const matchesSearch = agency.name.toLowerCase().includes(searchAgency.toLowerCase()) ||
            agency.address.toLowerCase().includes(searchAgency.toLowerCase()) ||
            agency.city.toLowerCase().includes(searchAgency.toLowerCase());
        return matchesCity && matchesSearch;
    });

    const openGoogleMaps = (lat: number, lng: number) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.history.back()}>
                        <div className="bg-primary rounded-xl p-2">
                            <Car className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            VROOM
                        </h1>
                    </div>

                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()}
                        className="font-bold rounded-xl hover:bg-primary/10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Auto-écoles{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            VROOM
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
                        Trouvez une auto-école près de chez vous et adaptée à votre budget
                    </p>
                </div>

                {/* Filters */}
                <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
                    <div className="relative">
                        <Input
                            value={searchAgency}
                            onChange={(e) => setSearchAgency(e.target.value)}
                            placeholder="Rechercher une agence ou une ville..."
                            className="h-14 pl-12 rounded-2xl border-2 font-medium"
                        />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Select value={selectAgency} onValueChange={setSelectAgency}>
                        <SelectTrigger className="h-14 rounded-2xl border-2 font-medium">
                            <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                            <SelectValue placeholder="Sélectionnez votre budget" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les prix</SelectItem>
                            {prices.filter(c => c !== "all").map((price) => (
                                <SelectItem key={price} value={price} className="font-medium">
                                    {parseInt(price).toLocaleString()} FCFA
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Results Count */}
                <div className="mb-8 text-center">
                    <p className="text-muted-foreground font-semibold">
                        {filterAgencies.length} auto-école{filterAgencies.length > 1 ? 's' : ''} disponible{filterAgencies.length > 1 ? 's' : ''}
                    </p>
                </div>

                {/* Agencies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterAgencies.map((agency, index) => (
                        <Card
                            key={index}
                            className="group rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 animate-in fade-in slide-in-from-bottom"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg font-black tracking-tight leading-tight">
                                            {agency.name}
                                        </CardTitle>
                                        <p className="text-sm font-semibold text-muted-foreground mt-1">
                                            {agency.city}
                                        </p>
                                    </div>
                                </div>

                                {/* Price Badge */}
                                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-muted-foreground">Tarif</span>
                                        <span className="text-2xl font-black text-primary">
                                            {parseInt(agency.price).toLocaleString()}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-muted-foreground">FCFA</span>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 transition-colors hover:bg-secondary">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm mb-1">Adresse</p>
                                            <p className="text-sm text-muted-foreground font-medium">
                                                {agency.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 transition-colors hover:bg-secondary">
                                        <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm mb-1">Téléphone</p>
                                            <a
                                                href={`tel:${agency.phone}`}
                                                className="text-sm text-primary hover:underline font-semibold"
                                            >
                                                {agency.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm mb-1">Horaires</p>
                                            <span className="text-sm text-muted-foreground font-medium">
                                                {agency.hours}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center gap-5">
                                    <Button
                                        onClick={() => openGoogleMaps(agency.coordinates.lat, agency.coordinates.lng)}
                                        className="w-full rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all h-12"
                                    >
                                        <Navigation className="mr-2 h-5 w-5" />
                                        Voir l'itinéraire
                                    </Button>

                                    <Button
                                        className="w-full rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all h-12"
                                        onClick={() => {
                                            setSelectedAgency(agency.name);
                                            setRdvDialogOpen(true)
                                        }}>
                                        <Calendar className="mr-2 h-5 w-5" />
                                        Prendre Rendez-vous
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/* Empty State */}
                {filterAgencies.length === 0 && (
                    <div className="text-center py-20 animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <GraduationCap className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight">
                            Aucune auto-école trouvée
                        </h3>
                        <p className="text-muted-foreground font-medium max-w-md mx-auto">
                            Essayez de modifier vos critères de recherche ou votre budget
                        </p>
                    </div>
                )}
            </div>
                <RdvDialog
                    isOpen={rdvDialogOpen}
                    onClose={() => setRdvDialogOpen(false)}
                    agencyName={selectedAgency}
                />
        </div>
    );
};

export default AutoEcole;