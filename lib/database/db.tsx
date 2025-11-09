import { supabase } from '@/lib/database/supabaseClient'
import type {Material, MaterialsResponse} from '@/lib/types'

export async function getAllMaterials():Promise<MaterialsResponse> {
    try {
        const {data, error} = await supabase.from("materialer").select("*")
    
        if (error) throw new Error(error.message)

        return {data: data as Material[], error: null}

    } catch(error) {
        console.error(`Error fetching from db: `, error)
        return {data: null, error: error.message ?? 'Unspecified error'}
    }
}

export async function filterMaterials(name: string, description: string):Promise<MaterialsResponse> {

    try {
        const { data, error } = await supabase.from('materialer')
            .select('*')
            .or(`name.ilike.${name}, description.ilike.${description}`)
        
        if ( error ) {
            throw new Error(error.message)
        }

        return {data: data as Material[], error: null}
    } catch(error) {
        console.error(`Error fetching data from the database`)

        return {data: null, error: error.message ?? 'Unknown error'}
    }
    
}