import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Eye, Car, Wallet, Calendar, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const VendeurStats = () => {
  const navigate = useNavigate();

  const stats = {
    totalViews: 1250,
    totalSales: 3,
    totalRevenue: "45 700 000",
    activeListings: 5,
    viewsThisMonth: 324,
    salesThisMonth: 1,
  };

  const monthlyData = [
    { month: "Jan", views: 150, sales: 0 },
    { month: "Fév", views: 220, sales: 1 },
    { month: "Mar", views: 180, sales: 0 },
    { month: "Avr", views: 290, sales: 1 },
    { month: "Mai", views: 410, sales: 1 },
  ];

  const topVehicles = [
    { name: "Toyota RAV4 2022", views: 324, inquiries: 12 },
    { name: "Honda Accord 2021", views: 189, inquiries: 8 },
    { name: "Nissan Patrol 2020", views: 456, inquiries: 15 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Mes Statistiques
              </h1>
              <p className="text-muted-foreground font-medium mt-1">
                Suivez les performances de vos annonces
              </p>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{stats.totalViews}</p>
                    <p className="text-sm text-muted-foreground font-semibold">Vues totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{stats.totalSales}</p>
                    <p className="text-sm text-muted-foreground font-semibold">Ventes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{stats.totalRevenue}</p>
                    <p className="text-sm text-muted-foreground font-semibold">FCFA générés</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                    <Car className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{stats.activeListings}</p>
                    <p className="text-sm text-muted-foreground font-semibold">Annonces actives</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Performance */}
          <Card className="rounded-3xl border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance mensuelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center gap-4">
                    <div className="w-12 font-bold text-muted-foreground">{data.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="h-4 bg-primary/20 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(data.views / 500) * 100}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(data.views / 500) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{data.views} vues</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-green-600">
                      {data.sales} vente{data.sales > 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Vehicles */}
          <Card className="rounded-3xl border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Véhicules les plus performants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topVehicles.map((vehicle, index) => (
                  <div 
                    key={vehicle.name}
                    className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold">{vehicle.name}</h4>
                        <p className="text-sm text-muted-foreground">{vehicle.inquiries} demandes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary">{vehicle.views}</p>
                      <p className="text-xs text-muted-foreground">vues</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* This Month Summary */}
          <Card className="rounded-3xl border-none shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6">
              <div className="flex items-center gap-2 text-primary-foreground mb-4">
                <Calendar className="h-5 w-5" />
                <h3 className="text-xl font-black">Ce mois-ci</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-black text-primary-foreground">{stats.viewsThisMonth}</p>
                  <p className="text-primary-foreground/80 font-semibold">Nouvelles vues</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-primary-foreground">{stats.salesThisMonth}</p>
                  <p className="text-primary-foreground/80 font-semibold">Vente réalisée</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendeurStats;
