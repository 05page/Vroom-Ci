import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Send, AlertCircle, Share2, Search, ArrowLeft, Car, Eye, Fuel, Gauge, Calendar, Settings, Building2, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarDetailsDialog } from "@/components/CarDetailsDialog";
import Header from "@/components/Header";
import SuccessDialog from "@/components/SuccessDialog";

interface CarData {
  id: string;
  name: string;
  type: "vente" | "location";
  price: string;
  image: string;
  images?: string[];
  //Infos de bases
  year: number;
  mileage: string;
  fuel: string;
  transmission: string;
  couleur: string;
  nombrePortes: string;
  nombrePlaces: string;
  //Documents et état
  visiteTechnique: "valide" | "expire" | "jamais";
  dateVisiteTechnique: string;
  carteGrise: "disponible" | "en-cours" | "perdue";
  assurance: "valide" | "expire";
  accidentHistorique: "non" | "mineur" | "majeur";
  //Equipements et options
  climatisation: boolean;
  gps: boolean;
  siegesCuir: boolean;
  toitOuvrant: boolean;
  regulateurVitesse: boolean;
  camera: boolean;
  abs: boolean;
  airbags: boolean;
  bluetooth: boolean;
  vitresElectriques: boolean;
  // Prix et vente
  prixNegociable: "oui" | "non";
  dateVente: string;
  description: string;

  // Vendeur
  vendeur: {
    nom: string;
    telephone: string;
    email: string;
    localisation: string;
    type: "particulier" | "partenaire";
  };

  trending?: boolean;
  vues?: number;
}

