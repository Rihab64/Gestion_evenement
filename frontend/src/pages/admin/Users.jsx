
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminUsers = () => {
  // Données simulées pour les utilisateurs
  const allUsers = [
    { 
      id: 1, 
      name: "Sophie Martin", 
      email: "sophie@example.com", 
      type: "client", 
      status: "active", 
      registrationDate: "10/01/2025",
      lastLogin: "21/05/2025",
      verificationStatus: true
    },
    { 
      id: 2, 
      name: "Studio Photo Elite", 
      email: "contact@studio-elite.com", 
      type: "provider", 
      status: "active", 
      registrationDate: "15/12/2024",
      lastLogin: "20/05/2025",
      verificationStatus: true
    },
    { 
      id: 3, 
      name: "Jean Dupont", 
      email: "jean@example.com", 
      type: "client", 
      status: "inactive", 
      registrationDate: "20/02/2025",
      lastLogin: "01/04/2025",
      verificationStatus: true
    },
    { 
      id: 4, 
      name: "Traiteur Délices", 
      email: "info@traiteur-delices.com", 
      type: "provider", 
      status: "pending", 
      registrationDate: "05/05/2025",
      lastLogin: "18/05/2025",
      verificationStatus: false
    },
    { 
      id: 5, 
      name: "Marie Lefèvre", 
      email: "marie@example.com", 
      type: "client", 
      status: "active", 
      registrationDate: "12/03/2025",
      lastLogin: "17/05/2025",
      verificationStatus: true
    },
    { 
      id: 6, 
      name: "Décoration Élégance", 
      email: "contact@decoration-elegance.com", 
      type: "provider", 
      status: "suspended", 
      registrationDate: "15/01/2025",
      lastLogin: "02/05/2025",
      verificationStatus: true
    },
    { 
      id: 7, 
      name: "Thomas Bernard", 
      email: "thomas@example.com", 
      type: "client", 
      status: "active", 
      registrationDate: "08/04/2025",
      lastLogin: "19/05/2025",
      verificationStatus: true
    },
    { 
      id: 8, 
      name: "Sono Event", 
      email: "contact@sono-event.com", 
      type: "provider", 
      status: "active", 
      registrationDate: "03/02/2025",
      lastLogin: "20/05/2025",
      verificationStatus: true
    }
  ];
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  // Filtrer les utilisateurs en fonction de l'onglet actif et du terme de recherche
  const filteredUsers = allUsers.filter(user => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "clients" && user.type === "client") ||
      (activeTab === "providers" && user.type === "provider") ||
      (activeTab === "pending" && user.status === "pending") ||
      (activeTab === "suspended" && user.status === "suspended");
    
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Gestion des sélections multiples
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };
  
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  // Obtenir le statut formaté pour l'affichage
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'active':
        return {
          label: "Actif",
          className: "bg-green-100 text-green-800 border-green-200"
        };
      case 'inactive':
        return {
          label: "Inactif",
          className: "bg-gray-100 text-gray-800 border-gray-200"
        };
      case 'pending':
        return {
          label: "En attente",
          className: "bg-amber-100 text-amber-800 border-amber-200"
        };
      case 'suspended':
        return {
          label: "Suspendu",
          className: "bg-red-100 text-red-800 border-red-200"
        };
      default:
        return {
          label: status,
          className: ""
        };
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Gestion des utilisateurs</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="providers">Prestataires</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="suspended">Suspendus</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>
              {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} trouvé{filteredUsers.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableHead>
                      <TableHead>Nom / Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
                      <TableHead className="hidden md:table-cell">Dernière connexion</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="hidden md:table-cell">Vérification</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.type === 'client' 
                              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                              : 'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}>
                            {user.type === 'client' ? 'Client' : 'Prestataire'}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.registrationDate}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusDisplay(user.status).className}`}>
                            {getStatusDisplay(user.status).label}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.type === 'provider' && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.verificationStatus 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-orange-100 text-orange-800 border border-orange-200'
                            }`}>
                              {user.verificationStatus ? 'Vérifié' : 'Non vérifié'}
                            </span>
                          )}
                          {user.type === 'client' && (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Voir</Button>
                            <Button variant="ghost" size="sm">
                              {user.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">Aucun utilisateur ne correspond à vos critères.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions de masse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedUsers.length} utilisateur{selectedUsers.length !== 1 ? 's' : ''} sélectionné{selectedUsers.length !== 1 ? 's' : ''}
                </p>
                <Button variant="outline" className="w-full" disabled={selectedUsers.length === 0}>
                  Envoyer un message
                </Button>
                <Button variant="outline" className="w-full" disabled={selectedUsers.length === 0}>
                  Modifier le statut
                </Button>
                <Button variant="destructive" className="w-full" disabled={selectedUsers.length === 0}>
                  Supprimer la sélection
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtres avancés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date d'inscription</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" placeholder="Du" />
                    <Input type="date" placeholder="Au" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Statut de vérification</label>
                  <select className="w-full h-9 rounded-md border border-input px-3 py-1 text-sm">
                    <option value="">Tous</option>
                    <option value="verified">Vérifiés uniquement</option>
                    <option value="unverified">Non vérifiés uniquement</option>
                  </select>
                </div>
                
                <Button className="w-full">Appliquer les filtres</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Clients</p>
                    <p className="text-2xl font-bold">
                      {allUsers.filter(user => user.type === 'client').length}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Prestataires</p>
                    <p className="text-2xl font-bold">
                      {allUsers.filter(user => user.type === 'provider').length}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Actifs aujourd'hui</p>
                    <p className="text-2xl font-bold">32</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-2xl font-bold">86%</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Rapport détaillé
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminUsers;
