
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const ProviderDashboard = () => {
  const upcomingEvents = [
    { id: 1, date: "28 Mai 2025", title: "Mariage de Sophie et Thomas", location: "Château des Fleurs, Paris" },
    { id: 2, date: "10 Juin 2025", title: "Anniversaire d'entreprise", location: "Tour Eiffel, Paris" }
  ];
  
  const recentRequests = [
    { id: 101, date: "21 Mai 2025", client: "Marie Dubois", event: "Baptême", status: "En attente" },
    { id: 102, date: "19 Mai 2025", client: "Pierre Martin", event: "Gala d'entreprise", status: "Devis envoyé" },
    { id: 103, date: "15 Mai 2025", client: "Julie Lefèvre", event: "Mariage", status: "Nouveau" }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Section de gauche - 2/3 de l'écran */}
          <div className="md:col-span-8 space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle>Demandes récentes</CardTitle>
                <CardDescription>Les dernières demandes reçues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.client}</TableCell>
                        <TableCell>{request.event}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === "Nouveau" ? "bg-blue-100 text-blue-800" :
                            request.status === "En attente" ? "bg-amber-100 text-amber-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link to={`/provider/requests/${request.id}`} className="text-primary hover:underline">
                            Voir détails
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link to="/provider/requests">Voir toutes les demandes</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Vos prochaines prestations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <p className="text-sm font-medium">{event.date}</p>
                        <Link to={`/provider/bookings/${event.id}`} className="text-primary text-sm hover:underline">
                          Voir détails
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link to="/provider/bookings">Voir tous les événements</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Section de droite - 1/3 de l'écran */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Visites du profil</span>
                      <span className="text-sm font-medium">120</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Taux de conversion</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Avis positifs</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
                
                <Button asChild className="w-full mt-4">
                  <Link to="/provider/stats">Voir toutes les statistiques</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notifications importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-amber-800">3 nouvelles demandes nécessitent votre attention</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">Mettez à jour votre calendrier pour le mois prochain</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Liens rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/requests">Gestion des demandes</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/availability">Calendrier</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/messages">Messages</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/profile">Profil professionnel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderDashboard;
