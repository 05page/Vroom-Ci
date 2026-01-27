import { Car, ShoppingCart, Key } from "lucide-react"

const Services = () => {
    const services = [
        {
            title: "Achat de véhicule",
            description: "Parcourez notre catalogue de voitures vérifiées et trouvez celle qui correspond à votre style.",
            icon: <ShoppingCart className="h-10 w-10 text-orange-500" />,
        },
        {
            title: "Vente de véhicule",
            description: "Vendez votre voiture au meilleur prix et en toute sécurité grâce à notre plateforme.",
            icon: <Car className="h-10 w-10 text-orange-500" />,
        },
        {
            title: "Location longue durée",
            description: "Besoin d'un véhicule pour quelques jours ou mois ? Découvrez nos offres de location flexibles.",
            icon: <Key className="h-10 w-10 text-orange-500" />,
        }
    ]

    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 dark:text-white">Nos Services Premium</h2>
                    <div className="h-1.5 w-20 bg-orange-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all hover:shadow-2xl hover:-translate-y-2">
                            <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 w-fit rounded-xl transition-colors group-hover:bg-orange-500">
                                <span className="group-hover:text-white transition-colors">
                                    {service.icon}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
