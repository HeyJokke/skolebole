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
        // Upload image
        const { error: imageUploadError } = await uploadFileToBucket('materials-images', imageFile)

        if (imageUploadError) {
            throw new Error(imageUploadError.message)
        }

        // Upload pdf
        const { error: pdfUploadError } = await uploadFileToBucket('materials-pdfs', pdfFile)

        if (pdfUploadError) {
            await removeFileFromBucket('materials-images', imageFile.name)

            throw new Error(pdfUploadError.message)
        }

        // Get image URL
        const {data: imageUrl, error: imageError} = await getMaterialImageUrl(imageFile.name)

        if (imageError) {
            await removeFileFromBucket('materials-images', imageFile.name)
            await removeFileFromBucket('materials-pdfs', pdfFile.name)

            throw new Error(imageError.message)
        }

        // Get pdf download URL
        const {data: pdfDownloadUrl, error: pdfError} = await getMaterialDownloadUrl(pdfFile.name)

        if (pdfError) {
            await removeFileFromBucket('materials-images', imageFile.name)
            await removeFileFromBucket('materials-pdfs', pdfFile.name)

            throw new Error(pdfError.message)
        }

        // Insert material with image url and pdf download url
        const { data, error } = await supabase.from('materialer')
            .insert(
                {
                    name: name, 
                    short_description: shortdesc,
                    categories_array: cats.toString().split(' '), 
                    meta_tags: tags ? tags.toString().split(' ') : null, 
                    long_description: longdesc, 
                    image_path: imageUrl,
                    pdf_path: pdfDownloadUrl,
                    image_name: imageFile.name,
                    pdf_name: pdfFile.name,
                }
            )
            .select()
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return {data: data as Material, error: null}

    } catch(error) {
        console.error((error as Error).message)

        return {data: null, error: (error as Error).message ?? 'Unknown error'}
    }
}

export async function getMaterialImageUrl(imageFileName:string):Promise<{data: string | null, error: Error | null}> {
    try {
        const {data: {publicUrl}} = supabase.storage.from('materials-images').getPublicUrl(imageFileName)
        
        const res = await fetch(publicUrl, { method: "HEAD"})

        if (res.ok) {
            return {data: publicUrl, error: null}
        } else {
            throw new Error(
                `Image for IMAGE_PATH: ${imageFileName}) could not be retrieved from the database`
            )
        }

    } catch(error) {
        console.error((error as Error).message)
        return {data: null, error: (error as Error)}
    }
}

export async function getMaterialDownloadUrl(pdfFileName:string):Promise<{data: string | null, error: Error | null}> {
    try {
        const {data: {publicUrl}} = supabase
            .storage
            .from('materials-pdfs')
            .getPublicUrl(pdfFileName)
        
        const res = await fetch(publicUrl, { method: "HEAD"})
        
        if (res.ok) {
            return {data: publicUrl, error: null}
        } else {
            throw new Error(
                `PDF: ${pdfFileName} could not be retrieved from the database`
            )
        }
        
    } catch(error) {
        console.error((error as Error).message)
        
        return {data: null, error: (error as Error)}
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