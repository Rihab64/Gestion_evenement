import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Check, AlertCircle, Lock } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Service d'authentification réel avec l'API Laravel
const API_URL = "http://localhost:8000/api"; // adapte si besoin

const authService = {
  login: (email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password })
      .then(res => res.data)
      .catch(err => {
        throw new Error(err.response?.data?.message || "Erreur de connexion");
      });
  },
  register: (userData) => {
    // Adapte les champs selon ton backend Laravel
    return axios.post(`${API_URL}/auth/register`, {
  name: `${userData.firstName} ${userData.lastName}`,
  email: userData.email,
  password: userData.password,
  password_confirmation: userData.confirmPassword,
  user_type: userData.accountType, // <-- doit s'appeler user_type
  //phone: userData.phone || '',     // si tu as un champ téléphone
  first_name: userData.firstName,  // pour client
  last_name: userData.lastName,    // pour client
  company_name: userData.companyName,    // pour provider
  business_type: userData.businessType,  // pour provider
})
      .then(res => res.data)
      .catch(err => {
        throw new Error(err.response?.data?.message || "Erreur d'inscription");
      });
  }
};

const socialIcons = {
  google: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2"/>
    </svg>
  ),
  apple: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.78 1.51.15 2.65.81 3.38 2.05-3.03 1.86-2.15 5.94.41 7.24-.62 1.81-1.42 3.58-2.44 4.66zM12.03 7.25c-.15-2.23 1.66-4.23 3.74-4.76.18 2.4-1.88 4.49-3.74 4.76z"/>
    </svg>
  )
};


