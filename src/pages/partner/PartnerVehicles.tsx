import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Filter, Car, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PartnerVehicles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const loadVehicles = () => {
      const savedVehicles = JSON.parse(localStorage.getItem("partnerVehicles") || "[]");
      setVehicles(savedVehicles);
      setIsLoading(false);
    };

    const timer = setTimeout(loadVehicles, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter(v => v.id !== id);
    localStorage.setItem("partnerVehicles", JSON.stringify(updatedVehicles));
    setVehicles(updatedVehicles);
    toast.success("Véhicule supprimé avec succès");
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes véhicules</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de véhicules</p>
        </div>
        <Button onClick={() => navigate("/partner/vehicles/add")}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un véhicule
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un véhicule..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <Card>
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Skeleton className="h-36 w-36 rounded-full" />
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-96" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ) : vehicles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 items-center justify-center flex text-muted-foreground">
                <Car className="h-36 w-36 mb-4"/>
              </div>
              <CardTitle>Aucun véhicule pour le moment</CardTitle>
              <CardDescription className="max-w-md">
                Commencez par ajouter votre premier véhicule à votre catalogue pour attirer des clients
              </CardDescription>
              <Button onClick={() => navigate("/partner/vehicles/add")} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter mon premier véhicule
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Car className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-sm text-muted-foreground">{vehicle.year}</p>
                  </div>
                  <Badge variant="secondary">{vehicle.condition}</Badge>
                </div>
                <p className="text-2xl font-bold text-primary mb-3">
                  {parseInt(vehicle.price).toLocaleString()} FCFA
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Kilométrage</p>
                    <p className="font-medium">{parseInt(vehicle.mileage).toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carburant</p>
                    <p className="font-medium">{vehicle.fuel}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerVehicles;
