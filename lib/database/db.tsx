import { supabase } from '@/lib/database/supabaseClient'
import type {Material, MaterialsResponse, MaterialResponse} from '@/lib/types'

export async function getAllMaterials():Promise<MaterialsResponse> {
    try {
        const {data, error} = await supabase.from("materialer").select("*").order('created_at', {ascending: false,})
    
        if (error) throw new Error(error.message)

        return {data: data as Material[], error: null}

    } catch(error) {
        console.error(`Error fetching from db: `, error)
        return {data: null, error: error.message ?? 'Unspecified error'}
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

        return {data: null, error: error.message ?? 'Unknown error'}
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

        return {data: data as Material[], error: null}
    } catch(error) {
        console.error(`Error fetching data from the database`)

        return {data: null, error: error.message ?? 'Unknown error'}
    }
    
}

export async function insertMaterial(name:FormDataEntryValue, cats:FormDataEntryValue, tags:FormDataEntryValue, desc:FormDataEntryValue):Promise<MaterialResponse> {    
    try {
        const { data, error } = await supabase.from('materialer').insert({name: name ? name : null, categories_array: cats ? cats.toString().split(' ') : null, meta_tags: tags ? tags.toString().split(' ') : null, description: desc ? desc : null}).select()

        if (error) {
            throw new Error(error.message)
        }

        return {data: data[0] as Material, error: null}

    } catch(error) {
        console.error(`Error inserting data to the database`)

        return {data: null, error: error.message ?? 'Unknown error'}
    }
}