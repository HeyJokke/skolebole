"use client"
import {useMaterials} from '@/lib/context/MaterialsProvider'
import type {Material} from '@/lib/types'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductPage({ params }:
    {params: Promise<{id: number}>}
) {
    const {materials} = useMaterials()
    const [m, setM] = React.useState<Material>()
    const [materialId, setMaterialId] = React.useState<number | null>(null)
    
    React.useEffect(() => {
        async function identifyMaterial() {
            const { id } = await params
            setMaterialId(Number(id))

            if (materials) {
                setM(materials.filter((m) => m.id === materialId)[0])
            }

        }
        identifyMaterial()
    })

    return (
        <main className="h-screen">
            {!m ? 
                <>
                    <Link href="." className="hover:underline">{'<-- '}Tilbage til katalog</Link>
                    <h1 className="text-3xl font-bold mt-5">Dette er produktsiden for {m.name}</h1>
                </>
            : null}
        </main>
    )
}