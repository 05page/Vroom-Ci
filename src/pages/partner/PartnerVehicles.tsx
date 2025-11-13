import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Filter, Car, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PartnerVehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const loadVehicles = () => {
      setVehicles([]);
      setIsLoading(false);
    };

    const timer = setTimeout(loadVehicles, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter(v => v.id !== id);
    setVehicles(updatedVehicles);
    toast.success("Véhicule supprimé avec succès");
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Mes véhicules
              </h1>
              <p className="text-muted-foreground text-lg font-medium">
                Gérez votre catalogue de véhicules
              </p>
            </div>
            <Button 
              size="lg"
              className="rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un véhicule
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un véhicule..."
              className="pl-12 h-12 rounded-xl border-2 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <Card className="rounded-3xl shadow-lg">
            <CardContent className="py-20">
              <div className="flex flex-col items-center justify-center space-y-6">
                <Skeleton className="h-36 w-36 rounded-full" />
                <Skeleton className="h-8 w-64 rounded-xl" />
                <Skeleton className="h-6 w-96 rounded-xl" />
                <Skeleton className="h-12 w-48 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ) : vehicles.length === 0 ? (
          <Card className="rounded-3xl shadow-lg border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-36 h-36 bg-primary/10 rounded-full flex items-center justify-center">
                    <Car className="h-20 w-20 text-primary"/>
                  </div>
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-3xl font-black tracking-tight">
                    Aucun véhicule pour le moment
                  </CardTitle>
                  <CardDescription className="max-w-md text-base font-medium">
                    Commencez par ajouter votre premier véhicule à votre catalogue pour attirer des clients
                  </CardDescription>
                </div>
                <Button 
                  size="lg"
                  className="mt-6 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter mon premier véhicule
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <Card 
                key={vehicle.id} 
                className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
                  <Car className="h-20 w-20 text-primary/40 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="font-bold rounded-xl">
                      {vehicle.condition}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-black text-xl tracking-tight mb-1">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground">{vehicle.year}</p>
                  </div>
                  
                  <p className="text-3xl font-black text-primary">
                    {parseInt(vehicle.price).toLocaleString()} FCFA
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1">Kilométrage</p>
                      <p className="font-black text-lg">{parseInt(vehicle.mileage).toLocaleString()} km</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1">Carburant</p>
                      <p className="font-black text-lg">{vehicle.fuel}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl font-bold border-2 hover:scale-105 transition-all"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1 rounded-xl font-bold hover:scale-105 transition-all"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerVehicles;