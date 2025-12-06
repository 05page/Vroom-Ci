import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X } from "lucide-react";
import SuccessDialog from "@/components/SuccessDialog";

const vehicleSchema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.string().min(4, "L'année est requise"),
  price: z.string().min(1, "Le prix est requis"),
  mileage: z.string().min(1, "Le kilométrage est requis"),
  transmission: z.string().min(1, "La transmission est requise"),
  fuel: z.string().min(1, "Le type de carburant est requis"),
  color: z.string().min(1, "La couleur est requise"),
  condition: z.string().min(1, "L'état est requis"),
  description: z.string().min(20, "La description doit faire au moins 20 caractères").max(1000),
  location: z.string().min(1, "La localisation est requise"),
  phone: z.string().min(8, "Le numéro de téléphone est requis"),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

const AddVehicleForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 6) {
      setDialogMessage({ title: "Erreur", description: "Vous ne pouvez ajouter que 6 images maximum" });
      setShowErrorDialog(true);
      return;
    }

    setImages([...images, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...urls]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newUrls);
  };

  const onSubmit = async (data: VehicleFormData) => {
    if (images.length === 0) {
      setDialogMessage({ title: "Erreur", description: "Veuillez ajouter au moins une image" });
      setShowErrorDialog(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'enregistrement
      const vehicleData = {
        ...data,
        images: images.map((_, i) => `vehicle_${Date.now()}_${i}.jpg`),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      // Sauvegarder dans localStorage
      const existingVehicles = JSON.parse(localStorage.getItem("partnerVehicles") || "[]");
      localStorage.setItem("partnerVehicles", JSON.stringify([...existingVehicles, vehicleData]));

      setDialogMessage({ title: "Véhicule ajouté !", description: "Votre véhicule a été publié avec succès" });
      setShowSuccessDialog(true);
      setTimeout(() => navigate("/partner/vehicles"), 1500);
    } catch (error) {
      setDialogMessage({ title: "Erreur", description: "Une erreur est survenue" });
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate("/partner/vehicles")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter un véhicule</CardTitle>
          <CardDescription>
            Remplissez tous les champs pour publier votre annonce
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Images */}
            <div className="space-y-4">
              <Label>Images du véhicule (6 max)</Label>
              <div className="grid grid-cols-3 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {images.length < 6 && (
                  <label className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Ajouter</span>
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
            </div>

            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marque *</Label>
                <Input id="brand" {...register("brand")} placeholder="Toyota, Honda, etc." />
                {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modèle *</Label>
                <Input id="model" {...register("model")} placeholder="Corolla, Civic, etc." />
                {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Année *</Label>
                <Input id="year" type="number" {...register("year")} placeholder="2020" />
                {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix (FCFA) *</Label>
                <Input id="price" type="number" {...register("price")} placeholder="5000000" />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Kilométrage (km) *</Label>
                <Input id="mileage" type="number" {...register("mileage")} placeholder="50000" />
                {errors.mileage && <p className="text-sm text-destructive">{errors.mileage.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission *</Label>
                <Select onValueChange={(value) => setValue("transmission", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatique">Automatique</SelectItem>
                    <SelectItem value="manuelle">Manuelle</SelectItem>
                  </SelectContent>
                </Select>
                {errors.transmission && <p className="text-sm text-destructive">{errors.transmission.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel">Carburant *</Label>
                <Select onValueChange={(value) => setValue("fuel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essence">Essence</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybride">Hybride</SelectItem>
                    <SelectItem value="electrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fuel && <p className="text-sm text-destructive">{errors.fuel.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Couleur *</Label>
                <Input id="color" {...register("color")} placeholder="Noir, Blanc, etc." />
                {errors.color && <p className="text-sm text-destructive">{errors.color.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">État *</Label>
                <Select onValueChange={(value) => setValue("condition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neuf">Neuf</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="bon">Bon</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                  </SelectContent>
                </Select>
                {errors.condition && <p className="text-sm text-destructive">{errors.condition.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation *</Label>
                <Input id="location" {...register("location")} placeholder="Abidjan, Cocody" />
                {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input id="phone" {...register("phone")} placeholder="0707070707" />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description détaillée *</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Décrivez votre véhicule en détail (équipements, historique, etc.)"
                rows={6}
                className="resize-none"
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/partner/vehicles")}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Publication..." : "Publier l'annonce"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title={dialogMessage.title}
        description={dialogMessage.description}
        variant="success"
      />

      <SuccessDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title={dialogMessage.title}
        description={dialogMessage.description}
        variant="error"
      />
    </div>
  );
};

export default AddVehicleForm;
