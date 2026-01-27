import { Search, Calculator, CheckCircle } from "lucide-react"

const HowItWorks = () => {
    const steps = [
        {
            title: "Trouvez votre favori",
            description: "Utilisez nos filtres intelligents pour trouver le véhicule idéal parmi des centaines d'options.",
            icon: <Search className="h-8 w-8 text-white" />,
        },
        {
            title: "Planifiez un essai",
            description: "Contactez le vendeur et réservez un créneau directement depuis la plateforme pour voir le véhicule.",
            icon: <Calculator className="h-8 w-8 text-white" />,
        },
        {
            title: "Partez au volant",
            description: "Finalisez la transaction en toute sécurité et recevez vos documents officiels.",
            icon: <CheckCircle className="h-8 w-8 text-white" />,
        }
    ]

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 dark:text-white">Comment ça marche ?</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">Le processus d'achat le plus simple du marché.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center max-w-sm text-center">
                            <div className="relative">
                                <div className="h-20 w-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg relative z-10">
                                    {step.icon}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-10 left-20 w-full h-[2px] border-t-2 border-dashed border-orange-200 dark:border-orange-900" />
                                )}
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-zinc-800 dark:bg-zinc-700 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white dark:border-zinc-900">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mt-8 mb-4 dark:text-white">{step.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
