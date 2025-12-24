import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Lock, Upload, FileCheck, ArrowLeft } from "lucide-react";
import SuccessDialog from "@/components/SuccessDialog";
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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({ title: "", description: "" });

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
      setDialogMessage({ title: "Erreur", description: "Veuillez remplir tous les champs" });
      setShowErrorDialog(true);
      return;
    }
    
    // Stocker le rôle et l'état d'authentification
    localStorage.setItem("userRole", signupData.role);
    localStorage.setItem("userAuth", "true");
    localStorage.setItem("userName", signupData.fullName);
    
    setDialogMessage({ title: "Inscription réussie !", description: "Bienvenue chez VROOM CI ! Votre compte a été créé avec succès." });
    setShowSuccessDialog(true);
    
    // Redirection basée sur le rôle
    const redirectPath = signupData.role === "vendeur" ? "/partner/dashboard" : "/dashboard";
    setTimeout(() => navigate(redirectPath), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setDialogMessage({ title: "Erreur", description: "Veuillez remplir tous les champs" });
      setShowErrorDialog(true);
      return;
    }
    
    // Simuler la récupération du rôle (en production, viendrait du backend)
    // Pour la simulation, on utilise le rôle stocké ou on définit "client" par défaut
    const storedRole = localStorage.getItem("userRole") || "client";
    localStorage.setItem("userAuth", "true");
    
    setDialogMessage({ title: "Connexion réussie !", description: "Bienvenue sur VROOM CI !" });
    setShowSuccessDialog(true);
    
    // Redirection basée sur le rôle
    const redirectPath = storedRole === "vendeur" ? "/partner/dashboard" : "/dashboard";
    setTimeout(() => navigate(redirectPath), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Panneau gauche - Branding */}
            <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold">Bienvenue sur</h1>
                  <h2 className="text-5xl font-bold">VROOM <span className="text-[hsl(153,100%,36%)]">CI</span></h2>
                </div>
                <p className="text-lg text-primary-foreground/90">
                  {activeTab === "login"
                    ? "Connectez-vous pour accéder à votre compte et gérer vos locations"
                    : "Créez votre compte et accédez à des centaines de véhicules de qualité"
                  }
                </p>
                <div className="pt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-foreground/20 p-2 rounded-lg">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Profil personnalisé</h3>
                      <p className="text-sm text-primary-foreground/80">
                        Gérez vos informations et préférences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-foreground/20 p-2 rounded-lg">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Sécurisé</h3>
                      <p className="text-sm text-primary-foreground/80">
                        Vos données sont protégées
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panneau droit - Formulaire */}
            <div className="p-8 lg:p-12">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="mb-6 hover:bg-primary/10 -ml-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                  <TabsTrigger value="login" className="text-base">
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-base">
                    Inscription
                  </TabsTrigger>
                </TabsList>

                {/* Onglet Connexion */}
                <TabsContent value="login">
                  <div className="space-y-6">
                    <form onSubmit={handleLoginSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Adresse email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <a href="#" className="text-sm text-primary hover:underline font-medium">
                          Mot de passe oublié ?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
                      >
                        Se connecter
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                {/* Onglet Inscription */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignupSubmit} className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
                    {/* Informations personnelles */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Nom complet</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="fullName"
                              name="fullName"
                              placeholder="Jean Dupont"
                              value={signupData.fullName}
                              onChange={handleSignupChange}
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role">Type de compte</Label>
                          <Select onValueChange={handleRoleChange} value={signupData.role}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="client">Client</SelectItem>
                              <SelectItem value="vendeur">Vendeur</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="votre@email.com"
                              value={signupData.email}
                              onChange={handleSignupChange}
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact">Téléphone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="contact"
                              name="contact"
                              type="tel"
                              placeholder="+225 XX XX XX XX XX"
                              value={signupData.contact}
                              onChange={handleSignupChange}
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="address">Adresse</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="address"
                              name="address"
                              placeholder="Cocody, Abidjan"
                              value={signupData.address}
                              onChange={handleSignupChange}
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="password">Mot de passe</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="••••••••"
                              value={signupData.password}
                              onChange={handleSignupChange}
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Minimum 8 caractères
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 text-base font-semibold hover:scale-[1.02] transition-all shadow-lg"
                    >
                      Créer mon compte
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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
    </div>
  );
};

export default Auth;
