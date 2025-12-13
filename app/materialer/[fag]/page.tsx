"use client"
import RenderMaterials from '@/lib/components/renderMaterials'
import Filters from '@/lib/components/filters'
import type { Material } from '@/lib/types'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FagPage({ searchParams }: { searchParams:Promise<{ kategori?: string }> }):React.ReactElement {
    const [query, setQuery] = React.useState<string>("")
    const pathName = usePathname()
    const {materials, error, loading} = useMaterials()
    const fag = pathName.split('/').pop()

    let filteredMaterialsByFag:Material[] | null = []
    let filteredMaterialsByFilter:Material[] | null = []

    if (materials && fag) {
        filteredMaterialsByFag = materials.filter(m => m.categories_array.some(cat => cat.toLowerCase().includes(fag)))

        if (query) {
            filteredMaterialsByFilter = filteredMaterialsByFag.filter(m => m.categories_array.some(cat => cat.toLowerCase().includes(query.toLowerCase())))
        }
    } else {
        filteredMaterialsByFag = materials
    }

    React.useEffect(() => {
        async function getQuery() {
            const params = await searchParams
            const query = params.kategori ? params.kategori : ""

            setQuery(query)
        } 
        
        getQuery()
    },[searchParams])

    return (
        <main className="pl-3 pr-3">
            <Link href="." className="inline-block mb-5 hover:underline">{'<-- '}Tilbage til fag</Link>
            <div className="block md:flex">
                
                <React.Suspense fallback={<div/>}>
                    <Filters filteredMaterials={filteredMaterialsByFag} />
                </React.Suspense>
                <RenderMaterials materials={filteredMaterialsByFilter.length === 0 ? filteredMaterialsByFag : filteredMaterialsByFilter} error={error} loading={loading} />
            </div>
        </main>
    )
}