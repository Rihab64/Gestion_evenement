
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-300 font-display">EventHub</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center text-foreground hover:text-purple-700 dark:hover:text-purple-300 transition-colors gap-1">
              Catégories d'Événements
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <Link to="/event-categories/weddings" className="block px-4 py-2 rounded-md hover:bg-secondary">Mariages</Link>
                <Link to="/event-categories/corporate" className="block px-4 py-2 rounded-md hover:bg-secondary">Événements d'entreprise</Link>
                <Link to="/event-categories/birthdays" className="block px-4 py-2 rounded-md hover:bg-secondary">Anniversaires</Link>
                <Link to="/event-categories/social" className="block px-4 py-2 rounded-md hover:bg-secondary">Événements sociaux</Link>
              </div>
            </div>
          </div>

          <Link to="/providers" className="text-foreground hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            Prestataires
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            Comment ça marche
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/auth">Connexion</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Inscription</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 pt-20 px-4 overflow-y-auto">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/event-categories"
              className="text-lg py-3 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Catégories d'Événements
            </Link>
            <Link 
              to="/providers" 
              className="text-lg py-3 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Prestataires
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-lg py-3 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/auth">Connexion</Link>
              </Button>
              <Button asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/auth">Inscription</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
