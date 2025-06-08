
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, MoreVertical, Image, File, Users } from "lucide-react";

// Données de démonstration
const conversations = [
  {
    id: 1,
    name: "Domaine des Cèdres",
    role: "Lieu / Salle",
    avatar: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop",
    lastMessage: "Nous avons besoin de confirmer la disposition des tables pour votre réception.",
    timestamp: "10:23",
    unread: true,
    event: "Mariage de Sophie & Thomas",
    online: true
  },
  {
    id: 2,
    name: "Délices Gourmands",
    role: "Traiteur",
    avatar: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2940&auto=format&fit=crop",
    lastMessage: "Voici les options de menu que nous avons discutées hier.",
    timestamp: "Hier",
    unread: true,
    event: "Mariage de Sophie & Thomas",
    online: false
  },
  {
    id: 3,
    name: "Studio Mémoires",
    role: "Photographie",
    avatar: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2938&auto=format&fit=crop",
    lastMessage: "J'ai préparé un document avec les différentes formules disponibles pour votre mariage.",
    timestamp: "Mer",
    unread: false,
    event: "Mariage de Sophie & Thomas",
    online: true
  },
  {
    id: 4,
    name: "Fleurs & Passion",
    role: "Décoration",
    avatar: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2940&auto=format&fit=crop",
    lastMessage: "Bonjour, suite à notre rendez-vous d'hier, je vous envoie des propositions de compositions florales.",
    timestamp: "Lun",
    unread: false,
    event: "Mariage de Sophie & Thomas",
    online: true
  },
];

const messages = [
  {
    id: 1,
    sender: "provider",
    content: "Bonjour Sophie et Thomas, je suis ravi de vous accompagner pour votre mariage au Domaine des Cèdres. Nous avons besoin de confirmer certains détails pour la disposition de votre événement.",
    timestamp: "10:05",
    read: true
  },
  {
    id: 2,
    sender: "client",
    content: "Bonjour ! Merci de votre message. Nous sommes très enthousiastes à l'idée de célébrer notre mariage dans votre domaine.",
    timestamp: "10:10",
    read: true
  },
  {
    id: 3,
    sender: "provider",
    content: "Excellent ! Pour l'organisation, nous devons finaliser la disposition des tables pour le dîner. Préférez-vous une disposition en U ou en tables rondes ?",
    timestamp: "10:15",
    read: true
  },
  {
    id: 4,
    sender: "client",
    content: "Nous préférons des tables rondes. Combien de personnes pouvez-vous placer par table ?",
    timestamp: "10:18",
    read: true
  },
  {
    id: 5,
    sender: "provider",
    content: "Nos tables rondes peuvent accueillir 8 à 10 personnes. Avec 120 invités, je vous conseille 12 tables de 10 personnes, ce qui facilite aussi le service.",
    timestamp: "10:22",
    read: true
  },
  {
    id: 6,
    sender: "provider",
    content: "Nous avons besoin de confirmer la disposition des tables pour votre réception. Pourriez-vous nous indiquer si vous avez une préférence pour la table d'honneur ?",
    timestamp: "10:23",
    read: false
  }
];

const ClientMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Message envoyé:", messageInput);
      // Dans une application réelle, nous ajouterions le message à la conversation
      setMessageInput("");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-0">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div className="w-full max-w-xs border-r bg-white dark:bg-gray-800 flex flex-col">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Rechercher..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex p-3 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedConversation?.id === conversation.id 
                      ? 'bg-gray-100 dark:bg-gray-700' 
                      : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative mr-3">
                    <Avatar>
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className={`text-xs ${conversation.unread ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread ? 'font-medium' : 'text-gray-500'}`}>
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {conversation.role}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-2 truncate">
                        {conversation.event}
                      </span>
                    </div>
                  </div>
                  
                  {conversation.unread && (
                    <div className="ml-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* Conversation */}
          <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b bg-white dark:bg-gray-800 flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="mr-3">
                      <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                      <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center">
                        <h2 className="font-semibold">{selectedConversation.name}</h2>
                        {selectedConversation.online && (
                          <span className="ml-2 text-xs text-green-500 font-medium">En ligne</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="text-xs mr-2">
                          {selectedConversation.role}
                        </Badge>
                        <span className="text-xs text-gray-500">{selectedConversation.event}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Button variant="ghost" size="icon">
                      <Users className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'provider' && (
                          <Avatar className="mr-2 mt-1 hidden sm:flex">
                            <AvatarImage src={selectedConversation.avatar} />
                            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[70%] ${message.sender === 'client' ? 'bg-primary text-primary-foreground' : 'bg-white dark:bg-gray-800'} p-3 rounded-lg shadow-sm`}>
                          <p className="text-sm">{message.content}</p>
                          <div className={`text-xs mt-1 ${message.sender === 'client' ? 'text-primary-foreground/80' : 'text-gray-500'} flex justify-between items-center`}>
                            <span>{message.timestamp}</span>
                            {message.sender === 'client' && (
                              <span className="ml-1">
                                {message.read ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t">
                  <div className="flex items-end">
                    <Button variant="ghost" size="icon" className="mb-1 mr-1">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input 
                        className="pr-24 py-6 resize-none"
                        placeholder="Écrivez votre message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="absolute right-2 bottom-1/2 transform translate-y-1/2 flex">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <File className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      className="ml-2 rounded-full h-10 w-10 p-0"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Sélectionnez une conversation</h2>
                  <p className="text-gray-500">Choisissez un prestataire pour voir vos messages</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMessages;
