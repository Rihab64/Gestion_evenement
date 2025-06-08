
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Durand',
    role: 'Mariée',
    content: 'EventHub a rendu l\'organisation de notre mariage tellement plus simple. Nous avons trouvé des prestataires exceptionnels qui ont parfaitement compris notre vision.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    rating: 5,
  },
  {
    id: 2,
    name: 'Thomas Martin',
    role: 'Directeur Marketing',
    content: 'Lorsque nous avons eu besoin d\'organiser la conférence annuelle de notre entreprise, EventHub nous a mis en relation avec des professionnels qui ont dépassé nos attentes.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    rating: 4,
  },
  {
    id: 3,
    name: 'Émilie Laurent',
    role: 'Mère de famille',
    content: 'Organiser l\'anniversaire de ma fille a été un jeu d\'enfant grâce à EventHub. J\'ai trouvé tous les prestataires nécessaires en quelques clics.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ce que nos clients disent</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment EventHub aide à créer des événements mémorables pour nos clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-lg p-6 shadow-soft flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill={i < testimonial.rating ? "#F59E0B" : "#D1D5DB"}
                      className="mr-1"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <blockquote className="flex-grow">
                <p className="italic">{testimonial.content}</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
