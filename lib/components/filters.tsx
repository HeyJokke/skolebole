import type {Material} from '@/lib/types'

type FiltersProps = {
    filteredMaterials: Material[]
}

export default function Filters({filteredMaterials}:FiltersProps):React.ReactElement | null {
    const uniqueCategories: string[] = []

    filteredMaterials.map(m => m.categories_array.map((cat) => {
        if (!uniqueCategories.includes(cat)) {
            uniqueCategories.push(cat)
        }
    }))

    return (
        <main>
            <h2 className="text-xl font-bold">Sortér efter:</h2>
            <ul className="min-w-[150px]">
                {uniqueCategories.map(cat => (
                        <li className="ml-3 mt-1" key={cat}>
                            {cat[0].toUpperCase() + cat.slice(1)}
                        </li>
                ))}
            </ul>
        </main>
    )
}