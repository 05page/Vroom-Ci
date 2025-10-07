import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, Eye } from "lucide-react";
import { toast } from "sonner";
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
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  likes: number;
  comments: number;
  favorites: number;
  trending?: boolean;
}

const Vehicles = () => {
  const [cars] = useState<CarData[]>([
    {
      id: "1",
      name: "Mercedes-Benz GLE 350",
      type: "vente",
      price: "68 500 €",
      image: car1,
      year: 2023,
      mileage: "12 000 km",
      fuel: "Hybride",
      transmission: "Automatique",
      likes: 245,
      comments: 38,
      favorites: 89,
      trending: true,
    },
    {
      id: "2",
      name: "Porsche 911 Carrera",
      type: "vente",
      price: "125 000 €",
      image: car2,
      year: 2024,
      mileage: "5 000 km",
      fuel: "Essence",
      transmission: "Automatique",
      likes: 512,
      comments: 94,
      favorites: 203,
      trending: true,
    },
    {
      id: "3",
      name: "Tesla Model 3",
      type: "location",
      price: "89 €/jour",
      image: car3,
      year: 2023,
      mileage: "25 000 km",
      fuel: "Électrique",
      transmission: "Automatique",
      likes: 387,
      comments: 62,
      favorites: 156,
    },
    {
      id: "4",
      name: "BMW X5 M Sport",
      type: "location",
      price: "120 €/jour",
      image: car4,
      year: 2024,
      mileage: "8 000 km",
      fuel: "Diesel",
      transmission: "Automatique",
      likes: 298,
      comments: 45,
      favorites: 124,
    },
  ]);

  const [filter, setFilter] = useState<"tous" | "vente" | "location">("tous");

  const handleLike = (carName: string) => {
    toast.success(`Vous aimez ${carName}`);
  };

  const handleFavorite = (carName: string) => {
    toast.success(`${carName} ajouté aux favoris`);
  };

  const handleViewDetails = (carName: string) => {
    toast.info(`Détails de ${carName}`);
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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-semibold">
            {filteredCars.length} véhicules disponibles
          </h2>
          <div className="flex gap-2">
            <Button 
              variant={filter === "vente" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("vente")}
            >
              Vente
            </Button>
            <Button 
              variant={filter === "location" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("location")}
            >
              Location
            </Button>
            <Button 
              variant={filter === "tous" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("tous")}
            >
              Tous
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
                  <Heart className="h-5 w-5" />
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

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(car.name)}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">{car.likes}</span>
                  </Button>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{car.comments}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">{car.favorites}</span>
                  </div>
                </div>

                <Button 
                  variant="default" 
                  className="w-full mt-4"
                  onClick={() => handleViewDetails(car.name)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir les détails
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
