
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Calendar, Clock, MapPin, Users, Heart } from 'lucide-react';

// Liste fictive de services par catégorie
const categoryData = {
  weddings: {
    title: "Mariages",
    description: "Créez le mariage de vos rêves avec nos prestataires vérifiés",
    hero: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920",
    color: "from-pink-500 to-purple-500",
    icon: "💍",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
      "https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=800",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=800",
    ],
    video: "https://res.cloudinary.com/dpjmxgeuj/video/upload/v1716328400/events-bg_vzqxvz.mp4",
    services: [
      { name: "Lieu de réception", icon: "🏰", count: 56 },
      { name: "Traiteur", icon: "🍽️", count: 42 },
      { name: "Photographie", icon: "📸", count: 38 },
      { name: "Animation musicale", icon: "🎵", count: 31 },
      { name: "Décoration florale", icon: "💐", count: 27 },
      { name: "Wedding planner", icon: "📋", count: 19 },
      { name: "Robe & Costume", icon: "👗", count: 16 },
      { name: "Transport", icon: "🚗", count: 14 },
    ],
    inspirations: [
      {
        title: "Mariage champêtre",
        description: "Un cadre naturel et romantique avec des touches rustiques",
        image: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?q=80&w=800",
        colors: ["#E6B980", "#D5E5C3", "#F4F1E8", "#967E76"]
      },
      {
        title: "Mariage élégant",
        description: "Une célébration sophistiquée avec des détails luxueux",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
        colors: ["#0A1128", "#001F54", "#E6E6E6", "#D4AF37"]
      },
      {
        title: "Mariage bohème",
        description: "Un style libre et naturel avec des éléments ethniques",
        image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800",
        colors: ["#CB997E", "#DDBEA9", "#A5A58D", "#704C27"]
      }
    ]
  },
  corporate: {
    title: "Événements d'entreprise",
    description: "Des événements professionnels qui laissent une impression durable",
    hero: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920",
    color: "from-blue-500 to-cyan-500",
    icon: "💼",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800"
    ],
    video: "https://res.cloudinary.com/dpjmxgeuj/video/upload/v1716328400/events-bg_vzqxvz.mp4",
    services: [
      { name: "Centre de conférence", icon: "🏢", count: 34 },
      { name: "Équipement audiovisuel", icon: "🎬", count: 29 },
      { name: "Traiteur d'entreprise", icon: "🍽️", count: 26 },
      { name: "Animation & Team Building", icon: "🤝", count: 22 },
      { name: "Service d'inscription", icon: "📝", count: 18 },
      { name: "Interprétation", icon: "🗣️", count: 12 },
      { name: "Marketing événementiel", icon: "📊", count: 10 },
      { name: "Transport VIP", icon: "🚙", count: 8 },
    ],
    inspirations: [
      {
        title: "Conférence moderne",
        description: "Un cadre professionnel avec une touche contemporaine",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800",
        colors: ["#2D3E50", "#3498DB", "#ECF0F1", "#2C3E50"]
      },
      {
        title: "Soirée d'entreprise",
        description: "Une ambiance festive et élégante pour célébrer vos accomplissements",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
        colors: ["#34495E", "#E74C3C", "#F1C40F", "#ECF0F1"]
      },
      {
        title: "Team Building extérieur",
        description: "Des activités stimulantes en plein air pour renforcer la cohésion",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800",
        colors: ["#27AE60", "#2ECC71", "#F1C40F", "#ECF0F1"]
      }
    ]
  },
  birthdays: {
    title: "Anniversaires",
    description: "Créez des souvenirs inoubliables pour tout âge",
    hero: "https://images.unsplash.com/photo-1627975896122-ce8a0d002d97?q=80&w=1920",
    color: "from-orange-500 to-amber-500",
    icon: "🎂",
    gallery: [
      "https://images.unsplash.com/photo-1627975896122-ce8a0d002d97?q=80&w=800",
      "https://images.unsplash.com/photo-1575417933526-520da957a373?q=80&w=800",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800",
      "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?q=80&w=800",
      "https://images.unsplash.com/photo-1520869309377-88c9274a27c2?q=80&w=800",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800"
    ],
    video: "https://res.cloudinary.com/dpjmxgeuj/video/upload/v1716328400/events-bg_vzqxvz.mp4",
    services: [
      { name: "Lieu de fête", icon: "🎪", count: 45 },
      { name: "Animation", icon: "🎮", count: 38 },
      { name: "Décoration", icon: "🎈", count: 32 },
      { name: "Gâteau & Pâtisserie", icon: "🎂", count: 26 },
      { name: "Photographe", icon: "📸", count: 21 },
      { name: "Magicien & Spectacle", icon: "🎩", count: 17 },
      { name: "DJ & Musique", icon: "🎧", count: 15 },
      { name: "Traiteur festif", icon: "🍔", count: 13 },
    ],
    inspirations: [
      {
        title: "Fête enfantine colorée",
        description: "Une explosion de couleurs et d'activités ludiques",
        image: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?q=80&w=800",
        colors: ["#FF4B91", "#FEA1BF", "#67EFC", "#B3FFAE"]
      },
      {
        title: "Anniversaire thématique",
        description: "Un univers immersif pour une fête inoubliable",
        image: "https://images.unsplash.com/photo-1575417933526-520da957a373?q=80&w=800",
        colors: ["#5B0888", "#713ABE", "#9D76C1", "#E5CFF7"]
      },
      {
        title: "Soirée élégante",
        description: "Une célébration raffinée pour les adultes",
        image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800",
        colors: ["#040D12", "#183D3D", "#5C8374", "#93B1A6"]
      }
    ]
  }
};

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    gallery: false,
    services: false,
    inspirations: false,
  });
  
  // References for intersection observer
  const sectionRefs = {
    hero: React.useRef(null),
    gallery: React.useRef(null),
    services: React.useRef(null),
    inspirations: React.useRef(null),
  };

  useEffect(() => {
    // Simulate fetching category data
    setTimeout(() => {
      setCategory(categoryData[categoryId] || categoryData.weddings);
      setLoading(false);
      setActiveImage(categoryData[categoryId]?.gallery[0] || categoryData.weddings.gallery[0]);
    }, 300);

    // Setup intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all section refs
    Object.keys(sectionRefs).forEach((key) => {
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
      }
    });

    return () => observer.disconnect();
  }, [categoryId]);

  const openModal = (image) => {
    setActiveImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={sectionRefs.hero}
        className="relative min-h-[60vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-70`}></div>
          <img 
            src={category.hero} 
            alt={category.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <div 
            className={`max-w-3xl transition-all duration-700 ${
              visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block text-4xl mb-4 bg-white/20 backdrop-blur-sm p-3 rounded-full">
              {category.icon}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white">
              {category.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              {category.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                <Link to="/auth">Créer mon événement</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/providers">Voir les prestataires</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        id="gallery" 
        ref={sectionRefs.gallery}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Galerie d'inspiration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez des exemples de {category.title.toLowerCase()} réalisés avec l'aide de nos prestataires.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
              visibleSections.gallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {category.gallery.map((image, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 hover:shadow-lg`}
                style={{transitionDelay: `${index * 100}ms`}}
                onClick={() => openModal(image)}
              >
                <div className="aspect-[4/3]">
                  <img 
                    src={image} 
                    alt={`${category.title} example ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white text-lg">Voir en grand</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to={`/providers?category=${categoryId}`}>
                Voir plus d'exemples
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                poster={category.gallery[0]}
                controls
              >
                <source src={category.video} type="video/mp4" />
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl font-medium mb-2">Découvrez l'ambiance de nos {category.title.toLowerCase()}</h3>
              <p className="text-muted-foreground">
                Une petite vidéo vaut mieux qu'un long discours pour imaginer votre événement idéal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        ref={sectionRefs.services}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Services essentiels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tous les services nécessaires pour réussir votre {category.title.toLowerCase().slice(0, -1)}.
            </p>
          </div>

          <div 
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-700 ${
              visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {category.services.map((service, index) => (
              <Link 
                key={index}
                to={`/providers?category=${categoryId}&service=${service.name}`}
                className="group"
              >
                <Card className="h-full hover:border-primary/50 transition-all duration-300 group-hover:shadow-md">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="font-medium mb-2">{service.name}</h3>
                    <Badge variant="secondary">{service.count} prestataires</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirations Section */}
      <section 
        id="inspirations" 
        ref={sectionRefs.inspirations}
        className="py-20 bg-secondary/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Inspirations et thèmes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les thèmes et les styles les plus populaires pour votre {category.title.toLowerCase().slice(0, -1)}.
            </p>
          </div>

          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              visibleSections.inspirations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {category.inspirations.map((inspiration, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={inspiration.image} 
                    alt={inspiration.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-2">{inspiration.title}</h3>
                  <p className="text-muted-foreground mb-4">{inspiration.description}</p>
                  <div className="flex gap-2 mb-4">
                    {inspiration.colors.map((color, colorIndex) => (
                      <div 
                        key={colorIndex} 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/providers?theme=${inspiration.title}&category=${categoryId}`}>
                      Explorer ce style
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Tips */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Conseils de planification
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nos conseils d'experts pour organiser un {category.title.toLowerCase().slice(0, -1)} parfait.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Calendar className="mr-2 text-primary h-5 w-5" />
                    Calendrier idéal
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-2 text-primary shrink-0 mt-1 h-5 w-5" />
                      <span>Réservez votre lieu 12 à 18 mois à l'avance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 text-primary shrink-0 mt-1 h-5 w-5" />
                      <span>Contactez les prestataires principaux 8 à 10 mois avant</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 text-primary shrink-0 mt-1 h-5 w-5" />
                      <span>Envoyez les invitations 2 à 3 mois à l'avance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Users className="mr-2 text-primary h-5 w-5" />
                    Collaboration efficace
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="mr-2 text-primary shrink-0 mt-1 h-5 w-5" />
                      <span>Établissez un document partagé avec tous vos prestataires</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 text-primary shrink-0 mt-1 h-5 w-5" />
                      <span>Organisez une visite commune du lieu avec les intervenants clés</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 text-primary shrink-0 mt-1 h-5 w-5" />
                      <span>Désignez un coordinateur pour le jour J</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Prêt à créer votre {category.title.toLowerCase().slice(0, -1)} de rêve ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nos prestataires vérifiés sont là pour concrétiser votre vision parfaite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-white/90 text-base">
                <Link to="/auth">Créer mon événement</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-base">
                <Link to="/providers">Explorer les prestataires</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <img 
              src={activeImage} 
              alt="Enlarged view" 
              className="w-full h-full object-contain"
            />
            <Button 
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/75 rounded-full"
              onClick={closeModal}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CategoryDetail;
