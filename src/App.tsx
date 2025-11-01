import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginRegistro from "./pages/LoginRegistro";
import BundlesList from "./pages/BundlesList";
import Home from "./pages/Home";
// 👇 NUEVAS IMPORTACIONES PARA TIENDA NUBE
import TiendaNubeAuth from "./pages/TiendaNubeAuth";
import TiendaNubeCallback from "./pages/TiendaNubeCallback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PricingPage from "./pages/PricingPage";
import ContactSupport from "./pages/ContactSupport";
import Dashboard from "./pages/Dashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generador" element={<Index />} />
          <Route path="/list" element={<BundlesList />} />
          <Route path="/login" element={<LoginRegistro />} />
          
          {/* 👇 NUEVAS RUTAS PARA TIENDA NUBE */}
          <Route path="/tiendanube-auth" element={<TiendaNubeAuth />} />
          <Route path="/auth/callback" element={<TiendaNubeCallback />} />



          {/* Rutas de Políticas y Términos */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/terminos" element={<TermsOfService />} />
          <Route path="/terminos" element={<TermsOfService />} />


          {/* Rutas de Precios */}
          <Route path="/pricing" element={<PricingPage />} />


          {/* Rutas de Soporte */}
          <Route path="/contact" element={<ContactSupport />} />

          {/* Rutas de Dashboard */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}



          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;