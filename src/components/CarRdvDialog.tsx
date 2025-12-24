import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, MapPin, Car } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SuccessDialog from "@/components/SuccessDialog";

interface CarData {
  id: string;
  name: string;
  type: "vente" | "location";
  price: string;
  image: string;
}

interface CarRdvDialogProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarData;
}

export const CarRdvDialog = ({ isOpen, onClose, car }: CarRdvDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    date: "",
    heure: "",
    agence: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: "", description: "" });

  const handleSubmit = () => {
    if (currentStep === 1) {
      if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
        setErrorMessage({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires" });
        setShowErrorDialog(true);
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!formData.date || !formData.heure || !formData.agence) {
        setErrorMessage({ title: "Erreur", description: "Veuillez sélectionner une date, une heure et une agence" });
        setShowErrorDialog(true);
        return;
      }
      // Soumission finale
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1);
          setFormData({
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            adresse: "",
            date: "",
            heure: "",
            agence: "",
            message: "",
          });
          onClose();
        }, 3000);
      }, 1500);
      return;
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const heuresDisponibles = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  const today = new Date().toISOString().split("T")[0];

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">
                {car.type === "vente" ? "Achat confirmé !" : "Réservation confirmée !"} 🎉
              </h3>
              <p className="text-muted-foreground font-medium text-sm sm:text-base">
                Nous vous avons envoyé une confirmation par email et SMS avec les détails de votre rendez-vous.
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 text-left">
              <p className="font-bold text-sm">{car.name}</p>
              <p className="text-xs text-muted-foreground">
                RDV le {formData.date} à {formData.heure}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-0">
        {/* Header avec aperçu voiture */}
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Car className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <span className="truncate">
                  {car.type === "vente" ? "Finaliser l'achat" : "Réserver ce véhicule"}
                </span>
              </DialogTitle>
            </DialogHeader>

            {/* Aperçu voiture compact */}
            <div className="flex items-center gap-3 mt-4 bg-secondary/50 rounded-xl p-3">
              <img
                src={car.image}
                alt={car.name}
                className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm sm:text-base truncate">{car.name}</p>
                <p className="text-primary font-black text-sm sm:text-base">{car.price}</p>
              </div>
              <Badge className="shrink-0 text-xs">
                {car.type === "vente" ? "Achat" : "Location"}
              </Badge>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-4 sm:px-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium">Étape {currentStep}/2</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{Math.round((currentStep / 2) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5">
          {/* Step 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Vos informations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-xs sm:text-sm font-bold">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
                    placeholder="Votre nom"
                    className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-xs sm:text-sm font-bold">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleChange("prenom", e.target.value)}
                    placeholder="Votre prénom"
                    className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="exemple@email.com"
                    className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Téléphone *
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                    placeholder="+225 07 XX XX XX XX"
                    className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Adresse
                </Label>
                <Input
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => handleChange("adresse", e.target.value)}
                  placeholder="Votre adresse complète"
                  className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 2: Rendez-vous */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Choisir votre rendez-vous
              </h3>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 font-medium">
                  📋 Lors du RDV: Visite du véhicule, vérification documents, signature contrat et remise des clés.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="agence" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Agence *
                </Label>
                <Select value={formData.agence} onValueChange={(value) => handleChange("agence", value)}>
                  <SelectTrigger className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm">
                    <SelectValue placeholder="Sélectionner une agence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cocody">VROOM Cocody</SelectItem>
                    <SelectItem value="yopougon">VROOM Yopougon</SelectItem>
                    <SelectItem value="plateau">VROOM Plateau</SelectItem>
                    <SelectItem value="marcory">VROOM Marcory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs sm:text-sm font-bold">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    min={today}
                    className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heure" className="text-xs sm:text-sm font-bold">Heure *</Label>
                  <Select value={formData.heure} onValueChange={(value) => handleChange("heure", value)}>
                    <SelectTrigger className="h-11 sm:h-12 rounded-xl border-2 font-medium text-sm">
                      <SelectValue placeholder="Choisir l'heure" />
                    </SelectTrigger>
                    <SelectContent>
                      {heuresDisponibles.map((heure) => (
                        <SelectItem key={heure} value={heure}>{heure}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Message (optionnel)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Questions ou demandes particulières..."
                  className="rounded-xl border-2 font-medium min-h-[80px] text-sm"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6 pt-0">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full sm:w-auto rounded-xl font-bold border-2 h-11 sm:h-12 text-sm"
            >
              Retour
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl font-bold border-2 h-11 sm:h-12 text-sm"
            >
              Annuler
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            className="w-full sm:flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 h-11 sm:h-12 text-sm"
          >
            {currentStep < 2 ? "Continuer" : "Confirmer le rendez-vous"}
          </Button>
        </DialogFooter>
      </DialogContent>
      
      <SuccessDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title={errorMessage.title}
        description={errorMessage.description}
        variant="error"
      />
    </Dialog>
  );
};
