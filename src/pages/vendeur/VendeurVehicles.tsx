import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  Car,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";

interface Vehicle {
  id: string;
  name: string;
  type: "vente" | "location";
  price: string;
  image: string;
  views: number;
  status: "actif" | "vendu" | "loué" | "pause";
  createdAt: string;
}

const VendeurVehicles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [vehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Toyota RAV4 2022",
      type: "vente",
      price: "18 500 000 FCFA",
      image: "/placeholder.svg",
      views: 324,
      status: "actif",
      createdAt: "Il y a 2 jours",
    },
    {
      id: "2",
      name: "Honda Accord 2021",
      type: "location",
      price: "250 000 FCFA/jour",
      image: "/placeholder.svg",
      views: 189,
      status: "actif",
      createdAt: "Il y a 5 jours",
    },
    {
      id: "3",
      name: "Nissan Patrol 2020",
      type: "vente",
      price: "22 000 000 FCFA",
      image: "/placeholder.svg",
      views: 456,
      status: "vendu",
      createdAt: "Il y a 1 semaine",
    },
  ]);

  const filteredVehicles = vehicles.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Vehicle["status"]) => {
    switch (status) {
      case "actif":
        return <Badge className="bg-green-500 font-bold">Actif</Badge>;
      case "vendu":
        return <Badge className="bg-blue-500 font-bold">Vendu</Badge>;
      case "loué":
        return <Badge className="bg-purple-500 font-bold">Loué</Badge>;
      case "pause":
        return <Badge variant="secondary" className="font-bold">En pause</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Mes Véhicules
              </h1>
              <p className="text-muted-foreground font-medium mt-1">
                Gérez vos annonces de véhicules
              </p>
            </div>
            <Button
              size="lg"
              className="rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
              onClick={() => navigate("/vendeur/vehicles/add")}
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un véhicule
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un véhicule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 rounded-xl border-2 font-medium"
            />
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{vehicles.length}</p>
                    <p className="text-xs text-muted-foreground font-semibold">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{vehicles.filter(v => v.status === "actif").length}</p>
                    <p className="text-xs text-muted-foreground font-semibold">Actifs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{vehicles.reduce((acc, v) => acc + v.views, 0)}</p>
                    <p className="text-xs text-muted-foreground font-semibold">Vues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Car className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{vehicles.filter(v => v.status === "vendu" || v.status === "loué").length}</p>
                    <p className="text-xs text-muted-foreground font-semibold">Vendus/Loués</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <Card 
                key={vehicle.id}
                className="rounded-3xl overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <Badge 
                    className={`absolute top-3 right-3 font-bold ${
                      vehicle.type === "vente" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {vehicle.type === "vente" ? "Vente" : "Location"}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black text-lg tracking-tight">{vehicle.name}</h3>
                      <p className="text-primary font-bold text-xl">{vehicle.price}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="font-medium cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="font-medium cursor-pointer text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 font-semibold">
                      <Eye className="h-4 w-4" />
                      {vehicle.views} vues
                    </div>
                    <span className="font-semibold">{vehicle.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-16">
              <Car className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">Aucun véhicule trouvé</h3>
              <p className="text-muted-foreground mt-2">
                Ajoutez votre premier véhicule pour commencer à vendre
              </p>
              <Button
                className="mt-4 rounded-xl font-bold"
                onClick={() => navigate("/vendeur/vehicles/add")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un véhicule
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendeurVehicles;
