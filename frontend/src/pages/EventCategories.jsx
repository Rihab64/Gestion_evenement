
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

// Catégories d'événements
const categories = [
  {
    id: "weddings",
    name: "Mariages",
    description: "Célébrez votre amour avec un mariage parfaitement orchestré",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
    providers: 124,
    subcategories: ["Traditionnel", "Champêtre", "Plage", "Destination", "Intime"],
    color: "from-pink-500 to-purple-500",
    icon: "💍"
  },
  {
    id: "corporate",
    name: "Événements d'entreprise",
    description: "Des séminaires aux lancements de produit professionnels",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000",
    providers: 89,
    subcategories: ["Conférences", "Séminaires", "Team Building", "Lancement de produit", "Gala d'entreprise"],
    color: "from-blue-500 to-cyan-500",
    icon: "💼"
  },
  {
    id: "birthdays",
    name: "Anniversaires",
    description: "Créez des souvenirs inoubliables pour tout âge",
    image: "https://images.unsplash.com/photo-1627975896122-ce8a0d002d97?q=80&w=1000",
    providers: 78,
    subcategories: ["Enfants", "Ados", "Adultes", "Thématique", "Surprise"],
    color: "from-orange-500 to-amber-500",
    icon: "🎂"
  },
  {
    id: "social",
    name: "Événements sociaux",
    description: "Des soirées aux galas et événements mondains",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000",
    providers: 67,
    subcategories: ["Cocktail", "Gala", "Soirée dansante", "Réunion", "Garden party"],
    color: "from-violet-500 to-purple-600",
    icon: "🥂"
  },
  {
    id: "concerts",
    name: "Concerts & Festivals",
    description: "Organisez des événements musicaux mémorables",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000", 
    providers: 45,
    subcategories: ["Concert privé", "Festival", "Showcase", "DJ Set", "Live band"],
    color: "from-indigo-500 to-blue-600",
    icon: "🎵"
  },
  {
    id: "private",
    name: "Événements privés",
    description: "Des moments intimes pour toute occasion spéciale",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000",
    providers: 92,
    subcategories: ["Dîner", "Anniversaire de mariage", "Fiançailles", "Baby shower", "Brunch"],
    color: "from-emerald-500 to-green-500",
    icon: "🏡"
  },
  {
    id: "graduations",
    name: "Cérémonies de remise de diplômes",
    description: "Célébrez les accomplissements académiques",
    image: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?q=80&w=1000",
    providers: 34,
    subcategories: ["Universitaire", "Scolaire", "Formation professionnelle", "International"],
    color: "from-red-500 to-orange-500", 
    icon: "🎓"
  },
  {
    id: "religious",
    name: "Cérémonies religieuses",
    description: "Des événements respectueux des traditions et croyances",
    image: "https://images.unsplash.com/photo-1547003217-e69da0ca5d7c?q=80&w=1000",
    providers: 41,
    subcategories: ["Baptême", "Bar/Bat Mitzvah", "Communion", "Cérémonie spirituelle"],
    color: "from-amber-500 to-yellow-500",
    icon: "✨"
  }
];

const EventCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [activeTab, setActiveTab] = useState('all');
  const [visibleItems, setVisibleItems] = useState({});
  
  const observerRef = React.useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.category-card');
    elements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredCategories]);

  useEffect(() => {
    let result = categories;

    if (activeTab !== 'all') {
      const tabCategories = {
        'weddings': ['weddings'],
        'corporate': ['corporate'],
        'celebrations': ['birthdays', 'social'],
        'other': ['concerts', 'private', 'graduations', 'religious']
      };
      
      result = categories.filter(category => 
        tabCategories[activeTab]?.includes(category.id)
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        category => 
          category.name.toLowerCase().includes(term) || 
          category.description.toLowerCase().includes(term) ||
          category.subcategories.some(sub => sub.toLowerCase().includes(term))
      );
    }

    setFilteredCategories(result);
  }, [searchTerm, activeTab]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 pt-32 pb-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Explorez nos catégories d'événements
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Découvrez toutes les possibilités pour créer l'événement parfait, quelles que soient vos envies et votre budget.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Rechercher une catégorie d'événement..."
                className="pl-10 py-6 text-base rounded-full bg-white/20 border-white/30 placeholder-white/60 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList className="bg-secondary">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="weddings">Mariages</TabsTrigger>
                <TabsTrigger value="corporate">Entreprise</TabsTrigger>
                <TabsTrigger value="celebrations">Célébrations</TabsTrigger>
                <TabsTrigger value="other">Autres</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium mb-3">Aucune catégorie trouvée</h3>
              <p className="text-muted-foreground mb-6">
                Essayez d'ajuster votre recherche ou explorez d'autres termes.
              </p>
              <Button onClick={() => setSearchTerm('')}>Afficher toutes les catégories</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div 
                  key={category.id}
                  data-id={category.id}
                  className={`category-card group relative overflow-hidden rounded-xl transition-all duration-700 ${
                    visibleItems[category.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{transitionDelay: `${index * 100}ms`}}
                >
                  <Link to={`/event-categories/${category.id}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
                      
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-2xl z-20">
                        {category.icon}
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5 z-20">
                        <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-white/30 text-white hover:bg-white/40">
                            {category.providers} prestataires
                          </Badge>
                          <span className="text-white/80 text-sm">Découvrir</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subcategories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Explorez par style d'événement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez des options plus spécifiques pour votre événement idéal.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.flatMap(category => 
              category.subcategories.map(subcat => (
                <Button 
                  key={`${category.id}-${subcat}`}
                  variant="outline" 
                  className="m-1 rounded-full"
                  asChild
                >
                  <Link to={`/event-categories/${category.id}?subcategory=${subcat}`}>
                    {subcat}
                  </Link>
                </Button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Partners & Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Ils nous font confiance
            </h2>
            <p className="text-muted-foreground">
              Des centaines de professionnels de l'événementiel partenaires
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="flex justify-center">
                <div className="h-12 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Prêt à créer votre événement ?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Rejoignez EventHub et commencez à planifier l'événement de vos rêves en toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/auth">Créer un compte gratuit</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/how-it-works">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EventCategories;
