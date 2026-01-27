import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-zinc-950 text-zinc-400 py-20 border-t border-zinc-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white">Vroom <span className="text-orange-500">Ci</span></h3>
                        <p className="leading-relaxed">
                            La première plateforme de confiance pour l'achat et la vente de véhicules en Côte d'Ivoire.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Liens Rapides</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Acheter une voiture</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Vendre mon véhicule</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Louer une auto</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Estimation gratuite</a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Informations</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">À propos de nous</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Conditions Générales</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Politique de Confidentialité</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Blog & Actualités</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-orange-500" />
                                <span>+225 01 02 03 04 05</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-orange-500" />
                                <span>contact@vroom.ci</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-orange-500" />
                                <span>Abidjan, Côte d'Ivoire</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 text-center text-sm">
                    <p>© {new Date().getFullYear()} Vroom Ci. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
