
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProviderStats = () => {
  const [periodTab, setPeriodTab] = useState("month");
  
  // Données fictives pour les graphiques et statistiques
  const performanceData = {
    views: {
      month: 320,
      change: "+12%",
      positive: true
    },
    leads: {
      month: 42,
      change: "+8%",
      positive: true
    },
    conversions: {
      month: 15,
      change: "+5%",
      positive: true
    },
    revenue: {
      month: "4,650€",
      change: "+15%",
      positive: true
    }
  };
  
  // Données pour le tableau des services les plus demandés
  const topServices = [
    { id: 1, name: "Organisation complète", requests: 18, conversion: "35%", revenue: "2,800€" },
    { id: 2, name: "Décoration événementielle", requests: 24, conversion: "25%", revenue: "1,500€" },
    { id: 3, name: "Coordination jour J", requests: 10, conversion: "40%", revenue: "800€" },
  ];
  
  // Données pour le tableau des types d'événements
  const topEvents = [
    { id: 1, type: "Mariage", count: 8, percentage: "35%" },
    { id: 2, type: "Anniversaire", count: 12, percentage: "30%" },
    { id: 3, type: "Événement d'entreprise", count: 6, percentage: "20%" },
    { id: 4, type: "Baptême", count: 4, percentage: "15%" },
  ];
  
  const monthData = Array(30).fill(0).map((_, i) => ({
    date: `${i + 1}`,
    views: Math.floor(Math.random() * 20) + 5,
  }));
  
  // Fonction pour simuler des graphiques (en pratique, vous utiliseriez une vraie bibliothèque de graphiques)
  const renderChart = (data, height) => {
    const max = Math.max(...data.map(item => item.views)) || 1;
    
    return (
      <div className="w-full" style={{ height: `${height}px` }}>
        <div className="flex items-end h-full space-x-1">
          {data.map((item, index) => {
            const percentage = (item.views / max) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary/80 rounded-t"
                  style={{ height: `${percentage}%` }}
                ></div>
                {index % 5 === 0 && (
                  <span className="text-xs mt-1 text-muted-foreground">{item.date}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Statistiques et Analyses</h1>
        
        <div className="mb-6">
          <Tabs value={periodTab} onValueChange={setPeriodTab}>
            <TabsList>
              <TabsTrigger value="week">Semaine</TabsTrigger>
              <TabsTrigger value="month">Mois</TabsTrigger>
              <TabsTrigger value="quarter">Trimestre</TabsTrigger>
              <TabsTrigger value="year">Année</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites du profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{performanceData.views.month}</p>
                <p className={`text-sm ${performanceData.views.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {performanceData.views.change}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Demandes reçues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{performanceData.leads.month}</p>
                <p className={`text-sm ${performanceData.leads.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {performanceData.leads.change}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{performanceData.conversions.month}</p>
                <p className={`text-sm ${performanceData.conversions.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {performanceData.conversions.change}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{performanceData.revenue.month}</p>
                <p className={`text-sm ${performanceData.revenue.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {performanceData.revenue.change}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Évolution des visites sur votre profil</CardTitle>
              <CardDescription>Mai 2025</CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart(monthData, 200)}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Services les plus demandés</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-right">Demandes</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead className="text-right">Revenus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topServices.map(service => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell className="text-right">{service.requests}</TableCell>
                      <TableCell className="text-right">{service.conversion}</TableCell>
                      <TableCell className="text-right">{service.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link to="/provider/services">
                    Voir tous les services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Types d'événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEvents.map(event => (
                  <div key={event.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{event.type}</span>
                      <span className="text-muted-foreground">{event.count} événements</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: event.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Taux de conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-4xl font-bold mb-2">35.7%</div>
                <p className="text-muted-foreground text-center">
                  Des demandes se transforment en réservations
                </p>
                <div className="w-full h-2 bg-muted rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '35.7%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Saisonnalité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Périodes les plus demandées:</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Juin - Septembre</span>
                    <span className="text-green-600 font-medium">Forte demande</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avril - Mai</span>
                    <span className="text-amber-600 font-medium">Demande moyenne</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '55%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Octobre - Mars</span>
                    <span className="text-red-600 font-medium">Faible demande</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Avis clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-4xl font-bold mb-2">4.8/5</div>
                <div className="text-yellow-500 text-xl mb-2">★★★★★</div>
                <p className="text-muted-foreground text-center">
                  Basé sur 24 évaluations
                </p>
                
                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">5★</span>
                    <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-sm">80%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">4★</span>
                    <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm">15%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">3★</span>
                    <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-sm">5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderStats;
