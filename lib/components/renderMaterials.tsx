import type { Material } from '@/lib/types'
import MaterialCard from '@/lib/components/materialCard'
import React from 'react'

type Props = {
    materials: Material[] | null
    error: string | null
    query: string | null
    loading: boolean
}

const Spinner = () => (
    <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-5 border-blue-500"></div>
    </div>
)

export default function RenderMaterials({materials, error, query, loading}: Props) {
    const [showContent, setShowContent] = React.useState(false)
    console.log(materials)
    React.useEffect(() => {
        setShowContent(false)
        const timer = setTimeout(() => {
            setShowContent(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [materials])

    if (!showContent) return <Spinner />
    
    if (!materials && !error || loading) return <p>Loading database...</p>

    if (error) return <p className="text-white bg-red-500 rounded-md p-2"> An error occured, the database may be down or connection has been lost </p>

    if (materials?.length === 0) return <h1 className="text-2xl font-bold"> Ingen resultater... </h1>

    if (materials) {
        const html = materials.map((m:Material) => <MaterialCard key={m.id} m={m}/>)

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {html}
            </div>
        )
    }

    return null
}