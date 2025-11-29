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

export async function insertMaterial(name:FormDataEntryValue, shortdesc:FormDataEntryValue, cats:FormDataEntryValue, tags:FormDataEntryValue | null, longdesc:FormDataEntryValue, imageFile:File, pdfFile:File, ):Promise<MaterialResponse> {    
    try {
        const { data, error } = await supabase.from('materialer')
            .insert(
                {
                    name: name, 
                    short_description: shortdesc,
                    categories_array: cats.toString().split(' '), 
                    meta_tags: tags ? tags.toString().split(' ') : null, 
                    long_description: longdesc, 
                    image_path: imageFile.name,
                    pdf_path: pdfFile.name
                }
            )
            .select()
            .single()

        if (error) {
            throw new Error(error.message)
        }

        const { error: imageUploadError } = await uploadFileToBucket('materials-images', imageFile)

        if (imageUploadError) {
            await removeRowFromDatabase('materialer', data.id)

            throw new Error(imageUploadError.message)
            
        }

        const { error: pdfUploadError } = await uploadFileToBucket('materials-pdfs', pdfFile)

        if (pdfUploadError) {
            await removeRowFromDatabase('materialer', data.id)

            await removeFileFromBucket('materials-images', imageFile.name)

            throw new Error(pdfUploadError.message)
        }

        return {data: data as Material, error: null}

    } catch(error) {
        console.error((error as Error).message)

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

export async function getMaterialDownloadUrl(m:Material):Promise<string | null> {
    if (m.pdf_path === "" || null) {
        return null
    } else {
        try {
            const {data: {publicUrl}} = supabase
                .storage
                .from('materials-pdfs')
                .getPublicUrl(m.pdf_path)
            
            const res = await fetch(publicUrl, { method: "HEAD"})
            
            if (res.ok) {
                return publicUrl
            } else {
                throw new Error(
                    `PDF for ${m.name} (ID: ${m.id}, PDF_PATH: ${m.pdf_path}) could not be retrieved from the database`
                )
            }
    
        } catch(error) {
            console.error((error as Error).message)
            
            return null
        }
    }
}

export async function removeRowFromDatabase(dbName:string, id:number):Promise<void> {
    await supabase
        .from(dbName)
        .delete()
        .eq("id", id)
}

export async function removeFileFromBucket(bucketName:string, fileName: string):Promise<void> {
    await supabase
            .storage
            .from(bucketName)
            .remove([fileName])
}

export async function uploadFileToBucket(bucketName:string, file:File):Promise<{error: Error | null}> {
    const {error} = await supabase.storage
        .from(bucketName)
        .upload(
            file.name, 
            file,
            {
                contentType: file.type,
                cacheControl: "3600",
                upsert: false
            }
        )

    return { error } 
}

export async function incrementDownload(m:Material) {
    try {

        const { data, error: selectDownloadsError } = await supabase
            .from('materialer')
            .select('nDownloads')
            .eq('id', m.id)

        if (selectDownloadsError) {
            throw new Error(selectDownloadsError.message)
        }

        const downloadCount = data[0].nDownloads

        const { error: updateDownloadsError } = await supabase
            .from('materialer')
            .update({ nDownloads: downloadCount + 1})
            .eq('id', m.id)

        if (updateDownloadsError) {
            throw new Error(updateDownloadsError.message)
        }

        return null
    } catch(error) {
        console.error((error as Error).message)
        return null
    }
}

export async function incrementVisited(m:Material) {
    try {

        const { data, error: selectDownloadsError } = await supabase
            .from('materialer')
            .select('nVisited')
            .eq('id', m.id)

        if (selectDownloadsError) {
            throw new Error(selectDownloadsError.message)
        }

        const visitsCont = data[0].nVisited

        const { error: updateDownloadsError } = await supabase
            .from('materialer')
            .update({ nVisited: visitsCont + 1})
            .eq('id', m.id)

        if (updateDownloadsError) {
            throw new Error(updateDownloadsError.message)
        }

        return null
    } catch(error) {
        console.error((error as Error).message)
        return null
    }
}

export async function orderMaterialsByDate(limit:number):Promise<MaterialsResponse> {
    try {
        const {data, error} = await supabase.from('materialer').select('*').order('created_at', {ascending: false}).limit(limit)

        if (error) {
            throw new Error(error.message)
        }

        return {data: data as Material[], error: null}
    } catch(error) {
        return {data: null, error: (error as Error).message}
    }
}