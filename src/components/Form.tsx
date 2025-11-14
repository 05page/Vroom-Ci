import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Car, CheckCircle, Upload, X, FileCheck, AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const VendezVotreVoiture = ({ isOpen, onClose }: Props) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Informations de base
        marque: "",
        modele: "",
        annee: "",
        carburant: "",
        transmission: "",
        kilometrage: "",
        couleur: "",
        nombrePortes: "",
        nombrePlaces: "",
        
        // Documents et état
        visiteTechnique: "",
        dateVisiteTechnique: "",
        carteGrise: "",
        assurance: "",
        accidentHistorique: "non",
        
        // Équipements et options
        climatisation: false,
        gps: false,
        siegesCuir: false,
        toitOuvrant: false,
        regulateurVitesse: false,
        camera: false,
        abs: false,
        airbags: false,
        bluetooth: false,
        vitresElectriques: false,
        
        // Prix et vente
        prixSouhaite: "",
        prixNegociable: "oui",
        dateVente: "",
        
        // Description
        description: "",
    });
    
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const MAX_IMAGES = 15;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        if (images.length + files.length > MAX_IMAGES) {
            toast.error(`Vous ne pouvez télécharger que ${MAX_IMAGES} images maximum`);
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        // Générer les aperçus
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.marque || !formData.modele || !formData.annee || !formData.carburant || 
            !formData.kilometrage || !formData.prixSouhaite) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }

        if (images.length === 0) {
            toast.error("Veuillez ajouter au moins une photo de votre véhicule");
            return;
        }
        
        setIsSubmitted(true);
        
        setTimeout(() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setFormData({
                marque: "", modele: "", annee: "", carburant: "", transmission: "",
                kilometrage: "", couleur: "", nombrePortes: "", nombrePlaces: "",
                visiteTechnique: "", dateVisiteTechnique: "", carteGrise: "", assurance: "",
                accidentHistorique: "non", climatisation: false, gps: false, siegesCuir: false,
                toitOuvrant: false, regulateurVitesse: false, camera: false, abs: false,
                airbags: false, bluetooth: false, vitresElectriques: false, prixSouhaite: "",
                prixNegociable: "oui", dateVente: "", description: "",
            });
            setImages([]);
            setImagePreviews([]);
            onClose();
        }, 2000);
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Message de confirmation
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
                                Félicitations !
                            </h3>
                            <p className="text-muted-foreground font-medium">
                                Votre annonce a été publiée avec succès et sera visible sous peu
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Formulaire principal
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95%] sm:max-w-[700px] md:max-w-[900px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between gap-3 text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary rounded-xl p-2">
                                <Car className="h-6 w-6 text-primary-foreground" />
                            </div>
                            Vendez votre voiture
                        </div>
                        <div className="text-sm font-semibold text-muted-foreground">
                            Étape {currentStep}/4
                        </div>
                    </DialogTitle>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-secondary rounded-full h-2 mt-4">
                        <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / 4) * 100}%` }}
                        />
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* ÉTAPE 1: Informations de base */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
                                <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                                    <Car className="h-5 w-5 text-primary" />
                                    Informations du véhicule
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Renseignez les caractéristiques principales de votre voiture
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="marque" className="font-semibold">Marque *</Label>
                                    <Input 
                                        value={formData.marque} 
                                        onChange={(e) => handleChange("marque", e.target.value)}
                                        placeholder="Ex: Toyota"
                                        className="rounded-xl border-2 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="modele" className="font-semibold">Modèle *</Label>
                                    <Input 
                                        value={formData.modele} 
                                        onChange={(e) => handleChange("modele", e.target.value)}
                                        placeholder="Ex: Corolla"
                                        className="rounded-xl border-2 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="annee" className="font-semibold">Année *</Label>
                                    <Input 
                                        value={formData.annee} 
                                        onChange={(e) => handleChange("annee", e.target.value)}
                                        type="number"
                                        placeholder="Ex: 2024"
                                        min="1990" 
                                        max={new Date().getFullYear()}
                                        className="rounded-xl border-2 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="carburant" className="font-semibold">Carburant *</Label>
                                    <Select value={formData.carburant} onValueChange={(value) => handleChange("carburant", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
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
                                    <Label htmlFor="transmission" className="font-semibold">Transmission *</Label>
                                    <Select value={formData.transmission} onValueChange={(value) => handleChange("transmission", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="manuelle">Manuelle</SelectItem>
                                            <SelectItem value="automatique">Automatique</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kilometrage" className="font-semibold">Kilométrage (km) *</Label>
                                    <Input 
                                        value={formData.kilometrage} 
                                        onChange={(e) => handleChange("kilometrage", e.target.value)}
                                        type="number"
                                        placeholder="Ex: 50000"
                                        min="0"
                                        className="rounded-xl border-2 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="couleur" className="font-semibold">Couleur</Label>
                                    <Input 
                                        value={formData.couleur} 
                                        onChange={(e) => handleChange("couleur", e.target.value)}
                                        placeholder="Ex: Noir"
                                        className="rounded-xl border-2 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nombrePortes" className="font-semibold">Nombre de portes</Label>
                                    <Select value={formData.nombrePortes} onValueChange={(value) => handleChange("nombrePortes", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2">2 portes</SelectItem>
                                            <SelectItem value="3">3 portes</SelectItem>
                                            <SelectItem value="4">4 portes</SelectItem>
                                            <SelectItem value="5">5 portes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nombrePlaces" className="font-semibold">Nombre de places</Label>
                                    <Select value={formData.nombrePlaces} onValueChange={(value) => handleChange("nombrePlaces", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2">2 places</SelectItem>
                                            <SelectItem value="4">4 places</SelectItem>
                                            <SelectItem value="5">5 places</SelectItem>
                                            <SelectItem value="7">7 places</SelectItem>
                                            <SelectItem value="9">9 places</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 2: Documents et État */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
                                <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                                    <FileCheck className="h-5 w-5 text-primary" />
                                    Documents et état du véhicule
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Informations importantes sur l'état et les documents
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="visiteTechnique" className="font-semibold">Visite technique *</Label>
                                    <Select value={formData.visiteTechnique} onValueChange={(value) => handleChange("visiteTechnique", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="valide">Valide</SelectItem>
                                            <SelectItem value="expire">Expirée</SelectItem>
                                            <SelectItem value="jamais">Jamais effectuée</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {formData.visiteTechnique === "valide" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="dateVisiteTechnique" className="font-semibold">Date de validité</Label>
                                        <Input 
                                            value={formData.dateVisiteTechnique} 
                                            onChange={(e) => handleChange("dateVisiteTechnique", e.target.value)}
                                            type="date"
                                            className="rounded-xl border-2 font-medium"
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="carteGrise" className="font-semibold">Carte grise *</Label>
                                    <Select value={formData.carteGrise} onValueChange={(value) => handleChange("carteGrise", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="disponible">Disponible</SelectItem>
                                            <SelectItem value="en-cours">En cours</SelectItem>
                                            <SelectItem value="perdue">Perdue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="assurance" className="font-semibold">Assurance *</Label>
                                    <Select value={formData.assurance} onValueChange={(value) => handleChange("assurance", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="valide">Valide</SelectItem>
                                            <SelectItem value="expire">Expirée</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="accidentHistorique" className="font-semibold">Historique d'accident *</Label>
                                    <Select value={formData.accidentHistorique} onValueChange={(value) => handleChange("accidentHistorique", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="non">Aucun accident</SelectItem>
                                            <SelectItem value="mineur">Accident mineur (réparé)</SelectItem>
                                            <SelectItem value="majeur">Accident majeur (réparé)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 3: Équipements et Options */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
                                <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    Équipements et options
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Cochez les équipements disponibles dans votre véhicule
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: "climatisation", label: "Climatisation" },
                                    { id: "gps", label: "GPS / Navigation" },
                                    { id: "siegesCuir", label: "Sièges en cuir" },
                                    { id: "toitOuvrant", label: "Toit ouvrant" },
                                    { id: "regulateurVitesse", label: "Régulateur de vitesse" },
                                    { id: "camera", label: "Caméra de recul" },
                                    { id: "abs", label: "ABS" },
                                    { id: "airbags", label: "Airbags" },
                                    { id: "bluetooth", label: "Bluetooth" },
                                    { id: "vitresElectriques", label: "Vitres électriques" },
                                ].map((option) => (
                                    <div key={option.id} className="flex items-center space-x-3 p-3 rounded-xl border-2 hover:border-primary/30 transition-all">
                                        <Checkbox
                                            id={option.id}
                                            checked={formData[option.id as keyof typeof formData] as boolean}
                                            onCheckedChange={(checked) => handleChange(option.id, checked as boolean)}
                                            className="rounded-lg"
                                        />
                                        <Label htmlFor={option.id} className="font-medium cursor-pointer flex-1">
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 4: Prix, Photos et Description */}
                    {currentStep === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
                                <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-primary" />
                                    Prix, photos et description
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    Dernières informations pour finaliser votre annonce
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prixSouhaite" className="font-semibold">Prix souhaité (FCFA) *</Label>
                                    <Input 
                                        value={formData.prixSouhaite} 
                                        onChange={(e) => handleChange("prixSouhaite", e.target.value)}
                                        type="number"
                                        placeholder="Ex: 5000000"
                                        min="0"
                                        className="rounded-xl border-2 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prixNegociable" className="font-semibold">Prix négociable ?</Label>
                                    <Select value={formData.prixNegociable} onValueChange={(value) => handleChange("prixNegociable", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
                                            <SelectValue placeholder="Sélectionnez..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="oui">Oui</SelectItem>
                                            <SelectItem value="non">Non</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="dateVente" className="font-semibold">Quand vendre ? *</Label>
                                    <Select value={formData.dateVente} onValueChange={(value) => handleChange("dateVente", value)}>
                                        <SelectTrigger className="rounded-xl border-2 font-medium">
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
                            </div>

                            {/* Zone de téléchargement des photos */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="font-semibold">Photos du véhicule * ({images.length}/{MAX_IMAGES})</Label>
                                    {images.length < MAX_IMAGES && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById('fileInput')?.click()}
                                            className="rounded-xl font-bold"
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Ajouter des photos
                                        </Button>
                                    )}
                                </div>

                                <Input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {/* Grille d'aperçu des images */}
                                {imagePreviews.length > 0 ? (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview}
                                                    alt={`Aperçu ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-xl border-2 border-border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                {index === 0 && (
                                                    <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                                                        Principale
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                        className="border-2 border-dashed border-muted-foreground/25 rounded-2xl p-12 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                                    >
                                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="font-semibold mb-1">Cliquez pour télécharger des photos</p>
                                        <p className="text-sm text-muted-foreground">Jusqu'à {MAX_IMAGES} photos (JPG, PNG)</p>
                                    </div>
                                )}

                                <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-600 font-medium">
                                        La première photo sera l'image principale de votre annonce. Assurez-vous qu'elle soit claire et représentative.
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-semibold">Description détaillée</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    placeholder="Décrivez votre véhicule, son état, son historique d'entretien, les raisons de la vente..."
                                    rows={5}
                                    className="rounded-xl border-2 font-medium resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-background/95 backdrop-blur-xl pb-2 border-t mt-6">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                className="w-full sm:w-auto rounded-xl font-bold border-2 hover:scale-105 transition-all"
                            >
                                Précédent
                            </Button>
                        )}
                        
                        {currentStep < 4 ? (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="w-full sm:flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                            >
                                Suivant
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full sm:flex-1 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                            >
                                Publier l'annonce
                            </Button>
                        )}
                        
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="w-full sm:w-auto rounded-xl font-bold hover:scale-105 transition-all"
                        >
                            Annuler
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};