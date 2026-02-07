"use client"

import { colonnes, Vehicules } from "./colonnes"
import { DataTable } from "./data-table"

function getData(): Vehicules[] {
    return [
        { id: 1, marque: "Toyota", modele: "Land Cruiser 2024", annee: "2024", prix: "42 000 000", type: "vente", carburant: "Diesel", kilometrage: "12 500", statut: "disponible", vues: 523, favoris: 45, messages: 18, dateAjout: "15 Jan 2025" },
        { id: 2, marque: "Mercedes", modele: "Classe E 300", annee: "2023", prix: "35 000 000", type: "vente", carburant: "Essence", kilometrage: "28 000", statut: "disponible", vues: 412, favoris: 38, messages: 15, dateAjout: "20 Jan 2025" },
        { id: 3, marque: "BMW", modele: "X5 xDrive40i", annee: "2024", prix: "55 000 / jour", type: "location", carburant: "Essence", kilometrage: "8 200", statut: "loue", vues: 389, favoris: 29, messages: 12, dateAjout: "25 Jan 2025" },
        { id: 4, marque: "Peugeot", modele: "5008 GT", annee: "2023", prix: "22 500 000", type: "vente", carburant: "Diesel", kilometrage: "35 000", statut: "vendu", vues: 756, favoris: 62, messages: 34, dateAjout: "10 Jan 2025" },
        { id: 5, marque: "Toyota", modele: "Hilux Double Cab", annee: "2024", prix: "28 000 000", type: "vente", carburant: "Diesel", kilometrage: "5 800", statut: "disponible", vues: 298, favoris: 22, messages: 9, dateAjout: "28 Jan 2025" },
        { id: 6, marque: "Mercedes", modele: "GLC 300 4MATIC", annee: "2023", prix: "65 000 / jour", type: "location", carburant: "Essence", kilometrage: "15 400", statut: "loue", vues: 187, favoris: 14, messages: 6, dateAjout: "05 Jan 2025" },
        { id: 7, marque: "BMW", modele: "Serie 3 320d", annee: "2023", prix: "24 000 000", type: "vente", carburant: "Diesel", kilometrage: "18 600", statut: "vendu", vues: 634, favoris: 51, messages: 27, dateAjout: "02 Jan 2025" },
        { id: 8, marque: "Toyota", modele: "RAV4 Hybride", annee: "2024", prix: "45 000 / jour", type: "location", carburant: "Hybride", kilometrage: "3 200", statut: "disponible", vues: 445, favoris: 36, messages: 20, dateAjout: "30 Jan 2025" },
        { id: 9, marque: "Peugeot", modele: "3008 GT Line", annee: "2024", prix: "19 500 000", type: "vente", carburant: "Essence", kilometrage: "0", statut: "reserve", vues: 312, favoris: 28, messages: 14, dateAjout: "01 Fev 2025" },
    ]
}

export default function MonGaragePage() {
    const data = getData()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Mon Garage</h1>
                <p className="text-muted-foreground">
                    Gerez vos vehicules publies sur la plateforme.
                </p>
            </div>

            <DataTable columns={colonnes} data={data} />
        </div>
    )
}
