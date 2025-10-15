import { Settings, Eye, Zap, BarChart, Palette, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Settings,
    title: "Configuración intuitiva",
    description: "Creá ofertas por cantidad en minutos con nuestro configurador visual. Sin código necesario.",
  },
  {
    icon: Eye,
    title: "Vista previa en tiempo real",
    description: "Mirá cómo quedan tus ofertas antes de publicarlas. Lo que ves es lo que obtienen tus clientes.",
  },
  {
    icon: Palette,
    title: "Diseño personalizable",
    description: "Elegí entre múltiples estilos: clásico o moderno. Adaptá el look a tu marca.",
  },
  {
    icon: Zap,
    title: "Activación instantánea",
    description: "Aplicá cambios al instante. Tus ofertas se actualizan en vivo en tu tienda.",
  },
  {
    icon: BarChart,
    title: "Aumentá conversiones",
    description: "Incrementá el ticket promedio hasta un 45% con ofertas estratégicas por volumen.",
  },
  {
    icon: Shield,
    title: "100% confiable",
    description: "Integración nativa con Tienda Nube. Soporte técnico en español cuando lo necesites.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que necesitás para vender más
          </h2>
          <p className="text-muted-foreground text-lg">
            Herramientas profesionales al alcance de tu mano
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md group"
            >
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
