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
    
    // Tous les utilisateurs (clients et vendeurs) vont vers le dashboard client
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setDialogMessage({ title: "Erreur", description: "Veuillez remplir tous les champs" });
      setShowErrorDialog(true);
      return;
    }
    
    // Récupérer le rôle stocké
    const storedRole = localStorage.getItem("userRole") || "client";
    localStorage.setItem("userAuth", "true");
    
    setDialogMessage({ title: "Connexion réussie !", description: "Bienvenue sur VROOM CI !" });
    setShowSuccessDialog(true);
    
    // Tous les utilisateurs (clients et vendeurs) vont vers le dashboard client
    setTimeout(() => navigate("/dashboard"), 2500);
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

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou continuer avec
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="h-11 hover:bg-muted/50"
                        onClick={() => {
                          setDialogMessage({ title: "Google", description: "Connexion avec Google bientôt disponible !" });
                          setShowSuccessDialog(true);
                        }}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-11 hover:bg-muted/50"
                        onClick={() => {
                          setDialogMessage({ title: "Facebook", description: "Connexion avec Facebook bientôt disponible !" });
                          setShowSuccessDialog(true);
                        }}
                      >
                        <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-11 hover:bg-muted/50"
                        onClick={() => {
                          setDialogMessage({ title: "Apple", description: "Connexion avec Apple bientôt disponible !" });
                          setShowSuccessDialog(true);
                        }}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                        </svg>
                      </Button>
                    </div>
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

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou s'inscrire avec
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="h-11 hover:bg-muted/50"
                        type="button"
                        onClick={() => {
                          setDialogMessage({ title: "Google", description: "Inscription avec Google bientôt disponible !" });
                          setShowSuccessDialog(true);
                        }}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-11 hover:bg-muted/50"
                        type="button"
                        onClick={() => {
                          setDialogMessage({ title: "Facebook", description: "Inscription avec Facebook bientôt disponible !" });
                          setShowSuccessDialog(true);
                        }}
                      >
                        <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-11 hover:bg-muted/50"
                        type="button"
                        onClick={() => {
                          setDialogMessage({ title: "Apple", description: "Inscription avec Apple bientôt disponible !" });
                          setShowSuccessDialog(true);
                        }}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                        </svg>
                      </Button>
                    </div>
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
