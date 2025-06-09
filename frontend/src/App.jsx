
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import EventCategories from "./pages/EventCategories";
import CategoryDetail from "./pages/CategoryDetail";
import Providers from "./pages/Providers";
import ProviderProfile from "./pages/ProviderProfile";
import Auth from "./pages/Auth";

// Client Dashboard Pages
import ClientDashboard from "./pages/client/Dashboard";
import CreateEvent from "./pages/client/CreateEvent";
import EventServices from "./pages/client/EventServices";
import EventProviders from "./pages/client/EventProviders";
import EventDetail from "./pages/client/EventDetail";
import EventBudget from "./pages/client/EventBudget";
import ClientMessages from "./pages/client/Messages";
import ClientProfile from "./pages/client/Profile.jsx";
import ClientFavorites from "./pages/client/Favorites.jsx";

// Provider Dashboard Pages  
import ProviderDashboard from "./pages/provider/Dashboard.jsx";
import ProviderProfileManagement from "./pages/provider/ProfileManagement.jsx";
import ProviderServices from "./pages/provider/Services.jsx";
import ProviderAvailability from "./pages/provider/Availability.jsx";
import ProviderRequests from "./pages/provider/Requests.jsx";
import RequestDetail from "./pages/provider/RequestDetail.jsx";
import ProviderBookings from "./pages/provider/Bookings.jsx";
import ProviderStats from "./pages/provider/Stats.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminUsers from "./pages/admin/Users.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/event-categories" element={<EventCategories />} />
          <Route path="/event-categories/:categoryId" element={<CategoryDetail />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/:providerId" element={<ProviderProfile />} />
          <Route path="api/auth" element={<Auth />} />
          
          {/* Client Dashboard */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/events/create" element={<CreateEvent />} />
          <Route path="/client/events/:eventId/services" element={<EventServices />} />
          <Route path="/client/events/:eventId/providers" element={<EventProviders />} />
          <Route path="/client/events/:eventId" element={<EventDetail />} />
          <Route path="/client/events/:eventId/budget" element={<EventBudget />} />
          <Route path="/client/messages" element={<ClientMessages />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/favorites" element={<ClientFavorites />} />
          
          {/* Provider Dashboard */}
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/profile" element={<ProviderProfileManagement />} />
          <Route path="/provider/services" element={<ProviderServices />} />
          <Route path="/provider/availability" element={<ProviderAvailability />} />
          <Route path="/provider/requests" element={<ProviderRequests />} />
          <Route path="/provider/requests/:requestId" element={<RequestDetail />} />
          <Route path="/provider/bookings" element={<ProviderBookings />} />
          <Route path="/provider/stats" element={<ProviderStats />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
