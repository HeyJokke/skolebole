"use client"
import {useMaterials} from '@/lib/context/MaterialsProvider'
import {getMaterialImageUrl} from '@/lib/database/db'
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
    const [imagePath, setImagePath] = React.useState<string | null>()
    
    React.useEffect(() => {
        async function identifyMaterial() {
            const { id } = await params
            setMaterialId(Number(id))

            if (materials) {
                setM(materials.filter((m) => m.id === materialId)[0])
                if (m) {
                    setImagePath(await getMaterialImageUrl(m))
                }
            }

        }

        identifyMaterial()
    })

    return (
        <main className="h-full">
            {m ? 
                <>  
                    <header>
                        <Link href="." className="hover:underline">{'<-- '}Tilbage til katalog</Link>
                        <h1 className="text-3xl font-bold mt-5">{m.name}</h1>
                        <p className="italic">{m.description}</p>
                    </header>
                    <div className="lg:flex sm:block">
                        <div className="block lg:w-1/2 sm:w-full">
                            <Image 
                                alt={`Produktbillede for ${m.name}`} 
                                src={imagePath ?? '/images/logo.png'}
                                width={1000}
                                height={300}
                            />
                            <button className="w-full h-15 bg-green-300 font-bold hover:cursor-pointer hover:text-white hover:bg-green-600">Download</button>
                        </div>
                        <p className="lg:w-1/2 sm:w-full lg:ml-10 text-base/6 text-clip">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut est nibh, sodales ac leo quis, hendrerit ultricies eros. Donec vitae dolor turpis. Morbi maximus neque quis gravida porta. Cras fringilla felis eget fringilla bibendum. Nullam facilisis feugiat diam, eget ullamcorper ante auctor ut. Fusce ultrices imperdiet dolor congue facilisis. Aliquam ac dictum nisl. Duis eget dignissim quam. Donec eget arcu vel libero congue scelerisque vel eget leo. Donec a efficitur elit. Vestibulum facilisis iaculis fringilla. Curabitur id consequat ex. Phasellus efficitur elementum turpis. Vestibulum tristique erat eget magna vestibulum aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut est nibh, sodales ac leo quis, hendrerit ultricies eros. Donec vitae dolor turpis. Morbi maximus neque quis gravida porta. Cras fringilla felis eget fringilla bibendum. Nullam facilisis feugiat diam, eget ullamcorper ante auctor ut. Fusce ultrices imperdiet dolor congue facilisis. Aliquam ac dictum nisl. Duis eget dignissim quam. Donec eget arcu vel libero congue scelerisque vel eget leo. Donec a efficitur elit. Vestibulum facilisis iaculis fringilla. Curabitur id consequat ex. Phasellus efficitur elementum turpis. Vestibulum tristique erat eget magna vestibulum aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut est nibh, sodales ac leo quis, hendrerit ultricies eros. Donec vitae dolor turpis. Morbi maximus neque quis gravida porta. Cras fringilla felis eget fringilla bibendum. Nullam facilisis feugiat diam, eget ullamcorper ante auctor ut. Fusce ultrices imperdiet dolor congue facilisis. Aliquam ac dictum nisl. Duis eget dignissim quam. Donec eget arcu vel libero congue scelerisque vel eget leo. Donec a efficitur elit. Vestibulum facilisis iaculis fringilla.</p>
                    </div>
                </>
            : null}
        </main>
    )
}