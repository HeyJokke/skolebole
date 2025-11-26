"use client"
import { useMaterials } from '@/lib/context/MaterialsProvider'
import { getMaterialImageUrl, getMaterialDownloadUrl } from '@/lib/database/db'
import type { Material } from '@/lib/types'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductPage({ params }:
    {params: Promise<{id: number}>}
) {
    const {materials} = useMaterials()

    const [m, setM] = React.useState<Material>()
    const [materialId, setMaterialId] = React.useState<number | null>(null)
    const [imagePath, setImagePath] = React.useState<string | null>()
    const [downloadUrl, setDownloadUrl] = React.useState<string | null>()
    
    const categoryClasses = {
        dansk: "bg-blue-100 text-blue-700",
        matematik: "bg-green-100 text-green-700",
        engelsk: "bg-purple-100 text-purple-700",
        naturteknik: "bg-yellow-100 text-yellow-700"
    }

    React.useEffect(() => {
        async function identifyMaterial() {
            const { id } = await params
            setMaterialId(Number(id))

            if (materials) {
                setM(materials.filter((m) => m.id === materialId)[0])
                if (m) {
                    setImagePath(await getMaterialImageUrl(m))
                    setDownloadUrl(await getMaterialDownloadUrl(m))
                }
            }
        }

        identifyMaterial()
    })

    function pdfRedirect() {
        if (downloadUrl) window.open(downloadUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <main className="h-full pl-3 pr-3">
            {m ? 
                <>  
                    <header>
                        <Link href="." className="hover:underline">{'<-- '}Tilbage til katalog</Link>
                        <h1 className="text-3xl font-bold mt-5">{m.name}</h1>
                        <div className='flex'>
                            <p className="italic mr-2">{m.short_description}</p>

                            {m.categories_array.map((category:string) => (
                                    <span 
                                        key={category} 
                                        className={`mr-1 px-2 py-1 text-xs font-medium rounded-full ${categoryClasses[category as keyof typeof categoryClasses] ?? 'bg-orange-100 text-orange-700'}`}
                                    >
                                        {category}
                                    </span>
                                ))}
                        </div>
                    </header>
                    <div className="lg:flex sm:block">
                        <div className="block lg:w-1/2 sm:w-full m-auto">
                            <Image 
                                alt={`Produktbillede for ${m.name}`} 
                                src={imagePath ?? '/images/logo.png'}
                                width={600}
                                height={600}
                                className="w-full"
                            />
                            <button onClick={pdfRedirect} className="w-full h-15 bg-green-300 text-green-900 font-bold hover:cursor-pointer hover:text-white hover:bg-green-500">Download</button>
                        </div>
                        <p className="lg:w-1/2 sm:w-full lg:ml-10 text-base/6 text-clip mt-3">{m.long_description}</p>
                    </div>
                </>
            : null}
        </main>
    )
}