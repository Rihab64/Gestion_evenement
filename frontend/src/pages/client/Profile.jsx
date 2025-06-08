
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ClientProfile = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="preferences">Préférences</TabsTrigger>
                <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Nom</p>
                          <p>Dupont</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Prénom</p>
                          <p>Jean</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>jean.dupont@example.com</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                          <p>06 12 34 56 78</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                          <p>123 Rue de Paris, 75001 Paris</p>
                        </div>
                      </div>
                      
                      <Button asChild className="mt-4">
                        <Link to="/client/profile/edit">Modifier mes informations</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Configurez vos préférences de notifications pour rester informé des mises à jour importantes.</p>
                      <Button asChild>
                        <Link to="/client/profile/preferences">Gérer mes préférences</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Moyens de paiement enregistrés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Gérez vos moyens de paiement pour faciliter vos transactions.</p>
                      <div className="rounded-lg border p-4 mb-4">
                        <p className="font-medium">Carte Visa se terminant par 4242</p>
                        <p className="text-sm text-muted-foreground">Expire le 12/25</p>
                      </div>
                      <Button asChild>
                        <Link to="/client/profile/payment">Gérer mes moyens de paiement</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique des événements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Événement</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>10/05/2025</TableCell>
                          <TableCell>Mariage</TableCell>
                          <TableCell>Terminé</TableCell>
                          <TableCell><Link to="/client/events/123" className="text-primary hover:underline">Voir</Link></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>25/03/2025</TableCell>
                          <TableCell>Anniversaire</TableCell>
                          <TableCell>Terminé</TableCell>
                          <TableCell><Link to="/client/events/456" className="text-primary hover:underline">Voir</Link></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Liens rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/client/profile/edit">Modification des informations</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/client/profile/preferences">Gestion des préférences</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/client/profile/privacy">Paramètres de confidentialité</Link>
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

export default ClientProfile;
