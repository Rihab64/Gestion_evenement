
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Star, MapPin, Clock, Calendar as CalendarIcon, Award, MessageCircle } from "lucide-react";

// Mock data for a provider
const providerData = {
  id: 1,
  name: "Espace Royal",
  category: "Salles",
  rating: 4.8,
  reviews: 124,
  location: "Paris, France",
  description: "L'Espace Royal est un lieu d'exception pour vos événements les plus prestigieux. Situé au cœur de Paris, notre établissement offre un cadre élégant et raffiné pour tous types d'événements.",
  images: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2662&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2662&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2940&auto=format&fit=crop",
  ],
  specialties: ["Mariages", "Galas", "Conférences", "Séminaires d'entreprise"],
  certifications: ["Certification Qualité", "Éco-responsable", "Accessibilité PMR"],
  capacity: "10 à 500 personnes",
  minPrice: 2500,
  maxPrice: 15000,
  services: [
    { name: "Traiteur sur place", included: true },
    { name: "Décoration personnalisable", included: true },
    { name: "Sonorisation", included: true },
    { name: "Parking privé", included: true },
    { name: "Hébergement", included: false },
    { name: "Animation", included: false },
  ],
  faqs: [
    { 
      question: "Quelle est la capacité maximale de votre salle ?", 
      answer: "Notre salle principale peut accueillir jusqu'à 500 personnes en configuration cocktail et 350 personnes assises pour un dîner." 
    },
    { 
      question: "Proposez-vous des formules clés en main ?", 
      answer: "Oui, nous proposons plusieurs formules all-inclusive comprenant la location de salle, le traiteur, la décoration de base et le personnel de service." 
    },
    { 
      question: "Est-il possible de visiter les lieux avant de réserver ?", 
      answer: "Bien sûr, nous vous invitons à prendre rendez-vous pour une visite personnalisée de nos espaces." 
    },
  ],
  reviews: [
    {
      id: 1,
      author: "Sophie et Jean",
      date: "12/03/2023",
      rating: 5,
      content: "Un lieu magique pour notre mariage ! L'équipe a été exceptionnelle et nos invités étaient émerveillés par la beauté des lieux.",
      eventType: "Mariage"
    },
    {
      id: 2,
      author: "Entreprise XYZ",
      date: "05/02/2023",
      rating: 4,
      content: "Parfait pour notre séminaire annuel. Équipements impeccables et service attentionné.",
      eventType: "Séminaire d'entreprise"
    },
    {
      id: 3,
      author: "Association ABC",
      date: "18/11/2022",
      rating: 5,
      content: "Notre gala de charité a été un succès total grâce à l'Espace Royal. Cadre prestigieux et organisation sans faille.",
      eventType: "Gala"
    }
  ]
};

const ProviderProfile = () => {
  const { providerId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState(new Date());

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* Left column - Gallery and basic info */}
          <div className="w-full md:w-2/3">
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img 
                src={providerData.images[selectedImage]} 
                alt={providerData.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {providerData.images.slice(0, 6).map((img, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden h-20 ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h1 className="text-3xl font-bold">{providerData.name}</h1>
              
              <div className="flex items-center mt-2">
                <Badge>{providerData.category}</Badge>
                <div className="flex items-center ml-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-semibold">{providerData.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({providerData.reviews.length} avis)</span>
                </div>
                <div className="flex items-center ml-4 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {providerData.location}
                </div>
              </div>

              <p className="mt-4 text-gray-700">{providerData.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {providerData.specialties.map(specialty => (
                  <Badge key={specialty} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue="services" className="mt-8">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Services proposés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {providerData.services.map((service, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${service.included ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span>{service.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold">Capacité</h4>
                  <p>{providerData.capacity}</p>
                  
                  <h4 className="text-lg font-semibold mt-4">Tarifs</h4>
                  <p>À partir de {providerData.minPrice}€ jusqu'à {providerData.maxPrice}€</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Avis clients ({providerData.reviews.length})</h3>
                <div className="space-y-4">
                  {providerData.reviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-sm text-gray-500">{review.date} • {review.eventType}</p>
                          </div>
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Questions fréquentes</h3>
                <div className="space-y-4">
                  {providerData.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b pb-4">
                      <h4 className="font-semibold">{faq.question}</h4>
                      <p className="mt-1 text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="certifications" className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Certifications & Distinctions</h3>
                <div className="space-y-4">
                  {providerData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column - Contact and booking */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Réserver une visite</h3>
                
                <div className="mb-4">
                  <p className="font-medium mb-2">Sélectionnez une date</p>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                
                <div className="mb-6">
                  <p className="font-medium mb-2">Créneaux disponibles</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      10:00
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      11:30
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      14:00
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      15:30
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">Réserver ce créneau</Button>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contacter le prestataire
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Questions rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-left normal-case">
                    Est-ce que cette date est disponible ?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left normal-case">
                    Quels services sont inclus dans le tarif ?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left normal-case">
                    Pouvez-vous m'envoyer une documentation ?
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

export default ProviderProfile;
