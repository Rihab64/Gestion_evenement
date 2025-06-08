
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProviderBookings = () => {
  // Données fictives de réservations
  const allBookings = [
    {
      id: 301,
      client: "Sophie et Thomas",
      clientId: 201,
      event: "Mariage",
      date: "28/05/2025",
      time: "14:00 - 23:00",
      location: "Château des Fleurs, Paris",
      service: "Organisation complète",
      status: "upcoming",
      totalAmount: "3500€",
      deposit: "1000€",
      balance: "2500€",
      tasks: [
        { title: "Rencontre finale", completed: true },
        { title: "Confirmer les prestataires", completed: true },
        { title: "Vérifier planning", completed: false },
        { title: "Prévoir matériel", completed: false }
      ]
    },
    {
      id: 302,
      client: "Entreprise XYZ",
      clientId: 202,
      event: "Anniversaire d'entreprise",
      date: "10/06/2025",
      time: "19:00 - 23:00",
      location: "Tour Eiffel, Paris",
      service: "Organisation et animation",
      status: "upcoming",
      totalAmount: "2800€",
      deposit: "1400€",
      balance: "1400€",
      tasks: [
        { title: "Finaliser menu", completed: true },
        { title: "Réserver transport", completed: false },
        { title: "Préparer animations", completed: false }
      ]
    },
    {
      id: 303,
      client: "Julie et Marc",
      clientId: 203,
      event: "Anniversaire de mariage",
      date: "05/05/2025",
      time: "18:30 - 23:30",
      location: "Restaurant Le Grand Véfour, Paris",
      service: "Décoration",
      status: "completed",
      totalAmount: "950€",
      deposit: "500€",
      balance: "450€",
      tasks: [
        { title: "Acheter matériel", completed: true },
        { title: "Installation", completed: true },
        { title: "Démontage", completed: true }
      ]
    },
    {
      id: 304,
      client: "Marie Dupont",
      clientId: 204,
      event: "Baby Shower",
      date: "15/04/2025",
      time: "14:00 - 18:00",
      location: "Appartement privé, Paris 16e",
      service: "Organisation et animation",
      status: "completed",
      totalAmount: "650€",
      deposit: "300€",
      balance: "350€",
      tasks: [
        { title: "Préparation jeux", completed: true },
        { title: "Installation décor", completed: true }
      ]
    }
  ];
  
  const [activeTab, setActiveTab] = useState("upcoming");
  const [viewMode, setViewMode] = useState("list"); // list ou calendar
  
  // Filtrer les réservations en fonction de l'onglet actif
  const filteredBookings = allBookings.filter(booking => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });
  
  // Calcul des statistiques
  const upcomingCount = allBookings.filter(b => b.status === "upcoming").length;
  const completedCount = allBookings.filter(b => b.status === "completed").length;
  const totalRevenue = allBookings.reduce((sum, booking) => {
    const amount = parseInt(booking.totalAmount.replace('€', ''));
    return sum + amount;
  }, 0);
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold">Réservations confirmées</h1>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="calendar">Calendrier</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-bold">{upcomingCount}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">À venir</p>
                  <p className="text-2xl font-bold">{upcomingCount} événement{upcomingCount > 1 ? 's' : ''}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-bold">{completedCount}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Terminés</p>
                  <p className="text-2xl font-bold">{completedCount} événement{completedCount > 1 ? 's' : ''}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-700 font-bold">€</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
                  <p className="text-2xl font-bold">{totalRevenue}€</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {viewMode === "list" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Liste des événements confirmés</CardTitle>
                  <CardDescription>
                    {filteredBookings.length} événement{filteredBookings.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Événement</TableHead>
                            <TableHead className="hidden md:table-cell">Lieu</TableHead>
                            <TableHead className="hidden md:table-cell">Montant</TableHead>
                            <TableHead className="hidden md:table-cell">Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBookings.map(booking => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">
                                {booking.date}
                                <div className="md:hidden text-xs text-muted-foreground">{booking.time}</div>
                              </TableCell>
                              <TableCell>
                                {booking.client}
                              </TableCell>
                              <TableCell>
                                {booking.event}
                                <div className="md:hidden text-xs text-muted-foreground">{booking.service}</div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {booking.location}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {booking.totalAmount}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  booking.status === 'upcoming' 
                                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                    : 'bg-green-100 text-green-800 border border-green-200'
                                }`}>
                                  {booking.status === 'upcoming' ? 'À venir' : 'Terminé'}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button asChild size="sm" variant="outline">
                                  <Link to={`/provider/bookings/${booking.id}`}>
                                    Détails
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-muted-foreground">Aucune réservation trouvée.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Vue calendrier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-muted/20 rounded-md flex items-center justify-center h-[400px]">
                    <div className="text-center">
                      <p className="text-muted-foreground">Vue calendrier en développement</p>
                      <Button className="mt-4">Voir dans une nouvelle fenêtre</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Événements à venir</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBookings
              .filter(booking => booking.status === 'upcoming')
              .map(booking => (
                <Card key={booking.id} className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{booking.event}</CardTitle>
                    <CardDescription>{booking.date} - {booking.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Lieu</p>
                        <p>{booking.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Service</p>
                        <p>{booking.service}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Checklist de préparation</p>
                        <div className="mt-2 space-y-2">
                          {booking.tasks.map((task, index) => (
                            <div key={index} className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={task.completed}
                                className="h-4 w-4 text-primary border-gray-300 rounded mr-2"
                                readOnly
                              />
                              <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                                {task.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/provider/bookings/${booking.id}`}>
                        Voir détails
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1">
                      Contacter
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderBookings;
