import { Metadata } from 'next'
import SectionPageClient from './SectionPageClient'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://skolebole.dk'

const sectionDescriptions: Record<string, string> = {
    dansk: 'Undervisningsmaterialer til dansk i indskolingen - styrk læsning, skrivning og fonologisk opmærksomhed.',
    matematik: 'Matematikmaterialer til indskolingen - fokus på talforståelse, mængder og logisk tænkning.',
    morgenopgaver: 'Morgenopgaver til indskolingen - små overskuelige opgaver til en rolig start på dagen med fokus på repetitioen, selvstændigt arbejde og faglig træning.',
    demoopgaver: 'Printklare demoopgaver til indskolingen - prøv udvalgte undervisningsmaterialer fra Forlaget Kluddermor.',
    boernehaveklassen: 'Undervisningsmaterialer til børnehaveklassen - legende og strukturerede opgaver, der styrker sproglig udvikling og skoleparathed',
    '1.klasse': 'Undervisningsmaterialer til 1. klasse - styrk læsning, skrivning og talforståelse med strukturerede og differentierede opgaver til begynderundervisning.',
    dsa: 'Materiale til dansk som andetsprog i indskolingen - støttende opgaver til sprogsforståelse og begrebsudvikling.',
    specialundervisning: 'Differentierede undervisningsmaterialer til specialundervisning - strukturerede opgaver, der hjælper alle elever med at lykkes.',
}

function slugToDisplayName(section: string): string {
    if (section.toLowerCase() === 'dsa') return 'DSA'
    return (section[0].toUpperCase() + section.slice(1))
        .replace(/oe/g, 'ø')
        .replace(/aa/g, 'å')
        .replace(/ae/g, 'æ')
}

type Props = {
    params: Promise<{ section: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { section } = await params
    const displayName = slugToDisplayName(section)

    return {
        title: `${displayName} | SkoleBole`,
        description: sectionDescriptions[section.toLowerCase()] ?? `Find printklare læringsmaterialer til indskolingen hos SkoleBole.`,
        alternates: {
            canonical: `${BASE_URL}/materialer/${section}`,
        },
    }
}

export default function MaterialerSectionPage() {
    return <SectionPageClient sectionDescriptions={sectionDescriptions}/>
}