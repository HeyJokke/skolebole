export type Material = {
    id: number
    created_at: Date
    name: string
    description: string
    image_path: string
    pdf_path: string
    categories_array: string[]
    meta_tags: string[] | null
}

export type MaterialsResponse = {
    data: Material[] | null
    error: string | null
}

export type MaterialResponse = {
    data: Material | null
    error: string | null
}