export type Material = {
    id: number
    created_at: Date
    name: string
    short_description: string
    long_description: string
    image_path: string
    image_name: string
    pdf_path: string
    pdf_name: string
    categories_array: string[]
    meta_tags: string[] | null
    nDownloads: number,
    showOnPage: boolean
}

export type MaterialsResponse = {
    data: Material[] | null
    error: string | null
}

export type MaterialResponse = {
    data: Material | null
    error: string | null
}