"use client"

import {useMaterials} from '@/lib/context/MaterialsProvider'
import filterMaterialsByCategory from '@/lib/hooks/filterMaterialsByCategory'
import RenderMaterials from '@/lib/components/renderMaterials'

export default function DanskPage():React.ReactElement {
    const {materials, error, loading} = useMaterials()
    const category = "dansk"

    const filteredMaterials = filterMaterialsByCategory({materials, category})

    return (
        <main className="h-full min-h-screen">
            <h1 className="text-3xl font-bold mb-10">Dansk page</h1>
            <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
        </main>
    )
}