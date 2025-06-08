
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProviderProfileManagement = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Gestion du profil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de l'entreprise</CardTitle>
                    <CardDescription>Informations de base de votre entreprise</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-name">Nom de l'entreprise</Label>
                          <Input id="company-name" defaultValue="Studio Événementiel Prestige" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business-type">Type d'activité</Label>
                          <Input id="business-type" defaultValue="Organisation d'événements" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" defaultValue="01 23 45 67 89" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email professionnel</Label>
                          <Input id="email" defaultValue="contact@studio-prestige.fr" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Site web</Label>
                          <Input id="website" defaultValue="www.studio-prestige.fr" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input id="address" defaultValue="15 Rue de Rivoli, 75001 Paris" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                          id="description"
                          className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="Studio Événementiel Prestige est une entreprise spécialisée dans l'organisation d'événements de luxe à Paris et ses environs. Avec plus de 10 ans d'expérience, nous créons des moments inoubliables pour des particuliers et des entreprises exigeants."
                        />
                      </div>
                      <Button className="mt-4">Enregistrer les modifications</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio avec gestion des médias</CardTitle>
                    <CardDescription>Présentez vos meilleures réalisations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(item => (
                          <div key={item} className="relative group rounded-md overflow-hidden border aspect-square">
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">Image {item}</span>
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="secondary">Modifier</Button>
                                <Button size="sm" variant="destructive">Supprimer</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="mt-4">Ajouter de nouvelles images</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Description des services</CardTitle>
                    <CardDescription>Détaillez les services que vous proposez</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Organisation complète d'événements</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Prise en charge de A à Z de votre événement, de la conception à la réalisation.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Modifier</Button>
                          <Button size="sm" variant="destructive">Supprimer</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Décoration événementielle</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Création d'ambiances sur mesure selon vos envies et le thème de votre événement.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Modifier</Button>
                          <Button size="sm" variant="destructive">Supprimer</Button>
                        </div>
                      </div>
                      
                      <Button className="mt-4">Ajouter un nouveau service</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="testimonials">
                <Card>
                  <CardHeader>
                    <CardTitle>Témoignages et certifications</CardTitle>
                    <CardDescription>Avis clients et reconnaissances professionnelles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Témoignages clients</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between mb-2">
                              <p className="font-medium">Sophie et Thomas</p>
                              <div>⭐⭐⭐⭐⭐</div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              "Organisation parfaite de notre mariage. Tout était comme nous l'avions rêvé !"
                            </p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Épingler</Button>
                              <Button size="sm" variant="destructive">Masquer</Button>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between mb-2">
                              <p className="font-medium">Entreprise XYZ</p>
                              <div>⭐⭐⭐⭐⭐</div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              "Un gala d'entreprise mémorable, organisation au top et réactivité exemplaire."
                            </p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Épingler</Button>
                              <Button size="sm" variant="destructive">Masquer</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Certifications</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <p className="font-medium">Certification Wedding Planner</p>
                            <p className="text-sm text-muted-foreground">Délivrée par l'Association des Wedding Planners de France - 2022</p>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <p className="font-medium">Certificat d'Excellence</p>
                            <p className="text-sm text-muted-foreground">Fédération des Organisateurs d'Événements - 2023</p>
                          </div>
                          
                          <Button className="mt-2">Ajouter une certification</Button>
                        </div>
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
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link to="/providers/preview">Prévisualiser mon profil public</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/provider/availability">Gérer mes disponibilités</Link>
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Mettre à jour mes tarifs
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statut du profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">Profil public et visible</p>
                  <Button variant="ghost" size="sm">Modifier</Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Dernière mise à jour : 15/05/2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderProfileManagement;
