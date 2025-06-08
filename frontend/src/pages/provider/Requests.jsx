
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProviderRequests = () => {
  // Simuler des données de demandes
  const allRequests = [
    {
      id: 101,
      date: "21/05/2025",
      client: "Marie Dubois",
      clientId: 201,
      event: "Baptême",
      eventDate: "15/07/2025",
      location: "Paris 15e",
      service: "Photographie",
      status: "pending",
      budget: "600-800€"
    },
    {
      id: 102,
      date: "19/05/2025",
      client: "Pierre Martin",
      clientId: 202,
      event: "Gala d'entreprise",
      eventDate: "05/09/2025",
      location: "Boulogne-Billancourt",
      service: "Organisation complète",
      status: "quoted",
      budget: "3000-5000€"
    },
    {
      id: 103,
      date: "15/05/2025",
      client: "Julie Lefèvre", 
      clientId: 203,
      event: "Mariage",
      eventDate: "12/08/2025",
      location: "Château de Versailles",
      service: "Décoration florale",
      status: "new",
      budget: "1200-1500€"
    },
    {
      id: 104,
      date: "12/05/2025",
      client: "Thomas Bernard",
      clientId: 204,
      event: "Anniversaire 40 ans",
      eventDate: "30/06/2025",
      location: "Paris 8e",
      service: "Animation DJ",
      status: "pending",
      budget: "500-700€"
    },
    {
      id: 105,
      date: "10/05/2025",
      client: "Émilie Roux",
      clientId: 205,
      event: "Baptême",
      eventDate: "19/07/2025",
      location: "Paris 17e",
      service: "Traiteur",
      status: "quoted",
      budget: "800-1000€"
    }
  ];
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrer les demandes en fonction de l'onglet actif et du terme de recherche
  const filteredRequests = allRequests.filter(request => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "new" && request.status === "new") ||
      (activeTab === "pending" && request.status === "pending") ||
      (activeTab === "quoted" && request.status === "quoted");
    
    const matchesSearch = 
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Obtenir le statut formaté pour l'affichage
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'new':
        return {
          label: "Nouveau",
          className: "bg-blue-100 text-blue-800 border-blue-200"
        };
      case 'pending':
        return {
          label: "En attente",
          className: "bg-amber-100 text-amber-800 border-amber-200"
        };
      case 'quoted':
        return {
          label: "Devis envoyé",
          className: "bg-green-100 text-green-800 border-green-200"
        };
      default:
        return {
          label: status,
          className: ""
        };
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Demandes de prestation</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Rechercher une demande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="new">Nouvelles</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="quoted">Devis envoyés</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Nouvelles demandes</CardTitle>
            <CardDescription>
              {filteredRequests.length} demande{filteredRequests.length !== 1 ? 's' : ''} trouvée{filteredRequests.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead className="hidden md:table-cell">Lieu</TableHead>
                      <TableHead className="hidden md:table-cell">Service</TableHead>
                      <TableHead className="hidden md:table-cell">Budget</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="whitespace-nowrap">
                          {request.date}
                          <div className="md:hidden text-xs text-muted-foreground">
                            {request.eventDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.client}
                          <div className="md:hidden text-xs text-muted-foreground">
                            {request.service}
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.event}
                          <div className="md:hidden text-xs text-muted-foreground">
                            {request.location}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{request.location}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.service}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.budget}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusDisplay(request.status).className}`}>
                            {getStatusDisplay(request.status).label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button asChild size="sm" variant="outline">
                              <Link to={`/provider/requests/${request.id}`}>
                                Voir
                              </Link>
                            </Button>
                            <Button 
                              size="sm"
                              variant={request.status === "new" ? "default" : "outline"}
                            >
                              {request.status === "new" ? "Répondre" : "Message"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">Aucune demande ne correspond à vos critères.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full">Marquer tout comme lu</Button>
                <Button variant="outline" className="w-full">Exporter en CSV</Button>
                <Button variant="secondary" className="w-full">Configurer réponses automatiques</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Date de l'événement</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" placeholder="Du" />
                    <Input type="date" placeholder="Au" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Budget</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Min" />
                    <Input type="number" placeholder="Max" />
                  </div>
                </div>
                
                <Button className="w-full mt-4">Appliquer les filtres</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Taux de conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Demandes totales</span>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Devis envoyés</span>
                  <span className="font-bold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Confirmations</span>
                  <span className="font-bold">15</span>
                </div>
                <div className="h-2 bg-muted rounded-full mt-2">
                  <div className="h-full bg-primary rounded-full" style={{width: '36%'}}></div>
                </div>
                <div className="text-center text-sm font-medium">
                  36% de taux de conversion
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Temps de réponse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <div className="text-4xl font-bold">3.2h</div>
                <p className="text-sm text-muted-foreground">Temps de réponse moyen</p>
                <Button variant="link">Améliorer ce délai</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderRequests;
