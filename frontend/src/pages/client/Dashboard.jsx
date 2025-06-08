
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, PlusCircle, ChevronRight, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import MainLayout from "../../components/layout/MainLayout";

// Mock data
const upcomingEvents = [
  {
    id: 1,
    name: "Mariage Sophie & Thomas",
    date: "15 août 2023",
    location: "Paris",
    category: "Mariage",
    progress: 75,
    tasks: {
      total: 24,
      completed: 18
    }
  },
  {
    id: 2,
    name: "Anniversaire 30 ans Julie",
    date: "3 juin 2023",
    location: "Lyon",
    category: "Anniversaire",
    progress: 40,
    tasks: {
      total: 15,
      completed: 6
    }
  }
];

const upcomingTasks = [
  {
    id: 1,
    name: "Confirmer le menu avec le traiteur",
    dueDate: "12 mai 2023",
    priority: "high",
    eventId: 1
  },
  {
    id: 2,
    name: "Finaliser la liste des invités",
    dueDate: "15 mai 2023",
    priority: "medium",
    eventId: 1
  },
  {
    id: 3,
    name: "Réserver le DJ",
    dueDate: "20 mai 2023",
    priority: "medium",
    eventId: 2
  }
];

const messages = [
  {
    id: 1,
    sender: "Espace Royal",
    excerpt: "Bonjour, nous avons bien reçu votre demande de devis pour...",
    time: "Il y a 2 heures",
    unread: true
  },
  {
    id: 2,
    sender: "Traiteur Délices",
    excerpt: "Voici les options de menu que nous pouvons vous proposer...",
    time: "Il y a 1 jour",
    unread: false
  }
];

const ClientDashboard = () => {
  const [date, setDate] = React.useState(new Date());
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <Button asChild>
            <Link to="/client/events/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Créer un événement
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="col-span-2 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Vos événements à venir</CardTitle>
                <Button variant="outline" asChild>
                  <Link to="/client/events">
                    Voir tous
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Vous n'avez pas encore d'événement planifié</p>
                    <Button className="mt-4" asChild>
                      <Link to="/client/events/create">Créer mon premier événement</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <Card key={event.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <Link to={`/client/events/${event.id}`} className="text-xl font-semibold hover:text-primary">
                                {event.name}
                              </Link>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <CalendarIcon className="mr-1 h-4 w-4" />
                                {event.date}
                                <span className="mx-2">•</span>
                                <Badge variant="outline">{event.category}</Badge>
                              </div>
                            </div>
                            <Link to={`/client/events/${event.id}`}>
                              <Button variant="ghost" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progression</span>
                              <span>{event.progress}%</span>
                            </div>
                            <Progress value={event.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              {event.tasks.completed}/{event.tasks.total} tâches complétées
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tâches à venir</CardTitle>
                <Button variant="outline" size="sm">
                  Voir toutes
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingTasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucune tâche en attente</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingTasks.map(task => (
                      <div key={task.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                            task.priority === "high" ? "bg-red-500" :
                            task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                          }`}></div>
                          <div>
                            <p className="font-medium">{task.name}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {task.dueDate}
                              <span className="mx-2">•</span>
                              <Link to={`/client/events/${task.eventId}`} className="text-primary hover:underline">
                                {upcomingEvents.find(e => e.id === task.eventId)?.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Terminer</Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Messages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Messages récents</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/client/messages">Voir tous</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map(message => (
                    <Link key={message.id} to="/client/messages" className="block">
                      <div className={`p-3 rounded-lg border ${message.unread ? 'bg-muted/50' : ''}`}>
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {message.unread && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>}
                            {message.sender}
                          </p>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 truncate">{message.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Side Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Événements du jour</p>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <p className="font-medium">Appel avec Espace Royal</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-4 mt-1">14:00 - 14:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Budget Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mariage Sophie & Thomas</span>
                      <span className="font-medium">15,000€ / 20,000€</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Anniversaire Julie</span>
                      <span className="font-medium">800€ / 2,000€</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/client/events/1/budget">
                      Gérer mon budget
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/providers">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Trouver un prestataire
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/client/events/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Créer un événement
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/client/favorites">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Voir mes favoris
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;
