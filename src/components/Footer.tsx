// src/components/Footer.tsx - ACTUALIZADO

import { Package } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
                <Package className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">TecnoBundles</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              La solución definitiva para crear ofertas por cantidad en tu tienda Tienda Nube. 
              Aumentá tus ventas con bundles inteligentes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Producto</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/#features" className="hover:text-primary transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
             
              <li>
                <Link to="/tiendanube-auth" className="hover:text-primary transition-colors">
                  Conectar Tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte y Legal */}
          <div>
            <h3 className="font-semibold mb-4">Soporte y Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a 
                  href="mailto:soporte@tecnobundles.com" 
                  className="hover:text-primary transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5491135659647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 TecnoBundles. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Términos
            </Link>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacidad
            </Link>
            <a 
              href="mailto:soporte@tecnobundles.com" 
              className="hover:text-primary transition-colors"
            >
              Soporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;