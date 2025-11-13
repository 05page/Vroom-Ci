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

// SVG Icons pour Mobile Money
const OrangeMoneyIcon = () => (
  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black text-xs">
    OM
  </div>
);

const MTNMoneyIcon = () => (
  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-black text-xs">
    MTN
  </div>
);

const MoovMoneyIcon = () => (
  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
    MV
  </div>
);

// SVG Icons pour Cartes bancaires
const VisaIcon = () => (
  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
    VISA
  </div>
);

const MastercardIcon = () => (
  <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
    <div className="flex gap-0.5">
      <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
    </div>
  </div>
);

const ClientSubscription = () => {
  const currentPlan = "free";
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

    toast.success("Paiement en cours...");
    setTimeout(() => {
      handleSubscribe(selectedPlan);
    }, 1500);
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-2">
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
              className={`relative rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                plan.popular ? "border-primary shadow-lg ring-2 ring-primary/20" : ""
              } ${currentPlan === plan.id ? "ring-2 ring-primary" : ""}`}
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
                  className="w-full group transition-all duration-300 rounded-xl font-bold"
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
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Finaliser l'abonnement</DialogTitle>
            <DialogDescription className="font-medium">
              Plan <span className="font-bold text-foreground">{selectedPlanDetails?.name}</span>
              {" "}à <span className="font-bold text-primary">{selectedPlanDetails?.price} FCFA/mois</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Mode de paiement
              </Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer">
                  <RadioGroupItem value="mobile_money" id="mobile" />
                  <Label htmlFor="mobile" className="cursor-pointer flex-1 font-medium">
                    Mobile Money
                  </Label>
                  <div className="flex gap-1">
                    <OrangeMoneyIcon />
                    <MTNMoneyIcon />
                    <MoovMoneyIcon />
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-4 border-2 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer flex-1 font-medium">
                    Carte bancaire
                  </Label>
                  <div className="flex gap-2">
                    <VisaIcon />
                    <MastercardIcon />
                  </div>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "mobile_money" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Choisissez votre opérateur *</Label>
                  <RadioGroup 
                    value={paymentData.mobileProvider} 
                    onValueChange={(value) => setPaymentData({...paymentData, mobileProvider: value})}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all">
                        <RadioGroupItem value="orange" id="orange" />
                        <OrangeMoneyIcon />
                        <Label htmlFor="orange" className="cursor-pointer font-bold flex-1">
                          Orange Money
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <MTNMoneyIcon />
                        <Label htmlFor="mtn" className="cursor-pointer font-bold flex-1">
                          MTN Mobile Money
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all">
                        <RadioGroupItem value="moov" id="moov" />
                        <MoovMoneyIcon />
                        <Label htmlFor="moov" className="cursor-pointer font-bold flex-1">
                          Moov Money
                        </Label>
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
                    className="h-12 rounded-xl border-2 font-medium"
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
                    className="h-12 rounded-xl border-2 font-medium text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground font-medium">
                    Code de confirmation de votre opérateur mobile
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="flex gap-2 justify-end mb-2">
                  <VisaIcon />
                  <MastercardIcon />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="font-semibold">Numéro de carte *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    className="h-12 rounded-xl border-2 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="font-semibold">Nom sur la carte *</Label>
                  <Input
                    id="cardName"
                    placeholder="JEAN DUPONT"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                    className="h-12 rounded-xl border-2 font-medium"
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
                      className="h-12 rounded-xl border-2 font-medium"
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
                      className="h-12 rounded-xl border-2 font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowPaymentDialog(false)}
                className="rounded-xl font-bold border-2"
              >
                Annuler
              </Button>
              <Button 
                onClick={handlePayment} 
                className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/30"
              >
                Payer {selectedPlanDetails?.price} FCFA
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientSubscription;