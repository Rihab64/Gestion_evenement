
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import FaqSection from '@/components/home/FaqSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      
      <CategoryCarousel />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000" 
                alt="Processus simple" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Organisez votre événement en toute simplicité
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Notre plateforme rend l'organisation d'événements accessible à tous. Définissez vos besoins, trouvez les meilleurs prestataires et gérez tous les aspects de votre événement en un seul endroit.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Accès à des centaines de prestataires vérifiés et de qualité</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Outils de planification et de gestion de budget intégrés</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Communication directe et sécurisée avec les prestataires</span>
                </li>
              </ul>
              <Button asChild>
                <Link to="/how-it-works">Découvrir comment ça marche</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <StatsSection />
      
      <section className="py-20 bg-purple-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Prêt à créer votre événement de rêve ?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Rejoignez des milliers d'organisateurs qui font confiance à EventHub pour leurs événements importants.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/auth">Créer un compte</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/providers">Découvrir les prestataires</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FaqSection />
    </MainLayout>
  );
};

export default HomePage;
