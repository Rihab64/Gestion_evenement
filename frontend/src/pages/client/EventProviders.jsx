
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Heart, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Mock event data
const eventData = {
  id: 1,
  name: "Mariage Sophie & Thomas",
  date: "15 août 2023",
  category: "Mariage",
  services: [
    { id: 101, name: "Salle de réception", status: "confirmed" },
    { id: 201, name: "Menu de réception", status: "pending" },
    { id: 202, name: "Cocktail", status: "pending" },
    { id: 302, name: "Bouquet de mariée", status: "pending" },
  ]
};

// Mock provider data
const providersData = [
  {
    id: 1,
    name: "Espace Royal",
    category: "Salles",
    rating: 4.8,
    reviews: 124,
    location: "Paris",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop",
    specialties: ["Mariages", "Galas", "Conférences"],
    minPrice: 2500,
    matchScore: 95,
    isFavorite: true,
    services: [101]
  },
  {
    id: 2,
    name: "Traiteur Délices",
    category: "Traiteurs",
    rating: 4.7,
    reviews: 89,
    location: "Lyon",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2940&auto=format&fit=crop",
    specialties: ["Cuisine française", "Buffets", "Cocktails"],
    minPrice: 35,
    matchScore: 88,
    isFavorite: false,
    services: [201, 202]
  },
  {
    id: 3,
    name: "Fleurs & Passion",
    category: "Décoration",
    rating: 4.6,
    reviews: 72,
    location: "Paris",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2940&auto=format&fit=crop",
    specialties: ["Compositions florales", "Décor thématique"],
    minPrice: 300,
    matchScore: 76,
    isFavorite: false,
    services: [302]
  },
  {
    id: 4,
    name: "Paris Prestige Catering",
    category: "Traiteurs",
    rating: 4.9,
    reviews: 156,
    location: "Paris",
    image: "https://images.unsplash.com/photo-1556710986-4a70434a76c0?q=80&w=2940&auto=format&fit=crop",
    specialties: ["Gastronomie française", "Cuisine internationale", "Pâtisseries"],
    minPrice: 55,
    matchScore: 92,
    isFavorite: false,
    services: [201, 202]
  },
  {
    id: 5,
    name: "Décor Élégance",
    category: "Décoration",
    rating: 4.5,
    reviews: 64,
    location: "Paris",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2940&auto=format&fit=crop",
    specialties: ["Décorations florales", "Mise en place", "Mobilier événementiel"],
    minPrice: 250,
    matchScore: 84,
    isFavorite: true,
    services: [302]
  }
];

// Group providers by service
const groupedProviders = eventData.services.map(service => {
  const providers = providersData.filter(provider => 
    provider.services.includes(service.id)
  );
  
  return {
    service,
    providers
  };
});

