import { Metadata } from "next";
import MaanedssidePageClient from "./MaanedssidePageClient";

const BASE_URL = 'https://skolebole.dk'

export const metadata:Metadata = {
    title: 'Månedens materialer | SkoleBole',
    description: 'Månedsaktuelle printklare opgaver til indskolingen – klar til brug direkte i undervisningen. Opdateres hver måned med nyt indhold fra SkoleBole.',
    alternates: {
        canonical: `${BASE_URL}/maanedsside`
    }
}

export default function MaanedssidePage() {
    return <MaanedssidePageClient />
}