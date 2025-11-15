import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Shield,
  Rocket,
  Star,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const Partnership = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companyType: "",
    message: "",
  });

  const handleSubmit = () => {
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.companyType) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    toast.success("Demande envoyée avec succès ! 🎉", {
      description: "Notre équipe vous contactera sous 24h",
    });
    
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      companyType: "",
      message: "",
    });
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Augmentez vos ventes",
      description: "Accédez à notre réseau de milliers de clients actifs",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Statistiques détaillées",
      description: "Suivez vos performances en temps réel avec nos outils d'analyse",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Users,
      title: "Support dédié",
      description: "Une équipe à votre écoute pour optimiser votre visibilité",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Transactions sécurisées et vérification des acheteurs",
      color: "from-amber-500 to-orange-600",
    },
  ];

  const services = [
    {
      title: "Vitrine Dédiée",
      icon: Rocket,
      features: [
        "Page entreprise personnalisée",
        "Catalogue de véhicules illimité",
        "Mise en avant premium",
        "Photos et vidéos HD"
      ],
    },
    {
      title: "Outils Marketing",
      icon: TrendingUp,
      features: [
        "Campagnes publicitaires ciblées",
        "Analyses des tendances du marché",
        "Rapports de performance détaillés",
        "SEO optimisé"
      ],
    },
    {
      title: "Gestion Simplifiée",
      icon: Sparkles,
      features: [
        "Tableau de bord intuitif",
        "API pour intégration",
        "Support prioritaire 24/7",
        "Formation complète"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary font-bold rounded-full px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-1" />
                Programme Partenaires
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                Devenez Partenaire
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-semibold max-w-3xl mx-auto">
                Rejoignez les plus grandes marques automobiles qui nous font confiance pour développer leur activité
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Badge className="bg-green-100 text-green-700 font-bold rounded-full px-4 py-2">
                <Star className="h-4 w-4 mr-1" />
                +500 partenaires
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 font-bold rounded-full px-4 py-2">
                <Users className="h-4 w-4 mr-1" />
                +10,000 clients
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 font-bold rounded-full px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +25% de ventes
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-muted-foreground text-lg font-semibold">
              Des avantages exclusifs pour développer votre business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="rounded-3xl shadow-lg border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-3xl flex items-center justify-center shadow-lg mx-auto`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg tracking-tight mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-semibold">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Services pour les partenaires
            </h2>
            <p className="text-muted-foreground text-lg font-semibold">
              Tous les outils pour réussir
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="rounded-3xl shadow-lg border-2 border-transparent hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${(index + 8) * 100}ms` }}
                >
                  <CardHeader className="space-y-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-3xl shadow-2xl border-none overflow-hidden animate-in fade-in slide-in-from-bottom duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            
            <CardHeader className="relative space-y-4 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-black tracking-tight">
                    Demande de partenariat
                  </CardTitle>
                  <CardDescription className="text-base font-semibold mt-1">
                    Remplissez ce formulaire et notre équipe vous contactera rapidement
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="font-bold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Nom de l'entreprise *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Ex: Toyota CI"
                    className="h-12 rounded-xl font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName" className="font-bold flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Nom du contact *
                  </Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    placeholder="Votre nom"
                    className="h-12 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email professionnel *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="contact@entreprise.com"
                    className="h-12 rounded-xl font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+225 XX XX XX XX XX"
                    className="h-12 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyType" className="font-bold flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Type d'entreprise *
                </Label>
                <Select
                  value={formData.companyType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, companyType: value })
                  }
                >
                  <SelectTrigger className="h-12 rounded-xl font-semibold">
                    <SelectValue placeholder="Sélectionnez votre type d'entreprise..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="constructeur" className="rounded-xl font-semibold">
                      Constructeur automobile
                    </SelectItem>
                    <SelectItem value="concessionnaire" className="rounded-xl font-semibold">
                      Concessionnaire
                    </SelectItem>
                    <SelectItem value="garage" className="rounded-xl font-semibold">
                      Garage / Atelier
                    </SelectItem>
                    <SelectItem value="location" className="rounded-xl font-semibold">
                      Location de véhicules
                    </SelectItem>
                    <SelectItem value="autoEcole" className="rounded-xl font-semibold">
                      Auto Ecole
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-bold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Message (optionnel)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Parlez-nous de votre projet, vos objectifs, vos besoins..."
                  rows={5}
                  className="rounded-xl font-semibold resize-none"
                />
              </div>

              <div className="bg-blue-500/10 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-blue-900 dark:text-blue-100">
                    Réponse rapide garantie
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-200 font-semibold">
                    Notre équipe vous contactera sous 24h pour discuter de votre projet
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/30 hover:scale-105 transition-all"
              >
                Envoyer ma demande
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              Sans engagement
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              Données sécurisées
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              Inscription rapide
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;