
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ChevronLeft, PlusCircle, Trash2, Copy, Download, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Mock event data
const eventData = {
  id: 1,
  name: "Mariage Sophie & Thomas",
  date: "15 août 2023",
  budget: 20000,
  spent: 12500
};

// Mock budget data
const initialBudgetCategories = [
  { 
    id: 1, 
    name: "Lieu", 
    allocation: 8000, 
    spent: 8000,
    color: "#8884d8",
    expenses: [
      { id: 101, name: "Espace Royal - Location salle de réception", amount: 8000, paid: true, date: "15 mai 2023" }
    ]
  },
  { 
    id: 2, 
    name: "Traiteur & Boissons", 
    allocation: 6000, 
    spent: 4500,
    color: "#82ca9d",
    expenses: [
      { id: 201, name: "Traiteur Délices - Menu dîner", amount: 4500, paid: true, date: "20 mai 2023" },
      { id: 202, name: "Gâteau de mariage", amount: 0, paid: false, date: "" }
    ]
  },
  { 
    id: 3, 
    name: "Décoration & Fleurs", 
    allocation: 2000, 
    spent: 0,
    color: "#ffc658",
    expenses: []
  },
  { 
    id: 4, 
    name: "Photos & Vidéos", 
    allocation: 2500, 
    spent: 0,
    color: "#ff8042",
    expenses: []
  },
  { 
    id: 5, 
    name: "Musique & Animation", 
    allocation: 1500, 
    spent: 0,
    color: "#0088fe",
    expenses: []
  }
];

const monthlySpendingData = [
  { name: "Jan", amount: 0 },
  { name: "Fév", amount: 0 },
  { name: "Mar", amount: 0 },
  { name: "Avr", amount: 0 },
  { name: "Mai", amount: 12500 },
  { name: "Juin", amount: 0 },
  { name: "Juil", amount: 0 },
  { name: "Août", amount: 0 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-semibold">{`${payload[0].payload.name}`}</p>
        <p className="text-primary">{`${payload[0].value} €`}</p>
      </div>
    );
  }

  return null;
};

