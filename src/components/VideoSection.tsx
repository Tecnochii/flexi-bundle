import { Play } from "lucide-react";

const VideoSection = ({videoId}) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mirá cómo podés crear tus primeras ofertas por cantidad en menos de 5 minutos
            </p>
          </div>

          {/* Video container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] bg-card border border-border">
            {/* Placeholder for video - replace with actual embed */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/90 hover:bg-primary transition-colors cursor-pointer group">
                  <Play className="h-8 w-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Video de demostración
                </p>
              </div>
            </div>

            {/* Replace the placeholder above with actual video embed like: */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src={"https://www.youtube.com/embed/" + videoId}
              title="TecnoBundles Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Additional info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">01</div>
              <p className="text-sm text-muted-foreground">Configurá tus ofertas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">02</div>
              <p className="text-sm text-muted-foreground">Personalizá el diseño</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">03</div>
              <p className="text-sm text-muted-foreground">Activá y vendé más</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
