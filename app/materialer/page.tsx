"use client"
import RenderMaterials from '@/lib/components/renderMaterials'
import Filters from '@/lib/components/filters'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import React from 'react'
import {useSearchParams} from 'next/navigation'
import type { Material } from '@/lib/types'
import PreviousPage from '@/lib/components/PreviousPage'

export default function Materialer():React.ReactElement {    
    const [filteredMaterials, setFilteredMaterials] = React.useState<Material[] | null>(null)
    const {materials, loading, error} = useMaterials()
    const searchParams = useSearchParams()
    const query = searchParams.get('kategori') ? searchParams.get('kategori') : ""

    React.useEffect(() => {
        async function getQuery() {
                if (query && materials) {
                    setFilteredMaterials(materials.filter(m => 
                    m.categories_array.some(cat =>
                                cat
                                    .toLowerCase().replace(/[ø]/gi, 'oe').replace(/[å]/gi, 'aa').replace(/[æ]/gi, 'ae')
                                    .includes(query.toLowerCase()) 
                            )
                        )
                    )
                } else {
                    setFilteredMaterials(materials)
                }
            }
            
            getQuery()
        },[materials, query])

    return (
        <main className="m-2 lg:m-5">
            <div className="block md:flex">
                <div className="h-fit min-w-[200] w-auto">
                    <PreviousPage />
                    <React.Suspense fallback={<div/>}>
                        <Filters section={null} />
                    </React.Suspense>
                </div>
                <div className="w-full">
                    <h1 className="text-3xl font-bold mb-5">Alle materialer</h1>
                    <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
                </div>
            </div>
        </main>
    )
}