
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden video-overlay">
      {/* Video background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-sm z-[-1]"
      >
        <source src="https://res.cloudinary.com/dpjmxgeuj/video/upload/v1716328400/events-bg_vzqxvz.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
            Créez des événements <span className="text-purple-300">inoubliables</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Planifiez votre événement de rêve en toute simplicité. Nous connectons vos idées avec les meilleurs professionnels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="text-base">
              <Link to="/event-categories">Découvrir les catégories</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white text-base">
              <Link to="/how-it-works">Comment ça marche</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
