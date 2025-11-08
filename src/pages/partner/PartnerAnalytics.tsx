import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointerClick,
  ShoppingCart,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const PartnerAnalytics = () => {
  const stats = [
    {
      title: "Vues totales",
      value: "24,589",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "bg-blue-500",
    },
    {
      title: "Visiteurs uniques",
      value: "8,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Taux de clics",
      value: "3.24%",
      change: "-0.5%",
      trend: "down",
      icon: MousePointerClick,
      color: "bg-orange-500",
    },
    {
      title: "Conversions",
      value: "267",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
  ];

  const trafficSources = [
    { source: "Recherche Google", visits: "12,543", percentage: 51, color: "bg-blue-500" },
    { source: "Réseaux sociaux", visits: "5,892", percentage: 24, color: "bg-purple-500" },
    { source: "Direct", visits: "3,678", percentage: 15, color: "bg-green-500" },
    { source: "Référents", visits: "2,476", percentage: 10, color: "bg-orange-500" },
  ];

  const conversionData = [
    { action: "Demandes de contact", count: 156, rate: "6.2%", trend: "up" },
    { action: "Réservations", count: 89, rate: "3.5%", trend: "up" },
    { action: "Ajouts aux favoris", count: 423, rate: "16.8%", trend: "down" },
    { action: "Partages", count: 234, rate: "9.3%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Statistiques détaillées
              </h1>
            </div>
            <p className="text-muted-foreground font-semibold">
              Analysez vos performances en profondeur
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.title}
                className="rounded-3xl shadow-lg border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`font-bold rounded-full ${
                        stat.trend === "up" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-black text-foreground">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Section */}
          <Card className="rounded-3xl shadow-lg border-none animate-in fade-in slide-in-from-bottom duration-700">
            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-secondary rounded-2xl">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Vue d'ensemble
                  </TabsTrigger>
                  <TabsTrigger 
                    value="traffic"
                    className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trafic
                  </TabsTrigger>
                  <TabsTrigger 
                    value="conversions"
                    className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Conversions
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-2">Performance mensuelle</h3>
                    <p className="text-muted-foreground font-semibold mb-6">
                      Évolution de vos indicateurs clés
                    </p>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-12">
                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-24 h-24 bg-background rounded-3xl flex items-center justify-center shadow-lg">
                        <BarChart3 className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black tracking-tight mb-2">
                          Graphiques analytiques en développement
                        </h4>
                        <p className="text-muted-foreground font-semibold max-w-md">
                          Bientôt disponible : graphiques interactifs pour visualiser vos données en temps réel
                        </p>
                      </div>
                      <Badge className="bg-primary/10 text-primary font-bold rounded-full px-4 py-2">
                        Disponible prochainement
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                {/* Traffic Tab */}
                <TabsContent value="traffic" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-2">Analyse du trafic</h3>
                    <p className="text-muted-foreground font-semibold mb-6">
                      Sources de vos visiteurs et comportements
                    </p>
                  </div>

                  <div className="space-y-4">
                    {trafficSources.map((source, index) => (
                      <Card 
                        key={source.source}
                        className="rounded-2xl border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-left"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 ${source.color} rounded-full`} />
                              <h4 className="font-black text-lg">{source.source}</h4>
                            </div>
                            <div className="text-right">
                              <p className="font-black text-lg text-primary">{source.visits}</p>
                              <p className="text-xs font-bold text-muted-foreground">visites</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-muted-foreground">Pourcentage du trafic</span>
                              <span className="font-black">{source.percentage}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                              <div 
                                className={`h-full ${source.color} rounded-full transition-all duration-1000`}
                                style={{ width: `${source.percentage}%` }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Conversions Tab */}
                <TabsContent value="conversions" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-2">Taux de conversion</h3>
                    <p className="text-muted-foreground font-semibold mb-6">
                      Suivi des demandes de contact et réservations
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {conversionData.map((item, index) => (
                      <Card 
                        key={item.action}
                        className="rounded-3xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                              <Target className="h-6 w-6 text-primary" />
                            </div>
                            <Badge 
                              variant="secondary"
                              className={`font-bold rounded-full ${
                                item.trend === "up" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {item.trend === "up" ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              {item.rate}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                              {item.action}
                            </p>
                            <p className="text-4xl font-black text-primary mb-1">
                              {item.count}
                            </p>
                            <p className="text-sm font-semibold text-muted-foreground">
                              actions ce mois
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerAnalytics;