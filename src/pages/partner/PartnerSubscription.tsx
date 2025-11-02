import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0",
    description: "Pour tester la plateforme",
    features: [
      "5 véhicules maximum",
      "Statistiques basiques",
      "Support par email",
      "Visibilité standard",
    ],
    limitations: ["Pas d'accès aux tendances", "Analytiques limitées"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "25000",
    description: "Pour les petits partenaires",
    features: [
      "20 véhicules maximum",
      "Tendances du marché 🔥",
      "Statistiques avancées",
      "Support prioritaire",
      "Badge partenaire vérifié",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "50000",
    description: "Pour les professionnels",
    features: [
      "Véhicules illimités",
      "Tendances en temps réel 🔥",
      "Analytics détaillés",
      "Support 24/7",
      "Mise en avant premium",
      "API d'intégration",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur devis",
    description: "Solution sur mesure",
    features: [
      "Tout du plan Pro",
      "Solution personnalisée",
      "Gestionnaire de compte dédié",
      "Formation équipe",
      "Intégration personnalisée",
      "SLA garanti",
    ],
  },
];

const PartnerSubscription = () => {
  const currentPlan = localStorage.getItem("subscriptionType") || "free";
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const handleSubscribe = (planId: string) => {
    localStorage.setItem("subscriptionType", planId);
    const stats = JSON.parse(localStorage.getItem("partnerStats") || "{}");
    stats.subscriptionType = planId;
    localStorage.setItem("partnerStats", JSON.stringify(stats));
    
    setSelectedPlan(planId);
    toast.success(`Abonnement ${plans.find(p => p.id === planId)?.name} activé !`);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Choisissez votre formule</h1>
        <p className="text-muted-foreground text-lg">
          Des solutions adaptées à tous les besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.popular ? "border-primary shadow-lg" : ""
            } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1">
                  <Crown className="h-3 w-3 mr-1" />
                  Populaire
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  {plan.price === "Sur devis" ? plan.price : `${plan.price} FCFA`}
                </span>
                {plan.price !== "Sur devis" && (
                  <span className="text-muted-foreground">/mois</span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                {plan.limitations?.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-sm">✗ {limitation}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={selectedPlan === plan.id ? "secondary" : "default"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={selectedPlan === plan.id}
              >
                {selectedPlan === plan.id ? "Plan actuel" : "Choisir ce plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Besoin d'aide pour choisir ?</h3>
            <p className="text-muted-foreground">
              Notre équipe est là pour vous accompagner dans le choix de la formule idéale
            </p>
            <Button variant="outline" className="mt-4">
              Contacter un conseiller
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerSubscription;
