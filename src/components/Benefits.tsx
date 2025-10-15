import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumentá el ticket promedio",
    description: "Los clientes compran más unidades para acceder a mejores precios. Incrementá tus ingresos por orden.",
    stat: "+45%",
  },
  {
    icon: Users,
    title: "Mejorá la experiencia del cliente",
    description: "Ofertas claras y atractivas que motivan la compra. Clientes satisfechos que vuelven por más.",
    stat: "4.8★",
  },
  {
    icon: Clock,
    title: "Ahorrá tiempo valioso",
    description: "Configuración en minutos, no en horas. Dedicá tu tiempo a hacer crecer tu negocio.",
    stat: "10min",
  },
  {
    icon: DollarSign,
    title: "ROI inmediato",
    description: "Empezá a ver resultados desde el primer día. Inversión que se paga sola rápidamente.",
    stat: "30 días",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir nuestra app?
          </h2>
          <p className="text-muted-foreground text-lg">
            Resultados comprobados que transforman tu tienda
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex gap-6 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
                  <benefit.icon className="h-8 w-8" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <span className="text-2xl font-bold text-primary">{benefit.stat}</span>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
