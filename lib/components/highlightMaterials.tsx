"use client"
import { orderMaterialsByDate } from "../database/db"
import MaterialCard from '@/lib/components/materialCard'
import React from 'react'
import type {Material} from '@/lib/types'

type Props = {
    title: string | null
    vertical: boolean
    amount: number
}

export default function HighlightMaterials({title, vertical, amount}:Props) {
    const [materials, setMaterials] = React.useState<Material[] | null>(null)
    let html:React.ReactElement[] = []

    const mainClasses =  vertical ? `flex-col w-60` : `flex grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5`

    React.useEffect(() => {
        async function fetchMaterials() {
            const {data} = await orderMaterialsByDate(amount)

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
                    <div className="mt-3">
                        <MaterialCard m={m}/>
                    </div>
                </React.Fragment>
            )
        })
    }
   
    return (
        <main>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            <div className={`${mainClasses}`}>   
                {html}
            </div>
        </main>
    )
}