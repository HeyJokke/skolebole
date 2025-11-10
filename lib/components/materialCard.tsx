import Image from 'next/image'
import Link from 'next/link'
import type {Material} from '@/lib/types'

type CardProps = {
    m: Material
}

export default function MaterialCard({m}: CardProps) {
    return (
        <Link href={`/materiale/${m.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:scale-105 transform transition-transform">
                <div className="relative w-full h-48 bg-gray-200">
                    <Image 
                        alt={m.name} 
                        src={`/images/materialer/materiale_${m.id}.jpeg`} 
                        width={250} 
                        height={200}
                        className="w-full h-full object-cover"
                    />
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