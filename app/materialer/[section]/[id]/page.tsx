import { Metadata } from 'next'
import { supabase, dbName } from '@/lib/database/supabaseClient'
import type { Material } from '@/lib/types'
import ProductPageClient from './ProductPageClient'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://skolebole.dk'

async function getMaterialById(id: number): Promise<Material | null> {
    const { data, error } = await supabase
        .from(dbName)
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null
    return data as Material
}

export async function generateMetadata({ params }: { params: Promise<{ section: string; id: string }> }): Promise<Metadata> {
    const { section, id } = await params
    const material = await getMaterialById(Number(id))

    return {
        title: material ? `${material.name} | SkoleBole` : 'Materiale ikke fundet | SkoleBole',
        description: material ? `${material.short_description} – Printklart læringsmateriale til indskolingen fra SkoleBole.` : undefined,
        alternates: {
            canonical: `${BASE_URL}/materialer/${section}/${id}`,
        },
        openGraph: material ? {
        title: material.name,
        description: material.short_description,
        url: `${BASE_URL}/materialer/${section}/${id}`,
        images: [
            {
                url: material.image_path || `${BASE_URL}/images/skolebole_fallback.png`,
            }
        ],
        } : undefined
    }
}

export default function Page({ params }: { params: Promise<{ section: string; id: string }> }) {
    return <ProductPageClient params={params} />
}