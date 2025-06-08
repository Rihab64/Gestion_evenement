
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminDashboard = () => {
  // Données simulées
  const platformStats = {
    users: { total: 1250, new: 45, growth: "+3.6%" },
    providers: { total: 350, new: 12, growth: "+3.4%" },
    clients: { total: 900, new: 33, growth: "+3.7%" },
    events: { total: 320, active: 180, completed: 140 },
    revenue: { total: "45,680€", growth: "+5.2%" }
  };
  
  const recentUsers = [
    { id: 1, name: "Sophie Martin", email: "sophie@example.com", type: "Client", date: "21/05/2025" },
    { id: 2, name: "Studio Photo Elite", email: "contact@studio-elite.com", type: "Prestataire", date: "20/05/2025" },
    { id: 3, name: "Jean Dupont", email: "jean@example.com", type: "Client", date: "19/05/2025" },
    { id: 4, name: "Traiteur Délices", email: "info@traiteur-delices.com", type: "Prestataire", date: "18/05/2025" },
    { id: 5, name: "Marie Lefèvre", email: "marie@example.com", type: "Client", date: "17/05/2025" }
  ];
  
  const activeEvents = [
    { id: 1, name: "Mariage de Sophie et Thomas", date: "28/05/2025", location: "Paris", clients: 1, providers: 5 },
    { id: 2, name: "Conférence Tech Innovate", date: "15/06/2025", location: "Lyon", clients: 1, providers: 3 },
    { id: 3, name: "Gala annuel Entreprise XYZ", date: "10/07/2025", location: "Marseille", clients: 1, providers: 6 }
  ];
  
  // Simuler un graphique d'activité (en pratique, vous utiliseriez une vraie bibliothèque de graphiques)
  const activityData = Array(7).fill(0).map((_, i) => ({
    day: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i],
    activity: Math.floor(Math.random() * 50) + 10,
  }));
  
  const renderActivityChart = () => {
    const max = Math.max(...activityData.map(item => item.activity));
    
    return (
      <div className="flex items-end h-[150px] space-x-2">
        {activityData.map((item, index) => {
          const height = (item.activity / max) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-primary rounded-t"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs mt-2">{item.day}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord administrateur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Utilisateurs totaux</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-3xl font-bold">{platformStats.users.total}</p>
                  <p className="text-green-600 text-sm font-medium">{platformStats.users.growth}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {platformStats.users.new} nouveaux cette semaine
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Prestataires</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-3xl font-bold">{platformStats.providers.total}</p>
                  <p className="text-green-600 text-sm font-medium">{platformStats.providers.growth}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {platformStats.providers.new} nouveaux cette semaine
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Événements actifs</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-3xl font-bold">{platformStats.events.active}</p>
                  <p className="text-sm font-medium text-muted-foreground">sur {platformStats.events.total}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {platformStats.events.completed} événements terminés
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Revenus de la plateforme</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-3xl font-bold">{platformStats.revenue.total}</p>
                  <p className="text-green-600 text-sm font-medium">{platformStats.revenue.growth}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Par rapport au mois dernier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Activité de la plateforme</CardTitle>
              <CardDescription>Derniers 7 jours</CardDescription>
            </CardHeader>
            <CardContent>
              {renderActivityChart()}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribution des utilisateurs</CardTitle>
              <CardDescription>Répartition par type et statut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-center">Types d'utilisateurs</h4>
                  <div className="flex flex-col items-center">
                    <div className="relative h-[150px] w-[150px] rounded-full overflow-hidden">
                      {/* Simulation d'un graphique circulaire */}
                      <div className="absolute inset-0 bg-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 72%, 0% 72%)' }}></div>
                      <div className="absolute inset-0 bg-secondary" style={{ clipPath: 'polygon(0 72%, 100% 72%, 100% 100%, 0% 100%)' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                        <div className="h-[100px] w-[100px] rounded-full bg-background"></div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                        <span className="text-sm">Clients (72%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-secondary mr-2"></div>
                        <span className="text-sm">Prestataires (28%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-center">Statut des utilisateurs</h4>
                  <div className="flex flex-col items-center">
                    <div className="relative h-[150px] w-[150px] rounded-full overflow-hidden">
                      {/* Simulation d'un graphique circulaire */}
                      <div className="absolute inset-0 bg-green-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 85%)' }}></div>
                      <div className="absolute inset-0 bg-amber-500" style={{ clipPath: 'polygon(0 85%, 100% 85%, 100% 92%, 0% 92%)' }}></div>
                      <div className="absolute inset-0 bg-red-500" style={{ clipPath: 'polygon(0 92%, 100% 92%, 100% 100%, 0% 100%)' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                        <div className="h-[100px] w-[100px] rounded-full bg-background"></div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4 flex-wrap">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Actifs (85%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm">Inactifs (7%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Suspendus (8%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs récents</CardTitle>
              <CardDescription>
                Les 5 derniers inscrits sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.type === 'Client' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {user.type}
                        </span>
                      </TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Voir</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CardFooter className="px-0 pt-6">
                <Button asChild variant="outline">
                  <Link to="/admin/users">
                    Voir tous les utilisateurs
                  </Link>
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Événements en cours</CardTitle>
              <CardDescription>
                Événements actifs sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Événement</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Prestataires</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.providers}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Voir</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CardFooter className="px-0 pt-6">
                <Button variant="outline">
                  Voir tous les événements
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
