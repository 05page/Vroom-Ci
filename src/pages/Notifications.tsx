import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, Car, TrendingUp, CheckCheck, ArrowLeft, Settings, Check, Clock, CheckCircle2, Eye } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "new_car" | "trending" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  color: string;
  icon: any;
  actionable: boolean
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_car",
      title: "Nouveau véhicule disponible",
      message: "Une nouvelle Tesla Model S vient d'être ajoutée à notre catalogue",
      time: "Il y a 5 minutes",
      read: false,
      color: "text-green-600 bg-green-500/10",
      icon: Car,
      actionable: true
    },
    {
      id: "2",
      type: "trending",
      title: "Véhicule en tendance",
      message: "Le Mercedes-Benz GLE 350 est maintenant en tendance avec 500+ vues",
      time: "Il y a 2 heures",
      read: true,
      color: "text-blue-600 bg-blue-500/10",
      icon: TrendingUp,
      actionable: true
    },
    {
      id: "3",
      type: "system",
      title: "Mise à jour de l'application",
      message: "De nouvelles fonctionnalités sont disponibles. Découvrez-les maintenant !",
      time: "Hier",
      read: true,
      color: "text-cyan-600 bg-cyan-500/10",
      icon: Settings,
      actionable: true
    },
    {
      id: "6",
      type: "new_car",
      title: "Nouveaux arrivages",
      message: "12 nouveaux véhicules ont été ajoutés cette semaine",
      time: "Il y a 2 jours",
      read: true,
      color: "text-green-600 bg-green-500/10",
      icon: Car,
      actionable: true
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all")
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n=> ({...n, read: true})));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success("Notification marquée comme lue");
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === "all" ? notifications : notifications.filter(n => !n.read);
  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                Notifications
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base font-medium md:text-lg">
                {unreadCount > 0
                  ? `${unreadCount} notification ${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                  : "Toutes les notifications sont lues"
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={markAllAsRead}
                disabled={unreadCount === 0} className="rounded-xl font-bold border-2 hover:scale-105 transition-all">
                <Check className="h-4 w-4 mr-2" />
                Tout marquer comme lu
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Total</p>
                    <p className="text-2xl font-black">{notifications.length}</p>
                    <p></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Non lues</p>
                    <p className="text-2xl font-black">{unreadCount}</p>
                    <p></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Total</p>
                    <p className="text-2xl font-black">{notifications.length - unreadCount}</p>
                    <p></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtre */}
          <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as "all" | "unread")}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-fit grid-cols-2 h-12 bg-secondary rounded-2xl mt-5">
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
                          <Bell className="h-20 w-20 text-primary" />
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
                      <Card key={notification.id} className={`rounded-3xl shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 fade-in slide-in-from-bottom
                        ${!notification.read ? "border-primary/30 bg-primary/5" : "border-transparent"}`} style={{ animationDelay: `${index * 50}ms` }}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 ${notification.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                              <Icon className="h-6 w-6" />
                            </div>

                            {/* Contenu */}
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
                                  <Button variant="outline" size="sm" className="rounded-xl font-bold border-2 hover:scale-105 transition-all">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Voir les details
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
                          <CheckCircle2 className="h-20 w-20 text-green-600" />
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
    </div>
  );
};

export default Notifications;
