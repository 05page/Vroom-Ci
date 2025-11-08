import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Car, ShoppingBag, Edit, ArrowLeft, Mail, Phone, Calendar, FileText } from "lucide-react";

const Account = () => {
  const [user] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+225 07 12 34 56 78",
    avatar: "/placeholder.svg",
    memberSince: "Janvier 2024",
    stats: {
      rentals: 8,
      sales: 3,
    },
  });

  const rentals = [
    { id: 1, car: "Toyota Camry 2023", startDate: "01/03/2024", endDate: "05/03/2024", price: "150 000 FCFA", status: "Terminée" },
    { id: 2, car: "Honda Civic 2024", startDate: "10/02/2024", endDate: "15/02/2024", price: "180 000 FCFA", status: "Terminée" },
    { id: 3, car: "BMW X5 2023", startDate: "15/03/2024", endDate: "20/03/2024", price: "350 000 FCFA", status: "En cours" },
  ];

  const sales = [
    { id: 1, car: "Peugeot 208 2020", date: "15/01/2024", price: "8 500 000 FCFA", buyer: "Client A" },
    { id: 2, car: "Renault Clio 2019", date: "28/02/2024", price: "7 200 000 FCFA", buyer: "Client B" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.history.back()}>
            <div className="bg-primary rounded-xl p-2">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              VROOM
            </h1>
          </div>

          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="font-bold rounded-xl hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
      </header>

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="rounded-3xl shadow-lg border-none overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary via-primary to-primary/80">
              <div className="absolute inset-0 bg-white/5" />
            </div>
            <CardContent className="pt-20 pb-8 relative">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-2 ring-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl bg-primary text-primary-foreground font-black">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{user.name}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <p className="font-semibold">Membre depuis {user.memberSince}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="font-medium">{user.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center md:justify-start pt-2">
                    <Button 
                      size="lg"
                      className="rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier le profil
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="rounded-3xl shadow-lg border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-left duration-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-primary">{user.stats.rentals}</div>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Véhicules loués</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-right duration-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  Ventes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-primary">{user.stats.sales}</div>
                <p className="text-xs font-semibold text-muted-foreground mt-1">Véhicules vendus</p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Tabs */}
          <Card className="rounded-3xl shadow-lg border-none animate-in fade-in slide-in-from-bottom duration-700">
            <CardHeader>
              <CardTitle className="text-2xl font-black tracking-tight">Mon Activité</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="rentals" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-secondary rounded-2xl">
                  <TabsTrigger 
                    value="rentals" 
                    className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md"
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Locations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sales"
                    className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Ventes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="rentals" className="space-y-4 mt-6">
                  {rentals.map((rental, index) => (
                    <Card 
                      key={rental.id} 
                      className="rounded-2xl border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Car className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="font-black text-lg tracking-tight">{rental.car}</h3>
                              <Badge 
                                variant={rental.status === "En cours" ? "default" : "secondary"}
                                className="font-bold rounded-full"
                              >
                                {rental.status}
                              </Badge>
                            </div>
                            <div className="space-y-1 pl-13">
                              <p className="text-sm font-semibold text-muted-foreground">
                                Du {rental.startDate} au {rental.endDate}
                              </p>
                              <p className="text-xl font-black text-primary">{rental.price}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Détails
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="sales" className="space-y-4 mt-6">
                  {sales.map((sale, index) => (
                    <Card 
                      key={sale.id} 
                      className="rounded-2xl border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="font-black text-lg tracking-tight">{sale.car}</h3>
                            </div>
                            <div className="space-y-1 pl-13">
                              <p className="text-sm font-semibold text-muted-foreground">
                                Vendu le {sale.date}
                              </p>
                              <p className="text-sm font-medium text-muted-foreground">
                                Acheteur: <span className="text-foreground font-bold">{sale.buyer}</span>
                              </p>
                              <p className="text-xl font-black text-primary">{sale.price}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline"
                            className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Facture
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;