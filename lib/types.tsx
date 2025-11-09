export type Material = {
    id: number,
    created_at: Date,
    name: string,
    description: string,
    image: string
}

export type MaterialsResponse = {
    data: Material[] | null
    error: string | null
}