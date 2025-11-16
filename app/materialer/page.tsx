"use client"
import React from 'react'
import { getAllMaterials  } from '@/lib/database/db'
import type { Material } from '@/lib/types'
import RenderMaterials from '@/lib/components/renderMaterials'
import {useMaterials} from "@/lib/context/MaterialsProvider"

export default function Materialer() {
    const [materials, setMaterials] = React.useState<Material[] | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const {loading} = useMaterials()
    
    React.useEffect(() => {
        async function fetchData() {
            const {data, error} = await getAllMaterials()

            if (error) {
                setError(error)
            } else {
                setMaterials(data)
            }
        }

        fetchData()
    },[])

    return (
        <main>
            <h1 className="text-3xl font-bold mb-10">Alle materialer</h1>
            <RenderMaterials materials={materials} error={error} loading={loading} />
        </main>

    )
}