const Vehicles = () => {
  const [cars] = useState<CarData[]>([
    {
      id: "1",
      name: "Mercedes-Benz GLE 350",
      type: "vente",
      price: "50 000 000 Fcfa",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      ],
      year: 2023,
      mileage: "12 000 km",
      fuel: "Hybride",
      transmission: "Automatique",
      couleur: "Noir métallisé",
      nombrePortes: "5",
      nombrePlaces: "5",
      visiteTechnique: "valide",
      dateVisiteTechnique: "2025-06-15",
      carteGrise: "disponible",
      assurance: "valide",
      accidentHistorique: "non",
      climatisation: true,
      gps: true,
      siegesCuir: true,
      toitOuvrant: true,
      regulateurVitesse: true,
      camera: true,
      abs: true,
      airbags: true,
      bluetooth: true,
      vitresElectriques: true,
      prixNegociable: "non",
      dateVente: "immediatement",
      description: "Magnifique Mercedes-Benz GLE 350 en excellent état. Véhicule très bien entretenu, toujours garé en garage. Carnet d'entretien à jour avec toutes les révisions effectuées chez Mercedes. Intérieur cuir beige impeccable, aucune rayure. Tous les équipements de série + pack AMG. Vente cause départ à l'étranger.",
      vendeur: {
        nom: "Jean Kouassi",
        telephone: "+225 07 12 34 56 78",
        email: "jean.kouassi@example.com",
        localisation: "Abidjan, Cocody Riviera",
        type: "particulier"
      },
      trending: true,
      vues: 1247,
    },
    {
      id: "2",
      name: "Porsche 911 Carrera",
      type: "vente",
      price: "250 000 000 Fcfa",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f8e90?w=800",
      ],
      year: 2024,
      mileage: "5 000 km",
      fuel: "Essence",
      transmission: "Automatique",
      couleur: "Rouge carmin",
      nombrePortes: "2",
      nombrePlaces: "4",
      visiteTechnique: "valide",
      dateVisiteTechnique: "2026-01-20",
      carteGrise: "disponible",
      assurance: "valide",
      accidentHistorique: "non",
      climatisation: true,
      gps: true,
      siegesCuir: true,
      toitOuvrant: false,
      regulateurVitesse: true,
      camera: true,
      abs: true,
      airbags: true,
      bluetooth: true,
      vitresElectriques: true,
      prixNegociable: "non",
      dateVente: "immediatement",
      description: "Porsche 911 Carrera 2024 comme neuve. Seulement 5000 km au compteur. Configuration exclusive avec pack Sport Chrono, échappement sport et jantes 20 pouces. Intérieur tout cuir avec surpiqûres contrastées. Garantie constructeur valable jusqu'en 2027. Véhicule d'exception pour collectionneur.",
      vendeur: {
        nom: "Yao Michel",
        telephone: "+225 05 98 76 54 32",
        email: "yao.michel@example.com",
        localisation: "Abidjan, Plateau",
        type: "particulier"
      },
      trending: true,
      vues: 2156,
    },
    {
      id: "3",
      name: "Tesla Model 3",
      type: "location",
      price: "35 000 Fcfa/jour",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
      images: [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
        "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800",
      ],
      year: 2023,
      mileage: "25 000 km",
      fuel: "Électrique",
      transmission: "Automatique",
      couleur: "Blanc perle",
      nombrePortes: "4",
      nombrePlaces: "5",
      visiteTechnique: "valide",
      dateVisiteTechnique: "2025-08-10",
      carteGrise: "disponible",
      assurance: "valide",
      accidentHistorique: "non",
      climatisation: true,
      gps: true,
      siegesCuir: false,
      toitOuvrant: true,
      regulateurVitesse: true,
      camera: true,
      abs: true,
      airbags: true,
      bluetooth: true,
      vitresElectriques: true,
      prixNegociable: "oui",
      dateVente: "immediatement",
      description: "Tesla Model 3 disponible à la location pour vos déplacements professionnels ou personnels. Véhicule 100% électrique, économique et écologique. Autopilot inclus. Chargeur rapide disponible. Idéal pour découvrir la conduite électrique sans engagement d'achat.",
      vendeur: {
        nom: "VROOM Location",
        telephone: "+225 27 20 30 40 50",
        email: "location@vroom.ci",
        localisation: "Abidjan, Marcory Zone 4",
        type: "partenaire"
      },
      vues: 892,
    },
    {
      id: "4",
      name: "BMW X5 M Sport",
      type: "location",
      price: "50 000 Fcfa/jour",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      ],
      year: 2024,
      mileage: "8 000 km",
      fuel: "Diesel",
      transmission: "Automatique",
      couleur: "Gris minéral",
      nombrePortes: "5",
      nombrePlaces: "7",
      visiteTechnique: "valide",
      dateVisiteTechnique: "2026-02-15",
      carteGrise: "disponible",
      assurance: "valide",
      accidentHistorique: "non",
      climatisation: true,
      gps: true,
      siegesCuir: true,
      toitOuvrant: true,
      regulateurVitesse: true,
      camera: true,
      abs: true,
      airbags: true,
      bluetooth: true,
      vitresElectriques: true,
      prixNegociable: "oui",
      dateVente: "immediatement",
      description: "BMW X5 M Sport 7 places à louer. SUV de luxe parfait pour les familles ou groupes. Confort optimal avec sièges cuir chauffants, système audio Harman Kardon premium. Espace généreux pour bagages. Disponible avec ou sans chauffeur. Tarifs dégressifs pour locations longue durée.",
      vendeur: {
        nom: "VROOM Location",
        telephone: "+225 27 20 30 40 50",
        email: "location@vroom.ci",
        localisation: "Abidjan, Cocody Angré",
        type: "partenaire"
      },
      vues: 654,
    },
    {
      id: "5",
      name: "Toyota Land Cruiser V8",
      type: "vente",
      price: "35 000 000 Fcfa",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
      images: [
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
      ],
      year: 2022,
      mileage: "45 000 km",
      fuel: "Diesel",
      transmission: "Automatique",
      couleur: "Blanc",
      nombrePortes: "5",
      nombrePlaces: "7",
      visiteTechnique: "valide",
      dateVisiteTechnique: "2025-12-01",
      carteGrise: "disponible",
      assurance: "valide",
      accidentHistorique: "mineur",
      climatisation: true,
      gps: true,
      siegesCuir: true,
      toitOuvrant: false,
      regulateurVitesse: true,
      camera: true,
      abs: true,
      airbags: true,
      bluetooth: true,
      vitresElectriques: true,
      prixNegociable: "oui",
      dateVente: "1-mois",
      description: "Toyota Land Cruiser V8 2022 en très bon état général. Véhicule robuste et fiable, idéal pour tous types de terrains. Un léger accrochage réparé sur le pare-choc avant (visible sur les photos). Entretien régulier chez Toyota. 4x4 performant avec mode tout-terrain. 7 places assises. Prix négociable pour achat rapide.",
      vendeur: {
        nom: "Koffi Adjoumani",
        telephone: "+225 01 23 45 67 89",
        email: "koffi.adjoumani@example.com",
        localisation: "Abidjan, Yopougon",
        type: "particulier"
      },
      vues: 1523,
    },
  ]);

  const [filter, setFilter] = useState<"tous" | "vente" | "location">("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

  const handleFavorite = (carId: string, carName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
        setDialogMessage({ title: "Retiré des favoris", description: `${carName} a été retiré de vos favoris` });
        setShowInfoDialog(true);
      } else {
        newFavorites.add(carId);
        setDialogMessage({ title: "Ajouté aux favoris !", description: `${carName} a été ajouté à vos favoris` });
        setShowSuccessDialog(true);
      }
      return newFavorites;
    });
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

  const filteredCars = cars
    .filter(car => filter === "tous" ? true : car.type === filter)
    .filter(car =>
      searchQuery === "" ? true :
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.transmission.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.couleur.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <Header />
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
                    className={`rounded-xl font-bold border-2 hover:scale-105 transition-all ${filter === "location" ? "bg-green-600 hover:bg-green-700" : ""
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
                    <Badge className={`font-bold rounded-full shadow-lg ${car.type === "vente" ? "bg-primary" : "bg-green-600"
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
                      className={`h-5 w-5 transition-all ${favorites.has(car.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                        }`}
                    />
                  </Button>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-2 mb-1">
                      {car.vendeur.type === "partenaire" ? (
                        <Badge className="bg-amber-500 text-white font-bold text-xs rounded-full shadow-lg flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          Partenaire Pro
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-600 text-white font-bold text-xs rounded-full shadow-lg flex items-center gap-1">
                          <UserCircle className="h-3 w-3" />
                          Particulier
                        </Badge>
                      )}
                    </div>
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

export default Vehicles;