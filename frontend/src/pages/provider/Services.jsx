
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProviderServices = () => {
  const services = [
    { 
      id: 1, 
      name: "Organisation complète d'événements", 
      price: "Sur devis",
      description: "Prise en charge de A à Z de votre événement, de la conception à la réalisation.",
      bookings: 15
    },
    { 
      id: 2, 
      name: "Décoration événementielle", 
      price: "À partir de 500€",
      description: "Création d'ambiances sur mesure selon vos envies et le thème de votre événement.",
      bookings: 23
    },
    { 
      id: 3, 
      name: "Coordination jour J", 
      price: "À partir de 800€",
      description: "Coordination professionnelle le jour de votre événement pour vous permettre de profiter pleinement.",
      bookings: 8
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold">Mes services</h1>
          <Button className="mt-4 md:mt-0">
            Ajouter un nouveau service
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Services proposés</CardTitle>
                <CardDescription>
                  Gérez les services que vous proposez à vos clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead className="hidden md:table-cell">Réservations</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map(service => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-muted-foreground hidden md:block">{service.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{service.price}</TableCell>
                        <TableCell className="hidden md:table-cell">{service.bookings}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Modifier</Button>
                            <Button size="sm" variant="destructive">Supprimer</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Formulaire d'ajout/modification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Nom du service</Label>
                    <Input id="service-name" placeholder="Ex: Organisation complète d'événements" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Prix</Label>
                    <Input id="service-price" placeholder="Ex: À partir de 500€ ou Sur devis" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description</Label>
                    <textarea
                      id="service-description"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Décrivez votre service en détail..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-category">Catégorie</Label>
                    <select
                      id="service-category"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      <option value="organisation">Organisation</option>
                      <option value="decoration">Décoration</option>
                      <option value="coordination">Coordination</option>
                      <option value="animation">Animation</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">Annuler</Button>
                    <Button>Enregistrer</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Liens rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/services/catalog">Catalogue de services</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/services/promotions">Offres promotionnelles</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/stats">Statistiques par service</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bookings">
                  <TabsList className="w-full">
                    <TabsTrigger value="bookings" className="flex-1">Réservations</TabsTrigger>
                    <TabsTrigger value="views" className="flex-1">Vues</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bookings" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Décoration événementielle</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{width: '70%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">23 réservations</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Organisation complète</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{width: '50%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">15 réservations</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Coordination jour J</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">8 réservations</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="views" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Décoration événementielle</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">152 vues</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Organisation complète</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">117 vues</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Coordination jour J</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{width: '40%'}}></div>
                        </div>
                        <p className="text-xs text-right mt-1">72 vues</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/provider/stats">Statistiques détaillées</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderServices;
