import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Eye, Car, ShoppingBag, Edit, Settings } from "lucide-react";

const Account = () => {
  // Mock user data - will be replaced with real auth data later
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h1 className="text-3xl font-heading font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">Membre depuis {user.memberSince}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Email:</span> {user.email}</p>
                  <p className="text-sm"><span className="font-medium">Téléphone:</span> {user.phone}</p>
                </div>

                <div className="flex gap-3 justify-center md:justify-start">
                  <Button variant="default" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier le profil
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="flex justify-around md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Car className="h-4 w-4" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.stats.rentals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Ventes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.stats.sales}</div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Mon Activité</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="flex justify-around w-full grid-cols-3">
                <TabsTrigger value="rentals">Locations</TabsTrigger>
                <TabsTrigger value="sales">Ventes</TabsTrigger>
              </TabsList>

              <TabsContent value="rentals" className="space-y-4 mt-4">
                {rentals.map((rental) => (
                  <div key={rental.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-smooth">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Car className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{rental.car}</h3>
                        <Badge variant={rental.status === "En cours" ? "default" : "secondary"}>
                          {rental.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Du {rental.startDate} au {rental.endDate}</p>
                        <p className="font-medium text-foreground">{rental.price}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Voir détails</Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="sales" className="space-y-4 mt-4">
                {sales.map((sale) => (
                  <div key={sale.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-smooth">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{sale.car}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Vendu le {sale.date}</p>
                        <p>Acheteur: {sale.buyer}</p>
                        <p className="font-medium text-foreground text-base">{sale.price}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Facture</Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
