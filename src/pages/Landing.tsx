import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Shield, Zap, ArrowRight, Search, FileCheck, Key, ChevronDown, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-car.jpg";
import { useScrollAnimation } from "@/hooks/useAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const navigate = useNavigate();
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { elementRef: howItWorksRef, isVisible: howItWorksVisible } = useScrollAnimation();
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();
  // const { elementRef: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const { elementRef: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide pour les partenaires
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPartnerIndex((prev) => (prev + 1) % partners.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  // const nextPartner = () => {
  //   setCurrentPartnerIndex((prev) => (prev + 1) % partners.length);
  // };

  // const prevPartner = () => {
  //   setCurrentPartnerIndex((prev) => (prev - 1 + partners.length) % partners.length);
  // };

  const features = [
    {
      icon: Car,
      title: "Large Sélection",
      description: "Plus de 10 véhicules de toutes marques disponibles à la vente et à la location. Du citadin compact au SUV familial, trouvez le véhicule parfait pour vos besoins.",
      highlight: "Faites-vous livrer en un clic"
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Tous nos véhicules sont rigoureusement inspectés par des experts certifiés. Garantie complète et assistance 24/7 pour votre tranquillité d'esprit.",
      highlight: "Assistance disponible 24/7"
    },
    {
      icon: Zap,
      title: "Réservation Rapide",
      description: "Réservez votre véhicule en moins de 5 minutes grâce à notre système de réservation instantané. Paiement sécurisé et confirmation immédiate.",
      highlight: "Confirmation en moins de 5 min"
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
    { number: "8+", label: "Véhicules disponibles" },
    { number: "2+", label: "Clients satisfaits" },
    { number: "2+", label: "mois d'expérience" },
    { number: "98%", label: "Taux de satisfaction" }
  ];

  // const partners = [
  //   { 
  //     name: "Toyota", 
  //     logo: "https://cdn.freebiesupply.com/logos/large/2x/toyota-6-logo-png-transparent.png"
  //   },
  //   { 
  //     name: "Mercedes", 
  //     logo: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png"
  //   },
  //   { 
  //     name: "BMW", 
  //     logo: "https://www.carlogos.org/logo/BMW-logo-2020-grey.png"
  //   },
  //   { 
  //     name: "Audi", 
  //     logo: "https://www.carlogos.org/logo/Audi-logo-2009-1920x1080.png"
  //   },
  //   { 
  //     name: "Peugeot", 
  //     logo: "https://www.carlogos.org/logo/Peugeot-logo-2010-640x550.png"
  //   },
  //   { 
  //     name: "Renault", 
  //     logo: "https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png"
  //   }
  // ];

  const faqs = [
    {
      question: "Comment puis-je réserver un véhicule ?",
      answer: "C'est très simple ! Parcourez notre catalogue, sélectionnez le véhicule qui vous intéresse, cliquez sur 'Réserver' et suivez les étapes. Vous recevrez une confirmation instantanée par email et SMS."
    },
    {
      question: "Quels sont les documents nécessaires pour louer une voiture ?",
      answer: "Vous aurez besoin d'une pièce d'identité valide (CNI ou passeport), un permis de conduire en cours de validité, et une preuve de domicile. Pour certains véhicules haut de gamme, un justificatif de revenus peut être demandé."
    },
    {
      question: "Puis-je annuler ma réservation ?",
      answer: "Oui, vous pouvez annuler votre réservation jusqu'à 24h avant la date prévue sans frais. Pour les annulations tardives, des frais peuvent s'appliquer selon nos conditions générales."
    },
    {
      question: "Les véhicules sont-ils assurés ?",
      answer: "Absolument ! Tous nos véhicules sont couverts par une assurance tous risques. Vous pouvez également souscrire à des options d'assurance complémentaires lors de la réservation."
    },
    {
      question: "Proposez-vous la livraison du véhicule ?",
      answer: "Oui, nous offrons un service de livraison à domicile ou à l'aéroport dans toute la région d'Abidjan. Des frais de livraison peuvent s'appliquer selon la distance."
    },
    {
      question: "Comment fonctionne l'achat d'un véhicule ?",
      answer: "Pour acheter un véhicule, sélectionnez l'option 'Acheter', prenez rendez-vous pour un essai, puis finalisez l'achat. Nous nous occupons de toute la paperasse et vous accompagnons dans les démarches administratives."
    }
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
                className={`bg-card p-8 rounded-2xl shadow-card hover:shadow-hover transition-all duration-700 hover:scale-105 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: featuresVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  <Zap className="h-4 w-4" />
                  {feature.highlight}
                </div>
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
                className={`relative transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
                className={`text-center transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div ref={faqRef} className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
              Questions fréquentes
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus posées par nos clients
            </p>
          </div>

          <div className={`max-w-3xl mx-auto transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl shadow-card hover:shadow-hover transition-all px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div
          ref={ctaRef}
          className={`container mx-auto px-4 text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à trouver votre voiture ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs satisfaits et découvrez notre sélection exceptionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/vehicles")}
              className="text-lg font-semibold hover:scale-105 transition-smooth"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/signup")}
              className="text-lg font-semibold hover:scale-105 transition-smooth bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Créer un compte
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;