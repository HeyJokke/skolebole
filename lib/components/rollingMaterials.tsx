"use client"
import { orderMaterialsByDate } from "../database/db"
import MaterialCard from '@/lib/components/materialCard'
import React from 'react'
import type {Material} from '@/lib/types'

type Props = {
    title: string | null
    vertical: boolean
}

export default function RollingMaterials({title, vertical}:Props) {
    const [materials, setMaterials] = React.useState<Material[] | null>(null)
    let html:React.ReactElement[] = []

    const orientationClasses =  vertical ? "flex-col w-50" : "flex h-50"

    React.useEffect(() => {
        async function fetchMaterials() {
            const {data} = await orderMaterialsByDate(10)

            if (data) {
                setMaterials(data)
            }
        }

        fetchMaterials()
    })

    if (materials) {
        html = materials.map(m => {
            return (
                <React.Fragment key={m.id}>
                    <MaterialCard m={m}/>
                </React.Fragment>
            )
        })
    }
   
    return (
        <main className={`${orientationClasses}`}>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            {html}
        </main>
    )
}