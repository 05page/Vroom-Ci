import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  initials: string;
}

const PartnerMessages = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Jean Kouassi",
      lastMessage: "Bonjour, je suis intéressé par le Toyota...",
      timestamp: "10:30",
      unread: 2,
      initials: "JK",
    },
    {
      id: 2,
      name: "Marie Koné",
      lastMessage: "Le véhicule est-il toujours disponible ?",
      timestamp: "09:15",
      unread: 0,
      initials: "MK",
    },
    {
      id: 3,
      name: "Kofi Mensah",
      lastMessage: "Merci pour les informations !",
      timestamp: "Hier",
      unread: 1,
      initials: "KM",
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Jean Kouassi",
      content: "Bonjour, je suis intéressé par le Toyota Corolla 2020",
      timestamp: "10:25",
      isOwn: false,
    },
    {
      id: 2,
      sender: "Vous",
      content: "Bonjour ! Merci de votre intérêt. Le véhicule est disponible.",
      timestamp: "10:27",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Jean Kouassi",
      content: "Puis-je venir le voir aujourd'hui ?",
      timestamp: "10:30",
      isOwn: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Vous",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Communiquez avec vos clients potentiels</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Liste des conversations */}
        <Card className="lg:col-span-4 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une conversation..." className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 rounded-lg cursor-pointer transition-smooth ${
                  selectedConversation === conv.id
                    ? "bg-primary/10 border-l-4 border-primary"
                    : "hover:bg-accent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {conv.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                      <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Zone de messages */}
        <Card className="lg:col-span-8 flex flex-col">
          {selectedConv ? (
            <>
              {/* Header de conversation */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {selectedConv.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedConv.name}</h2>
                    <p className="text-sm text-muted-foreground">En ligne</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className={`text-xs mt-1 block ${
                        message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de message */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Sélectionnez une conversation pour commencer
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PartnerMessages;
