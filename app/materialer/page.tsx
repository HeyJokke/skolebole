"use client"
import RenderMaterials from '@/lib/components/renderMaterials'
import Filters from '@/lib/components/filters'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import React from 'react'
import {useSearchParams} from 'next/navigation'
import type { Material } from '@/lib/types'

export default function MaterialerPage():React.ReactElement {
    const {materials, error, loading} = useMaterials()
    const [filteredMaterials, setFilteredMaterials] = React.useState<Material[] | null>(null)
    const searchParams = useSearchParams()

   React.useEffect(() => {
       async function getQuery() {
            const query = searchParams.get('kategori') ? searchParams.get('kategori') : ""

            if (materials) {
                setFilteredMaterials(materials)
            }
            
            if (query && materials) {
                setFilteredMaterials(materials.filter(m => m.categories_array.some(cat => cat.toLowerCase().includes(query.toLowerCase()))))
            }
       } 
       
       getQuery()
   },[searchParams, materials])
   
    return (
        <main className="m-2 lg:m-5">
            <div className="block md:flex">
                <React.Suspense fallback={<div/>}>
                    <Filters filteredMaterials={materials} />
                </React.Suspense>
                <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
            </div>
        </main>
    )
}