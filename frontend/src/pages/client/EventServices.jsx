
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronRight, Search, Check, Clock, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Mock data for event details
const eventData = {
  id: 1,
  name: "Mariage Sophie & Thomas",
  date: "15 août 2023",
  category: "Mariage",
  guestCount: 120,
  budget: 20000,
  budgetBreakdown: {
    venue: 8000,
    catering: 6000,
    photography: 2000,
    music: 1500,
    decoration: 1500,
    other: 1000
  }
};

// Mock services categories with their services
const serviceCategories = [
  {
    id: 1,
    name: "Lieu",
    icon: "🏛️",
    description: "Trouvez le lieu parfait pour votre cérémonie et réception",
    services: [
      { id: 101, name: "Salle de réception", required: true, selected: true },
      { id: 102, name: "Lieu de cérémonie", required: false, selected: false },
      { id: 103, name: "Hébergement pour invités", required: false, selected: false }
    ],
    progress: 33
  },
  {
    id: 2,
    name: "Traiteur & Boissons",
    icon: "🍽️",
    description: "Nourriture, boissons et service",
    services: [
      { id: 201, name: "Menu de réception", required: true, selected: true },
      { id: 202, name: "Cocktail", required: false, selected: true },
      { id: 203, name: "Gâteau", required: true, selected: false },
      { id: 204, name: "Vin & Champagne", required: false, selected: false },
      { id: 205, name: "Bar à cocktails", required: false, selected: false }
    ],
    progress: 40
  },
  {
    id: 3,
    name: "Décoration & Fleurs",
    icon: "💐",
    description: "Mise en beauté de votre événement",
    services: [
      { id: 301, name: "Décorations de tables", required: false, selected: false },
      { id: 302, name: "Bouquet de mariée", required: true, selected: true },
      { id: 303, name: "Fleurs pour cérémonie", required: false, selected: false },
      { id: 304, name: "Décorations thématiques", required: false, selected: false }
    ],
    progress: 25
  },
  {
    id: 4,
    name: "Photos & Vidéos",
    icon: "📸",
    description: "Capturez les moments inoubliables",
    services: [
      { id: 401, name: "Photographe professionnel", required: true, selected: false },
      { id: 402, name: "Vidéaste", required: false, selected: false },
      { id: 403, name: "Photobooth", required: false, selected: false }
    ],
    progress: 0
  },
  {
    id: 5,
    name: "Musique & Animation",
    icon: "🎵",
    description: "Divertissement pour vos invités",
    services: [
      { id: 501, name: "DJ", required: true, selected: false },
      { id: 502, name: "Orchestre/Groupe", required: false, selected: false },
      { id: 503, name: "Animation pour enfants", required: false, selected: false },
      { id: 504, name: "Maître de cérémonie", required: false, selected: false }
    ],
    progress: 0
  },
  {
    id: 6,
    name: "Autres services",
    icon: "✨",
    description: "Services complémentaires pour votre événement",
    services: [
      { id: 601, name: "Invitation & Papeterie", required: false, selected: false },
      { id: 602, name: "Transport invités", required: false, selected: false },
      { id: 603, name: "Garde d'enfants", required: false, selected: false },
      { id: 604, name: "Coordinateur jour J", required: false, selected: false }
    ],
    progress: 0
  }
];

const EventServices = () => {
  const { eventId } = useParams();
  const [categories, setCategories] = useState(serviceCategories);
  const [search, setSearch] = useState("");
  
  const handleServiceToggle = (categoryId, serviceId) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        const updatedServices = category.services.map(service => {
          if (service.id === serviceId) {
            return { ...service, selected: !service.selected };
          }
          return service;
        });
        
        // Calculate new progress
        const selectedCount = updatedServices.filter(s => s.selected).length;
        const progress = Math.round((selectedCount / updatedServices.length) * 100);
        
        return {
          ...category,
          services: updatedServices,
          progress
        };
      }
      return category;
    }));
    
    // Show toast when service is added
    const category = categories.find(c => c.id === categoryId);
    const service = category.services.find(s => s.id === serviceId);
    
    if (!service.selected) {
      toast.success(`${service.name} ajouté à votre liste de services`);
    }
  };
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(search.toLowerCase()) ||
    category.services.some(service => 
      service.name.toLowerCase().includes(search.toLowerCase())
    )
  );
  
  const totalSelectedServices = categories.reduce(
    (acc, category) => acc + category.services.filter(service => service.selected).length, 
    0
  );
  
  const totalServices = categories.reduce(
    (acc, category) => acc + category.services.length, 
    0
  );
  
  const overallProgress = Math.round((totalSelectedServices / totalServices) * 100);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{eventData.name}</h1>
            <p className="text-gray-600">Services nécessaires pour votre événement</p>
          </div>
          
          <Button asChild className="mt-4 md:mt-0">
            <Link to={`/client/events/${eventId}/providers`}>
              Trouver des prestataires
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Event details and progress */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold mb-4">Détails de l'événement</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="font-medium">{eventData.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{eventData.date}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Nombre d'invités</p>
                    <p className="font-medium">{eventData.guestCount} personnes</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Budget total</p>
                    <p className="font-medium">{eventData.budget} €</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h2 className="text-lg font-semibold mb-2">Progression</h2>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Services sélectionnés</span>
                    <span>{totalSelectedServices}/{totalServices}</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/client/events/${eventId}`}>
                      Retour à l'événement
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold mb-2">Services essentiels</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Ces services sont recommandés pour votre type d'événement
                </p>
                
                <div className="space-y-3">
                  {categories
                    .flatMap(category => 
                      category.services
                        .filter(service => service.required)
                        .map(service => ({ ...service, category: category.name }))
                    )
                    .map(service => (
                      <div key={service.id} className="flex items-center">
                        {service.selected ? (
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                        )}
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-xs text-gray-500">{service.category}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content - Services selection */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un service..."
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            {/* Service categories */}
            <div className="space-y-6">
              {filteredCategories.map(category => (
                <Card key={category.id}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          {category.services.filter(s => s.selected).length}/{category.services.length}
                        </div>
                        <Progress value={category.progress} className="h-2 w-24" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {category.services
                        .filter(service => service.name.toLowerCase().includes(search.toLowerCase()))
                        .map(service => (
                          <div 
                            key={service.id}
                            className={`flex justify-between items-center p-3 border rounded-lg ${
                              service.selected ? 'bg-primary/5 border-primary/30' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <Checkbox 
                                id={`service-${service.id}`}
                                checked={service.selected}
                                onCheckedChange={() => handleServiceToggle(category.id, service.id)}
                              />
                              <label 
                                htmlFor={`service-${service.id}`}
                                className="ml-3 font-medium cursor-pointer"
                              >
                                {service.name}
                              </label>
                              {service.required && (
                                <Badge className="ml-2">Recommandé</Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost" 
                              size="sm"
                              asChild
                            >
                              <Link to={`/client/events/${eventId}/providers?service=${service.id}`}>
                                Trouver prestataires
                              </Link>
                            </Button>
                          </div>
                      ))}
                    </div>
                    
                    {search && category.services.filter(service => 
                      service.name.toLowerCase().includes(search.toLowerCase())
                    ).length === 0 && (
                      <p className="text-center py-3 text-gray-500">Aucun service trouvé</p>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-10">
                  <X className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium">Aucune catégorie trouvée</h3>
                  <p className="text-gray-500">Essayez avec d'autres termes de recherche</p>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <Button asChild className="w-full sm:w-auto">
                <Link to={`/client/events/${eventId}/providers`}>
                  Continuer - Trouver des prestataires
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventServices;
