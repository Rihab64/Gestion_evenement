
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RequestDetail = () => {
  const { requestId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  // Données fictives de la demande pour la démonstration
  const request = {
    id: requestId,
    date: "21/05/2025",
    client: {
      id: 201,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "06 12 34 56 78",
      rating: 4.8,
      previousEvents: 2
    },
    event: {
      type: "Baptême",
      date: "15/07/2025",
      time: "14:00",
      location: "Église Saint-Pierre, Paris 15e",
      guests: 50,
      description: "Baptême de notre fils Lucas, 3 mois. Nous recherchons un photographe professionnel pour immortaliser ce moment important."
    },
    service: {
      type: "Photographie",
      details: "Photos pendant la cérémonie (1h) et séance photo familiale après la cérémonie (1h)"
    },
    budget: "600-800€",
    status: "pending",
    messages: [
      {
        date: "19/05/2025 10:23",
        sender: "client",
        content: "Bonjour, j'aimerais savoir si vous êtes disponible pour un baptême le 15 juillet."
      },
      {
        date: "19/05/2025 11:45",
        sender: "provider",
        content: "Bonjour Marie, merci pour votre message. Oui, je suis disponible le 15 juillet. Pourriez-vous me donner plus de détails sur l'événement ?"
      },
      {
        date: "20/05/2025 09:12",
        sender: "client",
        content: "Il s'agit du baptême de notre fils Lucas. La cérémonie aura lieu à l'Église Saint-Pierre à 14h et nous aimerions des photos pendant la cérémonie et une séance photo familiale après."
      }
    ]
  };
  
  // Statut formaté pour l'affichage
  const getStatusDisplay = () => {
    switch (request.status) {
      case 'new':
        return {
          label: "Nouvelle demande",
          className: "text-blue-800 bg-blue-50 border-blue-200"
        };
      case 'pending':
        return {
          label: "En attente de réponse",
          className: "text-amber-800 bg-amber-50 border-amber-200"
        };
      case 'quoted':
        return {
          label: "Devis envoyé",
          className: "text-green-800 bg-green-50 border-green-200"
        };
      default:
        return {
          label: request.status,
          className: ""
        };
    }
  };
  
  const statusDisplay = getStatusDisplay();
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="mb-4"
            >
              <Link to="/provider/requests">← Retour aux demandes</Link>
            </Button>
            <h1 className="text-3xl font-bold">Détail de la demande #{requestId}</h1>
            <div className="flex items-center mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.className}`}>
                {statusDisplay.label}
              </span>
              <span className="ml-4 text-muted-foreground">Reçue le {request.date}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="default">Accepter la demande</Button>
            <Button variant="outline">Proposer un devis</Button>
            <Button variant="secondary">Contacter le client</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Détails de l'événement</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="files">Fichiers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations complètes sur l'événement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold">Événement</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Type d'événement</p>
                            <p>{request.event.type}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Date</p>
                            <p>{request.event.date} à {request.event.time}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Lieu</p>
                            <p>{request.event.location}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Nombre d'invités</p>
                            <p>{request.event.guests} personnes</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-medium text-muted-foreground">Description</p>
                          <p className="bg-muted/50 p-3 rounded mt-1">{request.event.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold">Service demandé</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Type de service</p>
                            <p>{request.service.type}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Budget</p>
                            <p>{request.budget}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-medium text-muted-foreground">Détails</p>
                          <p className="bg-muted/50 p-3 rounded mt-1">{request.service.details}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold">Besoins spécifiques du client</h3>
                        <div className="space-y-3 mt-2">
                          <div className="p-3 border rounded-md">
                            <p className="font-medium">Photos de groupe</p>
                            <p className="text-sm text-muted-foreground">Photos de famille élargie (grands-parents inclus)</p>
                          </div>
                          <div className="p-3 border rounded-md">
                            <p className="font-medium">Livraison rapide</p>
                            <p className="text-sm text-muted-foreground">Souhaite recevoir une sélection de photos sous 48h</p>
                          </div>
                          <div className="p-3 border rounded-md">
                            <p className="font-medium">Album photo</p>
                            <p className="text-sm text-muted-foreground">Souhaite un devis pour un album photo imprimé</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Échanges avec le client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {request.messages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'client' 
                                ? 'bg-muted/50 text-foreground' 
                                : 'bg-primary/10 text-primary-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-muted-foreground mt-1 text-right">
                              {message.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                      <Label htmlFor="new-message">Nouvelle réponse</Label>
                      <textarea
                        id="new-message"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
                        placeholder="Écrivez votre réponse ici..."
                      />
                      <div className="flex justify-end mt-2">
                        <Button>Envoyer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="files">
                <Card>
                  <CardHeader>
                    <CardTitle>Fichiers partagés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md flex items-center justify-between">
                        <div>
                          <p className="font-medium">Inspiration_bapteme.pdf</p>
                          <p className="text-sm text-muted-foreground">Envoyé par le client le 20/05/2025</p>
                        </div>
                        <Button variant="outline" size="sm">Télécharger</Button>
                      </div>
                      <div className="p-4 border border-dashed rounded-md text-center">
                        <p className="text-muted-foreground mb-2">Déposez des fichiers ici ou</p>
                        <Button variant="secondary">Parcourir</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>À propos du client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border-b">
                    <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto">
                      {request.client.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-lg mt-2">{request.client.name}</h3>
                    <div className="flex items-center justify-center mt-1">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-sm ml-1">{request.client.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client depuis 2024 • {request.client.previousEvents} événements
                    </p>
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{request.client.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                        <p>{request.client.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" className="flex-1">Appeler</Button>
                      <Button variant="outline" className="flex-1">Email</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full">Accepter la demande</Button>
                  <Button variant="outline" className="w-full">Proposer un devis</Button>
                  <Button variant="secondary" className="w-full">Demander plus d'infos</Button>
                  <Button variant="destructive" className="w-full">Refuser la demande</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notes internes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Ajoutez des notes privées concernant cette demande..."
                />
                <Button className="w-full mt-2">Enregistrer</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RequestDetail;
