import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Upload, CreditCard, Calendar, MapPin, ClipboardCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    rentalDuration: "",
    deliveryOption: "agency",
    technicalVisit: false,
    paymentMethod: "mobile_money",
  });

  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [drivingLicense, setDrivingLicense] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back" | "license") => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "front") {
        setIdFront(file);
      } else if (type === "back") {
        setIdBack(file);
      } else {
        setDrivingLicense(file);
      }
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
    } else if (currentStep === 2 && car.type === "location") {
      if (!formData.rentalDuration) {
        toast.error("Veuillez sélectionner une durée de location");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idFront || !idBack || !drivingLicense) {
      toast.error("Veuillez télécharger toutes les pièces justificatives");
      return;
    }

    toast.success("Votre demande a été envoyée avec succès !");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Aucun véhicule sélectionné</p>
          <Button onClick={() => navigate("/vehicles")}>Voir les véhicules</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Car Summary */}
          <Card className="lg:col-span-1 h-fit lg:sticky lg:top-4">
            <CardHeader>
              <CardTitle className="font-heading">Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-heading text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{car.price}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Année</span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carburant</span>
                  <span className="font-medium">{car.fuel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{car.type === "vente" ? "Achat" : "Location"}</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Étape {currentStep}/3</span>
                  <span className="text-sm text-muted-foreground">{Math.round((currentStep / 3) * 100)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">
                {currentStep === 1 && "Informations personnelles"}
                {currentStep === 2 && "Détails de la réservation"}
                {currentStep === 3 && "Documents et paiement"}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {currentStep === 1 && "Veuillez renseigner vos coordonnées"}
                {currentStep === 2 && "Options de location et livraison"}
                {currentStep === 3 && "Pièces justificatives et mode de paiement"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom complet *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="Jean Dupont"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="jean.dupont@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse complète *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          placeholder="123 Rue de la Paix, Paris"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Rental Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    {car.type === "location" && (
                      <div className="space-y-2">
                        <Label htmlFor="rentalDuration" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Durée de location *
                        </Label>
                        <Select
                          value={formData.rentalDuration}
                          onValueChange={(value) => setFormData({ ...formData, rentalDuration: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-jour">1 jour</SelectItem>
                            <SelectItem value="3-jours">3 jours</SelectItem>
                            <SelectItem value="1-semaine">1 semaine</SelectItem>
                            <SelectItem value="2-semaines">2 semaines</SelectItem>
                            <SelectItem value="1-mois">1 mois</SelectItem>
                            <SelectItem value="3-mois">3 mois</SelectItem>
                            <SelectItem value="6-mois">6 mois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Options de livraison *
                      </Label>
                      <RadioGroup
                        value={formData.deliveryOption}
                        onValueChange={(value) => setFormData({ ...formData, deliveryOption: value })}
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="agency" id="agency" />
                          <Label htmlFor="agency" className="cursor-pointer flex-1">
                            <div className="font-medium">Récupération en agence</div>
                            <div className="text-sm text-muted-foreground">Gratuit - Venez récupérer le véhicule à notre agence</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="home" id="home" />
                          <Label htmlFor="home" className="cursor-pointer flex-1">
                            <div className="font-medium">Livraison à domicile</div>
                            <div className="text-sm text-muted-foreground">+50€ - Le véhicule est livré à votre adresse</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4" />
                        Options supplémentaires
                      </Label>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
                        <Checkbox
                          id="technicalVisit"
                          checked={formData.technicalVisit}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, technicalVisit: checked as boolean })
                          }
                        />
                        <Label htmlFor="technicalVisit" className="cursor-pointer flex-1">
                          <div className="font-medium">Demander une visite technique</div>
                          <div className="text-sm text-muted-foreground">
                            Un expert inspectera le véhicule avant la remise
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents & Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-4">
                      <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Pièces justificatives *
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Veuillez télécharger les documents suivants (formats acceptés: JPG, PNG, PDF)
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="idFront">Pièce d'identité (Recto) *</Label>
                          <div className="relative">
                            <Input
                              id="idFront"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileChange(e, "front")}
                              className="cursor-pointer"
                              required
                            />
                            {idFront && (
                              <p className="text-sm text-[hsl(var(--success))] mt-2 flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                {idFront.name}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="idBack">Pièce d'identité (Verso) *</Label>
                          <div className="relative">
                            <Input
                              id="idBack"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => handleFileChange(e, "back")}
                              className="cursor-pointer"
                              required
                            />
                            {idBack && (
                              <p className="text-sm text-[hsl(var(--success))] mt-2 flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                {idBack.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="drivingLicense">Permis de conduire *</Label>
                        <div className="relative">
                          <Input
                            id="drivingLicense"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, "license")}
                            className="cursor-pointer"
                            required
                          />
                          {drivingLicense && (
                            <p className="text-sm text-[hsl(var(--success))] mt-2 flex items-center gap-2">
                              <Upload className="h-4 w-4" />
                              {drivingLicense.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <Label className="flex items-center gap-2 text-lg font-semibold">
                        <CreditCard className="h-5 w-5" />
                        Modalité de paiement *
                      </Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="mobile_money" id="mobile_money" />
                          <Label htmlFor="mobile_money" className="cursor-pointer flex-1">
                            <div className="font-medium">Mobile Money</div>
                            <div className="text-sm text-muted-foreground">Orange Money, MTN Money, Moov Money</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer flex-1">
                            <div className="font-medium">Carte bancaire</div>
                            <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                          <Label htmlFor="bank_transfer" className="cursor-pointer flex-1">
                            <div className="font-medium">Virement bancaire</div>
                            <div className="text-sm text-muted-foreground">Paiement par virement (délai de 2-3 jours)</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6 mt-6 border-t">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handlePrevious}
                      className="flex-1"
                    >
                      Précédent
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={handleNext}
                      className="flex-1"
                    >
                      Suivant
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" className="flex-1">
                      Envoyer la demande
                    </Button>
                  )}
                  {currentStep === 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => navigate(-1)}
                    >
                      Annuler
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;