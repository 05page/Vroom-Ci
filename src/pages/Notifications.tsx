import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, Car, TrendingUp, CheckCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

interface Notification {
  id: string;
  type: "like" | "comment" | "new_car" | "trending" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const notifications: Notification[] = [
    {
      id: "1",
      type: "new_car",
      title: "Nouveau véhicule disponible",
      message: "Une nouvelle Tesla Model S vient d'être ajoutée à notre catalogue",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: "2",
      type: "like",
      title: "Votre favori a reçu des likes",
      message: "La Porsche 911 Carrera que vous suivez a reçu 45 nouveaux likes",
      time: "Il y a 1 heure",
      read: true,
    },
    {
      id: "3",
      type: "trending",
      title: "Véhicule en tendance",
      message: "Le Mercedes-Benz GLE 350 est maintenant en tendance avec 500+ vues",
      time: "Il y a 2 heures",
      read: true,
    },
    {
      id: "4",
      type: "comment",
      title: "Nouveau commentaire",
      message: "Un utilisateur a commenté la BMW X5 M Sport que vous suivez",
      time: "Il y a 3 heures",
      read: true,
    },
    {
      id: "5",
      type: "system",
      title: "Mise à jour de l'application",
      message: "De nouvelles fonctionnalités sont disponibles. Découvrez-les maintenant !",
      time: "Hier",
      read: true,
    },
    {
      id: "6",
      type: "new_car",
      title: "Nouveaux arrivages",
      message: "12 nouveaux véhicules ont été ajoutés cette semaine",
      time: "Il y a 2 jours",
      read: true,
    },
  ];

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-primary" />;
      case "comment":
        return <MessageCircle className="h-5 w-5 text-primary" />;
      case "new_car":
        return <Car className="h-5 w-5 text-primary" />;
      case "trending":
        return <TrendingUp className="h-5 w-5 text-[hsl(var(--success))]" />;
      case "system":
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const markAllAsRead = () => {
    notifications.forEach((notif) => {
      notif.read = true
    })
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-secondary/20">
      <header>
        {/* Header */}
      <Header />
      </header>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                Notifications
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Restez informé des dernières actualités
              </p>
            </div>

            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm md:text-base px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full self-start sm:self-auto">
                {unreadCount} nouvelles
              </Badge>
            )}
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2"
            >
              <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3 sm:space-y-4 animate-fade-in">
          {notifications.map((notification, index) => (
            <Card
              key={notification.id}
              className={`shadow-card hover:shadow-hover transition-smooth ${!notification.read ? "border-l-4 border-l-primary" : ""
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${!notification.read ? "bg-primary/10" : "bg-secondary"
                      }`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-1">
                      <h3
                        className={`font-semibold text-sm sm:text-base md:text-lg ${!notification.read
                            ? "text-foreground"
                            : "text-muted-foreground"
                          }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary sm:mt-2 flex-shrink-0 self-start sm:self-center" />
                      )}
                    </div>

                    <p className="text-muted-foreground text-xs sm:text-sm mb-2">
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-sm text-muted-foreground">
                        {notification.time}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10 text-xs sm:text-sm px-2 sm:px-3"
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {notifications.length === 0 && (
          <Card className="shadow-card text-center py-12 sm:py-16">
            <CardContent>
              <Bell className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-2">
                Aucune notification
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Vous êtes à jour ! Revenez plus tard pour voir les nouvelles notifications.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
