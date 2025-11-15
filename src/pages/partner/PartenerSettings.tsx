import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Building2, User, Mail, Phone, MapPin, Calendar, CreditCard,
  Shield, Bell, Eye, EyeOff, Save, Upload, CheckCircle2, Clock,
  Crown, History, Settings, Lock, Trash2, AlertCircle, FileText
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const PartnerSettings = () => {
  const navigate = useNavigate();
  // Informations de l'entreprise
  const [companyInfo, setCompanyInfo] = useState({
    name: "VROOM Auto Services",
    legalName: "VROOM Auto Services SARL",
    siret: "123 456 789 00012",
    registre: "RCS Abidjan B 123 456 789",
    email: "contact@vroomauto.ci",
    phone: "+225 27 20 30 40 50",
    address: "Boulevard Latrille, Cocody",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    postalCode: "00225",
    website: "www.vroomauto.ci",
    description: "Spécialiste de la vente et location de véhicules haut de gamme",
    logo: null as File | null,
  });

  // Contact principal
  const [contactInfo, setContactInfo] = useState({
    firstName: "Jean",
    lastName: "Kouassi",
    position: "Directeur Général",
    email: "j.kouassi@vroomauto.ci",
    phone: "+225 07 12 34 56 78",
  });

  // Abonnement actuel
  const currentSubscription = {
    plan: "Pro",
    status: "active",
    startDate: "01/10/2024",
    endDate: "01/10/2025",
    price: "50000 FCFA",
    autoRenew: true,
  };

  // Historique des abonnements
  const subscriptionHistory = [
    { id: 1, plan: "Pro", startDate: "01/10/2024", endDate: "01/10/2025", amount: "50000 FCFA", status: "active" },
    { id: 2, plan: "Starter", startDate: "01/07/2024", endDate: "01/10/2024", amount: "25000 FCFA", status: "completed" },
    { id: 3, plan: "Gratuit", startDate: "01/05/2024", endDate: "01/07/2024", amount: "0 FCFA", status: "completed" },
  ];

  // Notifications
  const [notifications, setNotifications] = useState({
    newBooking: true,
    messageReceived: true,
    subscriptionRenewal: true,
    vehicleViews: false,
    trendingAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  // Sécurité
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveCompanyInfo = () => {
    // Logique de sauvegarde
    toast.success("Informations de l'entreprise mises à jour");
  };

  const handleSaveContactInfo = () => {
    toast.success("Informations de contact mises à jour");
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    toast.success("Mot de passe modifié avec succès");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Préférences de notification mises à jour");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyInfo(prev => ({ ...prev, logo: file }));
      toast.success("Logo téléchargé");
    }
  };

  const handleDeleteAccount = () => {
    toast.error("Fonction de suppression de compte");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600 font-bold"><CheckCircle2 className="h-3 w-3 mr-1" />Actif</Badge>;
      case "completed":
        return <Badge variant="secondary" className="font-bold"><Clock className="h-3 w-3 mr-1" />Terminé</Badge>;
      default:
        return <Badge variant="outline" className="font-bold">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Paramètres
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Gérez les paramètres de votre compte partenaire
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto md:h-12 bg-secondary rounded-2xl p-1">
            <TabsTrigger value="company" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Entreprise</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
              <Crown className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Abonnement</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Compte</span>
            </TabsTrigger>
          </TabsList>

          {/* Onglet Entreprise */}
          <TabsContent value="company" className="space-y-6">
            {/* Logo */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <Building2 className="h-6 w-6 text-primary" />
                  Logo de l'entreprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center">
                    {companyInfo.logo ? (
                      <img src={URL.createObjectURL(companyInfo.logo)} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <Building2 className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="logo" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" className="rounded-xl font-bold" onClick={() => document.getElementById('logo')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Télécharger un logo
                        </Button>
                        <Input id="logo" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground font-medium mt-2">
                      Format recommandé: PNG ou JPG, 500x500px minimum
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations entreprise */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Informations de l'entreprise</CardTitle>
                <CardDescription className="font-medium">Informations légales et coordonnées de votre entreprise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold">Nom commercial *</Label>
                    <Input value={companyInfo.name} onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Raison sociale *</Label>
                    <Input value={companyInfo.legalName} onChange={(e) => setCompanyInfo({...companyInfo, legalName: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">SIRET</Label>
                    <Input value={companyInfo.siret} onChange={(e) => setCompanyInfo({...companyInfo, siret: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Registre du commerce</Label>
                    <Input value={companyInfo.registre} onChange={(e) => setCompanyInfo({...companyInfo, registre: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Email *</Label>
                    <Input type="email" value={companyInfo.email} onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Téléphone *</Label>
                    <Input value={companyInfo.phone} onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Site web</Label>
                    <Input value={companyInfo.website} onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Code postal</Label>
                    <Input value={companyInfo.postalCode} onChange={(e) => setCompanyInfo({...companyInfo, postalCode: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="font-bold">Adresse *</Label>
                    <Input value={companyInfo.address} onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Ville *</Label>
                    <Input value={companyInfo.city} onChange={(e) => setCompanyInfo({...companyInfo, city: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Pays *</Label>
                    <Input value={companyInfo.country} onChange={(e) => setCompanyInfo({...companyInfo, country: e.target.value})} className="rounded-xl border-2 font-medium" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="font-bold">Description</Label>
                    <Textarea value={companyInfo.description} onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})} rows={4} className="rounded-xl border-2 font-medium resize-none" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-black mb-4">Contact principal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold">Prénom *</Label>
                      <Input value={contactInfo.firstName} onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})} className="rounded-xl border-2 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">Nom *</Label>
                      <Input value={contactInfo.lastName} onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})} className="rounded-xl border-2 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">Poste</Label>
                      <Input value={contactInfo.position} onChange={(e) => setContactInfo({...contactInfo, position: e.target.value})} className="rounded-xl border-2 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">Email *</Label>
                      <Input type="email" value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} className="rounded-xl border-2 font-medium" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="font-bold">Téléphone *</Label>
                      <Input value={contactInfo.phone} onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} className="rounded-xl border-2 font-medium" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" className="rounded-xl font-bold">
                    Annuler
                  </Button>
                  <Button onClick={handleSaveCompanyInfo} className="rounded-xl font-bold shadow-lg shadow-primary/30">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Abonnement */}
          <TabsContent value="subscription" className="space-y-6">
            {/* Abonnement actuel */}
            <Card className="rounded-3xl shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <Crown className="h-6 w-6 text-primary" />
                  Abonnement actuel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-muted-foreground uppercase">Plan</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-black text-primary">{currentSubscription.plan}</p>
                      {getStatusBadge(currentSubscription.status)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-muted-foreground uppercase">Prix</p>
                    <p className="text-2xl font-black">{currentSubscription.price}/mois</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-muted-foreground uppercase">Période</p>
                    <p className="font-bold">{currentSubscription.startDate} - {currentSubscription.endDate}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch checked={currentSubscription.autoRenew} />
                    <div>
                      <p className="font-bold">Renouvellement automatique</p>
                      <p className="text-sm text-muted-foreground font-medium">Votre abonnement sera renouvelé automatiquement</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={()=>navigate('/partner/subscription')} className="rounded-xl font-bold">
                    Modifier le plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Historique */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <History className="h-6 w-6 text-primary" />
                  Historique des abonnements
                </CardTitle>
                <CardDescription className="font-medium">Consultez l'historique de vos abonnements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-black">Plan</TableHead>
                      <TableHead className="font-black">Période</TableHead>
                      <TableHead className="font-black">Montant</TableHead>
                      <TableHead className="font-black">Statut</TableHead>
                      <TableHead className="font-black text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionHistory.map((sub) => (
                      <TableRow key={sub.id} className="hover:bg-secondary/30">
                        <TableCell className="font-black">{sub.plan}</TableCell>
                        <TableCell className="font-semibold text-muted-foreground">{sub.startDate} - {sub.endDate}</TableCell>
                        <TableCell className="font-bold">{sub.amount}</TableCell>
                        <TableCell>{getStatusBadge(sub.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="rounded-xl font-bold">
                            <FileText className="h-4 w-4 mr-2" />
                            Facture
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <Bell className="h-6 w-6 text-primary" />
                  Préférences de notification
                </CardTitle>
                <CardDescription className="font-medium">Gérez comment vous souhaitez être notifié</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: "newBooking", label: "Nouvelles réservations", description: "Recevoir une notification pour chaque nouvelle réservation" },
                  { key: "messageReceived", label: "Messages reçus", description: "Notification lorsque vous recevez un message" },
                  { key: "subscriptionRenewal", label: "Renouvellement d'abonnement", description: "Rappels avant l'échéance de votre abonnement" },
                  { key: "vehicleViews", label: "Vues de véhicules", description: "Résumé hebdomadaire des vues sur vos véhicules" },
                  { key: "trendingAlerts", label: "Alertes tendances", description: "Notifications sur les tendances du marché" },
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between p-4 rounded-2xl border-2 hover:border-primary/30 transition-all">
                    <div className="flex-1">
                      <p className="font-bold text-base">{notif.label}</p>
                      <p className="text-sm text-muted-foreground font-medium">{notif.description}</p>
                    </div>
                    <Switch 
                      checked={notifications[notif.key as keyof typeof notifications] as boolean}
                      onCheckedChange={(checked) => handleNotificationChange(notif.key, checked)}
                    />
                  </div>
                ))}

                <Separator />

                <div>
                  <h3 className="text-xl font-black mb-4">Canaux de notification</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl border-2">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-bold">Email</p>
                          <p className="text-sm text-muted-foreground font-medium">Recevoir les notifications par email</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl border-2">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-bold">SMS</p>
                          <p className="text-sm text-muted-foreground font-medium">Recevoir les notifications par SMS</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security" className="space-y-6">
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <Lock className="h-6 w-6 text-primary" />
                  Changer le mot de passe
                </CardTitle>
                <CardDescription className="font-medium">Mettez à jour votre mot de passe régulièrement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold">Mot de passe actuel *</Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="rounded-xl border-2 font-medium pr-12" 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Nouveau mot de passe *</Label>
                    <Input 
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="rounded-xl border-2 font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Confirmer le nouveau mot de passe *</Label>
                    <Input 
                      type={showPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="rounded-xl border-2 font-medium" 
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-1">Conseils de sécurité</p>
                    <ul className="text-sm text-blue-600 font-medium space-y-1">
                      <li>• Utilisez au moins 8 caractères</li>
                      <li>• Combinez majuscules, minuscules, chiffres et symboles</li>
                      <li>• Évitez les mots courants ou informations personnelles</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="rounded-xl font-bold">
                    Annuler
                  </Button>
                  <Button onClick={handleChangePassword} className="rounded-xl font-bold shadow-lg shadow-primary/30">
                    <Lock className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Compte */}
          <TabsContent value="account" className="space-y-6">
            <Card className="rounded-3xl shadow-lg border-none border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black text-red-600">
                  <AlertCircle className="h-6 w-6" />
                  Zone dangereuse
                </CardTitle>
                <CardDescription className="font-medium">Actions irréversibles sur votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 rounded-2xl border-2 border-red-500/20 bg-red-500/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-lg mb-2">Supprimer mon compte</h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        Une fois votre compte supprimé, toutes vos données seront définitivement effacées. 
                        Cette action est irréversible.
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="rounded-xl font-bold">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl">
                        <AlertDialogHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                              <AlertCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <AlertDialogTitle className="text-2xl font-black">
                              Supprimer le compte ?
                            </AlertDialogTitle>
                          </div>
                          <AlertDialogDescription className="text-base font-medium">
                            Cette action est <span className="font-bold text-red-600">irréversible</span>. 
                            Toutes vos données, véhicules, statistiques et historiques seront définitivement supprimés.
                            <br /><br />
                            Êtes-vous absolument sûr de vouloir continuer ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="gap-2">
                          <AlertDialogCancel className="rounded-xl font-bold border-2">
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteAccount}
                            className="rounded-xl font-bold bg-red-600 hover:bg-red-700"
                          >
                            Oui, supprimer définitivement
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-2 border-orange-500/20 bg-orange-500/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-lg mb-2">Désactiver temporairement</h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        Votre compte sera désactivé mais vos données seront conservées. 
                        Vous pourrez le réactiver à tout moment.
                      </p>
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold border-orange-500 text-orange-600 hover:bg-orange-500/10">
                      Désactiver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations du compte */}
            <Card className="rounded-3xl shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-black">
                  <Settings className="h-6 w-6 text-primary" />
                  Informations du compte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-secondary/50">
                    <p className="text-sm font-bold text-muted-foreground uppercase mb-2">ID du compte</p>
                    <p className="font-black text-lg">PARTNER-2024-001</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50">
                    <p className="text-sm font-bold text-muted-foreground uppercase mb-2">Date de création</p>
                    <p className="font-black text-lg">01 Mai 2024</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50">
                    <p className="text-sm font-bold text-muted-foreground uppercase mb-2">Dernière connexion</p>
                    <p className="font-black text-lg">Aujourd'hui, 14:30</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/50">
                    <p className="text-sm font-bold text-muted-foreground uppercase mb-2">Statut du compte</p>
                    <Badge className="bg-green-500 hover:bg-green-600 font-bold">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerSettings;