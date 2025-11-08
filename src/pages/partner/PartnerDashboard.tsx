import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Users, Car, DollarSign, TrendingUp, Crown, ArrowUpRight, Sparkles, Target, BarChart3 } from "lucide-react";

interface PartnerStats {
  totalViews: number;
  totalLeads: number;
  activeCars: number;
  revenue: number;
  subscriptionType: string;
}

const PartnerDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<PartnerStats>({
    totalViews: 15420,
    totalLeads: 87,
    activeCars: 23,
    revenue: 12500000,
    subscriptionType: "free",
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isSubscribed = stats.subscriptionType !== "free";

  const statCards = [
    {
      title: "Vues totales",
      value: stats.totalViews.toLocaleString(),
      change: "+20.1% ce mois",
      icon: Eye,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Demandes de contact",
      value: stats.totalLeads.toString(),
      change: "+12.5% ce mois",
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Véhicules actifs",
      value: stats.activeCars.toString(),
      change: isSubscribed ? "Illimité" : "Max 5 véhicules",
      icon: Car,
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Revenus générés",
      value: `${(stats.revenue / 1000000).toFixed(1)}M`,
      change: "+15.3% ce mois",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      unit: "FCFA"
    },
  ];

  const quickActions = [
    {
      title: "Gérer mes véhicules",
      description: "Ajouter ou modifier vos annonces",
      icon: Car,
      gradient: "from-blue-500 to-cyan-500",
      route: "/partner/vehicles"
    },
    {
      title: "Voir les statistiques",
      description: "Analysez vos performances détaillées",
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-500",
      route: "/partner/analytics"
    },
    {
      title: "Tendances du marché",
      description: isSubscribed ? "Découvrez les modèles populaires" : "Fonctionnalité Premium",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      route: "/partner/trends",
      locked: !isSubscribed
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Vue d'ensemble de vos performances
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Badge
              variant={isSubscribed ? "default" : "secondary"}
              className="h-10 px-5 flex items-center justify-center gap-2 rounded-xl font-bold text-sm"
            >
              {isSubscribed && <Crown className="h-4 w-4" />}
              {stats.subscriptionType === "free" && "Gratuit"}
              {stats.subscriptionType === "starter" && "Starter"}
              {stats.subscriptionType === "pro" && "Pro"}
              {stats.subscriptionType === "enterprise" && "Enterprise"}
            </Badge>
            <Button 
              className="rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
              size="lg"
            >
              {isSubscribed ? "Gérer l'abonnement" : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Passer Premium
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="rounded-3xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-28 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {statCards.map((stat, index) => (
                <Card
                  key={stat.title}
                  className="group relative overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-sm font-bold text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`${stat.bgColor} p-3 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <stat.icon className={`h-5 w-5 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} style={{
                        WebkitTextFillColor: 'transparent',
                        WebkitBackgroundClip: 'text'
                      }} />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-black tracking-tight">
                        {stat.value}
                      </div>
                      {stat.unit && (
                        <span className="text-sm font-bold text-muted-foreground">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      <p className="text-xs font-semibold text-green-500">
                        {stat.change}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 rounded-3xl border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Performance ce mois
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Évolution de vos statistiques clés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">Taux de conversion</span>
                  <span className="text-sm font-black">5.6%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '56%' }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">Engagement visiteurs</span>
                  <span className="text-sm font-black">78%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">Satisfaction client</span>
                  <span className="text-sm font-black">92%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-lg bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-6 w-6" />
                <CardTitle className="text-2xl font-black tracking-tight">
                  Objectif mensuel
                </CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80 font-medium">
                Vous êtes presque à l'objectif !
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold">Progression</span>
                  <span className="text-3xl font-black">87%</span>
                </div>
                <div className="h-4 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white/80 to-white rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div className="pt-4 border-t border-primary-foreground/20">
                <p className="text-sm font-semibold">
                  Plus que <span className="text-2xl font-black">11</span> demandes
                </p>
                <p className="text-xs font-medium text-primary-foreground/80 mt-1">
                  pour atteindre votre objectif de 100
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="rounded-3xl">
                    <CardHeader>
                      <Skeleton className="h-8 w-48 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                  </Card>
                ))}
              </>
            ) : (
              <>
                {quickActions.map((action, index) => (
                  <Card
                    key={action.title}
                    className={`group relative overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-in fade-in slide-in-from-bottom ${
                      action.locked ? 'opacity-60' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                    
                    <CardHeader className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <action.icon className="h-7 w-7 text-white" />
                      </div>
                      
                      <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                        {action.title}
                        {action.locked && (
                          <span className="text-base">🔒</span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {action.description}
                      </CardDescription>
                    </CardHeader>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-full flex items-center justify-center`}>
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <Card className="rounded-3xl border-none shadow-lg bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Insights & Recommandations
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">Tendance à la hausse</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Vos annonces de SUV ont 45% plus de vues ce mois. Considérez ajouter plus de véhicules similaires.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">Engagement optimal</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Le meilleur moment pour publier est entre 14h et 18h. Vos annonces reçoivent 3x plus de vues.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;