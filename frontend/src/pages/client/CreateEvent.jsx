
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ArrowRight, ChevronsRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/sonner";

const steps = [
  { id: 1, name: "Type d'événement" },
  { id: 2, name: "Détails" },
  { id: 3, name: "Date et lieu" },
  { id: 4, name: "Budget" },
  { id: 5, name: "Récapitulatif" },
];

const eventCategories = [
  { id: 1, name: "Mariage", image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
  { id: 2, name: "Anniversaire", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
  { id: 3, name: "Séminaire d'entreprise", image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
  { id: 4, name: "Conférence", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
  { id: 5, name: "Gala", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
  { id: 6, name: "Autre", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: null,
    name: "",
    description: "",
    guestCount: 50,
    date: new Date(),
    location: "",
    address: "",
    budget: 5000,
  });

  const handleCategorySelect = (categoryId) => {
    setFormData({ ...formData, category: categoryId });
    nextStep();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleBudgetChange = (value) => {
    setFormData({ ...formData, budget: value[0] });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to the server
    console.log("Form submitted:", formData);
    toast.success("Votre événement a été créé avec succès !");
    
    // Navigate to the event detail page (this would be the newly created event's ID)
    navigate("/client/events/1");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quel type d'événement organisez-vous ?</h2>
            <p className="text-gray-600">Sélectionnez une catégorie pour commencer à planifier votre événement.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {eventCategories.map((category) => (
                <Card 
                  key={category.id}
                  className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div 
                    className="h-40 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Détails de votre événement</h2>
            <p className="text-gray-600">Donnez un nom à votre événement et ajoutez une description.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'événement</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Mariage de Sophie et Thomas"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Ajoutez des détails sur votre événement..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guestCount">Nombre d'invités estimé</Label>
                <Input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min="1"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>Retour</Button>
              <Button onClick={nextStep}>Continuer</Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Date et lieu</h2>
            <p className="text-gray-600">Choisissez la date et le lieu de votre événement.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Date de l'événement</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Lieu / Ville</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ex: Paris"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Adresse précise (optionnel)</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Adresse complète du lieu"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>Retour</Button>
              <Button onClick={nextStep}>Continuer</Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Budget estimé</h2>
            <p className="text-gray-600">Définissez une estimation de votre budget pour cet événement.</p>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Budget total</span>
                  <span className="font-bold">{formData.budget} €</span>
                </div>
                <Slider
                  defaultValue={[formData.budget]}
                  max={20000}
                  step={100}
                  onValueChange={handleBudgetChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1,000 €</span>
                  <span>10,000 €</span>
                  <span>20,000 €</span>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Besoin d'aide pour estimer votre budget ?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Notre outil d'estimation peut vous aider à répartir votre budget selon les différents aspects de votre événement.
                </p>
                <Button variant="outline">Utiliser l'outil d'estimation</Button>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>Retour</Button>
              <Button onClick={nextStep}>Continuer</Button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Récapitulatif</h2>
            <p className="text-gray-600">Vérifiez les détails de votre événement avant de confirmer.</p>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Type d'événement</h3>
                    <p>{eventCategories.find(cat => cat.id === formData.category)?.name || "Non spécifié"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                    <p>{formData.name || "Non spécifié"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                    <p>{formData.date ? format(formData.date, "PPP", { locale: fr }) : "Non spécifiée"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Lieu</h3>
                    <p>{formData.location || "Non spécifié"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nombre d'invités</h3>
                    <p>{formData.guestCount}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Budget estimé</h3>
                    <p>{formData.budget} €</p>
                  </div>
                  
                  {formData.description && (
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p>{formData.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>Retour</Button>
              <Button onClick={handleSubmit}>Créer mon événement</Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Créer un événement</h1>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all"
              ></div>
            </div>
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index === currentStep - 1 ? 'text-primary' : 
                    index < currentStep - 1 ? 'text-gray-500' : 'text-gray-300'
                  }`}
                >
                  <div className={`rounded-full h-6 w-6 flex items-center justify-center mb-1 ${
                    index === currentStep - 1 ? 'bg-primary text-white' : 
                    index < currentStep - 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
                  }`}>
                    {index < currentStep - 1 ? '✓' : index + 1}
                  </div>
                  <span className="text-xs hidden md:block">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Step content */}
        <div className="max-w-3xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;
