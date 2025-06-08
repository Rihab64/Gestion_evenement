
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ProviderAvailability = () => {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h à 20h
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Génère un calendrier pour le mois en cours
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Obtenir le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
    let firstDay = date.getDay();
    if (firstDay === 0) firstDay = 7; // Ajuster pour commencer par Lundi (1) au lieu de Dimanche (0)
    
    // Ajouter les jours vides pour aligner avec le jour de la semaine
    for (let i = 1; i < firstDay; i++) {
      days.push(null);
    }
    
    // Ajouter les jours du mois
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
  // Statuts fictifs pour certains jours
  const dayStatus = {
    5: { status: "busy", events: 2 },
    12: { status: "partial", events: 1 },
    15: { status: "busy", events: 3 },
    20: { status: "partial", events: 1 },
    25: { status: "blocked", reason: "Vacances" }
  };
  
  const getStatusClass = (day) => {
    if (!day) return "";
    const dayNum = day.getDate();
    if (!dayStatus[dayNum]) return "";
    
    switch (dayStatus[dayNum].status) {
      case "busy":
        return "bg-red-100 text-red-800 border-red-200";
      case "partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "blocked":
        return "bg-gray-100 text-gray-500 border-gray-200 line-through";
      default:
        return "";
    }
  };
  
  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Gestion des disponibilités</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="calendar">Calendrier</TabsTrigger>
                <TabsTrigger value="recurring">Récurrences</TabsTrigger>
                <TabsTrigger value="sync">Synchronisation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendrier interactif</CardTitle>
                    <CardDescription>
                      Mai 2025 - Cliquez sur une date pour gérer sa disponibilité
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Jours de la semaine */}
                    <div className="grid grid-cols-7 mb-2">
                      {days.map(day => (
                        <div key={day} className="text-center font-medium text-sm py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Grille du calendrier */}
                    <div className="grid grid-cols-7 gap-1">
                      {daysInMonth.map((day, index) => (
                        <div
                          key={index}
                          onClick={() => handleDayClick(day)}
                          className={`
                            border rounded-md h-16 p-1 transition-all cursor-pointer hover:border-primary
                            ${day ? getStatusClass(day) : 'opacity-50 cursor-default'}
                            ${selectedDay && day && selectedDay.getDate() === day.getDate() ? 'ring-2 ring-primary' : ''}
                          `}
                        >
                          {day && (
                            <>
                              <div className="text-right text-sm font-medium">{day.getDate()}</div>
                              {dayStatus[day.getDate()] && dayStatus[day.getDate()].events && (
                                <div className="mt-1 text-xs">
                                  {dayStatus[day.getDate()].events} évén.
                                </div>
                              )}
                              {dayStatus[day.getDate()] && dayStatus[day.getDate()].reason && (
                                <div className="mt-1 text-xs truncate">
                                  {dayStatus[day.getDate()].reason}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-200"></div>
                        <span className="text-sm">Disponible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-200"></div>
                        <span className="text-sm">Partiellement disponible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-200"></div>
                        <span className="text-sm">Complet</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                        <span className="text-sm">Bloqué</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {selectedDay && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>
                        Disponibilités pour le {selectedDay.getDate().toString().padStart(2, '0')}/
                        {(selectedDay.getMonth() + 1).toString().padStart(2, '0')}/
                        {selectedDay.getFullYear()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Statut de la journée</Label>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            <Button variant={dayStatus[selectedDay.getDate()]?.status !== "busy" ? "outline" : "default"}>
                              Complet
                            </Button>
                            <Button variant={dayStatus[selectedDay.getDate()]?.status !== "partial" ? "outline" : "default"}>
                              Partiel
                            </Button>
                            <Button variant={dayStatus[selectedDay.getDate()]?.status !== "blocked" ? "outline" : "default"}>
                              Bloqué
                            </Button>
                            <Button variant={!dayStatus[selectedDay.getDate()] ? "default" : "outline"}>
                              Disponible
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Plages horaires disponibles</Label>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {hours.map(hour => (
                              <Button key={hour} variant="outline">
                                {hour}:00
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="note">Note (optionnelle)</Label>
                          <textarea
                            id="note"
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
                            placeholder="Ajouter une note pour cette journée..."
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline">Annuler</Button>
                          <Button>Enregistrer</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="recurring">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de récurrence</CardTitle>
                    <CardDescription>
                      Définissez des disponibilités récurrentes pour chaque semaine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Disponibilités hebdomadaires</h3>
                        
                        <div className="space-y-4">
                          {days.map((day, i) => (
                            <div key={day} className="flex items-center space-x-4 p-3 border rounded-md">
                              <div className="w-20">
                                <p className="font-medium">{day}</p>
                              </div>
                              <div className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" variant="outline">08:00 - 12:00</Button>
                                  <Button size="sm" variant="outline">13:00 - 18:00</Button>
                                  {(i === 5 || i === 6) && (
                                    <span className="text-sm text-muted-foreground self-center">Non disponible</span>
                                  )}
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Modifier
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Exceptions périodiques</h3>
                        
                        <div className="space-y-4">
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between">
                              <p className="font-medium">Week-ends d'été</p>
                              <Button variant="ghost" size="sm">Modifier</Button>
                            </div>
                            <p className="text-sm text-muted-foreground">Tous les week-ends de juin à septembre</p>
                            <p className="text-sm text-red-600 mt-1">Non disponible</p>
                          </div>
                        </div>
                        
                        <Button className="mt-4">Ajouter une exception</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sync">
                <Card>
                  <CardHeader>
                    <CardTitle>Synchronisation externe</CardTitle>
                    <CardDescription>
                      Connectez d'autres calendriers pour synchroniser vos disponibilités
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4 p-4 border rounded-md bg-green-50 border-green-200">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700">G</div>
                          <div className="flex-grow">
                            <p className="font-medium">Google Calendar</p>
                            <p className="text-sm text-muted-foreground">Synchronisé il y a 35 minutes</p>
                          </div>
                          <Button variant="ghost" size="sm">Déconnecter</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Connecter un autre calendrier</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                            <span>Microsoft Outlook</span>
                            <span className="text-xs text-muted-foreground mt-1">Connecter</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                            <span>Apple Calendar</span>
                            <span className="text-xs text-muted-foreground mt-1">Connecter</span>
                          </Button>
                          
                          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
                            <span>Autre</span>
                            <span className="text-xs text-muted-foreground mt-1">URL iCal</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sync-frequency">Fréquence de synchronisation</Label>
                        <select
                          id="sync-frequency"
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="15">Toutes les 15 minutes</option>
                          <option value="30">Toutes les 30 minutes</option>
                          <option value="60">Toutes les heures</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blocage de dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Période à bloquer</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="start-date" className="text-xs">Date de début</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="end-date" className="text-xs">Date de fin</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="block-reason">Raison (optionnelle)</Label>
                    <Input id="block-reason" placeholder="Ex: Vacances, Formation..." />
                  </div>
                  
                  <Button className="w-full">
                    Bloquer cette période
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Liens rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/bookings">Événements confirmés</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/provider/requests">Demandes en attente</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Périodes bloquées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Vacances d'été</p>
                        <p className="text-sm text-muted-foreground">03/08 - 17/08/2025</p>
                      </div>
                      <Button variant="ghost" size="sm">Supprimer</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Formation</p>
                        <p className="text-sm text-muted-foreground">24/06 - 26/06/2025</p>
                      </div>
                      <Button variant="ghost" size="sm">Supprimer</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderAvailability;
