import { Metadata } from 'next'
import SectionPageClient from './SectionPageClient'

const BASE_URL = 'https://www.skolebole.dk'

const sectionDescriptions: Record<string, string> = {
    dansk: 'Printklare dansk materialer til indskolingen – øv læsning, skrivning og fonologisk opmærksomhed med SkoleBole.',
    matematik: 'Printklare matematik materialer til indskolingen – øv tal, mængder og matematisk logisk tænkning med SkoleBole.',
    morgenopgaver: 'Printklare morgenopgaver til indskolingen – giv eleverne en rolig og struktureret start på skoledagen med SkoleBole.',
    demoopgaver: 'Printklare demoopgaver fra SkoleBole – prøv et udvalg af vores printklare læringsmaterialer til indskolingen.',
    boernehaveklassen: 'Printklare materialer til børnehaveklassen – intuitive og overskuelige opgaver klar til print fra SkoleBole.',
    '1.klasse': 'Printklare materialer til 1. klasse – øv faglige færdigheder med strukturerede opgaver klar til print fra SkoleBole.',
    dsa: 'Printklare DSA materialer til indskolingen – støttende opgaver til dansk som andetsprog fra SkoleBole.',
    specialundervisning: 'Printklare materialer til specialundervisning – differentierede opgaver klar til print fra SkoleBole.',
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
    return <SectionPageClient />
}