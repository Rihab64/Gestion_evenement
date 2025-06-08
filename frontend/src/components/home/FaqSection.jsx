
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "Comment fonctionne EventHub ?",
    answer: "EventHub met en relation les personnes qui organisent des événements avec des prestataires professionnels vérifiés. Créez un compte, spécifiez votre événement, parcourez les prestataires qualifiés, et gérez tout, de la planification au paiement, sur une seule plateforme."
  },
  {
    question: "Comment sont sélectionnés les prestataires ?",
    answer: "Tous les prestataires sur EventHub passent par un processus de vérification rigoureux. Nous examinons leurs qualifications, leur expérience, leurs assurances et leurs références. Seuls ceux qui répondent à nos critères élevés sont acceptés sur la plateforme."
  },
  {
    question: "Quels types d'événements puis-je organiser ?",
    answer: "EventHub couvre une large gamme d'événements : mariages, anniversaires, événements d'entreprise, conférences, séminaires, fêtes thématiques, et bien plus encore. Quelle que soit l'occasion, notre plateforme vous aide à la rendre spéciale."
  },
  {
    question: "Y a-t-il des frais pour utiliser la plateforme ?",
    answer: "La création de compte et la recherche de prestataires sont gratuites. EventHub facture une petite commission sur les réservations confirmées, ce qui nous permet d'offrir notre service de haute qualité et de vérifier les prestataires."
  },
  {
    question: "Comment puis-je devenir prestataire sur EventHub ?",
    answer: "Pour devenir prestataire, créez un compte professionnel, complétez votre profil avec vos services et tarifs, téléchargez des exemples de votre travail et vos certifications. Notre équipe examinera votre candidature et vous contactera pour finaliser le processus."
  },
  {
    question: "Que faire si j'ai un problème avec un prestataire ?",
    answer: "Notre équipe de support client est disponible pour résoudre tout problème que vous pourriez rencontrer. Nous agissons comme intermédiaire entre vous et le prestataire pour garantir une résolution équitable et satisfaisante pour toutes les parties."
  },
];

const FaqSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Questions fréquentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur notre plateforme d'organisation d'événements.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
