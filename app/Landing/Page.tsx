"use client"

import Hero from "./Hero"
import Services from "./Services"
import HowItWorks from "./HowItWorks"
import FAQ from "./FAQ"
import Footer from "./Footer"

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
            {/* Le padding top est géré dans le layout global ou via le h-screen du Hero si besoin, 
                mais ici on laisse le Hero prendre sa place sous le Header fixe */}
            <main className="flex-1 pt-16">
                <Hero />
                <Services />
                <HowItWorks />
                <FAQ />
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage
