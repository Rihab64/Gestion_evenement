
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ClientFavorites = () => {
  const favoriteProviders = [
    {
      id: 1,
      name: "Studio Photo Élégance",
      category: "Photographie",
      rating: 4.8,
      note: "Photos de mariage de qualité exceptionnelle",
    },
    {
      id: 2,
      name: "Traiteur Saveurs du Monde",
      category: "Traiteur",
      rating: 4.5,
      note: "Excellente variété de menus, bon rapport qualité-prix",
    },
    {
      id: 3,
      name: "Fleuriste Pétales Enchantées",
      category: "Décoration",
      rating: 4.7,
      note: "Arrangements floraux élégants, propose des options éco-responsables",
    }
  ];
  
  const categories = ["Tous", "Photographie", "Traiteur", "Décoration", "Animation", "Location"];
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Mes favoris</h1>
        
        <div className="mb-6">
          <Input placeholder="Rechercher dans vos favoris..." className="max-w-md" />
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList className="mb-4 flex overflow-x-auto pb-px">
            {categories.map(category => (
              <TabsTrigger key={category} value={category.toLowerCase()}>{category}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProviders.map(provider => (
                <Card key={provider.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{provider.name}</CardTitle>
                    <CardDescription>Catégorie: {provider.category} • Note: {provider.rating}/5</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="bg-muted/50 p-3 rounded-md mb-3">
                      <p className="text-sm italic">"{provider.note}"</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    <Button asChild variant="default" size="sm">
                      <Link to={`/providers/${provider.id}`}>Voir profil</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Supprimer
                    </Button>
                    <Button variant="secondary" size="sm">
                      Contacter
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {categories.slice(1).map(category => (
            <TabsContent key={category} value={category.toLowerCase()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProviders
                  .filter(p => p.category === category)
                  .map(provider => (
                    <Card key={provider.id} className="h-full flex flex-col">
                      <CardHeader>
                        <CardTitle>{provider.name}</CardTitle>
                        <CardDescription>Catégorie: {provider.category} • Note: {provider.rating}/5</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="bg-muted/50 p-3 rounded-md mb-3">
                          <p className="text-sm italic">"{provider.note}"</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-2">
                        <Button asChild variant="default" size="sm">
                          <Link to={`/providers/${provider.id}`}>Voir profil</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Supprimer
                        </Button>
                        <Button variant="secondary" size="sm">
                          Contacter
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Comparateur</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Comparez vos prestataires favoris pour faire le meilleur choix.
            </p>
            <Button>
              Comparer les prestataires sélectionnés
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientFavorites;
