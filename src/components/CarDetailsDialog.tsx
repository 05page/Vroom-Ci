import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CarRdvDialog } from "./CarRdvDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  DoorOpen,
  Users,
  FileCheck,
  Shield,
  AlertTriangle,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Heart,
  Share2,
  MapPin,
  Phone,
  Mail,
  Clock,
  TrendingUp,
  Wrench,
  Wind,
  Navigation,
  Camera,
  Zap,
  CircleDot,
  Ban,
  Tag
} from "lucide-react";
import { toast } from "sonner";

interface CarData {
  id: string;
  name: string;
  type: "vente" | "location";
  price: string;
  image: string;
  images?: string[];
  
  // Infos de base
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  couleur?: string;
  nombrePortes?: string;
  nombrePlaces?: string;
  
  // Documents et état
  visiteTechnique?: "valide" | "expire" | "jamais";
  dateVisiteTechnique?: string;
  carteGrise?: "disponible" | "en-cours" | "perdue";
  assurance?: "valide" | "expire";
  accidentHistorique?: "non" | "mineur" | "majeur";
  
  // Équipements
  climatisation?: boolean;
  gps?: boolean;
  siegesCuir?: boolean;
  toitOuvrant?: boolean;
  regulateurVitesse?: boolean;
  camera?: boolean;
  abs?: boolean;
  airbags?: boolean;
  bluetooth?: boolean;
  vitresElectriques?: boolean;
  
  // Prix et vente
  prixNegociable?: "oui" | "non";
  dateVente?: string;
  description?: string;
  
  // Vendeur (optionnel)
  vendeur?: {
    nom: string;
    telephone: string;
    email: string;
    localisation: string;
  };
  
  trending?: boolean;
  vues?: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  car: CarData;
}

