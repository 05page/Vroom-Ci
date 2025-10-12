import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Shield, Zap, ArrowRight, Search, FileCheck, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-car.jpg";
import { useScrollAnimation } from "@/hooks/useAnimation";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { elementRef: howItWorksRef, isVisible: howItWorksVisible } = useScrollAnimation();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { elementRef: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Car,
      title: "Large Sélection",
      description: "Plus de 500 véhicules de toutes marques disponibles à la vente et à la location. Du citadin compact au SUV familial, trouvez le véhicule parfait pour vos besoins.",
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Tous nos véhicules sont rigoureusement inspectés par des experts certifiés. Garantie complète et assistance 24/7 pour votre tranquillité d'esprit.",
    },
    {
      icon: Zap,
      title: "Réservation Rapide",
      description: "Réservez votre véhicule en moins de 5 minutes grâce à notre système de réservation instantané. Paiement sécurisé et confirmation immédiate.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      icon: Search,
      title: "Recherchez",
      description: "Parcourez notre catalogue et utilisez nos filtres avancés pour trouver le véhicule idéal selon vos critères."
    },
    {
      step: "2",
      icon: FileCheck,
      title: "Vérifiez",
      description: "Consultez les détails complets, photos HD, historique et rapport de vérification de chaque véhicule."
    },
    {
      step: "3",
      icon: Key,
      title: "Réservez",
      description: "Finalisez votre réservation en ligne de manière sécurisée et recevez une confirmation instantanée."
    }
  ];

  const stats = [
    { number: "500+", label: "Véhicules disponibles" },
    { number: "2,500+", label: "Clients satisfaits" },
    { number: "15+", label: "Années d'expérience" },
    { number: "98%", label: "Taux de satisfaction" }
  ];

  const partners = [
    "Toyota", "Mercedes", "BMW", "Audi", "Peugeot", "Renault"
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
              Revendez, achetez ou louez la voiture de vos rêves avec Vroom Ci.
              Des centaines de véhicules vérifiés vous attendent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-slow">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/vehicles")}
                className="text-lg"
              >
                Explorer les véhicules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/vehicles")}
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
        <div
          ref={featuresRef}
          className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
              Pourquoi choisir Vroom Ci ?
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              Une plateforme innovante qui révolutionne l'achat et la location de véhicules en Côte d'Ivoire
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all duration-700 hover:scale-105 ${
                  featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: featuresVisible ? `${index * 150}ms` : '0ms' }}
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

      {/* How It Works Section */}
      <section className="py-20">
        <div ref={howItWorksRef} className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              Un processus simple et transparent en 3 étapes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className={`relative transition-all duration-700 ${
                  howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: howItWorksVisible ? `${index * 200}ms` : '0ms' }}
              >
                <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all hover:scale-105">
                  <div className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-background">
                      <span className="text-sm font-bold">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div ref={statsRef} className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
              Nos chiffres parlent d'eux-mêmes
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              La confiance de milliers de clients à travers la Côte d'Ivoire
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: statsVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div ref={partnersRef} className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
              Nos marques partenaires
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              Nous travaillons avec les plus grandes marques automobiles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner}
                className={`flex items-center justify-center transition-all duration-700 ${
                  partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: partnersVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="bg-card p-6 rounded-xl shadow-card hover:shadow-hover transition-all hover:scale-110 w-full h-24 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground/60 hover:text-primary transition-colors">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div 
        ref={ctaRef}
        className={`container mx-auto px-4 text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à trouver votre voiture ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs satisfaits et découvrez notre sélection exceptionnelle
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/vehicles")}
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