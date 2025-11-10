"use client"

import { useMaterials } from "@/lib/context/MaterialsProvider"
import React from 'react'
import RenderDatabase from "@/lib/components/renderDatabase"
import type { Material } from '@/lib/types'

export default function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }): React.ReactElement {
    const [query, setQuery] = React.useState("")
    const {materials,error,loading} = useMaterials()
    let filterMaterials:Material[] | null

    if ( query && materials ) {
        filterMaterials = materials.filter(m => {
            return m.name.toLowerCase().includes(query.toLowerCase()) || 
            m.description.toLowerCase().includes(query.toLowerCase()) ||
            m.categories_array.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
            m.meta_tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        })
    } else {
        filterMaterials = materials
    }

    React.useEffect(() => {
        async function getQuery() {
            const params = await searchParams
            const query = params.query ? params.query : ""

            setQuery(query)
        }

        getQuery()
    }, [searchParams])

    return (
        <main>
            <RenderDatabase materials={filterMaterials} error={error} query={query} loading={loading} />
        </main>
    )
}