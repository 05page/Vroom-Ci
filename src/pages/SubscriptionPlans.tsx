import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SubscriptionPlans = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>(
    localStorage.getItem("subscriptionType") || "free"
  );

  const plans = [
    {
      id: "free",
      name: "Gratuit",
      price: "0",
      icon: <Zap className="h-6 w-6" />,
      description: "Pour débuter sur la plateforme",
      features: [
        "5 véhicules maximum",
        "Statistiques de base",
        "Support par email",
        "Commission 15% par vente",
      ],
      limitations: [
        "Pas d'accès aux tendances",
        "Pas de mise en avant",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      price: "49,000",
      icon: <Check className="h-6 w-6" />,
      description: "Pour les professionnels débutants",
      popular: false,
      features: [
        "20 véhicules maximum",
        "Statistiques avancées",
        "Accès aux tendances du marché",
        "Support prioritaire",
        "Commission 10% par vente",
        "Badge vérifié",
      ],
      limitations: [],
    },
    {
      id: "pro",
      name: "Pro",
      price: "99,000",
      icon: <Crown className="h-6 w-6" />,
      description: "Pour les concessions établies",
      popular: true,
      features: [
        "Véhicules illimités",
        "Analyses détaillées + tendances",
        "Mise en avant premium",
        "API d'intégration",
        "Support dédié 24/7",
        "Commission 7% par vente",
        "Formation personnalisée",
        "Rapport mensuel personnalisé",
      ],
      limitations: [],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Sur devis",
      icon: <Rocket className="h-6 w-6" />,
      description: "Pour les grandes marques",
      popular: false,
      features: [
        "Tout du plan Pro",
        "Solution sur mesure",
        "Intégration complète",
        "Account manager dédié",
        "Commission négociable",
        "Campagnes marketing dédiées",
        "Formations équipe",
        "SLA garanti",
      ],
      limitations: [],
    },
  ];

  const handleSubscribe = (planId: string) => {
    if (planId === "enterprise") {
      toast({
        title: "Contactez-nous",
        description: "Notre équipe vous contactera pour discuter de vos besoins.",
      });
      return;
    }

    localStorage.setItem("subscriptionType", planId);
    
    // Mise à jour des stats si elles existent
    const savedStats = localStorage.getItem("partnerStats");
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      stats.subscriptionType = planId;
      localStorage.setItem("partnerStats", JSON.stringify(stats));
    }

    setSelectedPlan(planId);
    
    toast({
      title: "Abonnement activé !",
      description: `Vous êtes maintenant sur le plan ${plans.find(p => p.id === planId)?.name}.`,
    });

    setTimeout(() => {
      navigate("/partner-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Plans d'abonnement</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins professionnels
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "hover:shadow-md"
              } transition-all`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Le plus populaire
                </Badge>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {plan.icon}
                  </div>
                  {selectedPlan === plan.id && (
                    <Badge variant="secondary">Actuel</Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px]">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === "Sur devis" ? "" : plan.price}
                  </span>
                  {plan.price !== "Sur devis" && (
                    <span className="text-muted-foreground ml-2">FCFA/mois</span>
                  )}
                  {plan.price === "Sur devis" && (
                    <span className="text-2xl font-bold">{plan.price}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  disabled={selectedPlan === plan.id && plan.id !== "enterprise"}
                >
                  {selectedPlan === plan.id && plan.id !== "enterprise"
                    ? "Plan actuel"
                    : plan.id === "enterprise"
                    ? "Nous contacter"
                    : plan.id === "free"
                    ? "Plan gratuit"
                    : "S'abonner"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-sm text-muted-foreground">
                Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment.
                Les changements sont effectifs immédiatement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Comment fonctionne la commission ?
              </h3>
              <p className="text-sm text-muted-foreground">
                La commission est prélevée uniquement sur les ventes réussies via notre
                plateforme. Plus votre plan est élevé, plus le taux de commission est avantageux.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Qu'est-ce que l'accès aux tendances ?
              </h3>
              <p className="text-sm text-muted-foreground">
                Vous obtenez des statistiques détaillées sur les modèles les plus recherchés,
                les prix moyens du marché et les préférences des acheteurs pour optimiser
                votre stratégie de vente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
