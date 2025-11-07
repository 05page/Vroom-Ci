import { useState } from "react";
import { MapPin, Phone, Clock, Navigation, ArrowLeft, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Locations = () => {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const agencies = [
    {
      name: "VROOM Abidjan Plateau",
      address: "Boulevard Clozel, Plateau",
      city: "Abidjan",
      phone: "+225 27 20 30 40 50",
      hours: "Lun-Sam: 8h-18h",
      coordinates: { lat: 5.3164, lng: -4.0305 },
    },
    {
      name: "VROOM Abidjan Cocody",
      address: "Cocody Riviera 2",
      city: "Abidjan",
      phone: "+225 27 20 30 40 51",
      hours: "Lun-Sam: 8h-18h",
      coordinates: { lat: 5.3599, lng: -3.9810 },
    },
    {
      name: "VROOM Abidjan Yopougon",
      address: "Yopougon Sicogi",
      city: "Abidjan",
      phone: "+225 27 20 30 40 52",
      hours: "Lun-Sam: 8h-18h",
      coordinates: { lat: 5.3364, lng: -4.0886 },
    },
    {
      name: "VROOM Bouaké Centre",
      address: "Avenue Général de Gaulle",
      city: "Bouaké",
      phone: "+225 27 31 60 70 80",
      hours: "Lun-Sam: 8h-18h",
      coordinates: { lat: 7.6900, lng: -5.0300 },
    },
    {
      name: "VROOM San Pedro",
      address: "Boulevard du Port",
      city: "San Pedro",
      phone: "+225 27 34 71 80 90",
      hours: "Lun-Sam: 8h-18h",
      coordinates: { lat: 4.7500, lng: -6.6333 },
    },
    {
      name: "VROOM Yamoussoukro",
      address: "Boulevard Houphouët-Boigny",
      city: "Yamoussoukro",
      phone: "+225 27 30 64 50 60",
      hours: "Lun-Sam: 8h-18h",
      coordinates: { lat: 6.8206, lng: -5.2767 },
    },
  ];

  const cities = ["all", ...new Set(agencies.map((a) => a.city))];

  const filteredAgencies = agencies.filter((agency) => {
    const matchesCity = selectedCity === "all" || agency.city === selectedCity;
    const matchesSearch = agency.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      agency.address.toLowerCase().includes(searchCity.toLowerCase()) ||
      agency.city.toLowerCase().includes(searchCity.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">VROOM</h1>
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nos Agences</h1>
          <p className="text-muted-foreground">
            Trouvez l'agence VROOM la plus proche de vous
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <Input
              placeholder="Rechercher une agence..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {cities.filter(c => c !== "all").map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Agencies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-lg">{agency.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{agency.address}</p>
                      <p className="text-muted-foreground">{agency.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${agency.phone}`}
                      className="text-primary hover:underline"
                    >
                      {agency.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{agency.hours}</span>
                  </div>
                </div>

                <Button
                  onClick={() => openGoogleMaps(agency.coordinates.lat, agency.coordinates.lng)}
                  className="w-full"
                  variant="outline"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Itinéraire
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              Aucune agence trouvée pour votre recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;
