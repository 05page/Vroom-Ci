import Image from "next/image"
import { Button } from "@/components/ui/button"

const Hero = () => {
    return (
        <section className="relative h-[85vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/vehicle/img1.jpg"
                    alt="Hero Vehicle"
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                    Trouvez votre <span className="text-orange-500">véhicule idéal</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-100 max-w-2xl mb-10 drop-shadow-lg">
                    Revendez, achetez ou louez la voiture de vos rêves avec Vroom Ci. Des centaines de véhicules vérifiés vous attendent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white border-none px-10 py-7 text-lg rounded-full transition-all hover:scale-105 shadow-xl">
                        Acheter un véhicule
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-10 py-7 text-lg rounded-full transition-all hover:scale-105">
                        Vendre le mien
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Hero
