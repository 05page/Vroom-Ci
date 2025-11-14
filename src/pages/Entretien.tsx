import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Navigation, Phone, Wrench, Car, Search } from "lucide-react";

const EntretienAgences = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("all");
    const [selectedService, setSelectedService] = useState("all");

    const agencies = [
        {
            name: "VROOM Abidjan Plateau",
            address: "Boulevard Clozel, Plateau",
            city: "Abidjan",
            phone: "+225 27 20 30 40 50",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 5.3164, lng: -4.0305 },
            services: ["Vidange", "Freinage", "Climatisation", "Diagnostic"],
            image: "https://images.unsplash.com/photo-1632823469700-f2fcfc54e3ec?w=800&auto=format&fit=crop"
        },
        {
            name: "VROOM Abidjan Cocody",
            address: "Cocody Riviera 2",
            city: "Abidjan",
            phone: "+225 27 20 30 40 51",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 5.3599, lng: -3.9810 },
            services: ["Vidange", "Pneus", "Électricité", "Carrosserie"],
            image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&auto=format&fit=crop"
        },
        {
            name: "VROOM Abidjan Yopougon",
            address: "Yopougon Sicogi",
            city: "Abidjan",
            phone: "+225 27 20 30 40 52",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 5.3364, lng: -4.0886 },
            services: ["Mécanique générale", "Freinage", "Suspension"],
            image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop"
        },
        {
            name: "VROOM Bouaké Centre",
            address: "Avenue Général de Gaulle",
            city: "Bouaké",
            phone: "+225 27 31 60 70 80",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 7.6900, lng: -5.0300 },
            services: ["Vidange", "Diagnostic", "Climatisation"],
            image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop"
        },
        {
            name: "VROOM San Pedro",
            address: "Boulevard du Port",
            city: "San Pedro",
            phone: "+225 27 34 71 80 90",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 4.7500, lng: -6.6333 },
            services: ["Mécanique générale", "Pneus", "Électricité"],
            image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop"
        },
        {
            name: "VROOM Yamoussoukro",
            address: "Boulevard Houphouët-Boigny",
            city: "Yamoussoukro",
            phone: "+225 27 30 64 50 60",
            hours: "Lun-Sam: 8h-18h",
            coordinates: { lat: 6.8206, lng: -5.2767 },
            services: ["Vidange", "Freinage", "Diagnostic", "Carrosserie"],
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop"
        },
    ];

    const cities = ["all", ...new Set(agencies.map((a) => a.city))];
    const services = ["all", ...new Set(agencies.flatMap((s)=> s.services))]
    const filteredAgencies = agencies.filter((agency) => {
        const matchesCity = selectedCity === "all" || agency.city === selectedCity;
        const matchesService = selectedService === "all" || agency.services.includes(selectedService);
        const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCity && matchesSearch && matchesService;
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
                    <Button variant="ghost" onClick={() => window.history.back()} className="font-bold rounded-xl hover:bg-primary/10">
                        Retour
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Wrench className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Service d'entretien{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            VROOM
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
                        Trouvez un centre d'entretien près de chez vous et prenez rendez-vous en ligne
                    </p>
                </div>

                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
                    <div className="relative">
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher une agence ou une ville..."
                            className="h-14 pl-12 rounded-2xl border-2 font-medium"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger className="h-14 rounded-2xl border-2 font-medium">
                            <MapPin className="h-5 w-5 mr-2 text-primary" />
                            <SelectValue placeholder="Sélectionnez une ville" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes les villes</SelectItem>
                            {cities.filter(c => c !== "all").map((city) => (
                                <SelectItem key={city} value={city} className="font-medium">
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="h-14 rounded-2xl border-2 font-medium">
                            <MapPin className="h-5 w-5 mr-2 text-primary" />
                            <SelectValue placeholder="Sélectionnez une ville" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les services</SelectItem>
                            {services.filter(s => s !== "all").map((services) => (
                                <SelectItem key={services} value={services} className="font-medium">
                                    {services}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Results Count */}
                <div className="mb-8 text-center">
                    <p className="text-muted-foreground font-semibold">
                        {filteredAgencies.length} centre{filteredAgencies.length > 1 ? 's' : ''} d'entretien disponible{filteredAgencies.length > 1 ? 's' : ''}
                    </p>
                </div>

                {/* Agencies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgencies.map((agency, index) => (
                        <Card
                            key={index}
                            className="group rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 animate-in fade-in slide-in-from-bottom"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <Wrench className="h-6 w-6 text-primary" />
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

                                {/* Services proposés */}
                                <div className="flex flex-wrap gap-2">
                                    {agency.services.slice(0, 3).map((service, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                    {agency.services.length > 3 && (
                                        <span className="text-xs font-semibold bg-secondary text-muted-foreground px-3 py-1 rounded-full">
                                            +{agency.services.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="relative w-full h-48 overflow-hidden rounded-2xl mb-4">
                                    <img
                                        src={agency.image}
                                        alt={agency.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
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

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        onClick={() => openGoogleMaps(agency.coordinates.lat, agency.coordinates.lng)}
                                        className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                                    >
                                        <Navigation className="mr-2 h-5 w-5" />
                                        Itinéraire
                                    </Button>
                                    <Button
                                        className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                                    >
                                        <Calendar className="mr-2 h-5 w-5" />
                                        Prendre RDV
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredAgencies.length === 0 && (
                    <div className="text-center py-20 animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Wrench className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black mb-3 tracking-tight">
                            Aucun centre trouvé
                        </h3>
                        <p className="text-muted-foreground font-medium max-w-md mx-auto">
                            Essayez de modifier vos critères de recherche ou votre ville
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntretienAgences;