"use client"

import { useMaterials } from '@/lib/context/MaterialsProvider'
import type { Material } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import { IncrementDownload } from './action'
import PreviousPage from '@/lib/components/PreviousPage'
import { IoMdDownload } from "react-icons/io";

const Spinner = () => (
    <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-5 border-blue-500"></div>
    </div>
)

export default function ProductPage({ params }:
    {params: Promise<{id: number}>}
) {
    const {materials, loading} = useMaterials()
    const [m, setM] = React.useState<Material>()
    const [materialId, setMaterialId] = React.useState<number | null>(null)
    const categoryClasses = {
        dansk: "bg-blue-100 text-blue-700",
        matematik: "bg-green-100 text-green-700",
        børnehaveklassen: "bg-purple-100 text-purple-700",
        dsa: "bg-yellow-100 text-yellow-700",
        specialundervisning: "bg-red-100 text-red-700",
        sprog: "bg-gray-100 text-gray-700"
    }


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
    
    function pdfRedirect(m:Material) {
        IncrementDownload(m)
        window.open(m.pdf_path, '_blank', 'noopener,noreferrer')
    }

    return (
        <main className="bg-white/90 shadow-xl rounded-lg p-4 md:p-8 m-2 md:m-5">
            <PreviousPage />
            {m && !loading ? 
                <>  
                    <header>
                        <h1 className="text-3xl font-bold">{m.name}</h1>
                        <div className='sm:overflow-wrap'>
                            <p className="italic mr-2 mb-2">{m.short_description}</p>

                            <div className="flex flex-wrap gap-1 mt-3 lg:mt-0">
                                {m.categories_array.sort((a:string,b:string) => a.localeCompare(b)).map((cat:string) => (
                                    <span 
                                        key={cat} 
                                        className={`w-fit h-fit mr-1 px-2 py-1 text-xs font-medium rounded-full ${categoryClasses[cat.toLowerCase() as keyof typeof categoryClasses] ?? 'bg-orange-100 text-orange-700'}`}
                                    >
                                        {cat[0].toUpperCase() + cat.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </header>
                    <div className="lg:flex block mt-4 p-4 md:p-8">
                        <div className="block lg:w-2/5 sm:w-full mr-auto ml-auto">
                            <Image 
                                alt={`Produktbillede for ${m.name}`} 
                                src={m.image_path ? m.image_path : '/images/skolebole_fallback.png'}
                                width={600}
                                height={600}
                                className="w-full"
                            />
                            
                        </div>
                        <div className="lg:w-3/5 w-full">
                            <pre className="lg:ml-10 text-base/6 text-clip mt-5 lg:mt-0 text-wrap w-full wrap-break-word font-sans">{m.long_description}</pre>
                            <button onClick={() => pdfRedirect(m)} className="flex items-center justify-center lg:ml-10 mt-10 w-full lg:w-40 rounded-lg h-15 bg-green-300 text-green-900 font-bold hover:cursor-pointer hover:text-white hover:bg-green-500">
                                <IoMdDownload className="mr-1 text-xl"/> 
                                Download
                            </button>
                        </div>
                    </div>
                </>
            : <main className="m-auto"><Spinner /></main>}
        </main>
    )
}