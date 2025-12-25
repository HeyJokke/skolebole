"use client"
import MaterialCard from '@/lib/components/materialCard'
import type { Material } from '@/lib/types'
import { useMaterials } from "../context/MaterialsProvider"

type Props = {
    title: string | null
    vertical: boolean
    amount: number
}

export default function HighlightMaterials({title, vertical, amount}:Props) {
    const { materials } = useMaterials()
    
    if (materials) {
        const items:Material[] = materials.sort((a,b) => -1 * a.created_at.toString().localeCompare(b.created_at.toString(), undefined, {numeric: true})) ?? []

        const mainClasses =  vertical ? `flex-col md:w-60 w-full` : `flex grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5`
       
        return (
            <main>
                {title && <h2 className="text-2xl font-bold">{title}</h2>}
                <div className={`${mainClasses}`}>   
                {items.slice(0,amount).map(m => {
                    return (
                        <div key={m.id}>
                            <div className="mt-3">
                                <MaterialCard m={m}/>
                            </div>
                        </div>
                    )
                })}
                </div>
            </main>
        )
    }

    return null

}