import { useNavigate } from "react-router-dom";
import { Car, ShoppingBag, MapPin, Wallet, Bell, Menu, Shield, Star, Building2, Upload, FileCheck, Wrench, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [carIntFile, setCarIntFile] = useState<File | null>(null);
  const [carExtFile, setCarExtFile] = useState<File | null>(null);
  const [carPreview, setCarPreview] = useState<string | null>("");
  const [carPreviewInt, setCarPreviewInt] = useState<string | null>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "int" | "ext") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        if (type === "ext") {
          setCarExtFile(file);
          setCarPreview(preview);
        } else {
          setCarIntFile(file);
          setCarPreviewInt(preview);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const services = [
    {
      title: "Location",
      description: "Louez une voiture",
      route: "/vehicles?filter=location",
      icon: Car,
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    },
    {
      title: "Achats",
      description: "Achetez une voiture",
      route: "/vehicles?filter=vente",
      icon: ShoppingBag,
      gradient: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    },
    {
      title: "Lieux",
      description: "Trouvez nos agences",
      route: "/locations",
      icon: MapPin,
      gradient: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    {
      title: "Vendez",
      description: "En quelques clics",
      icon: Wallet,
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      action: () => setOpenDialog(true),
    },

    {
      title: "Entretien",
      description: "En quelques clics",
      icon: Wrench,
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      route: "/entretien",
    },

    {
      title: "Auto Ecole",
      description: "Trouvez votre une auto école selon votre budget",
      icon: GraduationCap,
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      route: "/autoEcole",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              VROOM
            </span>
            <span className="text-[hsl(153,100%,36%)]"> CI</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Que souhaitez-vous faire aujourd'hui ?
          </p>
        </div>

        {/* Services Grid - Style Yango */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                onClick={() => service.action ? service.action() : navigate(service.route)}
                className="group relative bg-card rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border"
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`
                }}
              >
                {/* Titre et flèche */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-xl tracking-tight">
                    {service.title}
                  </h3>
                  <svg
                    className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm font-medium mb-6">
                  {service.description}
                </p>

                {/* Icon en bas à droite */}
                <div className="flex justify-end">
                  <div className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>

                <style>{`
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            );
          })}
        </div>
      </main>

    </div>
  );
};

export default Dashboard;