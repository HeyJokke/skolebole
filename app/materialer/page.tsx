import { Metadata } from 'next'
import MaterialerClient from './MaterialerClient'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://skolebole.dk'

export const metadata: Metadata = {
    title: 'Alle materialer | SkoleBole',
    description: 'Hos SkoleBole finder du printklare kopisider til den første læsning, sproglig og fonologisk opmærksomhed samt matematisk logisk tænkning.',
    alternates: {
        canonical: `${BASE_URL}/materialer`,
    },
}

export default function MaterialerPage() {
    return <MaterialerClient />
}