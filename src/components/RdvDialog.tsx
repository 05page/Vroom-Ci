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
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface RdvDialogProps {
    isOpen: boolean;
    onClose: () => void;
    agencyName?: string;
}

export const RdvDialog = ({ isOpen, onClose, agencyName = "VROOM" }: RdvDialogProps) => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        date: "",
        heure: "",
        typeFormation: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        // Validation
        if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.typeFormation) {
            toast.error("Veuillez saisir les champs requis")
            return
        }
        console.log("Rendez-vous pris:", formData);
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
                typeFormation: "",
                message: "",
            });
            onClose();
        }, 2000);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const heuresDisponibles = Array.from({ length: 11 }, (_, i) => {
        const heure = 8 + i;
        return `${heure.toString().padStart(2, "0")}:00`;
    });

    const today = new Date().toISOString().split("T")[0];

    if (isSubmitted) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-md rounded-3xl p-8">
                    <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-2 tracking-tight">
                                Rendez-vous confirmé ! 🎉
                            </h3>
                            <p className="text-muted-foreground font-medium">
                                Nous vous avons envoyé une confirmation par email et SMS
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-0">
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b p-6 rounded-t-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            Prendre rendez-vous
                        </DialogTitle>
                        <DialogDescription className="text-base font-medium">
                            Réservez votre créneau chez {agencyName}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Vos informations
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nom" className="text-sm font-bold">
                                    Nom *
                                </Label>
                                <Input
                                    id="nom"
                                    value={formData.nom}
                                    onChange={(e) => handleChange("nom", e.target.value)}
                                    placeholder="Votre nom"
                                    className="h-12 rounded-xl border-2 font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prenom" className="text-sm font-bold">
                                    Prénom *
                                </Label>
                                <Input
                                    id="prenom"
                                    value={formData.prenom}
                                    onChange={(e) => handleChange("prenom", e.target.value)}
                                    placeholder="Votre prénom"
                                    className="h-12 rounded-xl border-2 font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                    Email *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    placeholder="exemple@email.com"
                                    className="h-12 rounded-xl border-2 font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telephone" className="text-sm font-bold flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    Téléphone *
                                </Label>
                                <Input
                                    id="telephone"
                                    type="tel"
                                    value={formData.telephone}
                                    onChange={(e) => handleChange("telephone", e.target.value)}
                                    placeholder="+225 XX XX XX XX XX"
                                    className="h-12 rounded-xl border-2 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Choisir un créneau
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-sm font-bold">
                                    Date *
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleChange("date", e.target.value)}
                                    min={today}
                                    className="h-12 rounded-xl border-2 font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="heure" className="text-sm font-bold">
                                    Heure *
                                </Label>
                                <Select value={formData.heure} onValueChange={(value) => handleChange("heure", value)}>
                                    <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                                        <SelectValue placeholder="Sélectionnez une heure" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {heuresDisponibles.map((heure) => (
                                            <SelectItem key={heure} value={heure} className="font-medium">
                                                {heure}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="typeFormation" className="text-sm font-bold">
                            Type de formation *
                        </Label>
                        <Select
                            value={formData.typeFormation}
                            onValueChange={(value) => handleChange("typeFormation", value)}
                        >
                            <SelectTrigger className="h-12 rounded-xl border-2 font-medium">
                                <SelectValue placeholder="Choisissez votre formation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="permis-b" className="font-medium">
                                    Permis B (Voiture)
                                </SelectItem>
                                <SelectItem value="permis-a" className="font-medium">
                                    Permis A (Moto)
                                </SelectItem>
                                <SelectItem value="permis-c" className="font-medium">
                                    Permis C (Poids lourd)
                                </SelectItem>
                                <SelectItem value="conduite-accompagnee" className="font-medium">
                                    Conduite accompagnée
                                </SelectItem>
                                <SelectItem value="stage-recuperation" className="font-medium">
                                    Stage de récupération de points
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-bold flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            Message (optionnel)
                        </Label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            placeholder="Des questions ou des besoins particuliers ?"
                            className="rounded-xl border-2 font-medium min-h-[100px]"
                        />
                    </div>

                    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-4 sticky bottom-0 bg-background/95 backdrop-blur-xl pb-2 -mx-6 px-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="w-full sm:w-auto rounded-xl font-bold border-2 hover:scale-105 transition-all h-12"
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="w-full sm:w-auto rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all h-12"
                        >
                            <Calendar className="mr-2 h-5 w-5" />
                            Confirmer le rendez-vous
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};