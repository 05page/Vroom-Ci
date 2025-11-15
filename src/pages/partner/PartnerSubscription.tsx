import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Crown, X, TrendingUp, BarChart3, Shield, Zap, 
  Users, HeadphonesIcon, Calendar, AlertCircle, CheckCircle2,
  Star, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0",
    duration: "Illimité",
    description: "Pour tester la plateforme",
    icon: Shield,
    color: "from-gray-500 to-gray-600",
    features: {
      vehicules: "5 maximum",
      statistiques: "Basiques",
      support: "Email (48h)",
      visibilite: "Standard",
      tendances: false,
      analytics: false,
      badge: false,
      api: false,
      priority: false,
      manager: false,
    },
  },
  {
    id: "starter",
    name: "Starter",
    price: "25000",
    duration: "/mois",
    description: "Pour les petits partenaires",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    popular: true,
    features: {
      vehicules: "20 maximum",
      statistiques: "Avancées",
      support: "Email prioritaire (24h)",
      visibilite: "Améliorée",
      tendances: true,
      analytics: true,
      badge: true,
      api: false,
      priority: true,
      manager: false,
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: "50000",
    duration: "/mois",
    description: "Pour les professionnels",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    features: {
      vehicules: "Illimités",
      statistiques: "Temps réel",
      support: "24/7 + Phone",
      visibilite: "Premium",
      tendances: true,
      analytics: true,
      badge: true,
      api: true,
      priority: true,
      manager: false,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur devis",
    duration: "",
    description: "Solution sur mesure",
    icon: Crown,
    color: "from-orange-500 to-red-500",
    features: {
      vehicules: "Illimités",
      statistiques: "Personnalisées",
      support: "Dédié 24/7",
      visibilite: "Maximum",
      tendances: true,
      analytics: true,
      badge: true,
      api: true,
      priority: true,
      manager: true,
    },
  },
];

const features = [
  { key: "vehicules", label: "Nombre de véhicules", icon: Shield },
  { key: "statistiques", label: "Statistiques", icon: BarChart3 },
  { key: "support", label: "Support client", icon: HeadphonesIcon },
  { key: "visibilite", label: "Visibilité", icon: TrendingUp },
  { key: "tendances", label: "Accès tendances marché", icon: TrendingUp },
  { key: "analytics", label: "Analytics avancées", icon: BarChart3 },
  { key: "badge", label: "Badge vérifié", icon: CheckCircle2 },
  { key: "api", label: "Accès API", icon: Zap },
  { key: "priority", label: "Listings prioritaires", icon: Star },
  { key: "manager", label: "Account Manager", icon: Users },
];

const PartnerSubscription = () => {
  const currentPlan = localStorage.getItem("subscriptionType") || "free";
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const handleSubscribe = (planId: string) => {
    localStorage.setItem("subscriptionType", planId);
    const stats = JSON.parse(localStorage.getItem("partnerStats") || "{}");
    stats.subscriptionType = planId;
    localStorage.setItem("partnerStats", JSON.stringify(stats));
    
    setSelectedPlan(planId);
    toast.success(`Abonnement ${plans.find(p => p.id === planId)?.name} activé !`);
  };

  const currentPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
              Gestion de l'abonnement
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Choisissez la formule adaptée à vos besoins professionnels
            </p>
          </div>

          {/* Current Plan Card */}
          {currentPlanDetails && (
            <Card className="rounded-3xl shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentPlanDetails.color} flex items-center justify-center`}>
                      <currentPlanDetails.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-muted-foreground uppercase">Plan actuel</p>
                        <Badge variant="secondary" className="font-bold">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Actif
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-black">{currentPlanDetails.name}</h3>
                      <p className="text-muted-foreground font-medium">{currentPlanDetails.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-primary">
                      {currentPlanDetails.price === "Sur devis" 
                        ? currentPlanDetails.price 
                        : `${currentPlanDetails.price} FCFA`}
                    </p>
                    {currentPlanDetails.duration && (
                      <p className="text-sm font-semibold text-muted-foreground">{currentPlanDetails.duration}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cards" onValueChange={(v) => setViewMode(v as "cards" | "table")}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-fit grid-cols-2 h-12 bg-secondary rounded-2xl">
              <TabsTrigger value="cards" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
                Vue Cards
              </TabsTrigger>
              <TabsTrigger value="table" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
                Comparatif
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Cards View */}
          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <Card
                    key={plan.id}
                    className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-in fade-in slide-in-from-bottom ${
                      plan.popular ? "border-2 border-primary shadow-xl" : "border-2"
                    } ${selectedPlan === plan.id ? "ring-2 ring-primary shadow-2xl" : ""}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 p-2">
                        <p className="text-center text-xs font-black text-primary-foreground flex items-center justify-center gap-1">
                          <Crown className="h-3 w-3" />
                          LE PLUS POPULAIRE
                        </p>
                      </div>
                    )}
                    
                    <div className={`${plan.popular ? "pt-10" : "pt-6"} px-6 pb-6 space-y-6`}>
                      {/* Icon and Title */}
                      <div className="space-y-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{plan.description}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="py-4 border-y">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black">
                            {plan.price === "Sur devis" ? "" : plan.price}
                          </span>
                          {plan.price !== "Sur devis" && (
                            <span className="text-lg font-bold text-muted-foreground"> FCFA</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-muted-foreground mt-1">
                          {plan.price === "Sur devis" ? "Contactez-nous" : plan.duration}
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{plan.features.vehicules}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">Stats {plan.features.statistiques}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <HeadphonesIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{plan.features.support}</span>
                        </li>
                        {plan.features.tendances && (
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">Tendances marché</span>
                          </li>
                        )}
                        {plan.features.badge && (
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">Badge vérifié</span>
                          </li>
                        )}
                        {plan.features.api && (
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">Accès API</span>
                          </li>
                        )}
                        {plan.features.manager && (
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">Account Manager</span>
                          </li>
                        )}
                      </ul>

                      {/* CTA Button */}
                      <Button
                        className={`w-full rounded-xl font-bold shadow-lg hover:scale-105 transition-all ${
                          selectedPlan === plan.id ? "shadow-primary/30" : ""
                        }`}
                        variant={selectedPlan === plan.id ? "secondary" : "default"}
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={selectedPlan === plan.id}
                      >
                        {selectedPlan === plan.id ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Plan actuel
                          </>
                        ) : (
                          <>
                            Choisir {plan.name}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Table View */}
          <TabsContent value="table">
            <Card className="rounded-3xl shadow-lg border-none overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-black w-[200px]">Fonctionnalités</TableHead>
                    {plans.map(plan => (
                      <TableHead key={plan.id} className="text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-2`}>
                            <plan.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-black text-base">{plan.name}</span>
                          <Badge variant={plan.popular ? "default" : "secondary"} className="text-xs font-bold">
                            {plan.price === "Sur devis" ? plan.price : `${plan.price} FCFA`}
                          </Badge>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <TableRow key={feature.key} className="hover:bg-secondary/30">
                        <TableCell className="font-bold">
                          <div className="flex items-center gap-3">
                            <FeatureIcon className="h-5 w-5 text-primary" />
                            {feature.label}
                          </div>
                        </TableCell>
                        {plans.map(plan => {
                          const value = plan.features[feature.key as keyof typeof plan.features];
                          return (
                            <TableCell key={plan.id} className="text-center">
                              {typeof value === "boolean" ? (
                                value ? (
                                  <Check className="h-6 w-6 text-green-600 mx-auto" />
                                ) : (
                                  <X className="h-6 w-6 text-red-400 mx-auto" />
                                )
                              ) : (
                                <span className="font-semibold">{value}</span>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  <TableRow className="bg-secondary/30">
                    <TableCell className="font-black">Action</TableCell>
                    {plans.map(plan => (
                      <TableCell key={plan.id} className="text-center">
                        <Button
                          size="sm"
                          className="rounded-xl font-bold hover:scale-105 transition-all"
                          variant={selectedPlan === plan.id ? "secondary" : "default"}
                          onClick={() => handleSubscribe(plan.id)}
                          disabled={selectedPlan === plan.id}
                        >
                          {selectedPlan === plan.id ? "Actuel" : "Choisir"}
                        </Button>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Card */}
        <Card className="rounded-3xl shadow-lg border-none bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black mb-2">Besoin d'aide pour choisir ?</h3>
                <p className="text-muted-foreground font-medium">
                  Notre équipe commerciale est disponible pour vous accompagner dans le choix de la formule idéale pour votre activité
                </p>
              </div>
              <Button 
                size="lg"
                variant="outline" 
                className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
              >
                <Users className="h-5 w-5 mr-2" />
                Contacter un conseiller
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerSubscription;