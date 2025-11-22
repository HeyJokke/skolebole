import { supabase } from '@/lib/database/supabaseClient'
import type {Material, MaterialsResponse, MaterialResponse} from '@/lib/types'

export async function getAllMaterials():Promise<MaterialsResponse> {
    try {
        const {data, error} = await supabase.from("materialer").select("*").order('created_at', {ascending: false,})
    
        if (error) throw new Error(error.message)

        return {data: data as Material[], error: null}

    } catch(error) {
        console.error(`Error fetching from db: `, error)
        return {data: null, error: (error as Error).message ?? 'Unknown error'}
    }
}

export async function filterMaterials(name: string, description: string, category: string):Promise<MaterialsResponse> {
    try {
        const { data, error } = await supabase.from('materialer')
            .select('*')
            .ilike("name", `%${name}%`)
            .ilike("description", `%${description}%`)
            .contains('categories_array', [`${category}`])
        
        if ( error ) {
            throw new Error(error.message)
        }

        return {data: data as Material[], error: null}
    } catch(error) {
        console.error(`Error fetching data from the database`)

        return {data: null, error: (error as Error).message ?? 'Unknown error'}
    }
    
}

export async function searchMaterials(search: string):Promise<MaterialsResponse> {
    try {
        const { data, error } = await supabase.from('materialer')
            .select('*')
            .ilike("name", `%${search}%`)
        
        if ( error ) {
            throw new Error(error.message)
        }

        return { data: data as Material[], error: null }
    } catch(error) {
        console.error(`Error fetching data from the database`)

        return { data: null, error: (error as Error).message ?? 'Unknown error' }
    }
}

export async function insertMaterial(name:FormDataEntryValue, cats:FormDataEntryValue, tags:FormDataEntryValue | null, desc:FormDataEntryValue, imagePath:string):Promise<MaterialResponse> {    
    try {
        const { data, error } = await supabase.from('materialer')
            .insert(
                {
                    name: name, 
                    categories_array: cats.toString().split(' '), 
                    meta_tags: tags ? tags.toString().split(' ') : null, 
                    description: desc, 
                    image_path: imagePath
                }
            )
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return {data: data[0] as Material, error: null}

    } catch(error) {
        console.error(`Error inserting data to the database`)

        return {data: null, error: error.message ?? 'Unknown error'}
    }
}

export function getMaterialImageUrl(imagePath:string):string | null {
    try {
        const {data} = supabase.storage.from('materials-images').getPublicUrl(imagePath)

        if (!data.publicUrl) {
            throw new Error('Image could not be retrieved from the database')
        }

        return data.publicUrl

    } catch(error) {
        console.error((error as Error).message)
        
        return null
    }
}