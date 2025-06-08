
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

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
  },
  {
    id: 3,
    name: "Bella Musica",
    category: "Animation",
    rating: 4.9,
    reviews: 56,
    location: "Marseille",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop",
    specialties: ["DJ", "Orchestre", "Animations"],
    minPrice: 800,
  },
  {
    id: 4,
    name: "Fleurs & Passion",
    category: "Décoration",
    rating: 4.6,
    reviews: 72,
    location: "Bordeaux",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2940&auto=format&fit=crop",
    specialties: ["Compositions florales", "Décor thématique"],
    minPrice: 300,
  }
];

const Providers = () => {
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  
  const categories = ["Salles", "Traiteurs", "Animation", "Décoration", "Photos/Vidéos"];
  
  const filteredProviders = providersData
    .filter(provider => 
      provider.name.toLowerCase().includes(filter.toLowerCase()) && 
      (selectedCategory === "" || provider.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "price") return a.minPrice - b.minPrice;
      return 0;
    });

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-6">Découvrez nos prestataires</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Rechercher un prestataire..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "" ? "default" : "outline"}
              onClick={() => setSelectedCategory("")}
              className="whitespace-nowrap"
            >
              Tous
            </Button>
            
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="w-full md:w-48">
            <select 
              className="w-full h-10 px-3 border border-input rounded-md"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="rating">Meilleures notes</option>
              <option value="price">Prix croissant</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <Link to={`/providers/${provider.id}`} key={provider.id} className="no-underline">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${provider.image})` }}
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{provider.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{provider.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({provider.reviews})</span>
                    </div>
                  </div>
                  
                  <Badge className="mt-2">{provider.category}</Badge>
                  
                  <div className="mt-2 text-gray-500">
                    <p>{provider.location}</p>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {provider.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <p className="font-semibold">À partir de {provider.minPrice}€</p>
                    <Button size="sm">Voir profil</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Providers;
