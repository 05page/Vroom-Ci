import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, CheckCircle2, XCircle, Clock, TrendingUp, 
  MessageSquare, Car, Shield, AlertCircle, Trash2,
  Check, Eye, Settings, Filter
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "message" | "booking" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
  actionable?: boolean;
}

const PartnerNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Véhicule approuvé",
      message: "Votre véhicule 'Toyota Camry 2023' a été approuvé et est maintenant visible sur la plateforme.",
      time: "Il y a 5 minutes",
      read: false,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-500/10",
      actionable: true,
    },
    {
      id: "2",
      type: "booking",
      title: "Nouvelle réservation",
      message: "Vous avez reçu une nouvelle demande de réservation pour la BMW X5 M Sport du 20/11 au 25/11.",
      time: "Il y a 1 heure",
      read: false,
      icon: Car,
      color: "text-blue-600 bg-blue-500/10",
      actionable: true,
    },
    {
      id: "3",
      type: "message",
      title: "Nouveau message",
      message: "Jean Kouassi vous a envoyé un message concernant la location d'un véhicule.",
      time: "Il y a 2 heures",
      read: false,
      icon: MessageSquare,
      color: "text-purple-600 bg-purple-500/10",
      actionable: true,
    },
    {
      id: "4",
      type: "warning",
      title: "Abonnement expire bientôt",
      message: "Votre abonnement Pro expire dans 7 jours. Pensez à le renouveler pour continuer à profiter de tous les avantages.",
      time: "Il y a 3 heures",
      read: false,
      icon: AlertCircle,
      color: "text-orange-600 bg-orange-500/10",
      actionable: true,
    },
    {
      id: "5",
      type: "info",
      title: "Tendance du marché",
      message: "Les SUV sont en forte demande cette semaine. C'est le moment idéal pour mettre en avant vos véhicules de ce type.",
      time: "Il y a 5 heures",
      read: true,
      icon: TrendingUp,
      color: "text-cyan-600 bg-cyan-500/10",
      actionable: false,
    },
    {
      id: "6",
      type: "success",
      title: "Paiement reçu",
      message: "Vous avez reçu un paiement de 50 000 FCFA pour la réservation #12345.",
      time: "Il y a 1 jour",
      read: true,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-500/10",
      actionable: false,
    },
    {
      id: "7",
      type: "system",
      title: "Mise à jour système",
      message: "Une nouvelle version de la plateforme est disponible avec des améliorations de performance.",
      time: "Il y a 2 jours",
      read: true,
      icon: Settings,
      color: "text-gray-600 bg-gray-500/10",
      actionable: false,
    },
    {
      id: "8",
      type: "warning",
      title: "Document manquant",
      message: "La visite technique de votre véhicule 'Peugeot 208 2020' expire dans 15 jours. Veuillez mettre à jour le document.",
      time: "Il y a 3 jours",
      read: true,
      icon: Shield,
      color: "text-orange-600 bg-orange-500/10",
      actionable: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success("Notification marquée comme lue");
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification supprimée");
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast.success("Toutes les notifications ont été supprimées");
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              Notifications
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              {unreadCount > 0 
                ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                : "Toutes les notifications sont lues"
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
            >
              <Check className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleDeleteAll}
              disabled={notifications.length === 0}
              className="rounded-xl font-bold border-2 hover:scale-105 transition-all text-red-600 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Tout supprimer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Total</p>
                  <p className="text-2xl font-black">{notifications.length}</p>
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
                  <p className="text-sm font-semibold text-muted-foreground">Non lues</p>
                  <p className="text-2xl font-black">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Lues</p>
                  <p className="text-2xl font-black">{notifications.length - unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as "all" | "unread")}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-fit grid-cols-2 h-12 bg-secondary rounded-2xl">
              <TabsTrigger value="all" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
                Toutes ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-md">
                Non lues ({unreadCount})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {filteredNotifications.length === 0 ? (
              <Card className="rounded-3xl shadow-lg border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-20">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-36 h-36 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bell className="h-20 w-20 text-primary"/>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black tracking-tight">
                        Aucune notification
                      </h3>
                      <p className="text-muted-foreground font-medium max-w-md">
                        Vous êtes à jour ! Toutes vos notifications ont été traitées.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <Card
                      key={notification.id}
                      className={`rounded-3xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom ${
                        !notification.read ? "border-primary/30 bg-primary/5" : "border-transparent"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`w-12 h-12 ${notification.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="h-6 w-6" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-black text-lg">{notification.title}</h3>
                                {!notification.read && (
                                  <Badge className="bg-primary font-bold">Nouveau</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-xl hover:bg-green-500/10"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                  >
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl hover:bg-red-500/10"
                                  onClick={() => handleDelete(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-muted-foreground font-medium mb-3">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                                <Clock className="h-4 w-4" />
                                <span>{notification.time}</span>
                              </div>

                              {notification.actionable && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir les détails
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}  
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread">
            {filteredNotifications.length === 0 ? (
              <Card className="rounded-3xl shadow-lg border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-20">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-36 h-36 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-20 w-20 text-green-600"/>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black tracking-tight">
                        Tout est à jour !
                      </h3>
                      <p className="text-muted-foreground font-medium max-w-md">
                        Vous n'avez aucune notification non lue. Excellent travail !
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <Card
                      key={notification.id}
                      className="rounded-3xl shadow-lg border-2 border-primary/30 bg-primary/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${notification.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-black text-lg">{notification.title}</h3>
                                <Badge className="bg-primary font-bold">Nouveau</Badge>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl hover:bg-green-500/10"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl hover:bg-red-500/10"
                                  onClick={() => handleDelete(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-muted-foreground font-medium mb-3">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                                <Clock className="h-4 w-4" />
                                <span>{notification.time}</span>
                              </div>

                              {notification.actionable && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="rounded-xl font-bold border-2 hover:scale-105 transition-all"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir les détails
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerNotifications;