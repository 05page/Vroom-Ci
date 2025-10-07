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
  likes: number;
  comments: number;
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
      likes: 245,
      comments: 38,
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
      likes: 387,
      comments: 62,
      favorites: 156,
    },
  ]);

  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleLike = (carId: string) => {
    setFavoriteCars(favoriteCars.map(car => 
      car.id === carId ? { ...car, likes: car.likes + 1 } : car
    ));
    toast.success("J'aime ajouté !");
  };

  const handleRemoveFavorite = (carId: string, carName: string) => {
    setFavoriteCars(favoriteCars.filter(car => car.id !== carId));
    toast.success(`${carName} retiré des favoris`);
  };

  const handleViewDetails = (car: CarData) => {
    setSelectedCar(car);
  };

  const handleAddComment = (carId: string) => {
    if (!newComment.trim()) return;
    
    setFavoriteCars(favoriteCars.map(car => 
      car.id === carId ? { ...car, comments: car.comments + 1 } : car
    ));
    toast.success("Commentaire ajouté !");
    setNewComment("");
    setShowComments(null);
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

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(car.id)}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Heart className="h-4 w-4 fill-primary" />
                      <span className="font-medium">{car.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowComments(showComments === car.id ? null : car.id)}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="font-medium">{car.comments}</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background">
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

                  {/* Comment Section */}
                  {showComments === car.id && (
                    <div className="mt-4 p-4 bg-secondary/20 rounded-lg space-y-3">
                      <h4 className="font-semibold text-sm">Ajouter un commentaire</h4>
                      <Textarea
                        placeholder="Votre commentaire..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleAddComment(car.id)}
                        className="w-full"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer
                      </Button>
                    </div>
                  )}

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
