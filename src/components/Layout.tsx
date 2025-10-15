import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Car, FileCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { set } from "date-fns";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [openDialog, setOpenDialog] = useState(false)
  const [carIntFile, setCarIntFile] = useState<File | null>(null)
  const [carExtFile, setCarExtFile] = useState<File | null>(null)
  const [carPreview, setCarPreview] = useState<string | null>("")
  const [carPreviewInt, setCarPreviewInt] = useState<string | null>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "int" | "ext") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        if (type === "ext") {
          setCarIntFile(file)
          setCarPreview(preview)
        } else {
          setCarExtFile(file)
          setCarPreviewInt(preview)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const handleClick = () => {
    setOpenDialog(true)
  }
  // Don't show sidebar on landing page
  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col w-full">
          {/* Header */}
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="h-full px-4 flex items-center justify-between">
              <SidebarTrigger />

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => navigate("/notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                    3
                  </Badge>
                </Button>
              </div>

              <Button
                onClick={handleClick}
                className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 hover:scale-105 transition-all"
              >
                <Car className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Vendez votre voiture
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1">
            {children}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent
                className="w-[95%] sm:max-w-[500px] md:max-w-[650px]
                  max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 rounded-xl">
                <DialogHeader>
                  <DialogTitle
                    className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl text-center sm:text-left"
                  >
                    <Car className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    Vendez votre voiture en un clic
                  </DialogTitle>
                </DialogHeader>

                <form className="space-y-6 py-2 sm:py-4">
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-in fade-in duration-500">
                    {/* Marque */}
                    <div className="space-y-2">
                      <Label htmlFor="marque" className="text-sm sm:text-base">
                        Marque *
                      </Label>
                      <Input
                        id="marque"
                        name="marque"
                        placeholder="Ex: Toyota"
                        required
                        className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                      />
                    </div>

                    {/* Modèle */}
                    <div className="space-y-2">
                      <Label htmlFor="modele" className="text-sm sm:text-base">
                        Modèle *
                      </Label>
                      <Input
                        id="modele"
                        name="modele"
                        placeholder="Ex: Corolla"
                        required
                        className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                      />
                    </div>

                    {/* Année */}
                    <div className="space-y-2">
                      <Label htmlFor="annee" className="text-sm sm:text-base">
                        Année de mise en circulation *
                      </Label>
                      <Input
                        id="annee"
                        name="annee"
                        type="number"
                        placeholder="Ex: 2020"
                        required
                        min="1900"
                        max={new Date().getFullYear()}
                        className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                      />
                    </div>

                    {/* Carburant */}
                    <div className="space-y-2">
                      <Label htmlFor="carburant" className="text-sm sm:text-base">
                        Type de carburant *
                      </Label>
                      <Select required>
                        <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base">
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

                    {/* Portières */}
                    <div className="space-y-2">
                      <Label htmlFor="portieres" className="text-sm sm:text-base">
                        Nombre de portières *
                      </Label>
                      <Select required>
                        <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 portières</SelectItem>
                          <SelectItem value="4">4 portières</SelectItem>
                          <SelectItem value="5">5 portières</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Kilométrage */}
                    <div className="space-y-2">
                      <Label htmlFor="kilometrage" className="text-sm sm:text-base">
                        Kilométrage (km) *
                      </Label>
                      <Input
                        id="kilometrage"
                        name="kilometrage"
                        type="number"
                        placeholder="Ex: 50000"
                        required
                        min="0"
                        className="transition-all focus:scale-[1.02] text-sm sm:text-base"
                      />
                    </div>

                    {/* Délai de vente */}
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="delaiVente" className="text-sm sm:text-base">
                        Quand souhaitez-vous vendre ? *
                      </Label>
                      <Select required>
                        <SelectTrigger className="transition-all focus:scale-[1.02] text-sm sm:text-base">
                          <SelectValue placeholder="Sélectionnez un délai..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediatement">Immédiatement</SelectItem>
                          <SelectItem value="1-mois">Dans 1 mois</SelectItem>
                          <SelectItem value="2-mois">Dans 2 mois</SelectItem>
                          <SelectItem value="3-mois">Dans 3 mois</SelectItem>
                          <SelectItem value="6-mois">Dans 6 mois</SelectItem>
                          <SelectItem value="1-an">Dans 1 an</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carExt">Photos</Label>
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
                          className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          {carPreview ? (
                            <img
                              src={carPreview}
                              alt="car photo"
                              className="h-full w-full object-cover rounded-lg"
                            />
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">
                                Cliquez pour télécharger
                              </span>
                            </>
                          )}
                        </Label>
                      </div>
                      {carExtFile && (
                        <p className="text-xs text-primary flex items-center gap-1">
                          <FileCheck className="h-3 w-3" />
                          {carExtFile.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cniBack">Photos</Label>
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
                          className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          {carPreviewInt ? (
                            <img
                              src={carPreviewInt}
                              alt="photos"
                              className="h-full w-full object-cover rounded-lg"
                            />
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">
                                Cliquez pour télécharger
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                      {carIntFile && (
                        <p className="text-xs text-primary flex items-center gap-1">
                          <FileCheck className="h-3 w-3" />
                          {carIntFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenDialog(false)}
                      className="transition-all hover:scale-105 w-full sm:w-auto"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="transition-all hover:scale-105 w-full sm:w-auto"
                    >
                      Publier l'annonce
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
