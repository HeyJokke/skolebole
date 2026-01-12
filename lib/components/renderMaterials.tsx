"use client"
import type { Material } from '@/lib/types'
import MaterialCard from '@/lib/components/materialCard'

type Props = {
    materials: Material[] | null
    error: string | null
    loading: boolean
}

const Spinner = () => (
    <div className="flex m-auto justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-5 border-blue-500"></div>
    </div>
)

export default function RenderMaterials({materials, error, loading}: Props) {
    if (loading || !materials) return <Spinner />

    if (error) return <p className="mx-auto text-white bg-red-500 rounded-md p-2 h-full"> Der skete en fejl </p>

    if (materials.length === 0) return <h1 className="text-2xl font-bold"> Ingen resultater... </h1>

    const html = materials.sort((a:Material, b:Material) => a.name.localeCompare(b.name, undefined, {numeric: true, sensitivity: 'base'})).map((m:Material) => <MaterialCard key={m.id} m={m}/>)

    return (
        <main className="md:flex">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {html}
            </div>
        </main>
    )
}