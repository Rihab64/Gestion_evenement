
import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Importing framer-motion which we just added as a dependency
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Définissez votre événement",
    description: "Précisez le type d'événement, la date, le lieu et votre budget pour que nous puissions vous proposer des solutions personnalisées.",
    icon: "/images/step-1.svg",
    color: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-700 dark:text-purple-300"
  },
  {
    id: 2,
    title: "Découvrez des prestataires vérifiés",
    description: "Parcourez notre sélection de prestataires professionnels, filtrés selon vos besoins spécifiques et vérifiés par notre équipe.",
    icon: "/images/step-2.svg",
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-300"
  },
  {
    id: 3,
    title: "Comparez et choisissez",
    description: "Comparez les offres, consultez les avis clients et échangez directement avec les prestataires pour faire le meilleur choix.",
    icon: "/images/step-3.svg",
    color: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-300"
  },
  {
    id: 4,
    title: "Gérez tout en un seul endroit",
    description: "Suivez la planification de votre événement, communiquez avec vos prestataires et gardez le contrôle sur votre budget.",
    icon: "/images/step-4.svg",
    color: "bg-amber-100 dark:bg-amber-900/20",
    textColor: "text-amber-700 dark:text-amber-300"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Marie & Thomas",
    role: "Mariés en juin 2023",
    content: "EventHub a transformé notre expérience de planification de mariage. Nous avons trouvé tous nos prestataires en quelques jours !",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120",
    video: "https://res.cloudinary.com/example/video/upload/testimonial-wedding.mp4"
  },
  {
    id: 2,
    name: "Entreprise XYZ",
    role: "Séminaire d'équipe annuel",
    content: "La plateforme nous a permis d'organiser un événement d'entreprise exceptionnel avec un minimum de stress.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=120",
    video: "https://res.cloudinary.com/example/video/upload/testimonial-corporate.mp4"
  }
];

const HowItWorks = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    video: false,
    steps: false,
    process: false,
    ui: false,
    testimonials: false
  });

  const videoRef = useRef(null);
  const sectionsRef = {
    video: useRef(null),
    steps: useRef(null),
    process: useRef(null),
    ui: useRef(null),
    testimonials: useRef(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisibleSections((prev) => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, {
      threshold: 0.25
    });

    Object.keys(sectionsRef).forEach((key) => {
      if (sectionsRef[key].current) {
        observer.observe(sectionsRef[key].current);
      }
    });

    return () => {
      Object.keys(sectionsRef).forEach((key) => {
        if (sectionsRef[key].current) {
          observer.unobserve(sectionsRef[key].current);
        }
      });
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <MainLayout>
      <section
        id="video"
        ref={sectionsRef.video}
        className="min-h-[500px] lg:min-h-[600px] bg-gradient-to-b from-purple-900 to-purple-700 flex items-center py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.video ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Comment fonctionne EventHub ?
              </h1>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Découvrez comment notre plateforme simplifie l'organisation de vos événements, du concept à la célébration.
              </p>
            </div>

            <div className={`relative aspect-video bg-black/30 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ${visibleSections.video ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1080"
                muted={isMuted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source
                  src="https://res.cloudinary.com/dpjmxgeuj/video/upload/v1716328400/events-bg_vzqxvz.mp4"
                  type="video/mp4"
                />
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>

              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="steps"
        ref={sectionsRef.steps}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            En quelques étapes simples
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections.steps ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`${step.color} rounded-xl p-6`}>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 mr-3">
                      <span className={`text-lg font-bold ${step.textColor}`}>{step.id}</span>
                    </div>
                    <h3 className={`font-bold text-xl ${step.textColor}`}>{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/event-categories">
                Commencer maintenant
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        ref={sectionsRef.testimonials}
        className="py-20 bg-muted"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Témoignages de nos utilisateurs
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visibleSections.testimonials ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/auth">
                Créer un compte
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HowItWorks;
