import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search } from "lucide-react";
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
    },
    {
      id: "2",
      name: "Vendeur - Mercedes GLE",
      lastMessage: "Le véhicule est toujours disponible",
      timestamp: "Il y a 5h",
      unread: 1,
      initials: "VM",
    },
    {
      id: "3",
      name: "Location - Tesla Model 3",
      lastMessage: "Votre réservation est confirmée",
      timestamp: "Hier",
      unread: 0,
      initials: "LT",
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string>("1");
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
    <div className="h-[calc(100vh-4rem)] bg-secondary/20">
      <div className="h-full flex flex-col md:flex-row">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r bg-background flex-col`}>
          <div className="p-4 border-b">
            <h2 className="font-heading text-2xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une conversation..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <Card
                key={conv.id}
                className={`m-2 cursor-pointer transition-smooth hover:shadow-card ${
                  selectedConversation === conv.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedConversation(conv.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {conv.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{conv.name}</h3>
                        {conv.unread > 0 && (
                          <Badge className="ml-2">{conv.unread}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
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
        <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-background`}>
          {selectedConv ? (
            <>
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden mr-2"
                    onClick={() => setSelectedConversation("")}
                  >
                    ←
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {selectedConv.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConv.name}</h3>
                    <p className="text-xs text-muted-foreground">En ligne</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isOwn
                            ? "text-primary-foreground/70"
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
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Sélectionnez une conversation pour commencer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
