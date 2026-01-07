"use client"

import { useMaterials } from "@/lib/context/MaterialsProvider"
import React from 'react'
import RenderMaterials from "@/lib/components/renderMaterials"
import type { Material } from '@/lib/types'
import {useSearchParams} from 'next/navigation'

export default function SearchPage():React.ReactElement {
    const searchParam = useSearchParams()
    const [query, setQuery] = React.useState<string>('')
    const {materials, error, loading} = useMaterials()
    let filteredMaterials:Material[] | null = []

    if ( query && materials ) {
        filteredMaterials = materials.filter(m => {
            return m.name.toLowerCase().includes(query.toLowerCase()) || 
            m.short_description.toLowerCase().includes(query.toLowerCase()) ||
            m.categories_array.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
            m.meta_tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        })
    } else {
        filteredMaterials = materials
    }

    React.useEffect(() => {
        async function getQuery() {
            setQuery(searchParam.get('q') ?? '')
        }

        getQuery()
    }, [searchParam])  

    return (
        <main className="pl-3 pr-3 sm:m-2 md:m-5">
            {
                (filteredMaterials ?? []).length > 0 && 
                <h1 className="text-2xl font-bold mb-10">Søgeresultater for {`'${query}'`} </h1>
            }
            <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
        </main>
    )
}