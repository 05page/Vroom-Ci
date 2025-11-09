import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Shield, Zap, ArrowRight, Search, FileCheck, Key, UserPlus, ShoppingCart, Wallet, Truck, Wrench, GraduationCap, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'features') setFeaturesVisible(true);
            if (id === 'how-it-works') setHowItWorksVisible(true);
            if (id === 'stats') setStatsVisible(true);
            if (id === 'faq') setFaqVisible(true);
            if (id === 'cta') setCtaVisible(true);
          }
        })
      },
      { threshold: 0.1 }
    );

    const sections = ['features', 'how-it-works', 'stats', 'faq', 'cta'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const features = [
    {
      icon: Car,
      title: "Large Sélection",
      description: "Plus de 10 véhicules de toutes marques disponibles à la vente et à la location. Du citadin compact au SUV familial, trouvez le véhicule parfait pour vos besoins.",
      highlight: "Faites-vous livrer en un clic",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Tous nos véhicules sont rigoureusement inspectés par des experts certifiés. Garantie complète et assistance 24/7 pour votre tranquillité d'esprit.",
      highlight: "Assistance disponible 24/7",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Réservation Rapide",
      description: "Réservez votre véhicule en moins de 5 minutes grâce à notre système de réservation instantané. Paiement sécurisé et confirmation immédiate.",
      highlight: "Confirmation en moins de 5 min",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  const howItWorks = [
    {
      step: "1",
      icon: Search,
      title: "Recherchez",
      description: "Parcourez notre catalogue et utilisez nos filtres avancés pour trouver le véhicule idéal selon vos critères.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      step: "2",
      icon: FileCheck,
      title: "Vérifiez",
      description: "Consultez les détails complets, photos HD, historique et rapport de vérification de chaque véhicule.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      step: "3",
      icon: Key,
      title: "Réservez",
      description: "Finalisez votre réservation en ligne de manière sécurisée et recevez une confirmation instantanée.",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "8+", label: "Véhicules disponibles" },
    { number: "2+", label: "Clients satisfaits" },
    { number: "24/7", label: "Assistance disponible" },
    { number: "98%", label: "Taux de satisfaction" }
  ];

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

  const services = [
    {
      title: "Location",
      description: "Louez une voiture facilement",
      icon: Car,
      color: "from-blue-500 to-cyan-500",
      url: "/vehicles?filter=location"
    },
    {
      title: "Achat",
      description: "Achetez votre véhicule idéal",
      icon: ShoppingCart,
      color: "from-purple-500 to-pink-500",
      url: "/vehicles?filter=ventes"
    },
    {
      title: "Vendre",
      description: "Vendez votre voiture rapidement",
      icon: Wallet,
      color: "from-green-500 to-emerald-500",
      url: "/dashboard"
    },
    {
      title: "Assurance",
      description: "Protection tous risques",
      icon: Shield,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Entretien",
      description: "Maintenance professionnelle",
      icon: Wrench,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Auto-école",
      description: "Formation selon votre budget",
      icon: GraduationCap,
      color: "from-pink-500 to-rose-500",
      url: "/autoEcole"
    }
  ]


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Luxury car"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none">
              Trouvez votre
              <span className="block mt-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                voiture idéale
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl">
              Revendez, achetez ou louez la voiture de vos rêves avec Vroom Ci.
              Des centaines de véhicules vérifiés vous attendent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg" onClick={()=> navigate('/dashboard')}
                className="text-lg font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all px-8 py-6"
              >
                Explorer les véhicules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline" onClick={()=> navigate('partnerShip')}
                size="lg"
                className="text-lg font-bold rounded-2xl border-2 hover:scale-105 transition-all px-8 py-6"
              >
                Devenir partenaire
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight">
              Nos{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-center text-muted-foreground text-lg md:text-xl mb-20 max-w-3xl mx-auto font-medium">
              Tous les services automobiles dans une seule application
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.title}
                onClick={() => service.url && navigate(service.url)}
                className={`group relative overflow-hidden bg-card p-6 rounded-3xl border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: featuresVisible ? `${index * 100}ms` : '0ms' }}
              >
                {/* Arrow indicator */}
                <div className="absolute top-4 right-4 bg-primary rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-primary-foreground" />
                </div>

                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Vroom Ci
              </span> ?
            </h2>
            <p className="text-center text-muted-foreground text-lg md:text-xl mb-20 max-w-3xl mx-auto font-medium">
              Une plateforme innovante qui révolutionne l'achat et la location de véhicules en Côte d'Ivoire
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative overflow-hidden bg-card p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: featuresVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-medium">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                  <Zap className="h-4 w-4" />
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight">
              Comment ça marche ?
            </h2>
            <p className="text-center text-muted-foreground text-lg md:text-xl mb-20 max-w-3xl mx-auto font-medium">
              Un processus simple et transparent en 3 étapes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className={`relative transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: howItWorksVisible ? `${index * 200}ms` : '0ms' }}
              >
                <div className="group bg-card p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    <item.icon className="h-10 w-10 text-white" />
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-background rounded-full flex items-center justify-center border-4 border-card shadow-lg">
                      <span className="text-lg font-black text-primary">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-center tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight">
              VROOM en chiffres
            </h2>
            <p className="text-center text-muted-foreground text-lg md:text-xl mb-20 max-w-3xl mx-auto font-medium">
              La confiance de milliers de clients à travers la Côte d'Ivoire
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: statsVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="group bg-card p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center border border-primary/10 hover:border-primary/30">
                  <div className="text-5xl md:text-6xl font-black text-primary mb-3 transition-transform duration-500 group-hover:scale-110">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-bold text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight">
              À propos de{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                VROOM
              </span>
            </h2>
            <p className="text-center text-muted-foreground text-lg md:text-xl mb-20 max-w-3xl mx-auto font-medium">
              Votre partenaire automobile de confiance en Côte d'Ivoire
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 order-2 md:order-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    La première plateforme automobile complète de Côte d'Ivoire
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed text-lg">
                    VROOM révolutionne le marché automobile ivoirien en offrant une solution tout-en-un pour l'achat,
                    la vente et la location de véhicules. Notre mission est de simplifier vos démarches automobiles
                    tout en garantissant qualité, sécurité et transparence.
                  </p>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg mb-1 tracking-tight">Véhicules certifiés</h4>
                        <p className="text-muted-foreground font-medium">Inspection rigoureuse par des experts agréés</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg mb-1 tracking-tight">Service premium</h4>
                        <p className="text-muted-foreground font-medium">Accompagnement personnalisé à chaque étape</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <UserPlus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg mb-1 tracking-tight">Communauté active</h4>
                        <p className="text-muted-foreground font-medium">Plus de 1000 clients satisfaits nous font confiance</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative order-1 md:order-2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80"
                      alt="À propos de VROOM"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  {/* Floating stats */}
                  <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border-2 border-primary/20">
                    <div className="text-4xl font-black text-primary mb-1">500+</div>
                    <div className="text-sm font-bold text-muted-foreground">Véhicules</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-tight">
              Questions fréquentes
            </h2>
            <p className="text-center text-muted-foreground text-lg md:text-xl mb-20 max-w-3xl mx-auto font-medium">
              Retrouvez les réponses aux questions les plus posées par nos clients
            </p>
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-black text-lg md:text-xl pr-4 tracking-tight">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed font-medium text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 bg-gradient-to-br from-primary via-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 tracking-tight leading-tight">
            Prêt à trouver
            <span className="block mt-2">votre voiture ?</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Rejoignez des milliers d'utilisateurs satisfaits et découvrez notre sélection exceptionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button
              variant="secondary"
              size="lg" onClick={()=> navigate("/dashboard")}
              className="text-lg font-bold hover:scale-105 transition-all rounded-2xl px-8 py-6 shadow-xl"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg" onClick={()=> navigate("/auth")}
              className="text-lg font-bold hover:scale-105 transition-all rounded-2xl bg-transparent text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground/10 px-8 py-6"
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