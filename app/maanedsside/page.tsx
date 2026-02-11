"use client"
import RenderMaterials from '@/lib/components/renderMaterials'
import {useMaterials} from "@/lib/context/MaterialsProvider"
import React from 'react'
import type { Material } from '@/lib/types'
import PreviousPage from '@/lib/components/PreviousPage'

export default function MaanedsPage() {
    const [filteredMaterials, setFilteredMaterials] = React.useState<Material[] | null>(null)
    const {materials, loading, error} = useMaterials()
    const nMonth = (new Date).getMonth()
    const months = [
    "januar",
    "februar",
    "marts",
    "april",
    "maj",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "december"
    ]
    const currentMonth = months[nMonth]
    
    React.useEffect(() => {
        async function getQuery() {
                let filteredMaterialsByMonth:Material[] = []
                
                if (materials && currentMonth) {
                    filteredMaterialsByMonth = materials.filter(m => 
                        m.name.toLowerCase().includes(currentMonth) || 
                        m.short_description.toLowerCase().includes(currentMonth) ||
                        m.categories_array.some(cat => cat.toLowerCase().includes(currentMonth)) ||
                        m.meta_tags?.some(tag => tag.toLowerCase().includes(currentMonth))
                    )
                    setFilteredMaterials(filteredMaterialsByMonth)
                }
            } 
            
        getQuery()
    },[materials, currentMonth])

    return (
        <main className="m-2 lg:m-5">
            <div className="flex flex-col">
                <div>
                    <PreviousPage />
                </div>
                <div className="w-full">
                    <h1 className="text-4xl font-bold mb-5 font-bubblegum-sans">{`${currentMonth[0].toUpperCase()}${currentMonth.slice(1).toLowerCase()}`}</h1>
                    <p className="text-base/6 mb-5">
                        Her finder du en række månedsaktuelle opgaver, som passer til årstiden og det, der fylder lige nu i skolen. Materialerne er klar til print og kan bruges direkte - til morgenstart, ekstra tid, repetition eller som et lille pusterum i hverdagen. Hver måned opdateres siden med nyt indhold, så du altid har noget relevant og overskueligt lige ved hånden.
                    </p>
                    <RenderMaterials materials={filteredMaterials} error={error} loading={loading} />
                </div>
            </div>
        </main>
    )
}