"use client"
import RenderMaterials from '@/lib/components/renderMaterials'
import Filters from '@/lib/components/filters'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import React from 'react'
import {useSearchParams, usePathname} from 'next/navigation'
import type { Material } from '@/lib/types'
import PreviousPage from '@/lib/components/PreviousPage'

export default function MaterialerPage():React.ReactElement {
    const {materials, error, loading} = useMaterials()
    const [filteredMaterials, setFilteredMaterials] = React.useState<Material[] | null>(null)
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const section = pathName.split('/').pop() ?? null
    const query = searchParams.get('kategori') ? searchParams.get('kategori') : ""

    React.useEffect(() => {
        async function getQuery() {
                let filteredMaterialsBySection:Material[] = []
                
                if (materials && section) {
                    filteredMaterialsBySection = materials.filter(m => m.categories_array.some(cat => cat.toLowerCase().normalize('NFC').replace(/[ø]/gi, 'oe').replace(/[æ]/gi, 'ae').replace(/[å]/gi, 'aa') === section.toLowerCase()))
                    setFilteredMaterials(filteredMaterialsBySection)

                    if (query && filteredMaterialsBySection) {
                        setFilteredMaterials(filteredMaterialsBySection.filter(m => 
                        m.categories_array.some(cat =>
                                    cat
                                        .toLowerCase().normalize('NFC').replace(/[ø]/gi, 'oe').replace(/[æ]/gi, 'ae').replace(/[å]/gi, 'aa')
                                        .includes(query.toLowerCase()) 
                                )
                            )
                        )
                    }
                }
            } 
            
            getQuery()
        },[materials, section, query])
    
    return (
        <main className="m-2 lg:m-5">
            <div className="block md:flex">
                <div className="h-fit min-w-[200] w-auto">
                    <PreviousPage />
                    <React.Suspense fallback={<div/>}>
                        {section ? 
                            <Filters section={section} month={null} /> :
                            <div></div>
                        }
                    </React.Suspense>
                </div>
                <div className="w-full">
                    {section && <h1 className="text-4xl font-bold mb-5 font-bubblegum-sans">{section.toLowerCase() === 'dsa' ? section.replace('oe', 'ø').replace('aa', 'å').replace('ae', 'æ').toUpperCase() : (section[0].toUpperCase() + section.slice(1)).replace('oe', 'ø').replace('aa', 'å').replace('ae', 'æ')}</h1>}
                    <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
                </div>
            </div>
        </main>
    )
}