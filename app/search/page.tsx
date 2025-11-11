"use client"

import { useMaterials } from "@/lib/context/MaterialsProvider"
import React from 'react'
import RenderMaterials from "@/lib/components/renderMaterials"
import type { Material } from '@/lib/types'

export default function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }): React.ReactElement {
    const [query, setQuery] = React.useState("")
    const {materials,error,loading} = useMaterials()
    let filteredMaterials:Material[] | null = []

    if ( query && materials ) {
        filteredMaterials = materials.filter(m => {
            return m.name.toLowerCase().includes(query.toLowerCase()) || 
            m.description.toLowerCase().includes(query.toLowerCase()) ||
            m.categories_array.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
            m.meta_tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        })
    } else {
        filteredMaterials = materials
    }

    React.useEffect(() => {
        async function getQuery() {
            const params = await searchParams
            const query = params.query ? params.query : ""

            setQuery(query)
        }

        getQuery()
    }, [searchParams])

    if (!query) return <h1 className="text-2xl font-bold">Søg efter et materiale...</h1>

    return (
        <main>
            {
                (filteredMaterials ?? []).length > 0 && 
                <h1 className="text-2xl font-bold mb-10">Søgeresultater... </h1>
            }
            <RenderMaterials materials={filteredMaterials} error={error} query={query} loading={loading} />
        </main>
    )
}