const EventProviders = () => {
  const { eventId } = useParams();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [providers, setProviders] = useState(providersData);
  const [compareList, setCompareList] = useState([]);
  
  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(search.toLowerCase()) || 
    provider.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleToggleFavorite = (providerId) => {
    setProviders(providers.map(provider => 
      provider.id === providerId
        ? { ...provider, isFavorite: !provider.isFavorite }
        : provider
    ));
    
    const provider = providers.find(p => p.id === providerId);
    if (!provider.isFavorite) {
      toast.success(`${provider.name} ajouté à vos favoris`);
    }
  };
  
  const handleToggleCompare = (provider) => {
    if (compareList.some(p => p.id === provider.id)) {
      setCompareList(compareList.filter(p => p.id !== provider.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, provider]);
      } else {
        toast.error("Vous ne pouvez comparer que 3 prestataires à la fois");
      }
    }
  };
  
  const hasComparison = compareList.length > 0;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link to={`/client/events/${eventId}/services`}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Retour aux services
            </Link>
          </Button>
          
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-3xl font-bold">
              Trouver des prestataires
              <span className="text-lg font-normal ml-2 text-gray-600">
                pour {eventData.name}
              </span>
            </h1>
            
            <Link to={`/client/favorites`} className="text-primary hover:underline flex items-center mt-2 md:mt-0">
              <Heart className="mr-1 h-4 w-4" />
              Voir mes favoris
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tous les prestataires</TabsTrigger>
              {eventData.services.map(service => (
                <TabsTrigger key={service.id} value={`service-${service.id}`}>
                  {service.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtres</h2>
                  <Filter className="h-4 w-4" />
                </div>
                
                <div className="mb-4">
                  <Input
                    placeholder="Rechercher un prestataire..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Catégorie</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(providers.map(p => p.category))).map(category => (
                      <div key={category} className="flex items-center">
                        <input type="checkbox" id={`cat-${category}`} className="mr-2" />
                        <label htmlFor={`cat-${category}`}>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Évaluation minimum</h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button key={rating} variant="ghost" size="sm" className="p-1 h-auto">
                        <Star className={`h-5 w-5 ${rating <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </Button>
                    ))}
                    <span className="ml-2">4+</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Localisation</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(providers.map(p => p.location))).map(location => (
                      <div key={location} className="flex items-center">
                        <input type="checkbox" id={`loc-${location}`} className="mr-2" />
                        <label htmlFor={`loc-${location}`}>{location}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button variant="outline" className="w-full">
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content - Provider list */}
          <div className="lg:col-span-4">
            {/* Compare panel (shows when providers are selected for comparison) */}
            {hasComparison && (
              <Card className="mb-6 border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Comparer {compareList.length} prestataires</h3>
                      <p className="text-sm text-gray-600">Sélectionnez jusqu'à 3 prestataires</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setCompareList([])}>
                        Annuler
                      </Button>
                      <Button size="sm" disabled={compareList.length < 2}>
                        Comparer
                      </Button>
                    </div>
                  </div>
                  <div className="flex mt-2 gap-2">
                    {compareList.map(provider => (
                      <Badge key={provider.id} variant="secondary" className="flex gap-1 items-center">
                        {provider.name}
                        <button 
                          onClick={() => handleToggleCompare(provider)}
                          className="rounded-full hover:bg-gray-200 p-0.5"
                        >
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "all" ? (
              // Show all providers
              filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProviders.map(provider => (
                    <Card key={provider.id} className="overflow-hidden h-full">
                      <div className="flex h-full">
                        <div 
                          className="w-1/3 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${provider.image})` }}
                        />
                        <CardContent className="p-4 w-2/3">
                          <div className="flex justify-between">
                            <Link to={`/providers/${provider.id}`} className="font-semibold text-lg hover:text-primary">
                              {provider.name}
                            </Link>
                            <button 
                              onClick={() => handleToggleFavorite(provider.id)}
                              className="text-gray-400 hover:text-primary"
                            >
                              <Heart className={`h-5 w-5 ${provider.isFavorite ? 'fill-primary text-primary' : ''}`} />
                            </button>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <Badge className="mr-2">{provider.category}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm">{provider.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({provider.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-1" />
                            {provider.location}
                          </div>
                          
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-primary/10 border-primary/30">
                              {provider.matchScore}% correspondance
                            </Badge>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {provider.specialties.slice(0, 2).map(specialty => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                            {provider.specialties.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{provider.specialties.length - 2}</Badge>
                            )}
                          </div>
                          
                          <div className="mt-3 flex justify-between items-end">
                            <p className="text-sm">
                              <span className="font-semibold">À partir de {provider.minPrice}€</span>
                              <span className="text-xs text-gray-500">/pers.</span>
                            </p>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleToggleCompare(provider)}
                                className={compareList.some(p => p.id === provider.id) ? "bg-primary/20" : ""}
                              >
                                Comparer
                              </Button>
                              <Button size="sm" asChild>
                                <Link to={`/providers/${provider.id}`}>
                                  Voir
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border rounded-lg">
                  <h3 className="text-lg font-medium">Aucun prestataire trouvé</h3>
                  <p className="text-gray-500">Essayez avec d'autres critères de recherche</p>
                </div>
              )
            ) : (
              // Show providers grouped by service
              <div className="space-y-8">
                {groupedProviders
                  .filter(group => `service-${group.service.id}` === activeTab || activeTab === "all")
                  .map(group => (
                    <div key={group.service.id}>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                          {group.service.name}
                          <Badge className="ml-2" variant={group.service.status === 'confirmed' ? 'default' : 'outline'}>
                            {group.service.status === 'confirmed' ? 'Confirmé' : 'À réserver'}
                          </Badge>
                        </h2>
                        <Button variant="outline" size="sm">
                          Voir tous
                        </Button>
                      </div>
                      
                      {group.providers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {group.providers
                            .filter(provider => 
                              provider.name.toLowerCase().includes(search.toLowerCase()) || 
                              provider.category.toLowerCase().includes(search.toLowerCase())
                            )
                            .map(provider => (
                              <Card key={provider.id} className="overflow-hidden h-full">
                                <div className="flex h-full">
                                  <div 
                                    className="w-1/3 bg-cover bg-center" 
                                    style={{ backgroundImage: `url(${provider.image})` }}
                                  />
                                  <CardContent className="p-4 w-2/3">
                                    <div className="flex justify-between">
                                      <Link to={`/providers/${provider.id}`} className="font-semibold text-lg hover:text-primary">
                                        {provider.name}
                                      </Link>
                                      <button 
                                        onClick={() => handleToggleFavorite(provider.id)}
                                        className="text-gray-400 hover:text-primary"
                                      >
                                        <Heart className={`h-5 w-5 ${provider.isFavorite ? 'fill-primary text-primary' : ''}`} />
                                      </button>
                                    </div>
                                    
                                    <div className="flex items-center mt-1">
                                      <Badge className="mr-2">{provider.category}</Badge>
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="ml-1 text-sm">{provider.rating}</span>
                                        <span className="text-xs text-gray-500 ml-1">({provider.reviews})</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center mt-2 text-sm text-gray-600">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {provider.location}
                                    </div>
                                    
                                    <div className="mt-2">
                                      <Badge variant="outline" className="bg-primary/10 border-primary/30">
                                        {provider.matchScore}% correspondance
                                      </Badge>
                                    </div>
                                    
                                    <div className="mt-3 flex flex-wrap gap-1">
                                      {provider.specialties.slice(0, 2).map(specialty => (
                                        <Badge key={specialty} variant="outline" className="text-xs">
                                          {specialty}
                                        </Badge>
                                      ))}
                                      {provider.specialties.length > 2 && (
                                        <Badge variant="outline" className="text-xs">+{provider.specialties.length - 2}</Badge>
                                      )}
                                    </div>
                                    
                                    <div className="mt-3 flex justify-between items-end">
                                      <p className="text-sm">
                                        <span className="font-semibold">À partir de {provider.minPrice}€</span>
                                        <span className="text-xs text-gray-500">/pers.</span>
                                      </p>
                                      <div className="flex gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleToggleCompare(provider)}
                                          className={compareList.some(p => p.id === provider.id) ? "bg-primary/20" : ""}
                                        >
                                          Comparer
                                        </Button>
                                        <Button size="sm" asChild>
                                          <Link to={`/providers/${provider.id}`}>
                                            Voir
                                          </Link>
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </div>
                              </Card>
                            ))
                          }
                        </div>
                      ) : (
                        <div className="text-center py-6 border rounded-lg">
                          <p className="text-gray-500">Aucun prestataire trouvé pour ce service</p>
                          <Button className="mt-2" asChild>
                            <Link to="/providers">Trouver un prestataire</Link>
                          </Button>
                        </div>
                      )}
                      
                      <Separator className="mt-8" />
                    </div>
                  ))
                }
                
                {groupedProviders.filter(group => 
                  `service-${group.service.id}` === activeTab || activeTab === "all"
                ).length === 0 && (
                  <div className="text-center py-10 border rounded-lg">
                    <h3 className="text-lg font-medium">Aucun prestataire pour ce service</h3>
                    <p className="text-gray-500">Essayez de rechercher dans une autre catégorie</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventProviders;
