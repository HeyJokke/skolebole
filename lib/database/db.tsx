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

        return {data: null, error: (error as Error).message ?? 'Unknown error'}
    }
}

export async function getMaterialImageUrl(m:Material):Promise<string | null> {
    if (m.image_path === "" || null) {
        return null
    } else {
        try {
            const {data: {publicUrl}} = supabase.storage.from('materials-images').getPublicUrl(m.image_path)
            
            const res = await fetch(publicUrl, { method: "HEAD"})

            if (res.ok) {
                return publicUrl
            } else {
                throw new Error(
                    `Image for ${m.name} (ID: ${m.id}, IMAGE_PATH: ${m.image_path}) could not be retrieved from the database`
                )
            }
    
        } catch(error) {
            console.error((error as Error).message)
            
            return null
        }
    }
}