export const CarDetailsDialog = ({ isOpen, onClose, car }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRdvDialog, setShowRdvDialog] = useState(false);

  const allImages = car.images || [car.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const navigate = useNavigate();

  const handleFinalizeBooking = () => {
    setShowRdvDialog(true);
  };

  const handleSendCard = () => {
    navigate(`/messages/${car.id}`, {state: {car}})
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const handleShare = () => {
    toast.success("Lien copié dans le presse-papier !");
  };

  const getVisiteTechniqueStatus = () => {
    switch (car.visiteTechnique) {
      case "valide":
        return { icon: CheckCircle2, text: "Valide", color: "text-green-600", bg: "bg-green-500/10" };
      case "expire":
        return { icon: AlertTriangle, text: "Expirée", color: "text-orange-600", bg: "bg-orange-500/10" };
      case "jamais":
        return { icon: X, text: "Jamais effectuée", color: "text-red-600", bg: "bg-red-500/10" };
      default:
        return { icon: AlertTriangle, text: "Non renseignée", color: "text-gray-600", bg: "bg-gray-500/10" };
    }
  };

  const getCarteGriseStatus = () => {
    switch (car.carteGrise) {
      case "disponible":
        return { icon: CheckCircle2, text: "Disponible", color: "text-green-600" };
      case "en-cours":
        return { icon: Clock, text: "En cours", color: "text-orange-600" };
      case "perdue":
        return { icon: AlertTriangle, text: "Perdue", color: "text-red-600" };
      default:
        return { icon: AlertTriangle, text: "Non renseignée", color: "text-gray-600" };
    }
  };

  const getAccidentStatus = () => {
    switch (car.accidentHistorique) {
      case "non":
        return { icon: CheckCircle2, text: "Aucun accident", color: "text-green-600", bg: "bg-green-500/10" };
      case "mineur":
        return { icon: Wrench, text: "Accident mineur (réparé)", color: "text-orange-600", bg: "bg-orange-500/10" };
      case "majeur":
        return { icon: AlertTriangle, text: "Accident majeur (réparé)", color: "text-red-600", bg: "bg-red-500/10" };
      default:
        return { icon: AlertTriangle, text: "Non renseigné", color: "text-gray-600", bg: "bg-gray-500/10" };
    }
  };

  const equipements = [
    { key: "climatisation", label: "Climatisation", icon: Wind },
    { key: "gps", label: "GPS / Navigation", icon: Navigation },
    { key: "siegesCuir", label: "Sièges en cuir", icon: CircleDot },
    { key: "toitOuvrant", label: "Toit ouvrant", icon: DoorOpen },
    { key: "regulateurVitesse", label: "Régulateur de vitesse", icon: Gauge },
    { key: "camera", label: "Caméra de recul", icon: Camera },
    { key: "abs", label: "ABS", icon: Shield },
    { key: "airbags", label: "Airbags", icon: Shield },
    { key: "bluetooth", label: "Bluetooth", icon: Zap },
    { key: "vitresElectriques", label: "Vitres électriques", icon: DoorOpen },
  ];

  const equipementsPresents = equipements.filter(eq => car[eq.key as keyof CarData]);

  const visiteTechStatus = getVisiteTechniqueStatus();
  const carteGriseStatus = getCarteGriseStatus();
  const accidentStatus = getAccidentStatus();

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] sm:max-w-[95vw] md:max-w-5xl max-h-[95vh] overflow-y-auto p-0 rounded-2xl sm:rounded-3xl">
        {/* Image Carousel */}
        <div className="relative h-[200px] sm:h-[300px] md:h-[450px] w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          <img
            src={allImages[currentImageIndex]}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                size="icon"
                variant="secondary"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-xl z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-xl z-10"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                <p className="text-white font-bold text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </p>
              </div>
            </>
          )}

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

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              size="icon"
              className="rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all"
              onClick={handleFavorite}
            >
              <Heart className={`h-5 w-5 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} />
            </Button>
          </div>

          {/* Car Name & Price Overlay */}
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-10 text-white">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-lg mb-1 sm:mb-2 line-clamp-2">
              {car.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <p className="text-xl sm:text-3xl font-black drop-shadow-lg">{car.price}</p>
              {car.prixNegociable === "oui" ? (
                <Badge className="bg-yellow-500 text-black font-bold text-xs sm:text-sm">Négociable</Badge>
              ): (
                <Badge className="bg-red-500 text-black font-bold text-xs sm:text-sm">Non négociable</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-8">
          {/* Vues et date */}
          {(car.vues || car.dateVente) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-semibold">
              {car.vues && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{car.vues} vues</span>
                </div>
              )}
              {car.dateVente && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Disponible {car.dateVente}</span>
                </div>
              )}
            </div>
          )}

          {/* Caractéristiques principales */}
          <div>
            <h3 className="text-base sm:text-xl font-black mb-3 sm:mb-4 flex items-center gap-2">
              <Car className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Caractéristiques principales
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-border hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase mb-0.5 sm:mb-1">Année</p>
                <p className="font-black text-sm sm:text-lg">{car.year}</p>
              </div>

              <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-border hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase mb-0.5 sm:mb-1">Kilométrage</p>
                <p className="font-black text-sm sm:text-lg">{car.mileage}</p>
              </div>

              <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-border hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Fuel className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase mb-0.5 sm:mb-1">Carburant</p>
                <p className="font-black text-sm sm:text-lg">{car.fuel}</p>
              </div>

              <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-border hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase mb-0.5 sm:mb-1">Transmission</p>
                <p className="font-black text-sm sm:text-lg">{car.transmission}</p>
              </div>

              {car.couleur && (
                <div className="bg-secondary/50 rounded-2xl p-4 border-2 border-border hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Couleur</p>
                  <p className="font-black text-lg">{car.couleur}</p>
                </div>
              )}

              {car.nombrePortes && (
                <div className="bg-secondary/50 rounded-2xl p-4 border-2 border-border hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <DoorOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Portes</p>
                  <p className="font-black text-lg">{car.nombrePortes}</p>
                </div>
              )}

              {car.nombrePlaces && (
                <div className="bg-secondary/50 rounded-2xl p-4 border-2 border-border hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Places</p>
                  <p className="font-black text-lg">{car.nombrePlaces}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Documents et état du véhicule */}
          <div>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-primary" />
              Documents et état
            </h3>
            <div className="space-y-4">
              {/* Visite technique */}
              <div className={`${visiteTechStatus.bg} rounded-2xl p-4 border-2 border-border`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <visiteTechStatus.icon className={`h-6 w-6 ${visiteTechStatus.color}`} />
                    <div>
                      <p className="font-bold text-sm text-muted-foreground uppercase">Visite technique</p>
                      <p className={`font-black text-lg ${visiteTechStatus.color}`}>{visiteTechStatus.text}</p>
                    </div>
                  </div>
                  {car.dateVisiteTechnique && car.visiteTechnique === "valide" && (
                    <Badge variant="outline" className="font-bold">
                      Valide jusqu'au {new Date(car.dateVisiteTechnique).toLocaleDateString('fr-FR')}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Carte grise */}
              <div className="bg-secondary/50 rounded-2xl p-4 border-2 border-border">
                <div className="flex items-center gap-3">
                  <carteGriseStatus.icon className={`h-6 w-6 ${carteGriseStatus.color}`} />
                  <div>
                    <p className="font-bold text-sm text-muted-foreground uppercase">Carte grise</p>
                    <p className={`font-black text-lg ${carteGriseStatus.color}`}>{carteGriseStatus.text}</p>
                  </div>
                </div>
              </div>

              {/* Assurance */}
              {car.assurance && (
                <div className="bg-secondary/50 rounded-2xl p-4 border-2 border-border">
                  <div className="flex items-center gap-3">
                    <Shield className={`h-6 w-6 ${car.assurance === "valide" ? "text-green-600" : "text-orange-600"}`} />
                    <div>
                      <p className="font-bold text-sm text-muted-foreground uppercase">Assurance</p>
                      <p className={`font-black text-lg ${car.assurance === "valide" ? "text-green-600" : "text-orange-600"}`}>
                        {car.assurance === "valide" ? "Valide" : "Expirée"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Historique accident */}
              <div className={`${accidentStatus.bg} rounded-2xl p-4 border-2 border-border`}>
                <div className="flex items-center gap-3">
                  <accidentStatus.icon className={`h-6 w-6 ${accidentStatus.color}`} />
                  <div>
                    <p className="font-bold text-sm text-muted-foreground uppercase">Historique d'accident</p>
                    <p className={`font-black text-lg ${accidentStatus.color}`}>{accidentStatus.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Équipements */}
          {equipementsPresents.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  Équipements et options ({equipementsPresents.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {equipementsPresents.map((eq) => {
                    const Icon = eq.icon;
                    return (
                      <div key={eq.key} className="flex items-center gap-3 bg-green-500/10 rounded-xl p-3 border border-green-500/20">
                        <Icon className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="font-bold text-sm">{eq.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Description */}
          {car.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-black mb-4">Description</h3>
                <p className="text-muted-foreground font-medium leading-relaxed whitespace-pre-line">
                  {car.description}
                </p>
              </div>
            </>
          )}

          {/* Informations vendeur */}
          {car.vendeur && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Informations du vendeur
                </h3>
                <div className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-black text-lg">
                        {car.vendeur.nom.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-lg">{car.vendeur.nom}</p>
                      <p className="text-sm text-muted-foreground font-semibold">Vendeur particulier</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{car.vendeur.telephone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{car.vendeur.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{car.vendeur.localisation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sticky bottom-0 bg-background/95 backdrop-blur-xl pb-2 border-t-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:flex-1 rounded-xl font-bold border-2 hover:scale-105 transition-all h-11 sm:h-14 text-sm sm:text-base order-3 sm:order-1"
            >
              Fermer
            </Button>
            {car.prixNegociable === "oui" && car.vendeur && (
              <Button
                variant="outline" 
                onClick={handleSendCard}
                className="w-full sm:flex-1 rounded-xl font-bold border-2 hover:scale-105 transition-all h-11 sm:h-14 text-sm sm:text-base order-2"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                <span className="truncate">Discuter avec {car.vendeur.nom}</span>
              </Button>
            )}
            <Button
              onClick={handleFinalizeBooking}
              className="w-full sm:flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all h-11 sm:h-14 text-sm sm:text-base order-1 sm:order-3"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
              {car.type === "vente" ? "Finaliser l'achat" : "Réserver"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Dialog RDV */}
    <CarRdvDialog
      isOpen={showRdvDialog}
      onClose={() => setShowRdvDialog(false)}
      car={car}
    />
    </>
  );
};