import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  Circle, 
  ChevronRight,
  PlusCircle,
  AlertCircle
} from "lucide-react";

// Mock data
const eventData = {
  id: 1,
  name: "Mariage Sophie & Thomas",
  date: "15 août 2023",
  time: "16:00",
  location: "Paris",
  address: "45 Avenue des Champs-Élysées, 75008 Paris",
  category: "Mariage",
  guestCount: 120,
  budget: 20000,
  spent: 12500,
  description: "Cérémonie suivie d'un cocktail et d'un dîner. Thème: élégant et romantique avec une palette de couleurs blanc, or et rose poudré.",
  progress: 65,
  services: [
    { 
      id: 101, 
      name: "Salle de réception", 
      status: "confirmed", 
      provider: { id: 1, name: "Espace Royal", rating: 4.8 },
      price: 8000
    },
    { 
      id: 201, 
      name: "Menu de réception", 
      status: "confirmed", 
      provider: { id: 2, name: "Traiteur Délices", rating: 4.7 },
      price: 4500
    },
    { 
      id: 202, 
      name: "Cocktail", 
      status: "pending", 
      provider: null,
      price: 0
    },
    { 
      id: 302, 
      name: "Bouquet de mariée", 
      status: "pending", 
      provider: null,
      price: 0
    },
  ],
  timeline: [
    { id: 1, date: "15 mai 2023", title: "Réserver le lieu", completed: true },
    { id: 2, date: "30 mai 2023", title: "Envoyer les faire-parts", completed: true },
    { id: 3, date: "15 juin 2023", title: "Confirmer le menu avec le traiteur", completed: false },
    { id: 4, date: "1 juillet 2023", title: "Rendez-vous avec le DJ", completed: false },
    { id: 5, date: "15 juillet 2023", title: "Finir la liste des invités", completed: false }
  ],
  guests: [
    { id: 1, name: "Famille du marié", count: 45, confirmed: 30 },
    { id: 2, name: "Famille de la mariée", count: 40, confirmed: 35 },
    { id: 3, name: "Amis communs", count: 35, confirmed: 20 }
  ],
  notes: [
    { id: 1, text: "Demander un menu végétarien pour 10 personnes", createdAt: "10 mai 2023" },
    { id: 2, text: "Prévoir des activités pour les 8 enfants présents", createdAt: "12 mai 2023" }
  ]
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [note, setNote] = useState("");
  
  const confirmedServices = eventData.services.filter(service => service.status === "confirmed");
  const pendingServices = eventData.services.filter(service => service.status === "pending");
  
  const totalGuests = eventData.guests.reduce((acc, group) => acc + group.count, 0);
  const confirmedGuests = eventData.guests.reduce((acc, group) => acc + group.confirmed, 0);
  
  const addNote = () => {
    if (note.trim()) {
      // Here you would usually send this to an API
      console.log("Adding note:", note);
      setNote("");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{eventData.name}</h1>
            <div className="flex items-center mt-1">
              <Badge>{eventData.category}</Badge>
              <div className="flex items-center ml-4 text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {eventData.date}
              </div>
              <div className="flex items-center ml-4 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {eventData.location}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" asChild>
              <Link to={`/client/events/${eventId}/services`}>
                Gérer les services
              </Link>
            </Button>
            <Button asChild>
              <Link to={`/client/events/${eventId}/providers`}>
                Trouver des prestataires
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Progress and Timeline */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Progression globale</span>
                    <span>{eventData.progress}%</span>
                  </div>
                  <Progress value={eventData.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Services réservés</h3>
                    <div className="text-2xl font-bold mt-1">{confirmedServices.length}/{eventData.services.length}</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Budget dépensé</h3>
                    <div className="text-2xl font-bold mt-1">{eventData.spent}€ <span className="text-xs font-normal text-gray-500">/ {eventData.budget}€</span></div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Invités confirmés</h3>
                    <div className="text-2xl font-bold mt-1">{confirmedGuests} <span className="text-xs font-normal text-gray-500">/ {totalGuests}</span></div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Temps restant</h3>
                    <div className="text-2xl font-bold mt-1">87 jours</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="timeline">
              <TabsList className="mb-6">
                <TabsTrigger value="timeline">Étapes et checklist</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="guests">Invités</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Prochaines étapes</CardTitle>
                    <Button variant="outline" size="sm">
                      Ajouter une étape
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="relative pl-8">
                      {eventData.timeline.map((item, idx) => (
                        <div key={item.id} className={`mb-6 ${idx === eventData.timeline.length - 1 ? '' : 'border-l-2 border-gray-200 pb-6'}`}>
                          <div className="absolute -left-3">
                            {item.completed ? (
                              <div className="bg-white p-0.5">
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                              </div>
                            ) : (
                              <div className="bg-white p-0.5">
                                <Circle className="h-6 w-6 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-500">{item.date}</p>
                            <p className={`font-medium ${item.completed ? 'line-through text-gray-400' : ''}`}>
                              {item.title}
                            </p>
                            {!item.completed && (
                              <Button size="sm" variant="ghost" className="mt-1 h-7 text-xs">
                                Marquer comme terminé
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Services réservés</CardTitle>
                    <Button size="sm" asChild>
                      <Link to={`/client/events/${eventId}/services`}>
                        Gérer les services
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {confirmedServices.length > 0 ? (
                      <div className="space-y-4">
                        {confirmedServices.map(service => (
                          <div key={service.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <div className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                <span className="font-medium">{service.name}</span>
                              </div>
                              <div className="ml-6 text-sm text-gray-600">
                                {service.provider.name} • {service.provider.rating} ⭐
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{service.price}€</div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/providers/${service.provider.id}`}>
                                  Détails
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        Aucun service confirmé pour le moment
                      </div>
                    )}
                    
                    {pendingServices.length > 0 && (
                      <>
                        <h3 className="font-medium mt-6 mb-3">Services à réserver</h3>
                        <div className="space-y-4">
                          {pendingServices.map(service => (
                            <div key={service.id} className="flex justify-between items-center p-3 border border-dashed rounded-lg">
                              <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                                <span>{service.name}</span>
                              </div>
                              <Button size="sm" asChild>
                                <Link to={`/client/events/${eventId}/providers?service=${service.id}`}>
                                  Trouver prestataire
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="mt-6">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/client/events/${eventId}/services`}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Ajouter un service
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Budget</CardTitle>
                    <Button size="sm" asChild>
                      <Link to={`/client/events/${eventId}/budget`}>
                        Gérer le budget
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Budget total</span>
                        <span>{eventData.spent}€ / {eventData.budget}€</span>
                      </div>
                      <Progress value={(eventData.spent / eventData.budget) * 100} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-1">Dépensé</h3>
                        <div className="text-2xl font-bold text-primary">{eventData.spent}€</div>
                        <p className="text-sm text-gray-500">
                          {Math.round((eventData.spent / eventData.budget) * 100)}% du budget
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-1">Restant</h3>
                        <div className="text-2xl font-bold">{eventData.budget - eventData.spent}€</div>
                        <p className="text-sm text-gray-500">
                          {Math.round(((eventData.budget - eventData.spent) / eventData.budget) * 100)}% du budget
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Nom de l'événement</h3>
                        <p>{eventData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Type</h3>
                        <p>{eventData.category}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date</h3>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                          {eventData.date}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Heure</h3>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          {eventData.time}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Lieu</h3>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {eventData.location}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Nombre d'invités</h3>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          {eventData.guestCount} personnes
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                        <p>{eventData.address}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p>{eventData.description}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button variant="outline">Modifier les informations</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4">
                      {eventData.notes.map(note => (
                        <div key={note.id} className="p-3 border rounded-lg">
                          <p>{note.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{note.createdAt}</p>
                        </div>
                      ))}
                      {eventData.notes.length === 0 && (
                        <p className="text-center py-4 text-gray-500">Aucune note pour le moment</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ajouter une note..."
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={addNote}>Ajouter</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="guests" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Liste des invités</CardTitle>
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter des invités
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eventData.guests.map(group => (
                        <div key={group.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{group.name}</h3>
                            <Badge variant="outline">
                              {group.confirmed}/{group.count} confirmés
                            </Badge>
                          </div>
                          <Progress 
                            value={(group.confirmed / group.count) * 100} 
                            className="h-1 mt-2" 
                          />
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm">
                              Détails
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 bg-muted rounded-lg p-4">
                      <div className="font-medium mb-2">Résumé des invités</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Invités total:</span>
                          <span>{totalGuests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confirmés:</span>
                          <span>{confirmedGuests} ({Math.round((confirmedGuests / totalGuests) * 100)}%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>En attente:</span>
                          <span>{totalGuests - confirmedGuests}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Gérer la liste des invités
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" asChild>
                  <Link to={`/client/events/${eventId}/providers`}>
                    Trouver des prestataires
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/client/events/${eventId}/services`}>
                    Gérer les services
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/client/events/${eventId}/budget`}>
                    Gérer le budget
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Inviter des collaborateurs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Ajouter une tâche
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prestataires</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {confirmedServices.length > 0 ? (
                  <div>
                    {confirmedServices.map(service => (
                      <div key={service.id} className="p-4 border-b last:border-b-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{service.provider.name}</p>
                            <p className="text-sm text-gray-600">{service.name}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7" asChild>
                            <Link to={`/providers/${service.provider.id}`}>
                              Voir
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 px-4">
                    <p className="text-gray-500">Aucun prestataire confirmé</p>
                    <Button size="sm" className="mt-2" asChild>
                      <Link to={`/client/events/${eventId}/providers`}>
                        Trouver des prestataires
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lieu de l'événement</CardTitle>
              </CardHeader>
              <CardContent>
                {eventData.address ? (
                  <div>
                    <div 
                      className="h-32 bg-gray-200 mb-2 rounded-lg"
                    />
                    <p className="font-medium">{eventData.location}</p>
                    <p className="text-sm text-gray-600">{eventData.address}</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Voir sur la carte
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Aucun lieu défini</p>
                    <Button size="sm" className="mt-2">
                      Définir le lieu
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetail;
