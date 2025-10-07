import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Shield, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-car.jpg";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Car,
      title: "Large Sélection",
      description: "Des centaines de véhicules disponibles à la vente et à la location",
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Tous nos véhicules sont vérifiés et certifiés",
    },
    {
      icon: Zap,
      title: "Réservation Rapide",
      description: "Réservez votre véhicule en quelques clics",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury car"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Trouvez votre
              <span className="text-primary block mt-2">voiture idéale</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-slow">
              Achetez ou louez la voiture de vos rêves avec DriveHub. 
              Des centaines de véhicules vérifiés vous attendent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-slow">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="text-lg"
              >
                Explorer les véhicules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="text-lg border-primary text-primary hover:bg-primary/10"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-slow">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
            Pourquoi choisir DriveHub ?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Une plateforme innovante qui révolutionne l'achat et la location de véhicules
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à trouver votre voiture ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs satisfaits et découvrez notre sélection exceptionnelle
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="text-lg font-semibold hover:scale-105 transition-smooth"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
