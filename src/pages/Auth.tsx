import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Lock, Upload, FileCheck, ArrowLeft } from "lucide-react";

type FormData = {
  fullName: string;
  role: string;
  email: string;
  contact: string;
  address: string;
  password: string;
};

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  // Formulaire d'inscription
  const [signupData, setSignupData] = useState<FormData>({
    fullName: "",
    role: "",
    email: "",
    contact: "",
    address: "",
    password: "",
  });

  // Formulaire de connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [cniFront, setCniFront] = useState<File | null>(null);
  const [cniBack, setCniBack] = useState<File | null>(null);
  const [permisConduire, setPermisConduire] = useState<File | null>(null);

  const [cniFrontPreview, setCniFrontPreview] = useState<string>("");
  const [cniBackPreview, setCniBackPreview] = useState<string>("");
  const [permisPreview, setPermisPreview] = useState<string>("");

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setSignupData({
      ...signupData,
      role: value,
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !signupData.fullName ||
      !signupData.role ||
      !signupData.email ||
      !signupData.contact ||
      !signupData.address ||
      !signupData.password
    ) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    toast.success("Inscription réussie ! Bienvenue chez Vroom Ci 🚗");
    setTimeout(() => navigate("/"), 2000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    toast.success("Connexion réussie ! Bienvenue 🚗");
    setTimeout(() => navigate("/"), 2000);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back" | "permis"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        if (type === "front") {
          setCniFront(file);
          setCniFrontPreview(preview);
        } else if (type === "back") {
          setCniBack(file);
          setCniBackPreview(preview);
        } else {
          setPermisConduire(file);
          setPermisPreview(preview);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            {activeTab === "login" ? (
              <>Connexion</>
            ) : (
              <>Créer un <span className="text-primary">compte</span></>
            )}
          </h1>
          <p className="text-muted-foreground text-lg">
            {activeTab === "login"
              ? "Connectez-vous pour accéder à votre compte"
              : "Rejoignez Vroom Ci et accédez à des centaines de véhicules"
            }
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-lg md:text-xl">
              Connexion
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-lg">
              Inscription
            </TabsTrigger>
          </TabsList>

          {/* Onglet Connexion */}
          <TabsContent value="login">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-sm">
                  <User className="h-5 w-5 text-primary md:h-9 md:w-9"/>
                  Connexion à votre compte
                </CardTitle>
                <CardDescription>
                  Entrez vos identifiants pour vous connecter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="jean.dupont@example.com"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Mot de passe *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg hover:scale-105 transition-all"
                  >
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Inscription */}
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <Card className="shadow-card hover:shadow-hover transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>
                    Renseignez vos informations de base
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Jean Dupont"
                          value={signupData.fullName}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Type de compte *</Label>
                      <Select onValueChange={handleRoleChange} value={signupData.role}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="vendeur">Vendeur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jean.dupont@example.com"
                          value={signupData.email}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Téléphone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="contact"
                          name="contact"
                          type="tel"
                          placeholder="+225 XX XX XX XX XX"
                          value={signupData.contact}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          placeholder="Cocody, Abidjan"
                          value={signupData.address}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="password">Mot de passe *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Minimum 8 caractères
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="shadow-card hover:shadow-hover transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Documents requis
                  </CardTitle>
                  <CardDescription>
                    Téléchargez vos documents d'identification (optionnel)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* CNI Recto */}
                    <div className="space-y-2">
                      <Label htmlFor="cniFront">CNI - Recto</Label>
                      <div className="relative">
                        <Input
                          id="cniFront"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "front")}
                          className="hidden"
                        />
                        <Label
                          htmlFor="cniFront"
                          className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          {cniFrontPreview ? (
                            <img
                              src={cniFrontPreview}
                              alt="CNI Recto"
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
                      {cniFront && (
                        <p className="text-xs text-primary flex items-center gap-1">
                          <FileCheck className="h-3 w-3" />
                          {cniFront.name}
                        </p>
                      )}
                    </div>

                    {/* CNI Verso */}
                    <div className="space-y-2">
                      <Label htmlFor="cniBack">CNI - Verso</Label>
                      <div className="relative">
                        <Input
                          id="cniBack"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "back")}
                          className="hidden"
                        />
                        <label
                          htmlFor="cniBack"
                          className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          {cniBackPreview ? (
                            <img
                              src={cniBackPreview}
                              alt="CNI Verso"
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
                      {cniBack && (
                        <p className="text-xs text-primary flex items-center gap-1">
                          <FileCheck className="h-3 w-3" />
                          {cniBack.name}
                        </p>
                      )}
                    </div>

                    {/* Permis de conduire */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="permisConduire">Permis de conduire</Label>
                      <div className="relative">
                        <Input
                          id="permisConduire"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "permis")}
                          className="hidden"
                        />
                        <label
                          htmlFor="permisConduire"
                          className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          {permisPreview ? (
                            <img
                              src={permisPreview}
                              alt="Permis de conduire"
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
                      {permisConduire && (
                        <p className="text-xs text-primary flex items-center gap-1">
                          <FileCheck className="h-3 w-3" />
                          {permisConduire.name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg hover:scale-105 transition-all"
              >
                Créer mon compte
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                En créant un compte, vous acceptez nos{" "}
                <a href="#" className="text-primary hover:underline">
                  Conditions d'utilisation
                </a>{" "}
                et notre{" "}
                <a href="#" className="text-primary hover:underline">
                  Politique de confidentialité
                </a>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;