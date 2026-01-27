"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQ = () => {
    const faqs = [
        {
            question: "Quels documents sont nécessaires pour vendre mon véhicule ?",
            answer: "Vous aurez besoin de la carte grise originale, d'un certificat de non-gage de moins de 15 jours, et d'un contrôle technique valide de moins de 6 mois.",
        },
        {
            question: "Est-ce que les véhicules sur Vroom Ci sont inspectés ?",
            answer: "Oui, tous les véhicules listés avec le badge 'Vérifié' ont subi une inspection rigoureuse en 150 points par nos experts partenaires.",
        },
        {
            question: "Quels sont les frais de service de la plateforme ?",
            answer: "L'inscription et la recherche sont gratuites. Nous prélevons une commission fixe de 3% sur le montant de la transaction finale uniquement lors d'une vente réussie.",
        },
        {
            question: "Puis-je obtenir un financement via Vroom Ci ?",
            answer: "Absolument. Nous travaillons avec plusieurs banques locales pour vous proposer des solutions de crédit auto adaptées à votre budget.",
        }
    ]

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 dark:text-white">Questions Fréquentes</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">Tout ce que vous devez savoir pour démarrer sereinement.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all">
                            <button
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                            >
                                <span className="text-lg font-semibold dark:text-white">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-orange-500" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ
