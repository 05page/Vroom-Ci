import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Plus, Search, Filter, Car, Edit, Trash2, Eye, MoreVertical, 
  Clock, CheckCircle, XCircle, TrendingUp, Calendar, Fuel, Gauge 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { PostVehicles } from "@/components/postVehicles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PartnerVehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  
  // Données de test
  const [vehicles, setVehicles] = useState<any[]>([
    {
      id: "1",
      marque: "Toyota",
      modele: "Camry",
      annee: "2023",
      type: "vente",
      price: "25000000",
      mileage: "15000",
      fuel: "Essence",
      transmission: "Automatique",
      couleur: "Noir",
      status: "active", // active, pending, sold, rented
      views: 245,
      datePosted: "2024-11-10",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
      visiteTechnique: "valide",
      carteGrise: "disponible"
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    toast.success("Véhicule supprimé avec succès");
  };

  const handleToggleStatus = (id: string) => {
    setVehicles(prev => prev.map(v => 
      v.id === id 
        ? { ...v, status: v.status === "active" ? "pending" : "active" }
        : v
    ));
    toast.success("Statut modifié");
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.marque?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.modele?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600 font-bold"><CheckCircle className="h-3 w-3 mr-1" />Actif</Badge>;
      case "pending":
        return <Badge className="bg-orange-500 hover:bg-orange-600 font-bold"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case "sold":
        return <Badge className="bg-blue-500 hover:bg-blue-600 font-bold">Vendu</Badge>;
      case "rented":
        return <Badge className="bg-purple-500 hover:bg-purple-600 font-bold">Loué</Badge>;
      default:
        return <Badge variant="secondary" className="font-bold">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === "vente" 
      ? <Badge variant="outline" className="border-primary text-primary font-bold">Vente</Badge>
      : <Badge variant="outline" className="border-green-600 text-green-600 font-bold">Location</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Gestion des véhicules
              </h1>
              <p className="text-muted-foreground text-lg font-medium">
                {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} dans votre catalogue
              </p>
            </div>
            <Button 
              size="lg"
              onClick={() => setOpenForm(true)}
              className="rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un véhicule
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-2xl border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Actifs</p>
                  <p className="text-2xl font-black">{vehicles.filter(v => v.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">En attente</p>
                  <p className="text-2xl font-black">{vehicles.filter(v => v.status === "pending").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Vues totales</p>
                  <p className="text-2xl font-black">{vehicles.reduce((acc, v) => acc + (v.views || 0), 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Total</p>
                  <p className="text-2xl font-black">{vehicles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher par marque, modèle..."
              className="pl-12 h-12 rounded-xl border-2 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtres
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
              className="rounded-xl font-bold border-2"
            >
              {viewMode === "table" ? "Grille" : "Tableau"}
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <Card className="rounded-3xl shadow-lg">
            <CardContent className="py-20">
              <div className="flex flex-col items-center justify-center space-y-6">
                <Skeleton className="h-36 w-36 rounded-full" />
                <Skeleton className="h-8 w-64 rounded-xl" />
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
                    Commencez par ajouter votre premier véhicule à votre catalogue
                  </CardDescription>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => setOpenForm(true)}
                  className="mt-6 rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter mon premier véhicule
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : viewMode === "table" ? (
          /* Vue Tableau */
          <Card className="rounded-3xl shadow-lg border-none overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-black">Véhicule</TableHead>
                  <TableHead className="font-black">Type</TableHead>
                  <TableHead className="font-black">Prix</TableHead>
                  <TableHead className="font-black">Statut</TableHead>
                  <TableHead className="font-black">Vues</TableHead>
                  <TableHead className="font-black">Date</TableHead>
                  <TableHead className="font-black text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                          {vehicle.image ? (
                            <img src={vehicle.image} alt={vehicle.modele} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black">{vehicle.marque} {vehicle.modele}</p>
                          <p className="text-sm text-muted-foreground font-semibold">{vehicle.annee}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(vehicle.type)}</TableCell>
                    <TableCell className="font-black text-primary">{parseInt(vehicle.price).toLocaleString()} FCFA</TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">{vehicle.views}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-muted-foreground">
                      {new Date(vehicle.datePosted).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-2xl">
                          <DropdownMenuItem className="rounded-xl font-semibold cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-semibold cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="rounded-xl font-semibold cursor-pointer"
                            onClick={() => handleToggleStatus(vehicle.id)}
                          >
                            {vehicle.status === "active" ? (
                              <><XCircle className="h-4 w-4 mr-2" />Désactiver</>
                            ) : (
                              <><CheckCircle className="h-4 w-4 mr-2" />Activer</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="rounded-xl font-semibold cursor-pointer text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          /* Vue Grille */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <Card 
                key={vehicle.id} 
                className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  {vehicle.image ? (
                    <img src={vehicle.image} alt={vehicle.modele} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                      <Car className="h-20 w-20 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {getStatusBadge(vehicle.status)}
                    {getTypeBadge(vehicle.type)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl">
                        <DropdownMenuItem className="rounded-xl font-semibold cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />Détails
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-semibold cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="rounded-xl font-semibold cursor-pointer text-red-600"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-black text-xl tracking-tight mb-1">
                      {vehicle.marque} {vehicle.modele}
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground">{vehicle.annee}</p>
                  </div>
                  
                  <p className="text-3xl font-black text-primary">
                    {parseInt(vehicle.price).toLocaleString()} FCFA
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-bold text-muted-foreground">Km</p>
                        <p className="font-black">{parseInt(vehicle.mileage).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-bold text-muted-foreground">Carburant</p>
                        <p className="font-black">{vehicle.fuel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold text-muted-foreground">{vehicle.views} vues</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-muted-foreground">
                        {new Date(vehicle.datePosted).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <PostVehicles 
          isOpen={openForm}
          onClose={() => setOpenForm(false)}
        />
      </div>
    </div>
  );
};

export default PartnerVehicles;