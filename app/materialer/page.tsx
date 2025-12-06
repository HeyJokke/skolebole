"use client"
import React from 'react'
import type { Material } from '@/lib/types'
import RenderMaterials from '@/lib/components/renderMaterials'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import Filters from '@/lib/components/filters'

export default function Materialer({ searchParams }: { searchParams:Promise<{ kategori?: string }> }):React.ReactElement {
    const [query, setQuery] = React.useState<string>("")
    const {materials, error, loading} = useMaterials()
    let filteredMaterials:Material[] | null = []

    React.useEffect(() => {
        async function getQuery() {
            const params = await searchParams
            const query = params.kategori ? params.kategori : ""

            setQuery(query)
        } 
        
        getQuery()
    },[searchParams])

    if (query && materials) {
        filteredMaterials = materials.filter(m => m.categories_array.some(cat => cat.toLowerCase().includes(query.toLowerCase())))
    } else {
        filteredMaterials = materials
    }

    return (
        <main>
            <h1 className="text-3xl font-bold mb-10">Alle materialer</h1>
            <div className="block md:flex">
                <React.Suspense fallback={<div />}> 
                    <Filters filteredMaterials={null} />
                </React.Suspense>
                <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
            </div>
        </main>

    )
}