import { MetadataRoute } from 'next'
import { getShownMaterials } from '@/lib/database/queries'

const BASE_URL = 'https://www.skolebole.dk'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: materials } = await getShownMaterials()

    const materialUrls: MetadataRoute.Sitemap = materials?.map((m) => {
        const primaryCategory = m.categories_array[0]
            .toLowerCase()
            .normalize('NFC')
            .replace(/[ø]/gi, 'oe')
            .replace(/[æ]/gi, 'ae')
            .replace(/[å]/gi, 'aa')

        return {
            url: `${BASE_URL}/materialer/${primaryCategory}/${m.id}`,
            lastModified: new Date(m.created_at),
            changeFrequency: 'monthly',
            priority: 0.8,
        }
    }) ?? []

    return [
        {
            url: BASE_URL,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/materialer`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/maanedsside`,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/kontakt`,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...materialUrls,
    ]
}