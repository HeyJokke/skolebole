import type { Material } from '@/lib/types'

type Props = {
    materials: Material[] | null
    category: string
}

export default function filterMaterialsByCategory({ materials, category }: Props): Material[] {
    if (!materials || !category) return materials ?? []

    return materials.filter((m) => m.categories_array.some((cat) => cat.toLowerCase().includes(category.toLowerCase())))
}