const EventBudget = () => {
  const { eventId } = useParams();
  const [budgetCategories, setBudgetCategories] = useState(initialBudgetCategories);
  const [newExpense, setNewExpense] = useState({ category: "", name: "", amount: "", date: "" });
  const [showAddExpense, setShowAddExpense] = useState(false);
  
  const totalBudget = eventData.budget;
  const totalSpent = budgetCategories.reduce((acc, category) => acc + category.spent, 0);
  const totalAllocated = budgetCategories.reduce((acc, category) => acc + category.allocation, 0);
  const totalRemaining = totalBudget - totalSpent;
  const totalUnallocated = totalBudget - totalAllocated;
  
  const pieChartData = budgetCategories.map(category => ({
    name: category.name,
    value: category.allocation,
    color: category.color
  }));
  
  if (totalUnallocated > 0) {
    pieChartData.push({
      name: "Non alloué",
      value: totalUnallocated,
      color: "#e0e0e0"
    });
  }
  
  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.name || !newExpense.amount) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const selectedCategory = budgetCategories.find(cat => cat.id === parseInt(newExpense.category));
    if (!selectedCategory) return;
    
    const expenseAmount = parseFloat(newExpense.amount);
    
    const updatedCategories = budgetCategories.map(category => {
      if (category.id === parseInt(newExpense.category)) {
        const newExpenseObj = {
          id: Math.max(0, ...category.expenses.map(e => e.id)) + 1,
          name: newExpense.name,
          amount: expenseAmount,
          paid: true,
          date: newExpense.date || new Date().toLocaleDateString('fr-FR')
        };
        
        return {
          ...category,
          spent: category.spent + expenseAmount,
          expenses: [...category.expenses, newExpenseObj]
        };
      }
      return category;
    });
    
    setBudgetCategories(updatedCategories);
    setNewExpense({ category: "", name: "", amount: "", date: "" });
    setShowAddExpense(false);
    
    toast.success("Dépense ajoutée avec succès");
  };
  
  const handleDeleteExpense = (categoryId, expenseId) => {
    const updatedCategories = budgetCategories.map(category => {
      if (category.id === categoryId) {
        const expenseToRemove = category.expenses.find(e => e.id === expenseId);
        if (!expenseToRemove) return category;
        
        return {
          ...category,
          spent: category.spent - expenseToRemove.amount,
          expenses: category.expenses.filter(e => e.id !== expenseId)
        };
      }
      return category;
    });
    
    setBudgetCategories(updatedCategories);
    toast.success("Dépense supprimée avec succès");
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link to={`/client/events/${eventId}`}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Retour à l'événement
            </Link>
          </Button>
          
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-3xl font-bold">
              Budget
              <span className="text-lg font-normal ml-2 text-gray-600">
                {eventData.name}
              </span>
            </h1>
            
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
        
        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">Budget total</div>
              <div className="text-2xl font-bold">{totalBudget}€</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">Dépensé</div>
              <div className="text-2xl font-bold text-primary">
                {totalSpent}€
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({Math.round((totalSpent / totalBudget) * 100)}%)
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">Restant</div>
              <div className="text-2xl font-bold">
                {totalRemaining}€
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({Math.round((totalRemaining / totalBudget) * 100)}%)
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">Non alloué</div>
              <div className="text-2xl font-bold">
                {totalUnallocated}€
                <span className="text-sm font-normal text-gray-500 ml-1">
                  ({Math.round((totalUnallocated / totalBudget) * 100)}%)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Budget allocation */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Vue d'ensemble</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Progression des dépenses</span>
                    <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
                  </div>
                  <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
                </div>
                
                <Tabs defaultValue="categories" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="categories">Catégories</TabsTrigger>
                    <TabsTrigger value="expenses">Dépenses</TabsTrigger>
                    <TabsTrigger value="timeline">Chronologie</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="categories" className="mt-4">
                    <div className="space-y-4">
                      {budgetCategories.map(category => (
                        <div key={category.id}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: category.color }}
                              ></div>
                              <span>{category.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{category.spent}€</span>
                              <span className="text-gray-500"> / {category.allocation}€</span>
                            </div>
                          </div>
                          <Progress 
                            value={(category.spent / category.allocation) * 100} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter une catégorie
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="expenses" className="mt-4">
                    {showAddExpense ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Nouvelle dépense</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Catégorie</label>
                              <select 
                                className="w-full mt-1 p-2 border rounded-md"
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                              >
                                <option value="">Sélectionner une catégorie</option>
                                {budgetCategories.map(category => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Description</label>
                              <Input 
                                placeholder="Ex: Location salle de réception"
                                value={newExpense.name}
                                onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Montant (€)</label>
                              <Input 
                                type="number"
                                placeholder="Ex: 1500"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Date</label>
                              <Input 
                                type="date"
                                value={newExpense.date}
                                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-2 justify-end mt-6">
                            <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                              Annuler
                            </Button>
                            <Button onClick={handleAddExpense}>
                              Ajouter la dépense
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div>
                        <Button 
                          className="mb-4"
                          onClick={() => setShowAddExpense(true)}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Nouvelle dépense
                        </Button>
                        
                        {budgetCategories.map(category => (
                          <div key={category.id} className="mb-6">
                            <h3 className="font-medium mb-2">
                              {category.name}
                              <span className="text-gray-500 font-normal ml-2">
                                ({category.spent}€ / {category.allocation}€)
                              </span>
                            </h3>
                            
                            {category.expenses.length > 0 ? (
                              <div className="border rounded-md overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <tr>
                                      <th className="px-4 py-2 text-left">Description</th>
                                      <th className="px-4 py-2 text-right">Montant</th>
                                      <th className="px-4 py-2 text-center">Date</th>
                                      <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y">
                                    {category.expenses.map(expense => (
                                      <tr key={expense.id}>
                                        <td className="px-4 py-2">{expense.name}</td>
                                        <td className="px-4 py-2 text-right font-medium">{expense.amount}€</td>
                                        <td className="px-4 py-2 text-center text-gray-500">{expense.date}</td>
                                        <td className="px-4 py-2 text-center">
                                          <div className="flex justify-center space-x-2">
                                            <button className="text-gray-400 hover:text-gray-600">
                                              <Copy className="h-4 w-4" />
                                            </button>
                                            <button 
                                              className="text-gray-400 hover:text-red-600"
                                              onClick={() => handleDeleteExpense(category.id, expense.id)}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="text-center py-4 border rounded-md text-gray-500">
                                Aucune dépense enregistrée pour cette catégorie
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="mt-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlySpendingData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Évolution des dépenses par mois
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Charts & suggestions */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Répartition du budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={false}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="font-medium mb-2">Budget recommandé</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Lieu</span>
                      <span>35-40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Traiteur & Boissons</span>
                      <span>25-30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Décoration & Fleurs</span>
                      <span>10-15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Photos & Vidéos</span>
                      <span>10-12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Musique & Animation</span>
                      <span>5-10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Suggestions économies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                    <h3 className="font-medium">Hors saison</h3>
                    <p className="text-sm text-gray-600">
                      Économisez jusqu'à 30% sur la location de salle en choisissant une date hors saison.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                    <h3 className="font-medium">Options de menu</h3>
                    <p className="text-sm text-gray-600">
                      Optez pour un buffet au lieu d'un dîner assis pour réduire les coûts de 15-20%.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                    <h3 className="font-medium">Décorations DIY</h3>
                    <p className="text-sm text-gray-600">
                      Réalisez vous-même certaines décorations pour économiser sur ce poste de dépense.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Voir plus de conseils
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventBudget;
