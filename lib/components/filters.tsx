"use client"

import type {Material} from '@/lib/types'
import {useSearchParams, useRouter} from 'next/navigation'
import {useMaterials} from '@/lib/context/MaterialsProvider'

type FilterProps = {
    filteredMaterials: Material[] | null
}

export default function Filters({filteredMaterials}: FilterProps):React.ReactElement | null {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const uniqueCategories: string[] = []
    const {materials, loading, error} = useMaterials()
    const router = useRouter()

    function handleClick(cat:string | null):void {
        if (cat) {
            params.set('kategori', cat)
            router.push(`/materialer?${params}`)
        } else {
            params.set('kategori', '')
            router.push(`/materialer`)
        }
    }

    if (!filteredMaterials && materials) {
        materials.map(m => m.categories_array.map((cat) => {
            if (!uniqueCategories.includes(cat)) {
                uniqueCategories.push(cat)
            }
        }))
    }

    if (filteredMaterials) {
        filteredMaterials.map(m => m.categories_array.map((cat) => {
            if (!uniqueCategories.includes(cat)) {
                uniqueCategories.push(cat)
            }
        }))
    }

    return (
        <main className='mb-10 md:mr-5 min-w-[200]'>
            <h2 className="text-xl font-bold">Sortér efter:</h2>
            {(!loading && !error) && <ul className="min-w-[150px]">
                <li onClick={() => handleClick(null)} className={`text-xl lg:text-base cursor-pointer ml-3 mt-1 hover:underline`}>
                    Nulstil
                </li>
                {uniqueCategories.map(cat => (
                        <li onClick={() => handleClick(cat)} className={`cursor-pointer ml-3 mt-1 hover:underline text-xl lg:text-base ${params.get('kategori') === cat ? 'font-bold text-2xl lg:text-xl' : null}`} key={cat}>
                            {cat[0].toUpperCase() + cat.slice(1)}
                        </li>
                ))}
            </ul>}
        </main>
    )
}