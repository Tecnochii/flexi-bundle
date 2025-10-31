// src/pages/ContactSupport.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Phone, 
  Clock, 
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Aquí iría tu llamada a la API/n8n para enviar el mensaje
      const response = await fetch('https://n8n-n8n.qxzsxx.easypanel.host/webhook/contact-support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setStatus('success');
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
      
      // Resetear status después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleWhatsAppClick = () => {
    const phone = '5491135659647';
    const message = encodeURIComponent('¡Hola! Necesito ayuda con TecnoBundles.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            ← Volver al inicio
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <MessageCircle className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Necesitás ayuda?
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos acá para ayudarte. Elegí la forma de contacto que prefieras.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-500 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Respuesta inmediata durante horario laboral
                  </p>
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chatear ahora
                  </Button>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    soporte@tecnobundles.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Respuesta en 24-48 horas hábiles
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    +54 9 11 3565-9647
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lunes a Viernes: 9:00 - 18:00 (AR)
                  </p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Horario de Atención</h4>
                  <p className="text-xs text-muted-foreground">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábados: 9:00 - 13:00<br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Ubicación</h4>
                  <p className="text-xs text-muted-foreground">
                    San Justo, Buenos Aires<br />
                    Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Envianos un Mensaje</h2>
              
              {/* Success Message */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">¡Mensaje enviado!</h4>
                    <p className="text-sm text-green-700">
                      Recibimos tu mensaje. Te responderemos pronto.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900">Error</h4>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    className="mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccioná una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Soporte Técnico</SelectItem>
                      <SelectItem value="billing">Facturación y Pagos</SelectItem>
                      <SelectItem value="sales">Consulta de Ventas</SelectItem>
                      <SelectItem value="feature">Solicitud de Funcionalidad</SelectItem>
                      <SelectItem value="bug">Reporte de Error</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Breve descripción del problema"
                    className="mt-1"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describí tu consulta o problema con el mayor detalle posible..."
                    className="mt-1 min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Incluí toda la información relevante para ayudarnos a resolver tu consulta más rápido.
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>

              {/* Additional Info */}
              {/* <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-3">Antes de contactarnos:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Revisá nuestra <Link to="/docs" className="text-primary hover:underline">documentación</Link> para soluciones rápidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Consultá las <Link to="/#pricing" className="text-primary hover:underline">preguntas frecuentes</Link> en la sección de precios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Para problemas urgentes, contactá por WhatsApp para atención inmediata</span>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes de Soporte</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">¿Cuánto tarda la respuesta?</h3>
              <p className="text-sm text-muted-foreground">
                Por WhatsApp: Inmediata en horario laboral<br />
                Por Email: 24-48 horas hábiles<br />
                Casos urgentes tienen prioridad
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">¿Ofrecen soporte en español?</h3>
              <p className="text-sm text-muted-foreground">
                Sí, todo nuestro equipo habla español. Es nuestro idioma principal 
                de soporte y toda la documentación está en español.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">¿El soporte es gratuito?</h3>
              <p className="text-sm text-muted-foreground">
                Sí, el soporte está incluido en tu suscripción sin costo adicional. 
                Todos los usuarios tienen acceso al mismo nivel de soporte.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">¿Puedo agendar una llamada?</h3>
              <p className="text-sm text-muted-foreground">
                Sí, para casos complejos podemos agendar una videollamada. 
                Contactanos por email o WhatsApp para coordinar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;