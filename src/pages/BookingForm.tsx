import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Upload } from "lucide-react";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "back") => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "front") {
        setIdFront(file);
      } else {
        setIdBack(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idFront || !idBack) {
      toast.error("Veuillez télécharger les deux photos de votre pièce d'identité");
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
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">
                Formulaire de {car.type === "vente" ? "demande d'achat" : "réservation"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="address">Adresse *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Des questions ou des demandes spéciales ?"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold">
                    Pièce d'identité *
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Veuillez télécharger les photos recto et verso de votre pièce d'identité
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idFront">Recto *</Label>
                      <div className="relative">
                        <Input
                          id="idFront"
                          type="file"
                          accept="image/*"
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
                      <Label htmlFor="idBack">Verso *</Label>
                      <div className="relative">
                        <Input
                          id="idBack"
                          type="file"
                          accept="image/*"
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
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Envoyer la demande
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(-1)}
                  >
                    Annuler
                  </Button>
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
