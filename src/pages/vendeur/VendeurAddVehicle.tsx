import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X, Camera, Car } from "lucide-react";
import Header from "@/components/Header";
import SuccessDialog from "@/components/SuccessDialog";

const VendeurAddVehicle = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    type: "",
    price: "",
    description: "",
    mileage: "",
    transmission: "",
    fuel: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/vendeur/vehicles");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Ajouter un véhicule
              </h1>
              <p className="text-muted-foreground font-medium">
                Publiez une nouvelle annonce
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images */}
            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Photos du véhicule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 8 && (
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors">
                      <Upload className="h-8 w-8 text-primary mb-2" />
                      <span className="text-sm font-semibold text-muted-foreground">Ajouter</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-3 font-medium">
                  Ajoutez jusqu'à 8 photos de votre véhicule
                </p>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Informations du véhicule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold">Marque</Label>
                    <Select
                      value={formData.brand}
                      onValueChange={(v) => setFormData({ ...formData, brand: v })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="peugeot">Peugeot</SelectItem>
                        <SelectItem value="renault">Renault</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Modèle</Label>
                    <Input
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="Ex: RAV4"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Année</Label>
                    <Select
                      value={formData.year}
                      onValueChange={(v) => setFormData({ ...formData, year: v })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => (
                          <SelectItem key={i} value={String(2024 - i)}>
                            {2024 - i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Type d'annonce</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) => setFormData({ ...formData, type: v })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vente">Vente</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Kilométrage</Label>
                    <Input
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      placeholder="Ex: 50000"
                      className="h-12 rounded-xl"
                      type="number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Transmission</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(v) => setFormData({ ...formData, transmission: v })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatique">Automatique</SelectItem>
                        <SelectItem value="manuelle">Manuelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Carburant</Label>
                    <Select
                      value={formData.fuel}
                      onValueChange={(v) => setFormData({ ...formData, fuel: v })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Sélectionner" />
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
                    <Label className="font-bold">Prix (FCFA)</Label>
                    <Input
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Ex: 15000000"
                      className="h-12 rounded-xl"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez votre véhicule..."
                    className="min-h-32 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1 rounded-xl font-bold"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/30"
              >
                Publier l'annonce
              </Button>
            </div>
          </form>
        </div>
      </div>

      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Annonce publiée !"
        description="Votre véhicule est maintenant visible par tous les utilisateurs"
        variant="success"
      />
    </div>
  );
};

export default VendeurAddVehicle;
