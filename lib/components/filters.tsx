"use client"

import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import {useMaterials} from '@/lib/context/MaterialsProvider'
import React from 'react'

type FilterProps = {
    section: string | null
}

export default function Filters({section}: FilterProps):React.ReactElement | null {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const params = new URLSearchParams(searchParams)
    const uniqueCategories: string[] = []
    const {materials, loading, error} = useMaterials()
    const router = useRouter()

    function handleClick(cat:string | null):void {
        if (cat) {
            params.set('kategori', cat.replace(/[ø]/gi, 'oe').replace(/[å]/gi, 'aa').replace(/[æ]/gi, 'ae'))
            router.push(`${pathName}?${params}`)
        } else {
            params.set('kategori', '')
            router.push(pathName)
        }
    }

    if (materials && section) {
        const filteredMaterials = materials.filter(m => m.categories_array.some(cat => cat.toLowerCase().replace(/[ø]/gi, 'oe').replace(/[å]/gi, 'aa').replace(/[æ]/gi, 'ae') === section.toLowerCase()))

        if (filteredMaterials && section) {
            filteredMaterials.map(m => m.categories_array.map((cat) => {
                if (!uniqueCategories.includes(cat[0].toLowerCase() + cat.slice(1))) {
                    if (cat.toLowerCase().replace(/[ø]/gi, 'oe').replace(/[å]/gi, 'aa').replace(/[æ]/gi, 'ae') != section.toLowerCase()) {
                        uniqueCategories.push(cat[0].toLowerCase() + cat.slice(1))
                    }
                }
            }))
        }
    } else {
        const filteredMaterials = materials

        if (filteredMaterials) {
            filteredMaterials.map(m => m.categories_array.map((cat) => {
                if (!uniqueCategories.includes(cat[0].toLowerCase() + cat.slice(1))) {
                    uniqueCategories.push(cat[0].toLowerCase() + cat.slice(1))
                }
            }))
        }

    }

    

    return (
        <main className='mb-10 md:mr-5 min-w-[200]'>
            <h2 className="text-xl font-bold">Sortér efter:</h2>
            {(!loading && !error) && <ul className="min-w-[150px]">
                <li onClick={() => handleClick(null)} className={`cursor-pointer ml-1 mt-1 p-2 text-slate-700 font-extrabold hover:scale-105 transform-size duration-200 bg-white/70 hover:bg-white rounded-xl w-full md:w-fit text-xl md:text-base text-center`}>
                    Nulstil
                </li>
                {uniqueCategories.sort((a,b) => a.localeCompare(b)).map(cat => (
                        <li onClick={() => handleClick(cat)} className={`cursor-pointer ml-1 mt-1 p-2 text-slate-700 font-extrabold hover:scale-105 transform-size duration-200 rounded-xl w-full md:w-fit text-xl md:text-base text-center ${params.get('kategori') === cat.replace(/[ø]/gi, 'oe').replace(/[å]/gi, 'aa').replace(/[æ]/gi, 'ae') ? 'bg-blue-200 shadow-md' : "bg-white/70 hover:bg-white"}`} key={cat.replace(/[ø]/gi, 'oe').replace(/[å]/gi, 'aa').replace(/[æ]/gi, 'ae')}>
                            {cat[0].toUpperCase() + cat.slice(1)}
                        </li>
                ))}
            </ul>}
        </main>
    )
}