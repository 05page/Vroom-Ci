import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Send, AlertCircle, Share2, Search, ArrowLeft, Car, Eye, Fuel, Gauge, Calendar, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarDetailsDialog } from "@/components/CarDetailsDialog";

interface CarData {
  id: string;
  name: string;
  type: "vente" | "location";
  price: string;
  image: string;
  images?: string[];
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  trending?: boolean;
}

const Vehicles = () => {
  const [cars] = useState<CarData[]>([
    {
      id: "1",
      name: "Mercedes-Benz GLE 350",
      type: "vente",
      price: "50 000 000 Fcfa",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      year: 2023,
      mileage: "12 000 km",
      fuel: "Hybride",
      transmission: "Automatique",
      trending: true,
    },
    {
      id: "2",
      name: "Porsche 911 Carrera",
      type: "vente",
      price: "250 000 000 Fcfa",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      year: 2024,
      mileage: "5 000 km",
      fuel: "Essence",
      transmission: "Automatique",
      trending: true,
    },
    {
      id: "3",
      name: "Tesla Model 3",
      type: "location",
      price: "35 000 Fcfa/jour",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
      year: 2023,
      mileage: "25 000 km",
      fuel: "Électrique",
      transmission: "Automatique",
    },
    {
      id: "4",
      name: "BMW X5 M Sport",
      type: "location",
      price: "50 000 Fcfa/jour",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      year: 2024,
      mileage: "8 000 km",
      fuel: "Diesel",
      transmission: "Automatique",
    },
  ]);

  const [filter, setFilter] = useState<"tous" | "vente" | "location">("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleFavorite = (carId: string, carName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
        toast.info(`${carName} retiré des favoris`);
      } else {
        newFavorites.add(carId);
        toast.success(`${carName} ajouté aux favoris`);
      }
      return newFavorites;
    });
  };

  const handleViewDetails = (car: CarData) => {
    setSelectedCar(car);
  };

  const handleContactSeller = () => {
    toast.info("Redirection vers la messagerie...");
  };

  const handleReport = () => {
    toast.warning("Signalement envoyé");
  };

  const handleShare = (carName: string) => {
    toast.success(`${carName} partagé !`);
  };

  const filteredCars = cars
    .filter(car => filter === "tous" ? true : car.type === filter)
    .filter(car => 
      searchQuery === "" ? true : 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.transmission.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              Nos Véhicules
            </h1>
            <p className="text-muted-foreground font-semibold">
              Explorez notre catalogue complet de véhicules premium
            </p>
          </div>

          {/* Search and Filters Section */}
          <Card className="rounded-3xl shadow-lg border-none p-6 animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "100ms" }}>
            <div className="space-y-5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par marque, modèle, carburant..."
                  className="pl-12 h-12 rounded-2xl border-2 font-semibold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="font-black text-lg">
                    {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filter === "tous" ? "default" : "outline"}
                    className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
                    onClick={() => setFilter("tous")}
                  >
                    Tous ({cars.length})
                  </Button>
                  <Button
                    variant={filter === "vente" ? "default" : "outline"}
                    className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
                    onClick={() => setFilter("vente")}
                  >
                    Vente ({cars.filter(c => c.type === "vente").length})
                  </Button>
                  <Button
                    variant={filter === "location" ? "default" : "outline"}
                    className={`rounded-xl font-bold border-2 hover:scale-105 transition-all ${
                      filter === "location" ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                    onClick={() => setFilter("location")}
                  >
                    Location ({cars.filter(c => c.type === "location").length})
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Cars Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredCars.map((car, index) => (
              <Card
                key={car.id}
                className="rounded-3xl shadow-lg border-none overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Image Section with Overlay */}
                <div className="relative overflow-hidden h-72 group">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <Badge className={`font-bold rounded-full shadow-lg ${
                      car.type === "vente" ? "bg-primary" : "bg-green-600"
                    }`}>
                      {car.type === "vente" ? "À vendre" : "Location"}
                    </Badge>
                    {car.trending && (
                      <Badge className="bg-red-500 text-white font-bold rounded-full shadow-lg animate-pulse">
                        🔥 Tendance
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all z-10"
                    onClick={() => handleFavorite(car.id, car.name)}
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${
                        favorites.has(car.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </Button>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-white text-2xl font-black tracking-tight drop-shadow-lg">
                      {car.name}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6 space-y-5">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                        Prix
                      </p>
                      <p className="text-3xl font-black text-primary">
                        {car.price}
                      </p>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t-2">
                    <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Année</p>
                        <p className="font-black text-sm">{car.year}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Gauge className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Km</p>
                        <p className="font-black text-sm">{car.mileage}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Fuel className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Carburant</p>
                        <p className="font-black text-sm">{car.fuel}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Boîte</p>
                        <p className="font-black text-sm">{car.transmission}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-xl font-bold border-2 hover:scale-105 transition-all h-12"
                        >
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background w-64 rounded-2xl border-2">
                        <DropdownMenuItem 
                          onClick={handleContactSeller}
                          className="rounded-xl font-semibold cursor-pointer p-3"
                        >
                          <Send className="mr-3 h-5 w-5" />
                          Contacter le vendeur
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleReport}
                          className="rounded-xl font-semibold cursor-pointer p-3"
                        >
                          <AlertCircle className="mr-3 h-5 w-5" />
                          Signaler un problème
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleShare(car.name)}
                          className="rounded-xl font-semibold cursor-pointer p-3"
                        >
                          <Share2 className="mr-3 h-5 w-5" />
                          Partager
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all h-12"
                      onClick={() => handleViewDetails(car)}
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedCar && (
            <CarDetailsDialog
              isOpen={!!selectedCar}
              onClose={() => setSelectedCar(null)}
              car={selectedCar}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;