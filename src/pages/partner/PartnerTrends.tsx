import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerTrends = () => {
  const navigate = useNavigate();
  const subscriptionType = localStorage.getItem("subscriptionType") || "free";
  const isSubscribed = subscriptionType !== "free";

  const trendingData = [
    { model: "Toyota Corolla", views: 2340, leads: 23, trend: "+12%", avgPrice: "8500000" },
    { model: "Honda Civic", views: 1890, leads: 18, trend: "+8%", avgPrice: "7200000" },
    { model: "Nissan Altima", views: 1650, leads: 15, trend: "+5%", avgPrice: "6800000" },
    { model: "Hyundai Elantra", views: 1420, leads: 12, trend: "+3%", avgPrice: "5900000" },
    { model: "Mazda 3", views: 1120, leads: 9, trend: "-2%", avgPrice: "6500000" },
  ];

  if (!isSubscribed) {
    return (
      <div className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              Fonctionnalité Premium
            </CardTitle>
            <CardDescription>
              Accédez aux tendances du marché avec un abonnement
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <TrendingUp className="h-32 w-32 text-muted-foreground/30 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Débloquez les tendances du marché</h3>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              Découvrez les modèles les plus recherchés, les prix moyens du marché,
              les préférences des clients et optimisez votre stratégie de vente.
            </p>
            <Button size="lg" onClick={() => navigate("/partner/subscription")}>
              <Crown className="h-4 w-4 mr-2" />
              Voir les abonnements
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tendances du marché</h1>
        <p className="text-muted-foreground">
          Insights exclusifs sur les modèles les plus performants
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modèles les plus populaires</CardTitle>
          <CardDescription>Classement basé sur les vues et demandes de contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{item.model}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>{item.views.toLocaleString()} vues</span>
                      <span>•</span>
                      <span>{item.leads} demandes</span>
                      <span>•</span>
                      <span className="font-medium">{item.avgPrice} FCFA (prix moyen)</span>
                    </div>
                  </div>
                </div>
                <Badge variant={item.trend.startsWith("+") ? "default" : "secondary"}>
                  {item.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Préférences clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Automatique</span>
                <Badge>68%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Essence</span>
                <Badge>52%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Couleur: Blanc</span>
                <Badge>45%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>5M - 8M FCFA</span>
                <Badge>42%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>8M - 12M FCFA</span>
                <Badge>35%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>12M+ FCFA</span>
                <Badge>23%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerTrends;
