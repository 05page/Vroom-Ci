import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SuccessDialog from "@/components/SuccessDialog";

interface RdvDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agencyName: string;
}

export const RdvDialog = ({ isOpen, onClose, agencyName }: RdvDialogProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    date: "",
    heure: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: "", description: "" });

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.date || !formData.heure) {
      setErrorMessage({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires" });
      setShowErrorDialog(true);
      return;
    }

    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          date: "",
          heure: "",
        });
        onClose();
      }, 3000);
    }, 1500);
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
                Rendez-vous confirmé ! 🎉
              </h3>
              <p className="text-muted-foreground font-medium text-sm sm:text-base">
                Nous vous avons envoyé une confirmation par email et SMS.
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 text-left">
              <p className="font-bold text-sm">{agencyName}</p>
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
      <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <span className="truncate">Prendre RDV - {agencyName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Nom *
              </Label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Date *
              </Label>
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
              <Label htmlFor="heure" className="text-xs sm:text-sm font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Heure *
              </Label>
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
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl font-bold border-2 h-11 sm:h-12 text-sm"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full sm:flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 h-11 sm:h-12 text-sm"
          >
            Confirmer le RDV
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
