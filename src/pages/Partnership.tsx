import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, CheckCircle2, TrendingUp, BarChart3, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Partnership = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companyType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'authentification du partenaire
    localStorage.setItem("partnerAuth", "true");
    localStorage.setItem("partnerName", formData.contactName);
    localStorage.setItem("partnerCompany", formData.companyName);
    
    toast({
      title: "Bienvenue dans votre espace partenaire !",
      description: "Votre compte a été créé avec succès.",
    });
    
    navigate("/partner/dashboard");
  };

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Augmentez vos ventes",
      description: "Accédez à notre réseau de milliers de clients actifs",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Statistiques détaillées",
      description: "Suivez vos performances en temps réel avec nos outils d'analyse",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Support dédié",
      description: "Une équipe à votre écoute pour optimiser votre visibilité",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Sécurité garantie",
      description: "Transactions sécurisées et vérification des acheteurs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-16 w-16 text-primary mr-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Devenez Partenaire
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Rejoignez les plus grandes marques automobiles qui nous font confiance pour développer leur activité
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi devenir partenaire ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Services pour les partenaires
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Vitrine Dédiée
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  • Page entreprise personnalisée
                </p>
                <p className="text-sm text-muted-foreground">
                  • Catalogue de véhicules illimité
                </p>
                <p className="text-sm text-muted-foreground">
                  • Mise en avant premium
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Outils Marketing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  • Campagnes publicitaires ciblées
                </p>
                <p className="text-sm text-muted-foreground">
                  • Analyses des tendances du marché
                </p>
                <p className="text-sm text-muted-foreground">
                  • Rapports de performance détaillés
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Gestion Simplifiée
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  • Tableau de bord intuitif
                </p>
                <p className="text-sm text-muted-foreground">
                  • API pour intégration
                </p>
                <p className="text-sm text-muted-foreground">
                  • Support prioritaire 24/7
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Demande de partenariat</CardTitle>
              <CardDescription>
                Remplissez ce formulaire et notre équipe vous contactera rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      placeholder="Ex: Toyota CI"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nom du contact *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData({ ...formData, contactName: e.target.value })
                      }
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="contact@entreprise.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+225 XX XX XX XX XX"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyType">Type d'entreprise *</Label>
                  <Select
                    value={formData.companyType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, companyType: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="constructeur">Constructeur automobile</SelectItem>
                      <SelectItem value="concessionnaire">Concessionnaire</SelectItem>
                      <SelectItem value="garage">Garage / Atelier</SelectItem>
                      <SelectItem value="location">Location de véhicules</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Parlez-nous de votre projet..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Envoyer ma demande
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
