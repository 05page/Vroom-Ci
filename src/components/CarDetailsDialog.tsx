import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  car: {
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
    availability?: string;
  };
}

export const CarDetailsDialog = ({ isOpen, onClose, car }: CarDetailsDialogProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carImages = car.images || [car.image];

  const handleBooking = () => {
    navigate(`/booking/${car.id}`, { state: { car } });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl">{car.name}</DialogTitle>
          <DialogDescription>
            Informations détaillées du véhicule
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={carImages[currentImageIndex]}
              alt={`${car.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-80 object-cover transition-smooth"
            />
            <Badge className={`absolute top-4 left-4 ${car.type === "vente" ? "bg-primary" : "bg-[hsl(var(--success))]"}`}>
              {car.type === "vente" ? "À vendre" : "Location"}
            </Badge>
            
            {carImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-primary w-6"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {carImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {carImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-smooth ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.name} - Miniature ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div>
            <h3 className="font-heading text-2xl font-semibold mb-2">Prix</h3>
            <p className="text-4xl font-bold text-primary">{car.price}</p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-3">Caractéristiques</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Année</p>
                <p className="font-semibold text-lg">{car.year}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Kilométrage</p>
                <p className="font-semibold text-lg">{car.mileage}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Carburant</p>
                <p className="font-semibold text-lg">{car.fuel}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-muted-foreground text-sm mb-1">Transmission</p>
                <p className="font-semibold text-lg">{car.transmission}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">Disponibilité</h3>
            <Badge variant="secondary" className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]">
              {car.availability || "Disponible immédiatement"}
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={handleBooking}
            >
              {car.type === "vente" ? "Acheter maintenant" : "Réserver maintenant"}
            </Button>
              <Button variant="ghost" size="lg" onClick={onClose}>
                Fermer
              </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
