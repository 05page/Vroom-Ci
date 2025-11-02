import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Car,
  Users,
  DollarSign,
  Eye,
  ShoppingCart,
  BarChart3,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PartnerStats {
  totalViews: number;
  totalLeads: number;
  activeCars: number;
  revenue: number;
  subscriptionType: string;
}

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<PartnerStats>({
    totalViews: 0,
    totalLeads: 0,
    activeCars: 0,
    revenue: 0,
    subscriptionType: "free",
  });

  useEffect(() => {
    // Charger les données depuis localStorage
    const savedStats = localStorage.getItem("partnerStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      // Données simulées pour la démo
      const mockStats: PartnerStats = {
        totalViews: 15420,
        totalLeads: 87,
        activeCars: 23,
        revenue: 12500000,
        subscriptionType: localStorage.getItem("subscriptionType") || "free",
      };
      setStats(mockStats);
      localStorage.setItem("partnerStats", JSON.stringify(mockStats));
    }
  }, []);

  const trendingData = [
    { model: "Toyota Corolla", views: 2340, leads: 23, trend: "+12%" },
    { model: "Honda Civic", views: 1890, leads: 18, trend: "+8%" },
    { model: "Nissan Altima", views: 1650, leads: 15, trend: "+5%" },
    { model: "Hyundai Elantra", views: 1420, leads: 12, trend: "+3%" },
    { model: "Mazda 3", views: 1120, leads: 9, trend: "-2%" },
  ];

  const isSubscribed = stats.subscriptionType !== "free";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tableau de bord partenaire</h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue et suivez vos performances
            </p>
          </div>
          <div className="flex gap-3">
            <Badge
              variant={isSubscribed ? "default" : "secondary"}
              className="h-8 px-4 flex items-center gap-2"
            >
              {isSubscribed && <Crown className="h-4 w-4" />}
              {stats.subscriptionType === "free" && "Gratuit"}
              {stats.subscriptionType === "starter" && "Starter"}
              {stats.subscriptionType === "pro" && "Pro"}
              {stats.subscriptionType === "enterprise" && "Enterprise"}
            </Badge>
            <Button onClick={() => navigate("/subscription-plans")}>
              {isSubscribed ? "Gérer l'abonnement" : "S'abonner"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vues totales</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">+20.1% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Demandes de contact</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground mt-1">+12.5% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Véhicules actifs</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCars}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {isSubscribed ? "Illimité" : "Max 5"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenus générés</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.revenue.toLocaleString()} FCFA
              </div>
              <p className="text-xs text-muted-foreground mt-1">+15.3% ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            <TabsTrigger value="trending">
              Tendances {!isSubscribed && "🔒"}
            </TabsTrigger>
            <TabsTrigger value="vehicles">Mes véhicules</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance mensuelle</CardTitle>
                <CardDescription>Évolution de vos indicateurs clés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mb-4" />
                  <p>Graphiques de performance disponibles ici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            {!isSubscribed ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Fonctionnalité Premium
                  </CardTitle>
                  <CardDescription>
                    Accédez aux tendances du marché avec un abonnement
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-24 w-24 text-muted-foreground/30 mb-6" />
                  <p className="text-center text-muted-foreground mb-6 max-w-md">
                    Découvrez les modèles les plus recherchés, les prix moyens du marché et
                    optimisez votre stratégie de vente.
                  </p>
                  <Button size="lg" onClick={() => navigate("/subscription-plans")}>
                    Voir les abonnements
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Modèles les plus populaires</CardTitle>
                  <CardDescription>
                    Classement basé sur les vues et demandes de contact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{item.model}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.views.toLocaleString()} vues • {item.leads} leads
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={item.trend.startsWith("+") ? "default" : "secondary"}
                        >
                          {item.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Catalogue de véhicules</CardTitle>
                <CardDescription>
                  Gérez vos annonces actives ({stats.activeCars} véhicules)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-16 w-16 mb-4" />
                  <p>Votre catalogue de véhicules apparaîtra ici</p>
                  <Button className="mt-6">Ajouter un véhicule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerDashboard;
