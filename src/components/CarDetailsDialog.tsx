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

interface CarDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  car: {
    id: string;
    name: string;
    type: "vente" | "location";
    price: string;
    image: string;
    year: number;
    mileage: string;
    fuel: string;
    transmission: string;
    availability?: string;
  };
}

export const CarDetailsDialog = ({ isOpen, onClose, car }: CarDetailsDialogProps) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${car.id}`, { state: { car } });
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
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-80 object-cover"
            />
            <Badge className={`absolute top-4 left-4 ${car.type === "vente" ? "bg-primary" : "bg-[hsl(var(--success))]"}`}>
              {car.type === "vente" ? "À vendre" : "Location"}
            </Badge>
          </div>

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

          <div className="flex gap-3 pt-4">
            <Button
              variant="default"
              size="lg"
              className="flex-1"
              onClick={handleBooking}
            >
              {car.type === "vente" ? "Acheter" : "Louer"}
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
