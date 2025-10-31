import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react';

const TermsOfService = () => {
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
            <FileText className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Términos y Condiciones de Uso
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
              Bienvenido a <strong>TecnoBundles</strong>. Al acceder y utilizar nuestra aplicación, 
              aceptas cumplir con estos Términos y Condiciones. Por favor, léelos detenidamente 
              antes de usar nuestros servicios.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  1. Aceptación de los Términos
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Al registrarte, acceder o utilizar TecnoBundles, confirmas que:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Has leído y comprendido estos términos</li>
                    <li>Aceptas estar legalmente obligado por ellos</li>
                    <li>Tienes la capacidad legal para celebrar este acuerdo</li>
                    <li>Tienes al menos 18 años de edad</li>
                    <li>Eres el propietario o tienes autorización para gestionar la tienda de Tienda Nube</li>
                  </ul>
                  <p className="text-sm italic bg-yellow-50 p-3 rounded">
                    Si no estás de acuerdo con estos términos, no uses nuestra aplicación.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Descripción del Servicio
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>TecnoBundles</strong> es una aplicación que permite:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Crear ofertas por cantidad (bundles) para productos de Tienda Nube</li>
                <li>Personalizar el diseño de las ofertas</li>
                <li>Gestionar descuentos y promociones por volumen</li>
                <li>Integrar widgets de ofertas en las páginas de productos</li>
              </ul>
              <p className="bg-blue-50 p-4 rounded-lg mt-4">
                <strong>Nota importante:</strong> TecnoBundles funciona como una aplicación externa 
                de Tienda Nube y requiere permisos de acceso a tu tienda para funcionar correctamente.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Registro y Cuenta
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>3.1. Creación de Cuenta:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Debes proporcionar información precisa y completa</li>
                <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
                <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                <li>Solo puedes tener una cuenta activa</li>
              </ul>

              <p className="mt-4"><strong>3.2. Uso de la Cuenta:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Tu cuenta es personal e intransferible</li>
                <li>No puedes compartir tus credenciales con terceros</li>
                <li>Eres responsable de todas las actividades realizadas desde tu cuenta</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  4. Uso Aceptable
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p><strong>4.1. Está PERMITIDO:</strong></p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Crear bundles para tus propios productos</li>
                      <li>Personalizar el diseño según tu marca</li>
                      <li>Integrar ofertas en múltiples productos</li>
                      <li>Usar la aplicación para fines comerciales legítimos</li>
                    </ul>
                  </div>

                  <p className="mt-4"><strong>4.2. Está PROHIBIDO:</strong></p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Usar la aplicación para actividades ilegales</li>
                      <li>Intentar hackear, vulnerar o comprometer el sistema</li>
                      <li>Compartir tu cuenta con terceros</li>
                      <li>Hacer ingeniería inversa del código</li>
                      <li>Crear ofertas engañosas o fraudulentas</li>
                      <li>Usar bots o scripts automatizados no autorizados</li>
                      <li>Sobrecargar intencionalmente nuestros servidores</li>
                      <li>Revender o sublicenciar el servicio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Planes y Pagos
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>5.1. Prueba Gratuita:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ofrecemos 7 días de prueba gratuita</li>
                <li>No se requiere tarjeta de crédito para la prueba</li>
                <li>Puedes cancelar en cualquier momento durante la prueba</li>
              </ul>

              <p className="mt-4"><strong>5.2. Suscripción Paga:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Los planes se cobran mensualmente por adelantado</li>
                <li>Los precios están sujetos a cambios con aviso previo de 30 días</li>
                <li>Los pagos no son reembolsables, excepto según lo requerido por ley</li>
                <li>Si cancelas, tu acceso continúa hasta el final del período pagado</li>
              </ul>

              <p className="mt-4"><strong>5.3. Cancelación:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Puedes cancelar tu suscripción en cualquier momento</li>
                <li>La cancelación surte efecto al final del período de facturación actual</li>
                <li>Tus datos se conservarán por 30 días después de la cancelación</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Propiedad Intelectual
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                <strong>6.1. Nuestra Propiedad:</strong> Todo el contenido, diseño, código, 
                marca y materiales de TecnoBundles son propiedad exclusiva nuestra o de nuestros 
                licenciantes. No se concede ninguna licencia para usar nuestros materiales excepto 
                lo necesario para usar el servicio.
              </p>
              <p>
                <strong>6.2. Tu Contenido:</strong> Conservas todos los derechos sobre los datos, 
                configuraciones y contenidos que creas en TecnoBundles. Nos otorgas una licencia 
                limitada para alojar, almacenar y procesar tu contenido solo para proporcionar el servicio.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  7. Limitación de Responsabilidad
                </h2>
                <div className="text-gray-700 space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <p className="font-semibold mb-2">IMPORTANTE - LEE CON ATENCIÓN:</p>
                    <p>
                      TecnoBundles se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD". No garantizamos 
                      que el servicio sea ininterrumpido, libre de errores o completamente seguro.
                    </p>
                  </div>

                  <p><strong>No somos responsables por:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Pérdida de ventas, ingresos o ganancias</li>
                    <li>Daños indirectos, incidentales o consecuentes</li>
                    <li>Problemas con Tienda Nube o su API</li>
                    <li>Decisiones comerciales basadas en el uso de la aplicación</li>
                    <li>Acceso no autorizado a tu cuenta por tu negligencia</li>
                    <li>Incompatibilidad con otros plugins o temas</li>
                  </ul>

                  <p className="mt-4 font-semibold">
                    Nuestra responsabilidad total está limitada al monto pagado por ti en los 
                    últimos 12 meses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Garantías y Disponibilidad
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>8.1. Nivel de Servicio:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Nos esforzamos por mantener un 99% de uptime</li>
                <li>Realizamos mantenimientos programados con aviso previo</li>
                <li>Proporcionamos soporte por email durante horarios laborales</li>
              </ul>

              <p className="mt-4"><strong>8.2. Exclusiones:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>No garantizamos aumentos específicos en ventas</li>
                <li>Los resultados pueden variar según tu industria y productos</li>
                <li>No somos responsables de cambios en la API de Tienda Nube</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <div className="flex items-start gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  9. Ley Aplicable y Jurisdicción
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p>
                    Estos términos se rigen por las leyes de la República Argentina. Cualquier 
                    disputa se resolverá en los tribunales de San Justo, Buenos Aires, Argentina.
                  </p>
                  <p>
                    Si alguna disposición de estos términos se considera inválida, las demás 
                    disposiciones permanecen en pleno vigor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Modificaciones a los Términos
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios significativos se notificarán por email con al menos 30 días de anticipación.
              </p>
              <p>
                El uso continuado de TecnoBundles después de los cambios constituye tu aceptación 
                de los nuevos términos.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              11. Terminación del Servicio
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>11.1. Terminación por tu parte:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Puedes cancelar tu cuenta en cualquier momento desde la configuración</li>
                <li>Al cancelar, tus datos se eliminarán según nuestra política de retención</li>
                <li>No se realizan reembolsos por períodos no utilizados</li>
              </ul>

              <p className="mt-4"><strong>11.2. Terminación por nuestra parte:</strong></p>
              <p>Podemos suspender o terminar tu cuenta si:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Violas estos términos y condiciones</li>
                <li>Tu pago está vencido por más de 15 días</li>
                <li>Usas el servicio de manera fraudulenta o ilegal</li>
                <li>Representas un riesgo de seguridad para otros usuarios</li>
              </ul>
              <p className="mt-2">
                Te notificaremos con 7 días de anticipación antes de terminar tu cuenta, 
                excepto en casos de violaciones graves.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              12. Privacidad y Protección de Datos
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                El manejo de tus datos personales está regido por nuestra{' '}
                <Link to="/privacy-policy" className="text-blue-600 hover:underline font-semibold">
                  Política de Privacidad
                </Link>, 
                que forma parte integral de estos términos.
              </p>
              <p>
                Al usar TecnoBundles, aceptas la recopilación y uso de información según 
                lo descrito en nuestra Política de Privacidad.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              13. Indemnización
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Aceptas indemnizar y eximir de responsabilidad a TecnoBundles, sus empleados, 
                directores y afiliados de cualquier reclamo, pérdida, responsabilidad, daño o 
                gasto (incluyendo honorarios legales razonables) que surja de:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Tu uso del servicio</li>
                <li>Tu violación de estos términos</li>
                <li>Tu violación de derechos de terceros</li>
                <li>Contenido que publiques o compartas</li>
                <li>Ofertas o promociones que crees</li>
              </ul>
            </div>
          </section>

          {/* Section 14 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              14. Soporte y Mantenimiento
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>14.1. Soporte incluido:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Soporte por email: soporte@tecnobundles.com</li>
                <li>Tiempo de respuesta: 24-48 horas hábiles</li>
                <li>Documentación y tutoriales en video</li>
                <li>Actualizaciones y mejoras continuas</li>
              </ul>

              <p className="mt-4"><strong>14.2. Mantenimiento:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Realizamos actualizaciones regulares sin costo adicional</li>
                <li>Notificamos mantenimientos programados con 24 horas de anticipación</li>
                <li>Mantenimientos de emergencia pueden ocurrir sin previo aviso</li>
              </ul>
            </div>
          </section>

          {/* Section 15 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              15. Integración con Tienda Nube
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                TecnoBundles es una aplicación de terceros que funciona con Tienda Nube. 
                Al usar nuestra aplicación:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Aceptas otorgarnos los permisos necesarios en Tienda Nube</li>
                <li>Entiendes que dependemos de la API de Tienda Nube</li>
                <li>Reconoces que no somos parte de Tienda Nube ni lo representamos</li>
                <li>Los términos de Tienda Nube también aplican a tu uso de su plataforma</li>
              </ul>
              <p className="bg-yellow-50 p-4 rounded-lg mt-3">
                <strong>Importante:</strong> Si Tienda Nube modifica o descontinúa su API, 
                podemos necesitar ajustar o terminar ciertos servicios. Haremos nuestro mejor 
                esfuerzo para notificarte con anticipación.
              </p>
            </div>
          </section>

          {/* Section 16 */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              16. Disposiciones Generales
            </h2>
            <div className="text-gray-700 space-y-3">
              <p><strong>16.1. Acuerdo Completo:</strong></p>
              <p>
                Estos términos, junto con nuestra Política de Privacidad, constituyen el acuerdo 
                completo entre tú y TecnoBundles.
              </p>

              <p className="mt-4"><strong>16.2. No Renuncia:</strong></p>
              <p>
                El hecho de que no ejerzamos algún derecho bajo estos términos no constituye 
                una renuncia a ese derecho.
              </p>

              <p className="mt-4"><strong>16.3. Divisibilidad:</strong></p>
              <p>
                Si alguna disposición es declarada inválida, las demás disposiciones permanecen 
                en vigor.
              </p>

              <p className="mt-4"><strong>16.4. Cesión:</strong></p>
              <p>
                No puedes ceder estos términos sin nuestro consentimiento previo. Podemos ceder 
                estos términos en caso de fusión, adquisición o venta de activos.
              </p>

              <p className="mt-4"><strong>16.5. Fuerza Mayor:</strong></p>
              <p>
                No somos responsables por retrasos o fallas causadas por circunstancias fuera 
                de nuestro control razonable (desastres naturales, guerras, pandemias, etc.).
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              17. Contacto
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Si tienes preguntas sobre estos Términos y Condiciones, contáctanos:
              </p>
              <div className="space-y-1">
                {/* <p><strong>Email principal:</strong> soporte@tecnobundles.com</p>
                <p><strong>Email legal:</strong> legal@tecnobundles.com</p> */}
                <p><strong>WhatsApp:</strong> +54 9 11 3565-9647</p>
                <p><strong>Dirección:</strong> San Justo, Buenos Aires, Argentina</p>
              </div>
              <p className="mt-4 text-sm italic">
                Al usar TecnoBundles, confirmas que has leído, entendido y aceptado estos 
                Términos y Condiciones en su totalidad.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>© 2025 TecnoBundles. Todos los derechos reservados.</p>
            <p className="mt-2">
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Política de Privacidad
              </Link>
              {' | '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Términos de Servicio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;