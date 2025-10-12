import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MoreVertical, Trash2, Send, AlertCircle, Share2 } from "lucide-react";
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
import car3 from "@/assets/car-3.jpg";

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
  favorites: number;
  trending?: boolean;
}

const Favorites = () => {
  const [favoriteCars, setFavoriteCars] = useState<CarData[]>([
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
      favorites: 89,
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
      favorites: 156,
    },
  ]);

  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleRemoveFavorite = (carId: string, carName: string) => {
    setFavoriteCars(favoriteCars.filter(car => car.id !== carId));
    toast.success(`${carName} retiré des favoris`);
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

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            Mes Favoris
          </h1>
          <p className="text-muted-foreground text-lg">
            {favoriteCars.length} véhicule{favoriteCars.length > 1 ? 's' : ''} dans vos favoris
          </p>
        </div>

        {/* Favorites Grid */}
        {favoriteCars.length === 0 ? (
          <Card className="p-12 text-center animate-fade-in">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-heading text-2xl font-semibold mb-2">
              Aucun favori pour le moment
            </h3>
            <p className="text-muted-foreground mb-6">
              Ajoutez des véhicules à vos favoris pour les retrouver facilement
            </p>
            <Button variant="default" onClick={() => window.location.href = '/vehicles'}>
              Parcourir les véhicules
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 animate-fade-in">
            {favoriteCars.map((car, index) => (
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
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full"
                    onClick={() => handleRemoveFavorite(car.id, car.name)}
                  >
                    <Trash2 className="h-5 w-5" />
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

                  <Button 
                    variant="default" 
                    className="w-full mt-4"
                    onClick={() => handleViewDetails(car)}
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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

export default Favorites;
