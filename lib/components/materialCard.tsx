"use client"
import Image from 'next/image'
import Link from 'next/link'
import type {Material} from '@/lib/types'
import React from 'react'
import {getMaterialImageUrl} from '@/lib/database/db'

type CardProps = {
    m: Material
}

export default function MaterialCard({m}: CardProps) {
    const [imagePath, setImagePath] = React.useState<string | null>(null)

    React.useEffect(() => {
        async function fetchImage() {
            setImagePath(await getMaterialImageUrl(m))
        }

        fetchImage()
    })

    

    return (
        <Link href={`/materialer/${m.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:scale-105 transform transition-transform">
                <div className="relative w-full h-48 bg-gray-200">
                    {imagePath ? 
                    <Image 
                        alt={`Produkt billede til ${m.name}`} 
                        src={imagePath} 
                        width={250} 
                        height={200}
                        className="w-full h-full object-cover"
                    /> :
                    <Image 
                        alt={`Produkt billede til ${m.name}`} 
                        src={'/images/logo.png'} 
                        width={250} 
                        height={200}
                        className="w-full h-full object-cover"
                    />
                    } 
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{m.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{m.description}</p>
                    {m.categories_array && (
                        <div className="flex flex-wrap gap-2">
                            {m.categories_array.map((category) => (
                                <span 
                                    key={category} 
                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}