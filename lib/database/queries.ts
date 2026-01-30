import { supabase, dbName } from '@/lib/database/supabaseClient'
import type { Material, MaterialsResponse } from '@/lib/types'

export async function getShownMaterials():Promise<MaterialsResponse> {
    try {
        const {data, error} = await supabase.from(dbName).select("*").eq('showOnPage', 'true').order('created_at', {ascending: false,})
    
        if (error) throw new Error(error.message)

        return {data: data as Material[], error: null}

    } catch(error) {
        console.error(`Error fetching from db: `, error)
        return {data: null, error: (error as Error).message ?? 'Unknown error'}
    }
}

export async function getAllMaterials():Promise<MaterialsResponse> {
    try {
        const {data, error} = await supabase.from(dbName).select("*").order('created_at', {ascending: false,})
    
        if (error) throw new Error(error.message)

        return {data: data as Material[], error: null}

    } catch(error) {
        console.error(`Error fetching from db: `, error)
        return {data: null, error: (error as Error).message ?? 'Unknown error'}
    }
}

export async function filterMaterials(name: string, description: string, category: string):Promise<MaterialsResponse> {
    try {
        const { data, error } = await supabase.from(dbName)
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
        const { data, error } = await supabase.from(dbName)
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
