"use client"
import Image from 'next/image'
import Link from 'next/link'
import type {Material} from '@/lib/types'
import {usePathname} from 'next/navigation'

type CardProps = {
    m: Material
}

export default function MaterialCard({m}: CardProps) { 
    let pathName = usePathname()
    const categoryClasses = {
        dansk: "bg-blue-100 text-blue-700",
        matematik: "bg-green-100 text-green-700",
        børnehaveklassen: "bg-purple-100 text-purple-700",
        dsa: "bg-yellow-100 text-yellow-700",
        specialundervisning: "bg-red-100 text-red-700",
        sprog: "bg-gray-100 text-gray-700"
    }

    if (pathName === '/' || pathName.includes('/search') || pathName.includes('/admin') || pathName === '/materialer') {
        pathName = '/materialer/search'
    }

    return (
        <Link href={`${pathName}/${m.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:scale-105 transform transition-transform">
                <div className="relative w-full h-30 bg-gray-200">
                    <Image 
                        alt={`Produkt billede til ${m.name}`} 
                        src={m.image_path ? m.image_path : '/images/skolebole_fallback.png'} 
                        width={250} 
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col min-h-[236]">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-pretty">{m.name}</h3>
                    <div className="flex flex-col flex-grow">
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{m.short_description[0].toUpperCase() + m.short_description.slice(1)}</p>
                        {m.categories_array && (
                            <div className="flex flex-wrap gap-2 min-h-[56] mt-auto">
                                {m.categories_array.sort((a:string, b:string) => a.localeCompare(b)).map((cat:string) => (
                                    <span 
                                        key={cat} 
                                        className={`h-fit px-2 py-1 text-xs font-medium rounded-full ${categoryClasses[cat.toLowerCase() as keyof typeof categoryClasses] ?? 'bg-orange-100 text-orange-700'}`}
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