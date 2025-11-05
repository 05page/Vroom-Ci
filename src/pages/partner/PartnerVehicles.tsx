import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Car } from "lucide-react";
import { Input } from "@/components/ui/input";

const PartnerVehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes véhicules</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de véhicules</p>
        </div>
        <Button>
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

      {/* Empty State */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4 items-center justify-center flex text-muted-foreground"><Car className="h-36 w-36 mb-4"/></div>
            <CardTitle>Aucun véhicule pour le moment</CardTitle>
            <CardDescription className="max-w-md">
              Commencez par ajouter votre premier véhicule à votre catalogue pour attirer des clients
            </CardDescription>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter mon premier véhicule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerVehicles;
