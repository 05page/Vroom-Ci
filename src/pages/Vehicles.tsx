import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MoreVertical, Send, AlertCircle, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarDetailsDialog } from "@/components/CarDetailsDialog";
import { Textarea } from "@/components/ui/textarea";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

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
  const [cars, setCars] = useState<CarData[]>([
    {
      id: "1",
      name: "Mercedes-Benz GLE 350",
      type: "vente",
      price: "50 000 000 Fcfa",
      image: car1,
      images: [car1, car2, car3, car4],
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
      image: car2,
      images: [car2, car1, car4, car3],
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
      image: car3,
      images: [car3, car4, car1, car2],
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
      image: car4,
      images: [car4, car3, car2, car1],
      year: 2024,
      mileage: "8 000 km",
      fuel: "Diesel",
      transmission: "Automatique",
    },
  ]);

  const [filter, setFilter] = useState<"tous" | "vente" | "location">("tous");
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [favorite, setFavorite] = useState<Set<String>>(() => {
    //
    const saved = localStorage.getItem('carFavorites')
    console.log(saved)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  });

  // Ajoutez cet effet pour sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem('carFavorites', JSON.stringify(Array.from(favorite)));
  }, [favorite]);


  const handleFavorite = (carName: string) => {
    setFavorite(prev => {
      const newFavorite = new Set(prev);
      if (newFavorite.has(carName)) {
        newFavorite.delete(carName);
        toast.info(`💔 ${carName} retiré des favoris`)
      } else {
        newFavorite.add(carName);
        toast.success(`⭐ ${carName} ajouté aux favoris`, {
          description: "Retrouvez-le dans votre liste de favoris",
        });
      }
      return newFavorite
    })
  };

  const handleViewDetails = (car: CarData) => {
    setSelectedCar(car);
  };

  const handleContactSeller = () => {
    toast.info("📧 Redirection vers la messagerie...", {
      description: "Vous allez pouvoir discuter avec le vendeur",
    });
  };

  const handleReport = () => {
    toast.warning("⚠️ Signalement envoyé", {
      description: "Notre équipe va examiner votre signalement",
    });
  };

  const handleShare = (carName: string) => {
    toast.success(`🔗 ${carName} partagé !`, {
      description: "Le lien a été copié dans votre presse-papiers",
    });
  };

  const filteredCars = filter === "tous"
    ? cars
    : cars.filter(car => car.type === filter);

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            Nos Véhicules
          </h1>
          <p className="text-muted-foreground text-lg">
            Explorez notre catalogue complet de véhicules
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold">
            {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} disponible{filteredCars.length > 1 ? 's' : ''}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === "tous" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("tous")}
            >
              Tous ({cars.length})
            </Button>
            <Button
              variant={filter === "vente" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("vente")}
            >
              Vente ({cars.filter(c => c.type === "vente").length})
            </Button>
            <Button
              variant={filter === "location" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("location")}
            >
              Location ({cars.filter(c => c.type === "location").length})
            </Button>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
          {filteredCars.map((car, index) => (
            <Card
              key={car.id}
              className="overflow-hidden shadow-card hover:shadow-hover transition-smooth group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={car.type === "vente" ? "bg-primary" : "bg-[hsl(var(--success))]"}>
                    {car.type === "vente" ? "À vendre" : "Location"}
                  </Badge>
                  {car.trending && (
                    <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                      Tendance
                    </Badge>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full"
                  onClick={() => handleFavorite(car.name)}
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${favorite.has(car.name)
                      ? 'fill-red-500 text-red-500'
                      : ''
                      }`}
                  />
                </Button>
              </div>

              <CardContent className="p-6">
                <h3 className="font-heading text-2xl font-semibold mb-2">
                  {car.name}
                </h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  {car.price}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Année</p>
                    <p className="font-medium">{car.year}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kilométrage</p>
                    <p className="font-medium">{car.mileage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carburant</p>
                    <p className="font-medium">{car.fuel}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Transmission</p>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                </div>

                <div className="flex gap-5 justify-around border-t">
                  <div className="flex-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full mt-4">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background w-56">
                        <DropdownMenuItem onClick={handleContactSeller}>
                          <Send className="mr-2 h-4 w-4" />
                          Discuter avec le vendeur
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleReport}>
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Signaler un problème
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(car.name)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Partager
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Button
                    variant="default"
                    className="flex-1 mt-4"
                    onClick={() => handleViewDetails(car)}
                  >
                    Voir les détails
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
  );
};

export default Vehicles;