const PasswordStrengthMeter = ({ password }) => {
  const getStrength = () => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains number
    if (/\d/.test(password)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  const strength = getStrength();
  const percentage = (strength / 5) * 100;
  
  let barColor = "bg-red-500";
  let strengthText = "Très faible";
  
  if (strength >= 4) {
    barColor = "bg-green-500";
    strengthText = "Fort";
  } else if (strength >= 3) {
    barColor = "bg-yellow-500";
    strengthText = "Moyen";
  } else if (strength >= 2) {
    barColor = "bg-orange-500";
    strengthText = "Faible";
  }
  
  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {password && (
        <p className={`text-xs mt-1 ${password ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          Force du mot de passe: <span className="font-medium">{strengthText}</span>
        </p>
      )}
    </div>
  );
};

const Auth = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'client',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerErrors, setRegisterErrors] = useState({});
  const [activeTab, setActiveTab] = useState('login');

  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formRef = useRef(null);
  
  useEffect(() => {
    document.title = "EventHub - Connexion ou Inscription";
    
    // Reset form height on tab change
    if (formRef.current) {
      formRef.current.style.height = 'auto';
    }
  }, [activeTab]);
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoginLoading(true);
    
    try {
      const response = await authService.login(loginData.email, loginData.password);
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur EventHub! Vous êtes maintenant connecté.",
        variant: "default"
      });
      
      // Rediriger selon le type de compte
      if (response.user.role === 'provider') {
        navigate('/provider/dashboard');
      } else {
        navigate('/client/dashboard');
      }
      
    } catch (error) {
      setLoginError(error.message);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoginLoading(false);
    }
  };
  
  const validateRegisterData = () => {
    const errors = {};
    if (!registerData.firstName.trim()) errors.firstName = "Prénom requis";
    if (!registerData.lastName.trim()) errors.lastName = "Nom requis";
    
    if (!registerData.email.trim()) {
      errors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = "Format d'email invalide";
    }
    
    if (!registerData.password) {
      errors.password = "Mot de passe requis";
    } else if (registerData.password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    if (!registerData.acceptTerms) {
      errors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
    }
    
    return errors;
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateRegisterData();
    setRegisterErrors(errors);
    
    if (Object.keys(errors).length > 0) return;
    
    setIsRegisterLoading(true);
    
    try {
      await authService.register(registerData);
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès! Vous pouvez maintenant vous connecter.",
        variant: "default"
      });
      
      setActiveTab('login');
      setLoginData({ ...loginData, email: registerData.email });
      
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive"
      });
    } finally {
      setIsRegisterLoading(false);
    }
  };
  
  const handleSocialLogin = (provider) => {
    toast({
      title: `Connexion avec ${provider}`,
      description: `La connexion avec ${provider} n'est pas encore disponible.`,
      variant: "default"
    });
  };

  return (
    <MainLayout>
      <section className="py-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
            {/* Left column - Content */}
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center lg:text-left">
                  Rejoignez <span className="text-purple-600 dark:text-purple-400">EventHub</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-center lg:text-left">
                  Créez des événements inoubliables en collaborant avec les meilleurs prestataires.
                </p>
                
                <div className="hidden lg:block space-y-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4 mt-1">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Planification simplifiée</h3>
                      <p className="text-muted-foreground">
                        Organisez votre événement étape par étape avec notre interface intuitive.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4 mt-1">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Prestataires vérifiés</h3>
                      <p className="text-muted-foreground">
                        Collaborez avec des professionnels soigneusement sélectionnés et évalués.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4 mt-1">
                      <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Gestion complète</h3>
                      <p className="text-muted-foreground">
                        Suivi des budgets, des échéances et des communications en un seul endroit.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right column - Authentication form */}
            <div className="lg:w-1/2 w-full max-w-md mx-auto">
              <Card className="border-primary/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center">
                    {activeTab === 'login' ? 'Connexion' : 'Créer un compte'}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {activeTab === 'login' 
                      ? "Accédez à votre espace personnel"
                      : "Rejoignez EventHub en quelques étapes simples"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs 
                    defaultValue="login" 
                    value={activeTab} 
                    onValueChange={setActiveTab} 
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="login">Connexion</TabsTrigger>
                      <TabsTrigger value="register">Inscription</TabsTrigger>
                    </TabsList>
                    
                    <div ref={formRef}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <TabsContent value="login" className="space-y-4">
                            {loginError && (
                              <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{loginError}</AlertDescription>
                              </Alert>
                            )}
                            
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                  id="email" 
                                  type="email" 
                                  placeholder="votre@email.com"
                                  value={loginData.email}
                                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="password">Mot de passe</Label>
                                  <a href="#" className="text-xs text-primary hover:underline">
                                    Mot de passe oublié ?
                                  </a>
                                </div>
                                <div className="relative">
                                  <Input 
                                    id="password" 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="••••••••"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                    required
                                  />
                                  <button 
                                    type="button" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <label
                                  htmlFor="remember"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Se souvenir de moi
                                </label>
                              </div>
                              
                              <Button type="submit" className="w-full" disabled={isLoginLoading}>
                                {isLoginLoading ? "Connexion en cours..." : "Se connecter"}
                              </Button>
                            </form>
                            
                            <div className="relative my-6">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">ou continuer avec</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3">
                              <Button variant="outline" type="button" onClick={() => handleSocialLogin('Google')}>
                                {socialIcons.google}
                                Google
                              </Button>
                              <Button variant="outline" type="button" onClick={() => handleSocialLogin('Facebook')}>
                                {socialIcons.facebook}
                                Facebook
                              </Button>
                              <Button variant="outline" type="button" onClick={() => handleSocialLogin('Apple')}>
                                {socialIcons.apple}
                                Apple
                              </Button>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="register" className="space-y-4">
                            <form onSubmit={handleRegisterSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="firstName">
                                    Prénom {registerErrors.firstName && <span className="text-red-500">*</span>}
                                  </Label>
                                  <Input 
                                    id="firstName" 
                                    placeholder="Jean"
                                    value={registerData.firstName}
                                    onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                                    className={registerErrors.firstName ? "border-red-500" : ""}
                                  />
                                  {registerErrors.firstName && (
                                    <p className="text-xs text-red-500">{registerErrors.firstName}</p>
                                  )}
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="lastName">
                                    Nom {registerErrors.lastName && <span className="text-red-500">*</span>}
                                  </Label>
                                  <Input 
                                    id="lastName" 
                                    placeholder="Dupont"
                                    value={registerData.lastName}
                                    onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                                    className={registerErrors.lastName ? "border-red-500" : ""}
                                  />
                                  {registerErrors.lastName && (
                                    <p className="text-xs text-red-500">{registerErrors.lastName}</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="email-register">
                                  Email {registerErrors.email && <span className="text-red-500">*</span>}
                                </Label>
                                <Input 
                                  id="email-register" 
                                  type="email" 
                                  placeholder="votre@email.com"
                                  value={registerData.email}
                                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                  className={registerErrors.email ? "border-red-500" : ""}
                                />
                                {registerErrors.email && (
                                  <p className="text-xs text-red-500">{registerErrors.email}</p>
                                )}
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="password-register">
                                  Mot de passe {registerErrors.password && <span className="text-red-500">*</span>}
                                </Label>
                                <div className="relative">
                                  <Input 
                                    id="password-register" 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="8 caractères minimum"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                    className={registerErrors.password ? "border-red-500" : ""}
                                  />
                                  <button 
                                    type="button" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                                
                                <PasswordStrengthMeter password={registerData.password} />
                                
                                {registerErrors.password && (
                                  <p className="text-xs text-red-500">{registerErrors.password}</p>
                                )}
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="confirm-password">
                                  Confirmer le mot de passe {registerErrors.confirmPassword && <span className="text-red-500">*</span>}
                                </Label>
                                <div className="relative">
                                  <Input 
                                    id="confirm-password" 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    placeholder="Confirmer le mot de passe"
                                    value={registerData.confirmPassword}
                                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                                    className={registerErrors.confirmPassword ? "border-red-500" : ""}
                                  />
                                  <button 
                                    type="button" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                                {registerErrors.confirmPassword && (
                                  <p className="text-xs text-red-500">{registerErrors.confirmPassword}</p>
                                )}
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Type de compte</Label>
                                <div className="grid grid-cols-2 gap-3">
                                  <Button 
                                    type="button" 
                                    variant={registerData.accountType === 'client' ? 'default' : 'outline'} 
                                    className="w-full"
                                    onClick={() => setRegisterData({...registerData, accountType: 'client'})}
                                  >
                                    Client
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant={registerData.accountType === 'provider' ? 'default' : 'outline'}
                                    className="w-full"
                                    onClick={() => setRegisterData({...registerData, accountType: 'provider'})}
                                  >
                                    Prestataire
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex items-start space-x-2">
                                <Checkbox 
                                  id="terms" 
                                  checked={registerData.acceptTerms}
                                  onCheckedChange={(checked) => 
                                    setRegisterData({...registerData, acceptTerms: checked})
                                  }
                                  className={registerErrors.acceptTerms ? "border-red-500" : ""}
                                />
                                <div className="grid gap-1.5 leading-none">
                                  <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    J'accepte les conditions d'utilisation et la politique de confidentialité
                                  </label>
                                  {registerErrors.acceptTerms && (
                                    <p className="text-xs text-red-500">{registerErrors.acceptTerms}</p>
                                  )}
                                </div>
                              </div>
                              
                              <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                                {isRegisterLoading ? "Inscription en cours..." : "S'inscrire"}
                              </Button>
                            </form>
                            
                            <div className="relative my-6">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">ou continuer avec</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3">
                              <Button variant="outline" type="button" onClick={() => handleSocialLogin('Google')}>
                                {socialIcons.google}
                                Google
                              </Button>
                              <Button variant="outline" type="button" onClick={() => handleSocialLogin('Facebook')}>
                                {socialIcons.facebook}
                                Facebook
                              </Button>
                              <Button variant="outline" type="button" onClick={() => handleSocialLogin('Apple')}>
                                {socialIcons.apple}
                                Apple
                              </Button>
                            </div>
                          </TabsContent>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Lock className="mr-1 h-3 w-3" />
                    <span>Connexion sécurisée par SSL</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Auth;
