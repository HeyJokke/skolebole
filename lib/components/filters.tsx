"use client"

import type {Material} from '@/lib/types'
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import {useMaterials} from '@/lib/context/MaterialsProvider'

type FilterProps = {
    filteredMaterials: Material[] | null
}

export default function Filters({filteredMaterials}: FilterProps):React.ReactElement | null {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const params = new URLSearchParams(searchParams)
    const uniqueCategories: string[] = []
    const {materials, loading, error} = useMaterials()
    const router = useRouter()

    function handleClick(cat:string | null):void {
        if (cat) {
            console.log(pathName)
            params.set('kategori', cat)
            router.push(`${pathName}?${params}`)
        } else {
            params.set('kategori', '')
            router.push(pathName)
        }
    }

    if (!filteredMaterials && materials) {
        filteredMaterials = materials
    }

    if (filteredMaterials) {
        filteredMaterials.map(m => m.categories_array.map((cat) => {
            if (!uniqueCategories.includes(cat[0].toLowerCase() + cat.slice(1))) {
                uniqueCategories.push(cat[0].toLowerCase() + cat.slice(1))
            }
        }))
    }

    return (
        <main className='mb-10 md:mr-5 min-w-[200]'>
            <h2 className="text-xl font-bold">Sortér efter:</h2>
            {(!loading && !error) && <ul className="min-w-[150px]">
                <li onClick={() => handleClick(null)} className={`text-xl lg:text-base cursor-pointer ml-3 mt-1 hover:underline hover:scale-105`}>
                    Nulstil
                </li>
                {uniqueCategories.sort((a,b) => a.localeCompare(b)).map(cat => (
                        <li onClick={() => handleClick(cat)} className={`cursor-pointer ml-3 mt-1 text-xl lg:text-base hover:scale-105 bg-white rounded-xl p-1 ${params.get('kategori') === cat ? 'font-bold text-2xl lg:text-lg' : null}`} key={cat}>
                            {cat[0].toUpperCase() + cat.slice(1)}
                        </li>
                ))}
            </ul>}
        </main>
    )
}