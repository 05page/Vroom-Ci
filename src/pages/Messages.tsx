import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  initials: string;
  status: "online" | "offline";
}

const Messages = () => {
  const [conversations] = useState<Conversation[]>([
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
  const [messages, setMessages] = useState<Message[]>([
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

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: String(messages.length + 1),
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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl hover:bg-primary/10 hidden md:flex"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl hover:bg-primary/10 hidden md:flex"
                    >
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl hover:bg-primary/10"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
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
                      className={`max-w-[75%] md:max-w-[70%] rounded-3xl px-4 md:px-5 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card border-2 rounded-bl-md"
                      }`}
                    >
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