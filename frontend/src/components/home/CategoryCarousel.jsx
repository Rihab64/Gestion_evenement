
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'weddings',
    name: 'Mariages',
    description: 'Des moments parfaits pour célébrer l\'amour et l\'union',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    color: 'bg-event-wedding',
  },
  {
    id: 'corporate',
    name: 'Événements d\'entreprise',
    description: 'Des lancements de produits aux conférences professionnelles',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
    color: 'bg-event-corporate',
  },
  {
    id: 'birthdays',
    name: 'Anniversaires',
    description: 'Célébrations pour tous les âges, des enfants aux adultes',
    image: 'https://images.unsplash.com/photo-1627975896122-ce8a0d002d97?q=80&w=1000',
    color: 'bg-event-birthday',
  },
  {
    id: 'social',
    name: 'Événements sociaux',
    description: 'Soirées, galas et événements pour toutes occasions',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000',
    color: 'bg-event-social',
  },
];

const CategoryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = () => {
    setActiveIndex((current) => (current === categories.length - 1 ? 0 : current + 1));
  };
  
  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? categories.length - 1 : current - 1));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explorez nos catégories d'événements
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des mariages élégants aux événements d'entreprise professionnels, nous avons l'expertise pour tous types de célébrations.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-800 shadow-md h-12 w-12"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white dark:bg-gray-800 shadow-md h-12 w-12"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {categories.map((category) => (
                <div key={category.id} className="min-w-full px-4">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-soft flex flex-col md:flex-row h-[500px]">
                    <div className="md:w-1/2 relative">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-t" />
                      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">{category.name}</h3>
                      </div>
                    </div>
                    <div className={`md:w-1/2 p-6 md:p-8 flex flex-col justify-center ${category.color}`}>
                      <p className="text-lg mb-6">{category.description}</p>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          Prestataires vérifiés
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          Organisation simplifiée
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          Assistance personnalisée
                        </li>
                      </ul>
                      <div>
                        <Button asChild>
                          <Link to={`/event-categories/${category.id}`}>Explorer cette catégorie</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6">
            {categories.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full mx-1 ${index === activeIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
