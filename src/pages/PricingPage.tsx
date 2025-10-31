// src/components/Pricing.tsx

import React, { useState } from 'react';
import { Check, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import BotonVolver from '@/components/BotonVolver';
import BotonLogout from '@/components/BotonLogout';

const PricingPage = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  // Precios
  const monthlyPrice = 25000;
  const annualPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% descuento anual
  const annualMonthlyPrice = Math.round(annualPrice / 12);

  // Features incluidos
  const features = [
    'Bundles ilimitados',
    'Productos ilimitados',
    'Personalización completa de diseño',
    '2 estilos premium (Clásico y Moderno)',
    'Complementos de productos',
    'Soporte por email y WhatsApp',
    'Actualizaciones automáticas',
    'Analíticas básicas',
    'Sin comisiones por venta',
    'Instalación en 10 minutos'
  ];

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section id="pricing" className="py-20 bg-background">
          <div className="flex justify-between">
        <BotonVolver />
        <BotonLogout />
      </div>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Precios simples y transparentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Un solo plan con todo incluido
          </h2>
          <p className="text-muted-foreground text-lg">
            Sin sorpresas, sin costos ocultos. Cancelá cuando quieras.
          </p>
        </div>

        {/* Toggle Mensual/Anual */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Mensual
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isAnnual ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Anual
          </span>
          {isAnnual && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              Ahorrá 20%
            </span>
          )}
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Badge "Más Popular" */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                <Zap className="h-4 w-4" />
                <span>Más Popular</span>
              </div>
            </div>

            <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Plan Profesional</h3>
                <p className="text-muted-foreground mb-6">
                  Todo lo que necesitás para aumentar tus ventas
                </p>

                {/* Precio */}
                <div className="mb-6">
                  {isAnnual && (
                    <div className="text-sm text-muted-foreground line-through mb-1">
                      ${monthlyPrice.toLocaleString('es-AR')}/mes
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">
                      ${isAnnual ? annualMonthlyPrice.toLocaleString('es-AR') : monthlyPrice.toLocaleString('es-AR')}
                    </span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Facturado ${annualPrice.toLocaleString('es-AR')} anualmente
                    </p>
                  )}
                </div>

                {/* Trial Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 mb-6">
                  <Check className="h-4 w-4" />
                  <span>7 días de prueba gratis</span>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={handleGetStarted}
                  size="lg" 
                  className="w-full text-base font-semibold mb-4"
                >
                  Comenzar prueba gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {/* <p className="text-xs text-muted-foreground">
                  Sin tarjeta de crédito requerida
                </p> */}
              </div>

              {/* Features List */}
              <div className="border-t pt-8">
                <h4 className="font-semibold mb-4 text-center">Todo incluido:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garantía */}
              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Garantía de 30 días:</strong> Si no estás satisfecho, 
                  te devolvemos tu dinero. Sin preguntas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h3>
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-2">¿Puedo cancelar en cualquier momento?</h4>
              <p className="text-sm text-muted-foreground">
                Sí, podés cancelar tu suscripción en cualquier momento desde tu panel de control. 
                No hay contratos ni penalidades por cancelación.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-2">¿Qué incluye la prueba gratuita?</h4>
              <p className="text-sm text-muted-foreground">
                La prueba de 7 días incluye acceso completo a todas las funcionalidades sin 
                restricciones. No necesitás ingresar datos de tarjeta de crédito.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-2">¿Hay límite de productos o bundles?</h4>
              <p className="text-sm text-muted-foreground">
                No, podés crear bundles ilimitados en todos los productos que quieras sin 
                costo adicional.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-2">¿Cobran comisión por ventas?</h4>
              <p className="text-sm text-muted-foreground">
                No. Solo pagás la suscripción mensual fija. No cobramos ningún porcentaje 
                de tus ventas.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-2">¿Qué formas de pago aceptan?</h4>
              <p className="text-sm text-muted-foreground">
                Aceptamos tarjetas de crédito/débito y Mercado Pago. Los pagos se procesan 
                de forma segura.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-2">¿Necesito conocimientos técnicos?</h4>
              <p className="text-sm text-muted-foreground">
                No, nuestra interfaz es súper intuitiva. Podés crear tu primer bundle en 
                menos de 10 minutos siguiendo nuestro video tutorial.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Todavía tenés dudas? Hablá con nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://wa.me/5492213531405?text=Hola,%20tengo%20consultas%20sobre%20TecnoBundles', '_blank')}
            >
              Contactar por WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = 'mailto:soporte@tecnobundles.com'}
            >
              Enviar Email
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PricingPage;