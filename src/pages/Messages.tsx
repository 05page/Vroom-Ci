import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, ArrowLeft, Car } from "lucide-react";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  carPreview?: {
    name: string;
    price: string;
    image: string;
    type: string;
  };
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  initials: string;
  status: "online" | "offline";
  carData?: any;
}

const Messages = () => {
  const { carId } = useParams();
  const location = useLocation();
  const carData = location.state?.car;

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Service Client",
      lastMessage: "Merci pour votre demande, nous reviendrons vers vous",
      timestamp: "Il y a 2h",
      unread: 2,
      initials: "SC",
      status: "online",
    },
    {
      id: "2",
      name: "Vendeur - Mercedes GLE",
      lastMessage: "Le véhicule est toujours disponible",
      timestamp: "Il y a 5h",
      unread: 1,
      initials: "VM",
      status: "online",
    },
    {
      id: "3",
      name: "Location - Tesla Model 3",
      lastMessage: "Votre réservation est confirmée",
      timestamp: "Hier",
      unread: 0,
      initials: "LT",
      status: "offline",
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Créer une nouvelle conversation si carData est présent
  useEffect(() => {
    if (carData && carId) {
      const existingConv = conversations.find(c => c.id === `car-${carId}`);
      
      if (!existingConv) {
        const newConv: Conversation = {
          id: `car-${carId}`,
          name: `Vendeur - ${carData.name}`,
          lastMessage: "Nouvelle conversation",
          timestamp: "Maintenant",
          unread: 0,
          initials: carData.name.substring(0, 2).toUpperCase(),
          status: "online",
          carData: carData,
        };
        
        setConversations(prev => [newConv, ...prev]);
        setSelectedConversation(`car-${carId}`);
        
        // Message initial avec aperçu de la voiture
        setMessages([
          {
            id: "car-preview",
            sender: "Système",
            content: `Vous démarrez une conversation à propos de ce véhicule`,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
            carPreview: {
              name: carData.name,
              price: carData.price,
              image: carData.image,
              type: carData.type,
            }
          },
          {
            id: "welcome",
            sender: "Vendeur",
            content: `Bonjour ! Je suis le vendeur de la ${carData.name}. Comment puis-je vous aider ?`,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
          }
        ]);
      } else {
        setSelectedConversation(`car-${carId}`);
      }
    }
  }, [carData, carId]);

  // Charger les messages par défaut pour les conversations existantes
  useEffect(() => {
    if (selectedConversation && !selectedConversation.startsWith('car-')) {
      setMessages([
        {
          id: "1",
          sender: "Service Client",
          content: "Bonjour, comment puis-je vous aider ?",
          timestamp: "14:32",
          isOwn: false,
        },
        {
          id: "2",
          sender: "Vous",
          content: "Je souhaite avoir des informations sur la Mercedes GLE 350",
          timestamp: "14:35",
          isOwn: true,
        },
        {
          id: "3",
          sender: "Service Client",
          content: "Merci pour votre demande, nous reviendrons vers vous dans les plus brefs délais",
          timestamp: "14:36",
          isOwn: false,
        },
      ]);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: String(Date.now()),
        sender: "Vous",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
      toast.success("Message envoyé");
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="h-full flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} w-full md:w-96 border-r bg-background/80 backdrop-blur-xl flex-col`}>
          <div className="p-6 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tight">Messages</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-primary/10"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une conversation..."
                className="pl-11 h-12 rounded-xl border-2 font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {conversations.map((conv, index) => (
              <Card
                key={conv.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg rounded-2xl border-2 animate-in fade-in slide-in-from-left ${
                  selectedConversation === conv.id 
                    ? "border-primary bg-primary/5 shadow-lg scale-[0.98]" 
                    : "border-transparent hover:border-primary/20"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedConversation(conv.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary text-primary-foreground font-black text-base">
                          {conv.initials}
                        </AvatarFallback>
                      </Avatar>
                      {conv.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-black text-base truncate tracking-tight">{conv.name}</h3>
                        {conv.unread > 0 && (
                          <Badge className="ml-2 rounded-full font-bold h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate font-medium">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold">
                        {conv.timestamp}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-background/80 backdrop-blur-xl`}>
          {selectedConv ? (
            <>
              {/* Header */}
              <div className="p-4 md:p-6 border-b bg-background/50 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden rounded-xl hover:bg-primary/10"
                      onClick={() => setSelectedConversation("")}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="relative">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary text-primary-foreground font-black text-sm md:text-base">
                          {selectedConv.initials}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConv.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-base md:text-lg tracking-tight">{selectedConv.name}</h3>
                      <p className={`text-xs font-semibold ${selectedConv.status === "online" ? "text-green-500" : "text-muted-foreground"}`}>
                        {selectedConv.status === "online" ? "En ligne" : "Hors ligne"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom duration-300`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-4 md:px-5 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card border-2 rounded-bl-md"
                      }`}
                    >
                      {/* Aperçu de la voiture */}
                      {message.carPreview && (
                        <div className="mb-3 rounded-xl overflow-hidden border-2 border-primary/20 bg-background">
                          <img 
                            src={message.carPreview.image} 
                            alt={message.carPreview.name}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Car className="h-4 w-4 text-primary" />
                              <Badge variant="secondary" className="text-xs">
                                {message.carPreview.type === "vente" ? "Vente" : "Location"}
                              </Badge>
                            </div>
                            <h4 className="font-bold text-sm">{message.carPreview.name}</h4>
                            <p className="text-primary font-black text-lg">{message.carPreview.price}</p>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-2 font-semibold ${
                          message.isOwn
                            ? "text-primary-foreground/70 text-right"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t bg-background/50 backdrop-blur-xl">
                <div className="flex gap-2 md:gap-3">
                  <Input
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 h-12 md:h-14 rounded-2xl border-2 font-medium text-sm md:text-base px-4 md:px-5"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    size="lg"
                    className="rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all px-5 md:px-6 h-12 md:h-14"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Send className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                Aucune conversation sélectionnée
              </h3>
              <p className="text-muted-foreground font-medium text-base md:text-lg max-w-md">
                Sélectionnez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
