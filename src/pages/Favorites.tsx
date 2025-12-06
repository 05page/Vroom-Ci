import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Send, AlertCircle, Share2, ArrowLeft, Car, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarDetailsDialog } from "@/components/CarDetailsDialog";
import car1 from "@/assets/car-1.jpg";
import car3 from "@/assets/car-3.jpg";
import Header from "@/components/Header";
import SuccessDialog from "@/components/SuccessDialog";

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
  const navigate = useNavigate();
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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

  const handleRemoveFavorite = (carId: string, carName: string) => {
    setFavoriteCars(favoriteCars.filter(car => car.id !== carId));
    setDialogMessage({ title: "Retiré des favoris", description: `${carName} a été retiré de vos favoris` });
    setShowSuccessDialog(true);
  };

  const handleViewDetails = (car: CarData) => {
    setSelectedCar(car);
  };

  const handleContactSeller = () => {
    setDialogMessage({ title: "Redirection", description: "Redirection vers la messagerie..." });
    setShowInfoDialog(true);
  };

  const handleReport = () => {
    setDialogMessage({ title: "Signalement envoyé", description: "Votre signalement a été pris en compte" });
    setShowWarningDialog(true);
  };

  const handleShare = (carName: string) => {
    setDialogMessage({ title: "Partagé !", description: `${carName} a été partagé avec succès` });
    setShowSuccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <Header/>

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              Mes Favoris
            </h1>
            <p className="text-muted-foreground font-semibold">
              {favoriteCars.length} véhicule{favoriteCars.length > 1 ? 's' : ''} dans vos favoris
            </p>
          </div>

          {/* Favorites Grid */}
          {favoriteCars.length === 0 ? (
            <Card className="rounded-3xl shadow-lg border-none p-12 text-center animate-in fade-in slide-in-from-bottom duration-500">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-3">
                Aucun favori pour le moment
              </h3>
              <p className="text-muted-foreground font-semibold mb-8 max-w-md mx-auto">
                Ajoutez des véhicules à vos favoris pour les retrouver facilement
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/vehicles')}
                className="rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
              >
                Parcourir les véhicules
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {favoriteCars.map((car, index) => (
                <Card
                  key={car.id}
                  className="rounded-3xl shadow-lg border-none overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`font-bold rounded-full ${car.type === "vente" ? "bg-primary" : "bg-green-600"}`}>
                        {car.type === "vente" ? "À vendre" : "Location"}
                      </Badge>
                      {car.trending && (
                        <Badge className="bg-red-500 text-white font-bold rounded-full">
                          Tendance
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full shadow-lg hover:scale-110 transition-all"
                      onClick={() => handleRemoveFavorite(car.id, car.name)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2">
                        {car.name}
                      </h3>
                      <p className="text-3xl font-black text-primary">
                        {car.price}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Année</p>
                        <p className="font-black text-lg">{car.year}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Kilométrage</p>
                        <p className="font-black text-lg">{car.mileage}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Carburant</p>
                        <p className="font-black text-lg">{car.fuel}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Transmission</p>
                        <p className="font-black text-lg">{car.transmission}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="flex-1 rounded-xl font-bold border-2 hover:scale-105 transition-all"
                          >
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background w-56 rounded-2xl border-2">
                          <DropdownMenuItem 
                            onClick={handleContactSeller}
                            className="rounded-xl font-semibold cursor-pointer"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Discuter avec le vendeur
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={handleReport}
                            className="rounded-xl font-semibold cursor-pointer"
                          >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Signaler un problème
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleShare(car.name)}
                            className="rounded-xl font-semibold cursor-pointer"
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Partager
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                        onClick={() => handleViewDetails(car)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                    </div>
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

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title={dialogMessage.title}
        description={dialogMessage.description}
        variant="success"
      />

      <SuccessDialog
        isOpen={showInfoDialog}
        onClose={() => setShowInfoDialog(false)}
        title={dialogMessage.title}
        description={dialogMessage.description}
        variant="info"
      />

      <SuccessDialog
        isOpen={showWarningDialog}
        onClose={() => setShowWarningDialog(false)}
        title={dialogMessage.title}
        description={dialogMessage.description}
        variant="warning"
      />
    </div>
  );
};

export default Favorites;