import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Crown, Sparkles, ArrowRight, CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0",
    description: "Pour commencer",
    features: [
      "2 annonces maximum",
      "Visibilité standard",
      "Photos basiques",
      "Support par email",
    ],
    limitations: ["Pas de mise en avant", "Analytics limitées"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "5000",
    description: "Pour les particuliers actifs",
    features: [
      "10 annonces maximum",
      "Mise en avant premium 🔥",
      "Photos illimitées",
      "Support prioritaire",
      "Badge vérifié",
      "Statistiques détaillées",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "15000",
    description: "Pour les professionnels",
    features: [
      "Annonces illimitées",
      "Première position 🔥",
      "Galerie photo premium",
      "Support 24/7",
      "Badge Pro vérifié",
      "Analytics avancés",
      "Promotion sur réseaux sociaux",
    ],
  },
];

const ClientSubscription = () => {
  const navigate = useNavigate();
  const currentPlan = localStorage.getItem("clientSubscription") || "free";
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mobile_money");
  const [paymentData, setPaymentData] = useState({
    mobileProvider: "",
    mobileNumber: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    secretCode: ""
  });

  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlan) return;
    
    if (planId === "free") {
      handleSubscribe(planId);
    } else {
      setSelectedPlan(planId);
      setShowPaymentDialog(true);
    }
  };

  const handleSubscribe = (planId: string) => {
    localStorage.setItem("clientSubscription", planId);
    setSelectedPlan(planId);
    setShowPaymentDialog(false);
    toast.success(`Abonnement ${plans.find(p => p.id === planId)?.name} activé !`);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "mobile_money") {
      if (!paymentData.mobileProvider || !paymentData.mobileNumber || !paymentData.secretCode) {
        toast.error("Veuillez remplir tous les champs Mobile Money");
        return;
      }
    } else {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cardExpiry || !paymentData.cardCVV) {
        toast.error("Veuillez remplir toutes les informations de la carte");
        return;
      }
    }

    // Simulation du paiement
    toast.success("Paiement en cours...");
    setTimeout(() => {
      handleSubscribe(selectedPlan);
    }, 1500);
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header showBack />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-black tracking-tight">Choisissez votre formule</h1>
          </div>
          <p className="text-muted-foreground text-lg font-medium">
            Vendez et louez vos véhicules avec plus de visibilité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-in fade-in slide-in-from-bottom ${
                plan.popular ? "border-primary shadow-lg ring-2 ring-primary/20" : ""
              } ${currentPlan === plan.id ? "ring-2 ring-primary" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="px-4 py-1 text-sm font-bold shadow-lg">
                    <Crown className="h-4 w-4 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}

              {currentPlan === plan.id && (
                <div className="absolute -top-3 right-4 z-10">
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-bold bg-green-500 text-white">
                    <Check className="h-3 w-3 mr-1" />
                    Actuel
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-black">{plan.name}</CardTitle>
                <CardDescription className="font-medium">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {plan.price === "0" ? "Gratuit" : `${plan.price} FCFA`}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-muted-foreground font-medium">/mois</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-sm">✗ {limitation}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full group transition-all duration-300"
                  variant={currentPlan === plan.id ? "secondary" : "default"}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? (
                    "Plan actuel"
                  ) : (
                    <>
                      Choisir ce plan
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-black">Besoin d'aide pour choisir ?</h3>
              <p className="text-muted-foreground font-medium">
                Notre équipe est là pour vous accompagner dans le choix de la formule idéale
              </p>
              <Button variant="outline" className="mt-4 font-semibold">
                Contacter un conseiller
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Finaliser l'abonnement</DialogTitle>
            <DialogDescription>
              Vous avez choisi le plan <span className="font-bold text-foreground">{selectedPlanDetails?.name}</span> 
              {" "}à <span className="font-bold text-primary">{selectedPlanDetails?.price} FCFA/mois</span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Mode de paiement
              </Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-all cursor-pointer">
                  <RadioGroupItem value="mobile_money" id="mobile" />
                  <Label htmlFor="mobile" className="cursor-pointer flex-1 font-medium">
                    Mobile Money (Orange, MTN, Moov)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-all cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer flex-1 font-medium">
                    Carte bancaire
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "mobile_money" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-300">
                <div className="space-y-2">
                  <Label htmlFor="provider" className="font-semibold">Opérateur *</Label>
                  <RadioGroup 
                    value={paymentData.mobileProvider} 
                    onValueChange={(value) => setPaymentData({...paymentData, mobileProvider: value})}
                  >
                    <div className="flex gap-2">
                      <div className="flex items-center space-x-2 p-3 border rounded-lg flex-1 hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="orange" id="orange" />
                        <Label htmlFor="orange" className="cursor-pointer font-medium">Orange Money</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg flex-1 hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <Label htmlFor="mtn" className="cursor-pointer font-medium">MTN</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg flex-1 hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="moov" id="moov" />
                        <Label htmlFor="moov" className="cursor-pointer font-medium">Moov</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber" className="font-semibold">Numéro de téléphone *</Label>
                  <Input
                    id="mobileNumber"
                    placeholder="+225 07 00 00 00 00"
                    value={paymentData.mobileNumber}
                    onChange={(e) => setPaymentData({...paymentData, mobileNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secretCode" className="font-semibold flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Code secret *
                  </Label>
                  <Input
                    id="secretCode"
                    type="password"
                    placeholder="••••"
                    maxLength={4}
                    value={paymentData.secretCode}
                    onChange={(e) => setPaymentData({...paymentData, secretCode: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Code de confirmation de votre opérateur mobile
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-300">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="font-semibold">Numéro de carte *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="font-semibold">Nom sur la carte *</Label>
                  <Input
                    id="cardName"
                    placeholder="JEAN DUPONT"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry" className="font-semibold">Expiration *</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/AA"
                      value={paymentData.cardExpiry}
                      onChange={(e) => setPaymentData({...paymentData, cardExpiry: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCVV" className="font-semibold">CVV *</Label>
                    <Input
                      id="cardCVV"
                      placeholder="123"
                      maxLength={3}
                      value={paymentData.cardCVV}
                      onChange={(e) => setPaymentData({...paymentData, cardCVV: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Payer {selectedPlanDetails?.price} FCFA
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientSubscription;
