import type { Material } from '@/lib/types'

type Props = {
    materials: Material[] | null
    error: string | null
}

export default function RenderDatabase({materials, error}: Props) {
    
    if (!materials && !error) return <p>Loading database...</p>

    if (error) return <p className="text-white bg-red-500 rounded-md p-2"> An error occured, the database may be down or connection has been lost </p>

    if (materials?.length === 0) return <p className="text-white bg-red-500 rounded-md p-2"> No results were found </p>

    if (materials) return <pre>{JSON.stringify(materials, null, 2)}</pre>

    return null
}