import { useNavigate } from "react-router-dom";
import { Car, ShoppingBag, MapPin, Wallet, Bell, Menu, Shield, Star, Building2, Upload, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

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
          setCarExtFile(file);
          setCarPreview(preview);
        } else {
          setCarIntFile(file);
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
      route: "/vehicles?filter=location",
      icon: Car,
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    },
    {
      title: "Ventes",
      description: "Achetez une voiture",
      route: "/vehicles?filter=vente",
      icon: ShoppingBag,
      gradient: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    },
    {
      title: "Lieux",
      description: "Trouvez nos agences",
      route: "/locations",
      icon: MapPin,
      gradient: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    {
      title: "Vendez",
      description: "En quelques clics",
      icon: Wallet,
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      action: () => setOpenDialog(true),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              VROOM
            </span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Que souhaitez-vous faire aujourd'hui ?
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
      {services.map((service, index) => {
        const IconComponent = service.icon;
        return (
          <div
            key={service.title}
            onClick={() => navigate(service.route)}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 hover:scale-[1.08] hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2"
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: 0,
              animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`
            }}
          >
            <div className="aspect-square relative rounded-3xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-2"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 mix-blend-multiply transition-all duration-700 group-hover:opacity-80`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Icon avec rotation */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-700 group-hover:scale-125 group-hover:bg-white/40 group-hover:rotate-12">
                <IconComponent />
              </div>

              {/* Flèche indicatrice animée */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                <div className="bg-white/30 backdrop-blur-md rounded-full p-4 animate-pulse">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              {/* Texte avec glissement */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform transition-all duration-700 group-hover:translate-y-[-8px]">
                <h3 className="font-black text-xl mb-1 tracking-tight group-hover:text-2xl transition-all duration-500">
                  {service.title}
                </h3>
                <p className="text-sm text-white/90 font-medium group-hover:text-white transition-all duration-500">
                  {service.description}
                </p>
                
                {/* Badge "Cliquez ici" */}
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    Cliquez pour explorer
                  </span>
                  <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        );
      })}
    </div>

        {/* Quick Info Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-black mb-8 tracking-tight">Pourquoi nous choisir ?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-8 bg-gradient-to-br from-card to-card/50 rounded-3xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Car className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black text-xl mb-3 tracking-tight">Large choix</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Plus de 500 véhicules disponibles à la vente et à la location
              </p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-card to-card/50 rounded-3xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black text-xl mb-3 tracking-tight">Garantie qualité</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Tous nos véhicules sont vérifiés et certifiés
              </p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-card to-card/50 rounded-3xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-black text-xl mb-3 tracking-tight">Agences partout</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Retrouvez-nous dans toutes les grandes villes
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Sell Your Car Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[95%] sm:max-w-[500px] md:max-w-[650px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl text-center sm:text-left font-black tracking-tight">
              <div className="bg-primary rounded-xl p-2">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              Vendez votre voiture
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6 py-2 sm:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label htmlFor="marque" className="text-sm sm:text-base font-semibold">
                  Marque *
                </Label>
                <Input
                  id="marque"
                  name="marque"
                  placeholder="Ex: Toyota"
                  required
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base rounded-xl border-2 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modele" className="text-sm sm:text-base font-semibold">
                  Modèle *
                </Label>
                <Input
                  id="modele"
                  name="modele"
                  placeholder="Ex: Corolla"
                  required
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base rounded-xl border-2 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annee" className="text-sm sm:text-base font-semibold">
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
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base rounded-xl border-2 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carburant" className="text-sm sm:text-base font-semibold">
                  Carburant *
                </Label>
                <Select required>
                  <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base rounded-xl border-2 font-medium">
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
                <Label htmlFor="kilometrage" className="text-sm sm:text-base font-semibold">
                  Kilométrage (km) *
                </Label>
                <Input
                  id="kilometrage"
                  name="kilometrage"
                  type="number"
                  placeholder="Ex: 50000"
                  required
                  min="0"
                  className="transition-all focus:scale-[1.02] text-sm sm:text-base rounded-xl border-2 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delaiVente" className="text-sm sm:text-base font-semibold">
                  Quand vendre ? *
                </Label>
                <Select required>
                  <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base rounded-xl border-2 font-medium">
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
                <Label htmlFor="carExt" className="font-semibold">Photo extérieure</Label>
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
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {carPreview ? (
                      <img
                        src={carPreview}
                        alt="car photo"
                        className="h-full w-full object-cover rounded-2xl"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground font-medium">Cliquez pour télécharger</span>
                      </>
                    )}
                  </Label>
                </div>
                {carExtFile && (
                  <p className="text-xs text-primary flex items-center gap-1 font-medium">
                    <FileCheck className="h-3 w-3" />
                    {carExtFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carInt" className="font-semibold">Photo intérieure</Label>
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
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {carPreviewInt ? (
                      <img
                        src={carPreviewInt}
                        alt="photos"
                        className="h-full w-full object-cover rounded-2xl"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground font-medium">Cliquez pour télécharger</span>
                      </>
                    )}
                  </label>
                </div>
                {carIntFile && (
                  <p className="text-xs text-primary flex items-center gap-1 font-medium">
                    <FileCheck className="h-3 w-3" />
                    {carIntFile.name}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
                className="transition-all hover:scale-105 w-full sm:w-auto rounded-xl font-bold border-2"
              >
                Annuler
              </Button>
              <Button type="submit" className="transition-all hover:scale-105 w-full sm:w-auto rounded-xl font-bold shadow-lg shadow-primary/30">
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