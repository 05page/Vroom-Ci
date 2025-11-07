import { useNavigate } from "react-router-dom";
import { Car, ShoppingBag, MapPin, Wallet, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import serviceRental from "@/assets/service-rental.jpg";
import serviceSales from "@/assets/service-sales.jpg";
import serviceLocation from "@/assets/service-location.jpg";
import serviceSell from "@/assets/service-sell.jpg";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, FileCheck } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [carIntFile, setCarIntFile] = useState<File | null>(null);
  const [carExtFile, setCarExtFile] = useState<File | null>(null);
  const [carPreview, setCarPreview] = useState<string | null>("");
  const [carPreviewInt, setCarPreviewInt] = useState<string | null>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "int" | "ext") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        if (type === "ext") {
          setCarIntFile(file);
          setCarPreview(preview);
        } else {
          setCarExtFile(file);
          setCarPreviewInt(preview);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const services = [
    {
      title: "Location",
      description: "Louez une voiture",
      image: serviceRental,
      route: "/vehicles?filter=location",
      icon: Car,
    },
    {
      title: "Ventes",
      description: "Achetez une voiture",
      image: serviceSales,
      route: "/vehicles?filter=vente",
      icon: ShoppingBag,
    },
    {
      title: "Lieux",
      description: "Trouvez nos agences",
      image: serviceLocation,
      route: "/locations",
      icon: MapPin,
    },
    {
      title: "Vendez votre voiture",
      description: "En quelques clics",
      image: serviceSell,
      icon: Wallet,
      action: () => setOpenDialog(true),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">VROOM</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate("/vehicles")}>
              Véhicules
            </Button>
            <Button variant="ghost" onClick={() => navigate("/favorites")}>
              Favoris
            </Button>
            <Button variant="ghost" onClick={() => navigate("/messages")}>
              Messages
            </Button>
            <Button variant="ghost" onClick={() => navigate("/account")}>
              Compte
            </Button>
          </nav>

          {/* Mobile Menu Button & Notifications */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                3
              </Badge>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-background p-4 space-y-2 animate-fade-in">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/vehicles")}>
              Véhicules
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/favorites")}>
              Favoris
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/messages")}>
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/account")}>
              Compte
            </Button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenue sur VROOM</h2>
          <p className="text-muted-foreground">Que souhaitez-vous faire aujourd'hui ?</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                onClick={() => (service.action ? service.action() : navigate(service.route!))}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card"
              >
                <div className="aspect-square relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="h-5 w-5" />
                      <h3 className="font-bold text-lg">{service.title}</h3>
                    </div>
                    <p className="text-sm text-white/90">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-xl border">
            <h3 className="font-semibold text-lg mb-2">🚗 Large choix</h3>
            <p className="text-muted-foreground text-sm">
              Plus de 500 véhicules disponibles à la vente et à la location
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border">
            <h3 className="font-semibold text-lg mb-2">✅ Garantie qualité</h3>
            <p className="text-muted-foreground text-sm">
              Tous nos véhicules sont vérifiés et certifiés
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border">
            <h3 className="font-semibold text-lg mb-2">🏢 Agences partout</h3>
            <p className="text-muted-foreground text-sm">
              Retrouvez-nous dans toutes les grandes villes
            </p>
          </div>
        </div>
      </main>

      {/* Sell Your Car Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[95%] sm:max-w-[500px] md:max-w-[650px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl text-center sm:text-left">
              <Car className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Vendez votre voiture en un clic
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 py-2 sm:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-in fade-in duration-500">
              <div className="space-y-2">
                <Label htmlFor="marque" className="text-sm sm:text-base">
                  Marque *
                </Label>
                <Input
                  id="marque"
                  name="marque"
                  placeholder="Ex: Toyota"
                  required
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modele" className="text-sm sm:text-base">
                  Modèle *
                </Label>
                <Input
                  id="modele"
                  name="modele"
                  placeholder="Ex: Corolla"
                  required
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annee" className="text-sm sm:text-base">
                  Année *
                </Label>
                <Input
                  id="annee"
                  name="annee"
                  type="number"
                  placeholder="Ex: 2020"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carburant" className="text-sm sm:text-base">
                  Carburant *
                </Label>
                <Select required>
                  <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essence">Essence</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybride">Hybride</SelectItem>
                    <SelectItem value="electrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometrage" className="text-sm sm:text-base">
                  Kilométrage (km) *
                </Label>
                <Input
                  id="kilometrage"
                  name="kilometrage"
                  type="number"
                  placeholder="Ex: 50000"
                  required
                  min="0"
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delaiVente" className="text-sm sm:text-base">
                  Quand vendre ? *
                </Label>
                <Select required>
                  <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediatement">Immédiatement</SelectItem>
                    <SelectItem value="1-mois">Dans 1 mois</SelectItem>
                    <SelectItem value="2-mois">Dans 2 mois</SelectItem>
                    <SelectItem value="3-mois">Dans 3 mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carExt">Photo extérieure</Label>
                <div className="relative">
                  <Input
                    id="carExt"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "ext")}
                    className="hidden"
                  />
                  <Label
                    htmlFor="carExt"
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {carPreview ? (
                      <img
                        src={carPreview}
                        alt="car photo"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Cliquez pour télécharger</span>
                      </>
                    )}
                  </Label>
                </div>
                {carExtFile && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <FileCheck className="h-3 w-3" />
                    {carExtFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carInt">Photo intérieure</Label>
                <div className="relative">
                  <Input
                    id="carInt"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "int")}
                    className="hidden"
                  />
                  <label
                    htmlFor="carInt"
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {carPreviewInt ? (
                      <img
                        src={carPreviewInt}
                        alt="photos"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Cliquez pour télécharger</span>
                      </>
                    )}
                  </label>
                </div>
                {carIntFile && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <FileCheck className="h-3 w-3" />
                    {carIntFile.name}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
                className="transition-all hover:scale-105 w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button type="submit" className="transition-all hover:scale-105 w-full sm:w-auto">
                Publier l'annonce
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
