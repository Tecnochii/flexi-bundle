import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bundles.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0 bg-[image:var(--gradient-hero)]"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>App oficial para Tienda Nube</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in">
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              TecnoBundles
            </span>
            <br />
            Aumentá tus ventas con ofertas por cantidad
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto animate-fade-in">
            Creá bundles y ofertas por cantidad en segundos. Aumentá el ticket promedio 
            y generá más conversiones con descuentos automáticos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button variant="default" size="lg" className="text-base fon t-semibold">
              Comenzar gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base font-semibold">
              Ver demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            <div>
              <div className="text-3xl font-bold text-primary">+45%</div>
              <div className="text-sm text-muted-foreground mt-1">Ticket promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">10min</div>
              <div className="text-sm text-muted-foreground mt-1">Setup completo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">2.5k+</div>
              <div className="text-sm text-muted-foreground mt-1">Tiendas activas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
