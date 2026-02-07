"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
    Car,
    Eye,
    EyeOff,
    Lock,
    Mail,
    MapPin,
    Phone,
    Store,
    User,
    UserCircle,
} from "lucide-react"
import Link from "next/link"

const AuthPage = () => {
    const [accountType, setAccountType] = useState<"client" | "vendeur">("client")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-12">
            {/* Background decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ede8de]/60 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Car className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-foreground">Vroom CI</span>
                </Link>

                <Card className="rounded-3xl border border-[#ede8de] bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                        <Tabs defaultValue="login" className="w-full">
                            <div className="px-8 pt-8 pb-0">
                                <TabsList className="grid w-full grid-cols-2 bg-[#f5f0e8] rounded-2xl p-1 h-8">
                                    <TabsTrigger
                                        value="login"
                                        className="rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500 cursor-pointer h-10"
                                    >
                                        Connexion
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="register"
                                        className="rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500 cursor-pointer h-10"
                                    >
                                        Inscription
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* ======== CONNEXION ======== */}
                            <TabsContent value="login" className="mt-0">
                                <div className="px-8 pt-8 pb-2">
                                    <h2 className="text-2xl font-black text-zinc-900 mb-1">Bon retour !</h2>
                                    <p className="text-sm text-zinc-400">Connectez-vous pour acceder a votre compte</p>
                                </div>

                                <form className="px-8 pt-6 pb-8 space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-email" className="text-sm font-semibold text-zinc-700">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="login-email"
                                                type="email"
                                                placeholder="exemple@email.com"
                                                className="pl-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="login-password" className="text-sm font-semibold text-zinc-700">
                                                Mot de passe
                                            </Label>
                                            <button type="button" className="text-xs text-orange-600 hover:text-orange-700 font-semibold">
                                                Mot de passe oublie ?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="login-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Votre mot de passe"
                                                className="pl-11 pr-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm cursor-pointer shadow-lg shadow-orange-500/20"
                                    >
                                        Se connecter
                                    </Button>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-[#ede8de]" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="bg-white px-4 text-zinc-400 font-medium">ou</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-12 rounded-xl border-[#ede8de] bg-white hover:bg-[#f5f0e8]/50 text-zinc-700 font-bold text-sm cursor-pointer"
                                    >
                                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continuer avec Google
                                    </Button>
                                </form>
                            </TabsContent>

                            {/* ======== INSCRIPTION ======== */}
                            <TabsContent value="register" className="mt-0">
                                <div className="px-8 pt-8 pb-2">
                                    <h2 className="text-2xl font-black text-zinc-900 mb-1">Creer un compte</h2>
                                    <p className="text-sm text-zinc-400">Rejoignez la communaute Vroom CI</p>
                                </div>

                                <form className="px-8 pt-6 pb-8 space-y-5">
                                    {/* Account Type Selection */}
                                    <div className="space-y-3">
                                        <Label className="text-sm font-semibold text-zinc-700">
                                            Type de compte
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setAccountType("client")}
                                                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                                    accountType === "client"
                                                        ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-500/10"
                                                        : "border-[#ede8de] bg-white hover:border-[#d5ccbc] hover:bg-[#f5f0e8]/30"
                                                }`}
                                            >
                                                {accountType === "client" && (
                                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                                    accountType === "client" ? "bg-orange-100" : "bg-[#f5f0e8]"
                                                }`}>
                                                    <UserCircle className={`h-7 w-7 ${
                                                        accountType === "client" ? "text-orange-600" : "text-[#b8a88a]"
                                                    }`} />
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-sm font-bold ${
                                                        accountType === "client" ? "text-orange-700" : "text-zinc-700"
                                                    }`}>Client</p>
                                                    <p className="text-xs text-zinc-400 mt-0.5">Acheter ou louer</p>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setAccountType("vendeur")}
                                                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                                                    accountType === "vendeur"
                                                        ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-500/10"
                                                        : "border-[#ede8de] bg-white hover:border-[#d5ccbc] hover:bg-[#f5f0e8]/30"
                                                }`}
                                            >
                                                {accountType === "vendeur" && (
                                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                                    accountType === "vendeur" ? "bg-orange-100" : "bg-[#f5f0e8]"
                                                }`}>
                                                    <Store className={`h-7 w-7 ${
                                                        accountType === "vendeur" ? "text-orange-600" : "text-[#b8a88a]"
                                                    }`} />
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-sm font-bold ${
                                                        accountType === "vendeur" ? "text-orange-700" : "text-zinc-700"
                                                    }`}>Vendeur</p>
                                                    <p className="text-xs text-zinc-400 mt-0.5">Vendre des vehicules</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Nom + Prenom */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="lastname" className="text-sm font-semibold text-zinc-700">
                                                Nom
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                <Input
                                                    id="lastname"
                                                    type="text"
                                                    placeholder="Votre nom"
                                                    className="pl-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="firstname" className="text-sm font-semibold text-zinc-700">
                                                Prenom
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                <Input
                                                    id="firstname"
                                                    type="text"
                                                    placeholder="Votre prenom"
                                                    className="pl-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email + Telephone */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="reg-email" className="text-sm font-semibold text-zinc-700">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                <Input
                                                    id="reg-email"
                                                    type="email"
                                                    placeholder="Email"
                                                    className="pl-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-semibold text-zinc-700">
                                                Telephone
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+225 XX XX XX XX"
                                                    className="pl-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Adresse */}
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-sm font-semibold text-zinc-700">
                                            Adresse
                                        </Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                            <Input
                                                id="address"
                                                type="text"
                                                placeholder="Abidjan, Cocody..."
                                                className="pl-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Password + Confirm */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="reg-password" className="text-sm font-semibold text-zinc-700">
                                                Mot de passe
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                <Input
                                                    id="reg-password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Mot de passe"
                                                    className="pl-11 pr-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password" className="text-sm font-semibold text-zinc-700">
                                                Confirmation
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                <Input
                                                    id="confirm-password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirmer"
                                                    className="pl-11 pr-11 h-12 rounded-xl bg-[#f5f0e8]/50 border-[#ede8de] focus:border-orange-500 focus:ring-orange-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        En creant un compte, vous acceptez nos{" "}
                                        <a href="#" className="text-orange-600 hover:underline font-medium">conditions d&apos;utilisation</a>
                                        {" "}et notre{" "}
                                        <a href="#" className="text-orange-600 hover:underline font-medium">politique de confidentialite</a>.
                                    </p>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm cursor-pointer shadow-lg shadow-orange-500/20"
                                    >
                                        Creer mon compte
                                    </Button>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-[#ede8de]" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="bg-white px-4 text-zinc-400 font-medium">ou</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-12 rounded-xl border-[#ede8de] bg-white hover:bg-[#f5f0e8]/50 text-zinc-700 font-bold text-sm cursor-pointer"
                                    >
                                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continuer avec Google
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-zinc-400 mt-6">
                    2025 Vroom CI. Tous droits reserves.
                </p>
            </div>
        </div>
    )
}

export default AuthPage
