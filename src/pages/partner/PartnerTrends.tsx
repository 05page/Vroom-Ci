import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Crown, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  DollarSign,
  Users,
  PieChart
} from "lucide-react";

const PartnerTrends = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionType] = useState("premium"); // Change to "free" to see locked state
  const isSubscribed = subscriptionType !== "free";

  useEffect(() => {
    if (isSubscribed) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSubscribed]);

  const trendingData = [
    { model: "Toyota Corolla", views: 2340, leads: 23, trend: "+12%", avgPrice: "8 500 000", trendUp: true },
    { model: "Honda Civic", views: 1890, leads: 18, trend: "+8%", avgPrice: "7 200 000", trendUp: true },
    { model: "Nissan Altima", views: 1650, leads: 15, trend: "+5%", avgPrice: "6 800 000", trendUp: true },
    { model: "Hyundai Elantra", views: 1420, leads: 12, trend: "+3%", avgPrice: "5 900 000", trendUp: true },
    { model: "Mazda 3", views: 1120, leads: 9, trend: "-2%", avgPrice: "6 500 000", trendUp: false },
  ];

  const preferences = [
    { label: "Transmission Automatique", value: "68%", icon: "🚗" },
    { label: "Carburant Essence", value: "52%", icon: "⛽" },
    { label: "Couleur Blanc", value: "45%", icon: "🎨" },
    { label: "SUV / Crossover", value: "38%", icon: "🚙" },
  ];

  const budgetRanges = [
    { range: "5M - 8M FCFA", percentage: "42%", value: 42 },
    { range: "8M - 12M FCFA", percentage: "35%", value: 35 },
    { range: "12M+ FCFA", percentage: "23%", value: 23 },
  ];

  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-3xl shadow-lg border-none overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">
                <div className="absolute inset-0 bg-white/10" />
              </div>
              <CardContent className="pt-20 pb-12 relative">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-black tracking-tight mb-2">
                      Fonctionnalité Premium
                    </h2>
                    <p className="text-muted-foreground font-semibold">
                      Accédez aux tendances du marché avec un abonnement
                    </p>
                  </div>

                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-12 w-12 text-primary" />
                  </div>

                  <div className="max-w-md space-y-4">
                    <h3 className="text-2xl font-black tracking-tight">
                      Débloquez les tendances du marché
                    </h3>
                    <p className="text-muted-foreground font-semibold">
                      Découvrez les modèles les plus recherchés, les prix moyens du marché,
                      les préférences des clients et optimisez votre stratégie de vente.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center pt-4">
                    <Badge className="bg-amber-100 text-amber-700 font-bold rounded-full px-4 py-2">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Insights exclusifs
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 font-bold rounded-full px-4 py-2">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Données en temps réel
                    </Badge>
                  </div>

                  <Button 
                    size="lg"
                    className="rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:scale-105 transition-all bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700"
                  >
                    <Crown className="h-5 w-5 mr-2" />
                    Voir les abonnements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <Skeleton className="h-10 w-64 mb-2 rounded-2xl" />
              <Skeleton className="h-6 w-96 rounded-2xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-[400px] w-full rounded-3xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-[300px] w-full rounded-3xl" />
                <Skeleton className="h-[300px] w-full rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Tendances du marché
              </h1>
              <Badge className="bg-amber-500 text-white font-bold rounded-full">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>
            <p className="text-muted-foreground font-semibold">
              Insights exclusifs sur les modèles les plus performants
            </p>
          </div>

          {/* Trending Models Card */}
          <Card className="rounded-3xl shadow-lg border-none animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight">
                    Modèles les plus populaires
                  </CardTitle>
                  <CardDescription className="font-semibold">
                    Classement basé sur les vues et demandes de contact
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingData.map((item, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-left"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        {/* Rank Badge */}
                        <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black text-xl ${
                          index === 0 ? 'bg-amber-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {index === 0 ? '🏆' : index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h4 className="font-black text-lg tracking-tight mb-2">
                            {item.model}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                              <Eye className="h-4 w-4 text-blue-500" />
                              <span className="font-bold">{item.views.toLocaleString()}</span>
                              <span className="text-muted-foreground font-semibold">vues</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MessageSquare className="h-4 w-4 text-green-500" />
                              <span className="font-bold">{item.leads}</span>
                              <span className="text-muted-foreground font-semibold">demandes</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="h-4 w-4 text-purple-500" />
                              <span className="font-bold">{item.avgPrice} FCFA</span>
                            </div>
                          </div>
                        </div>

                        {/* Trend Badge */}
                        <Badge 
                          className={`font-bold rounded-full ${
                            item.trendUp 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {item.trendUp ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {item.trend}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferences and Budget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferences Card */}
            <Card className="rounded-3xl shadow-lg border-none animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: "700ms" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-2xl font-black tracking-tight">
                    Préférences clients
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {preferences.map((pref, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-2xl hover:bg-secondary transition-all animate-in fade-in slide-in-from-left"
                    style={{ animationDelay: `${(index + 8) * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pref.icon}</span>
                      <span className="font-bold">{pref.label}</span>
                    </div>
                    <Badge className="bg-purple-500 font-bold text-lg px-4 py-1 rounded-full">
                      {pref.value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Budget Card */}
            <Card className="rounded-3xl shadow-lg border-none animate-in fade-in slide-in-from-right duration-500" style={{ animationDelay: "700ms" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl font-black tracking-tight">
                    Budget moyen
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgetRanges.map((budget, index) => (
                  <div
                    key={index}
                    className="space-y-2 animate-in fade-in slide-in-from-right"
                    style={{ animationDelay: `${(index + 12) * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{budget.range}</span>
                      <Badge className="bg-green-500 font-bold text-lg px-4 py-1 rounded-full">
                        {budget.percentage}
                      </Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                        style={{ width: `${budget.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerTrends;