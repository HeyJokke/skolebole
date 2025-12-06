"use client"
import Image from 'next/image'
import Link from 'next/link'
import type {Material} from '@/lib/types'
import React from 'react'

type CardProps = {
    m: Material
}

export default function MaterialCard({m}: CardProps) { 
    const categoryClasses = {
        dansk: "bg-blue-100 text-blue-700",
        matematik: "bg-green-100 text-green-700",
        engelsk: "bg-purple-100 text-purple-700",
        naturteknik: "bg-yellow-100 text-yellow-700",
        historie: "bg-red-100 text-red-700"
    }

    return (
        <Link href={`/materialer/${m.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:scale-105 transform transition-transform">
                <div className="relative w-full h-48 bg-gray-200">
                    <Image 
                        alt={`Produkt billede til ${m.name}`} 
                        src={m.image_path ? m.image_path : '/images/skolebole_fallback.png'} 
                        width={250} 
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{m.name}</h3>
                    <div className="overflow-y-auto max-h-28 pr-2">
                        <p className="text-sm text-gray-600 mb-3 min-h-[40]">{m.short_description}</p>
                        {m.categories_array && (
                            <div className="flex flex-wrap gap-2 min-h-[56]">
                                {m.categories_array.map((cat:string) => (
                                    <span 
                                        key={cat} 
                                        className={`h-fit px-2 py-1 text-xs font-medium rounded-full ${categoryClasses[cat as keyof typeof categoryClasses] ?? 'bg-orange-100 text-orange-700'}`}
                                    >
                                        {cat[0].toUpperCase() + cat.slice(1)}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}