import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Calendar, DollarSign, FileText, Download, Search } from "lucide-react";
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Données simulées
const paymentHistory = [
  {
    id: "PAY-001",
    date: "2025-01-15",
    description: "Abonnement Premium - Janvier 2025",
    amount: "5000 FCFA",
    status: "paid",
    method: "Mobile Money"
  },
  {
    id: "PAY-002",
    date: "2024-12-15",
    description: "Abonnement Premium - Décembre 2024",
    amount: "5000 FCFA",
    status: "paid",
    method: "Carte bancaire"
  },
  {
    id: "PAY-003",
    date: "2024-11-20",
    description: "Garantie Location Toyota Corolla",
    amount: "35000 FCFA",
    status: "refunded",
    method: "Mobile Money"
  },
  {
    id: "PAY-004",
    date: "2024-11-15",
    description: "Abonnement Premium - Novembre 2024",
    amount: "5000 FCFA",
    status: "paid",
    method: "Mobile Money"
  },
  {
    id: "PAY-005",
    date: "2024-10-18",
    description: "Garantie Achat Mercedes Classe C",
    amount: "250000 FCFA",
    status: "paid",
    method: "Carte bancaire"
  },
];

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = paymentHistory.filter(payment => 
    payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaid = paymentHistory
    .filter(p => p.status === "paid")
    .reduce((acc, p) => acc + parseInt(p.amount.replace(/[^\d]/g, '')), 0);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "paid":
        return <Badge className="bg-green-500">Payé</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case "refunded":
        return <Badge className="bg-blue-500">Remboursé</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Échoué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header showBack />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Gestion des paiements
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Suivez vos transactions et téléchargez vos reçus
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: "100ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total dépensé
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{totalPaid.toLocaleString()} FCFA</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sur les 6 derniers mois
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: "200ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Transactions
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{paymentHistory.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {paymentHistory.filter(p => p.status === "paid").length} paiements réussis
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: "300ms" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prochain paiement
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">15 Fév</div>
              <p className="text-xs text-muted-foreground mt-1">
                Abonnement Premium - 5000 FCFA
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <CreditCard className="h-6 w-6" />
              Moyens de paiement
            </CardTitle>
            <CardDescription>Gérez vos méthodes de paiement enregistrées</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 rounded-full p-3">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold">Orange Money</p>
                  <p className="text-sm text-muted-foreground">+225 07 XX XX XX 11</p>
                </div>
              </div>
              <Badge>Par défaut</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 rounded-full p-3">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold">Visa •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expire 12/26</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Modifier</Button>
            </div>

            <Button variant="outline" className="w-full">
              + Ajouter un moyen de paiement
            </Button>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-black">Historique des transactions</CardTitle>
            <CardDescription>Consultez et téléchargez vos reçus</CardDescription>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                    <TableHead className="font-bold">Méthode</TableHead>
                    <TableHead className="font-bold">Montant</TableHead>
                    <TableHead className="font-bold">Statut</TableHead>
                    <TableHead className="font-bold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        Aucune transaction trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-secondary/50">
                        <TableCell className="font-medium">
                          {new Date(payment.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.description}</p>
                            <p className="text-xs text-muted-foreground">{payment.id}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{payment.method}</TableCell>
                        <TableCell className="font-bold">{payment.amount}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Reçu
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentManagement;
