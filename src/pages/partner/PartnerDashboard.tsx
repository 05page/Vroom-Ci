import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users, Car, DollarSign, TrendingUp, Crown } from "lucide-react";
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
    totalViews: 15420,
    totalLeads: 87,
    activeCars: 23,
    revenue: 12500000,
    subscriptionType: "free",
  });

  useEffect(() => {
    const savedStats = localStorage.getItem("partnerStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const isSubscribed = stats.subscriptionType !== "free";

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de vos performances</p>
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
          <Button onClick={() => navigate("/partner/subscription")}>
            {isSubscribed ? "Gérer l'abonnement" : "Passer Premium"}
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
              {isSubscribed ? "Illimité" : "Max 5 véhicules"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenus générés</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue.toLocaleString()} FCFA</div>
            <p className="text-xs text-muted-foreground mt-1">+15.3% ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/partner/vehicles")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Gérer mes véhicules
            </CardTitle>
            <CardDescription>Ajouter ou modifier vos annonces</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/partner/analytics")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Voir les statistiques
            </CardTitle>
            <CardDescription>Analysez vos performances détaillées</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/partner/trends")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Tendances du marché
              {!isSubscribed && " 🔒"}
            </CardTitle>
            <CardDescription>
              {isSubscribed ? "Découvrez les modèles populaires" : "Fonctionnalité Premium"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;
