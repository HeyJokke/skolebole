"use client"
import RenderMaterials from '@/lib/components/renderMaterials'
import Filters from '@/lib/components/filters'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import React from 'react'
import PreviousPage from '@/lib/components/PreviousPage'

export default function MaterialerPage():React.ReactElement {
    const {materials, error, loading} = useMaterials()
    /*
    const pathName = usePathname()
    const [query, setQuery] = React.useState<string>("")
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
    */

    return (
        <main className="m-5">
            <div className="block md:flex">
                
                <React.Suspense fallback={<div/>}>
                    <Filters filteredMaterials={materials} />
                </React.Suspense>
                <RenderMaterials materials={materials} error={error} loading={loading} />
            </div>
        </main>
    )
}