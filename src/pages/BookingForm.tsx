import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Upload, CreditCard, Calendar, MapPin, ClipboardCheck, Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    rentalDuration: "",
    deliveryOption: "agency",
    technicalVisit: false,
    paymentMethod: "mobile_money",
    rdvDate: "",
    rdvTime: "",
    rdvAgency: ""
  });

  const [paymentData, setPaymentData] = useState({
    mobileProvider: "",
    mobileNumber: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    secretCode: ""
  })

  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [driveLicence, setDriveLicence] = useState<File | null>(null)

  //Affichage des images sélectionner par les utilisateurs
  const [idFrontPreview, setIdFrontPreview] = useState<String | null>(null)
  const [idBackPreview, setIdBackPreview] = useState<String | null>(null)
  const [idDriveLicencePreview, setIdDriveLicencePreview] = useState<String | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back" | "license") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "front") {
      setIdFront(file);
    } else if (type === "back") {
      setIdBack(file);
    } else {
      setDriveLicence(file);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      if (type === "front") {
        setIdFrontPreview(preview);
      } else if (type === "back") {
        setIdBackPreview(preview);
      } else {
        setIdDriveLicencePreview(preview);
      }
    };
    reader.readAsDataURL(file); // Déplacer ici !
  };

  const handleRemove = (type: "front" | "back" | "license") => {
    if (type === "front") {
      setIdFront(null);
      setIdFrontPreview(null)
    } else if (type === "back") {
      setIdBack(null);
      setIdBackPreview(null)
    } else {
      setDriveLicence(null)
      setIdDriveLicencePreview(null)
    }
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        toast.error("Veuillez remplir tous les champs obligatoires")
        return
      }
    } else if (currentStep === 2 && car.type === "location") {
      if (!formData.rentalDuration) {
        toast.error("Veuillez sélectionner une durée de location");
        return
      }
    } else if (currentStep === 3) {
      if (!formData.rdvDate || !formData.rdvTime || !formData.rdvAgency) {
        toast.error("Veuillez remplir tous les champs du rendez-vous");
        return
      }
    }
    setCurrentStep(currentStep + 1);
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!idFront || !idBack) {
      toast.error("Veuillez télécharger les deux photos de votre pièce d'identité");
      return;
    }

    //Validation des informations de paiement
    if (formData.paymentMethod === "mobile_money") {
      if (!paymentData.mobileProvider || !paymentData.mobileNumber) {
        toast.error("Veuillez remplir les informations Mobile Money");
        return;
      }
      if (!paymentData.secretCode || paymentData.secretCode.length < 4) {
        toast.error("Veuillez entrer votre code secret de confirmation");
        return;
      }
    } else if (formData.paymentMethod === "card") {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cardExpiry || !paymentData.cardCVV) {
        toast.error("Veuillez remplir toutes les informations de la carte bancaire");
        return;
      }
    }
    toast.success("Votre demande a été envoyée avec succès !");
    setTimeout(() => {
      navigate("/vehicles");
    }, 2000);
  };

  const calculeTotal = () => {
    const basePrice = parseInt(car?.price.replace(/[^\d]/g, '') || "o")
    const deliveryFee = formData.deliveryOption === "home" ? 15000 : 0;
    const technicalVisitFee = formData.technicalVisit ? 10000 : 0;
    return basePrice + deliveryFee + technicalVisitFee;
  }

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
          <Card className="lg:col-span-1">
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

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Étape {currentStep}/4</span>
                  <span className="text-sm text-muted-foreground">{Math.round((currentStep / 4) * 100)}%</span>
                </div>

                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>
              {/* Facture */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <h4 className="font-semibold text-lg mb-3">Facture</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prix total du véhicule</span>
                    <span className="font-medium">{car.price}</span>
                  </div>
                  {formData.deliveryOption === "home" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison à domicile</span>
                      <span className="font-medium">15 000 FCFA</span>
                    </div>
                  )}
                  {formData.technicalVisit && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Visite technique</span>
                      <span className="font-medium">10 000 FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t text-sm">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">{calculeTotal().toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-lg bg-primary/10 p-3 rounded-lg">
                    <span>Garantie à verser {formData.deliveryOption === "agency" ? "(10%)" : "(15%)"}</span>
                    <span className="text-primary">
                      {(calculeTotal() * (formData.deliveryOption === "agency" ? 0.10 : 0.15)).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {formData.deliveryOption === "agency"
                    ? "Versez 10% comme garantie lors de la récupération en agence. Le reste sera payé directement à l'agence."
                    : "Versez 15% comme garantie pour la livraison à domicile. Le reste sera payé à la livraison."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">
                {currentStep === 1 && "Informations personnelles"}
                {currentStep === 2 && "Détails de la réservation"}
                {currentStep === 3 && "Rendez-vous"}
                {currentStep === 4 && "Documents et paiement"}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {currentStep === 1 && "Veuillez renseigner vos coordonnées"}
                {currentStep === 2 && "Options de location et livraison"}
                {currentStep === 3 && "Prenez rendez-vous pour finaliser"}
                {currentStep === 4 && "Pièces justificatives et mode de paiement"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* step1: Informations personnelles */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom Complet *</Label>
                        <Input
                          id="fullName" name="fullName" value={formData.fullName}
                          onChange={handleInputChange}
                          required placeholder="Jean Dupont"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email" name="email" value={formData.email}
                          type="email" onChange={handleInputChange}
                          required placeholder="Jd@gmail.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telephone *</Label>
                        <Input
                          id="phone" name="phone" value={formData.phone}
                          type="tel" onChange={handleInputChange}
                          required placeholder="+225 07 08 09 10 11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Votre Adresse *</Label>
                        <Input
                          id="address" name="address" value={formData.address}
                          onChange={handleInputChange}
                          required placeholder="Yopougon"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step2: Details de location */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    {car.type === "location" && (
                      <div className="space-y-2">
                        <Label htmlFor="rentalDuration" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Durée de la location *
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
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-4">
                      <Label>
                        <MapPin className="h-4 w-4" />
                        Option de livraison *
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
                            <div className="font-medium">Livraison à domicie</div>
                            <div className="text-sm text-muted-foreground">15000Fcfa - Le véhicule est livré à votre adresse</div>
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

                {/* Step 3: Rendez-vous */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Planifiez votre rendez-vous
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Choisissez une date et une heure pour finaliser votre {car.type === "vente" ? "achat" : "location"} en agence
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rdvAgency" className="font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Agence *
                        </Label>
                        <Select
                          value={formData.rdvAgency}
                          onValueChange={(value) => setFormData({ ...formData, rdvAgency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une agence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cocody">VROOM Cocody</SelectItem>
                            <SelectItem value="yopougon">VROOM Yopougon</SelectItem>
                            <SelectItem value="plateau">VROOM Plateau</SelectItem>
                            <SelectItem value="marcory">VROOM Marcory</SelectItem>
                            <SelectItem value="abobo">VROOM Abobo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rdvDate" className="font-semibold flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date du rendez-vous *
                          </Label>
                          <Input
                            id="rdvDate"
                            name="rdvDate"
                            type="date"
                            value={formData.rdvDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rdvTime" className="font-semibold flex items-center gap-2">
                            <ClipboardCheck className="h-4 w-4" />
                            Heure *
                          </Label>
                          <Select
                            value={formData.rdvTime}
                            onValueChange={(value) => setFormData({ ...formData, rdvTime: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir l'heure" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00</SelectItem>
                              <SelectItem value="10:00">10:00</SelectItem>
                              <SelectItem value="11:00">11:00</SelectItem>
                              <SelectItem value="12:00">12:00</SelectItem>
                              <SelectItem value="14:00">14:00</SelectItem>
                              <SelectItem value="15:00">15:00</SelectItem>
                              <SelectItem value="16:00">16:00</SelectItem>
                              <SelectItem value="17:00">17:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                        <h4 className="font-bold text-sm mb-2 text-blue-900 dark:text-blue-100">
                          📋 Que se passera-t-il lors du rendez-vous ?
                        </h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                          <li>Visite complète du véhicule</li>
                          <li>Vérification de vos documents</li>
                          <li>Explication des conditions</li>
                          <li>Signature du contrat</li>
                          <li>Remise des clés</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Documents & Payment */}
                {currentStep === 4 && (
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
                          {driveLicence && (
                            <p className="text-sm text-[hsl(var(--success))] mt-2 flex items-center gap-2">
                              <Upload className="h-4 w-4" />
                              {driveLicence.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <Label className="flex items-center gap-2 text-lg font-semibold">
                        <CreditCard className="h-5 w-5" />
                        Paiement de la garantie *
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Versez {formData.deliveryOption === "agency" ? "10%" : "15%"} du montant total comme garantie
                      </p>
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
                    {/* Formulaire Mobile Money */}
                    {formData.paymentMethod === "mobile_money" && (
                      <div className="space-y-4 pt-4 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="mobileProvider">Opérateur Mobile Money *</Label>
                          <Select
                            value={paymentData.mobileProvider}
                            onValueChange={(value) => setPaymentData({ ...paymentData, mobileProvider: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un opérateur" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="orange">Orange Money</SelectItem>
                              <SelectItem value="mtn">MTN Money</SelectItem>
                              <SelectItem value="moov">Moov Money</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Numéro Mobile Money *</Label>
                          <Input
                            id="mobileNumber"
                            type="tel"
                            placeholder="+225 07 08 09 10 11"
                            value={paymentData.mobileNumber}
                            onChange={(e) => setPaymentData({ ...paymentData, mobileNumber: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-4 pt-6 border-t animate-fade-in">
                          <Label className="flex items-center gap-2 text-lg font-semibold">
                            <Lock className="h-5 w-5" />
                            Code secret de confirmation *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Entrez votre code secret à 4 chiffres pour confirmer la transaction
                          </p>
                          <div className="space-y-2">
                            <Input
                              id="secretCode"
                              type="password"
                              placeholder="••••"
                              maxLength={4}
                              value={paymentData.secretCode}
                              onChange={(e) => setPaymentData({ ...paymentData, secretCode: e.target.value.replace(/\D/g, '') })}
                              className="text-center text-2xl tracking-widest"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formulaire Carte Bancaire */}
                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4 pt-4 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Numéro de carte *</Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={paymentData.cardNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, '');
                              const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                              setPaymentData({ ...paymentData, cardNumber: formatted });
                            }}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nom sur la carte *</Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="JEAN DUPONT"
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value.toUpperCase() })}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Date d'expiration *</Label>
                            <Input
                              id="cardExpiry"
                              type="text"
                              placeholder="MM/AA"
                              maxLength={5}
                              value={paymentData.cardExpiry}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                setPaymentData({ ...paymentData, cardExpiry: value });
                              }}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCVV">CVV *</Label>
                            <Input
                              id="cardCVV"
                              type="text"
                              placeholder="123"
                              maxLength={3}
                              value={paymentData.cardCVV}
                              onChange={(e) => setPaymentData({ ...paymentData, cardCVV: e.target.value.replace(/\D/g, '') })}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
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
                  {currentStep < 4 ? (
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
