"use server"
import { orderMaterialsByDate } from "../database/db"
import MaterialCard from '@/lib/components/materialCard'
import type {Material} from '@/lib/types'

type Props = {
    title: string | null
    vertical: boolean
    amount: number
}

export default async function HighlightMaterials({title, vertical, amount}:Props) {
    const {data:materials} = await orderMaterialsByDate(amount)

    const mainClasses =  vertical ? `flex-col w-60` : `flex grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5`

    const items:Material[] =  materials ?? []
   
    return (
        <main>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            <div className={`${mainClasses}`}>   
            {items.map(m => {
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