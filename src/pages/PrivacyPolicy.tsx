// src/pages/PrivacyPolicy.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidad
            </h1>
            <p className="text-gray-600">
              Última actualización: {new Date().toLocaleDateString('es-AR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              En <strong>TecnoBundles</strong>, nos comprometemos a proteger tu privacidad y 
              garantizar la seguridad de tus datos personales. Esta Política de Privacidad 
              explica cómo recopilamos, usamos, almacenamos y protegemos tu información cuando 
              utilizas nuestra aplicación integrada con Tienda Nube.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  1. Información que Recopilamos
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p className="font-semibold">Recopilamos los siguientes tipos de información:</p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">a) Información de Cuenta:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Nombre completo</li>
                      <li>Dirección de correo electrónico</li>
                      <li>Dominio de tu tienda en Tienda Nube</li>
                      <li>ID de usuario de Tienda Nube</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">b) Información de Productos:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Datos de productos (nombres, precios, imágenes, variantes)</li>
                      <li>Configuraciones de bundles y ofertas</li>
                      <li>Configuraciones de diseño y personalización</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">c) Tokens de Acceso:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Access tokens de Tienda Nube (encriptados)</li>
                      <li>Sesiones y cookies de autenticación</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">d) Información Técnica:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Dirección IP</li>
                      <li>Tipo de navegador y dispositivo</li>
                      <li>Fecha y hora de acceso</li>
                      <li>Páginas visitadas en la aplicación</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  2. Cómo Usamos tu Información
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>Utilizamos la información recopilada para:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Proporcionar y mantener nuestros servicios</li>
                    <li>Procesar y gestionar tus bundles y ofertas</li>
                    <li>Comunicarnos contigo sobre actualizaciones y soporte</li>
                    <li>Mejorar y optimizar nuestra aplicación</li>
                    <li>Detectar y prevenir fraudes o uso indebido</li>
                    <li>Cumplir con obligaciones legales</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  3. Seguridad de los Datos
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>Implementamos medidas de seguridad para proteger tu información:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Encriptación:</strong> Todos los tokens de acceso se almacenan encriptados</li>
                    <li><strong>HTTPS:</strong> Todas las comunicaciones usan SSL/TLS</li>
                    <li><strong>Acceso restringido:</strong> Solo personal autorizado accede a los datos</li>
                    <li><strong>Copias de seguridad:</strong> Realizamos backups regulares</li>
                    <li><strong>Monitoreo:</strong> Supervisión continua de actividades sospechosas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  4. Compartir Información con Terceros
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p><strong>NO vendemos ni alquilamos</strong> tu información personal a terceros.</p>
                  <p>Compartimos información únicamente en estos casos:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Con Tienda Nube:</strong> A través de su API para el funcionamiento 
                      de la aplicación
                    </li>
                    <li>
                      <strong>Proveedores de servicios:</strong> Como hosting (n8n, bases de datos) 
                      bajo estrictos acuerdos de confidencialidad
                    </li>
                    <li>
                      <strong>Requisitos legales:</strong> Si la ley lo exige o para proteger 
                      nuestros derechos
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  5. Tus Derechos
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>Conforme a las leyes de protección de datos, tienes derecho a:</p>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><strong>✓ Acceso:</strong> Solicitar una copia de tus datos personales</p>
                    <p><strong>✓ Rectificación:</strong> Corregir datos inexactos o incompletos</p>
                    <p><strong>✓ Eliminación:</strong> Solicitar la eliminación de tus datos</p>
                    <p><strong>✓ Portabilidad:</strong> Recibir tus datos en formato estructurado</p>
                    <p><strong>✓ Oposición:</strong> Oponerte al procesamiento de tus datos</p>
                    <p><strong>✓ Restricción:</strong> Solicitar limitación en el uso de tus datos</p>
                  </div>
                  {/* <p className="mt-3">
                    Para ejercer estos derechos, contáctanos en: 
                    <a href="mailto:privacidad@tecnobundles.com" className="text-blue-600 hover:underline ml-1">
                      privacidad@tecnobundles.com
                    </a>
                  </p> */}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Cookies y Tecnologías Similares
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>Utilizamos cookies para:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mantener tu sesión activa</li>
                <li>Recordar tus preferencias</li>
                <li>Analizar el uso de la aplicación</li>
              </ul>
              <p>
                Puedes configurar tu navegador para rechazar cookies, pero esto puede 
                afectar la funcionalidad de la aplicación.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Retención de Datos
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Conservamos tu información personal solo durante el tiempo necesario para 
                cumplir con los propósitos descritos en esta política, a menos que la ley 
                requiera o permita un período de retención más largo.
              </p>
              <p>
                Cuando canceles tu cuenta, eliminaremos tus datos en un plazo de 30 días, 
                excepto aquellos que debamos conservar por obligaciones legales.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Cambios a esta Política
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos 
                sobre cambios significativos publicando la nueva política en esta página y 
                actualizando la fecha de "Última actualización".
              </p>
              <p>
                Te recomendamos revisar esta política periódicamente para estar informado sobre 
                cómo protegemos tu información.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  9. Contacto
                </h2>
                <div className="text-gray-700 space-y-2">
                  <p>
                    Si tienes preguntas sobre esta Política de Privacidad o sobre cómo 
                    manejamos tus datos, contáctanos:
                  </p>
                  <div className="space-y-1">
                    {/* <p><strong>Email:</strong> privacidad@tecnobundles.com</p>
                    <p><strong>Email alternativo:</strong> soporte@tecnobundles.com</p> */}
                    {/* <p><strong>WhatsApp:</strong> +54 9 221 353-1405</p> */}
                <p><strong>WhatsApp:</strong> +54 9 11 3565-9647</p>

                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>© 2025 TecnoBundles. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
