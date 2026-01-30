import { supabase, dbName, storageImgs, storagePdfs } from '@/lib/database/supabaseClient'
import type {Material, MaterialResponse} from '@/lib/types'
import { uploadFileToBucket, removeFileFromBucket, getMaterialImageUrl, getMaterialDownloadUrl } from '@/lib/database/client'

export async function insertMaterial(name:FormDataEntryValue, shortdesc:FormDataEntryValue, cats:FormDataEntryValue, tags:FormDataEntryValue | null, longdesc:FormDataEntryValue, showOnPage:boolean, image: {image_path:string, image_name:string}, pdf: {pdf_path:string, pdf_name:string}):Promise<MaterialResponse> {    
    try {
        // Insert material with image url and pdf download url
        const { data, error } = await supabase.from(dbName)
            .insert(
                {
                    name: name, 
                    short_description: shortdesc,
                    categories_array: cats.toString().split(' '), 
                    meta_tags: tags ? tags.toString().split(' ') : null, 
                    long_description: longdesc, 
                    showOnPage: showOnPage,
                    image_path: image.image_path,
                    pdf_path: pdf.pdf_path,
                    image_name: image.image_name,
                    pdf_name: pdf.pdf_name,
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

export async function removeRowFromDatabase(dbName:string, id:number):Promise<void> {
    await supabase
        .from(dbName)
        .delete()
        .eq("id", id)
}

export async function incrementDownload(m:Material) {
    try {

        const { data, error: selectDownloadsError } = await supabase
            .from(dbName)
            .select('nDownloads')
            .eq('id', m.id)

        if (selectDownloadsError) {
            throw new Error(selectDownloadsError.message)
        }

        const downloadCount = data[0].nDownloads

        const { error: updateDownloadsError } = await supabase
            .from(dbName)
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

export async function updateMaterial(formData:FormData, material:Material) {
    const name = formData.get('input-name') as FormDataEntryValue
    const shortDesc = formData.get('input-shortdesc') as FormDataEntryValue
    const categories = formData.get('input-cats') as FormDataEntryValue
    const tags = formData.get('input-tags') as FormDataEntryValue
    const longDesc = formData.get('input-longdesc') as FormDataEntryValue
    const showOnPage = formData.get('checkbox-show') !== null
    
    try {
        const {data, error} = await supabase
            .from(dbName)
            .update({
                name: name,
                short_description: shortDesc,
                categories_array: categories.toString().split(' '),
                meta_tags: tags ? tags.toString().split(' ') : null,
                long_description: longDesc,
                showOnPage: showOnPage
            })
            .eq('id', material.id)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return {data: data, error: null}
    } catch(error) {
        console.error((error as Error).message)

        return {data: null, error: (error as Error).message}
    }
}

export async function updateImage(formData:FormData, material:Material) {
    const imageFile = formData.get('input-img') as File

    try {
        // Upload image
        const { error: imageUploadError } = await uploadFileToBucket(storageImgs, imageFile)
    
        if (imageUploadError) {
            throw new Error(imageUploadError.message)
        }
    
        // Get image URL
        const {data: imageUrl, error: imageError} = await getMaterialImageUrl(imageFile.name)
    
        if (imageError) {
            await removeFileFromBucket(storageImgs, imageFile.name)
    
            throw new Error(imageError.message)
        }
    
        const {error} = await supabase
            .from(dbName)
            .update({
                image_path: imageUrl,
                image_name: imageFile.name,
            })
            .eq('id', material.id)
    
        if (error) {
            await removeFileFromBucket(storageImgs, imageFile.name)
    
            throw new Error(error.message)
        }
    
        removeFileFromBucket(storageImgs, material.image_name)

        return {data: imageUrl, error: null}
    } catch(error) {
        console.error((error as Error).message)

        return {data: null, error: (error as Error).message}
    }

}

export async function updatePDF(formData:FormData, material:Material) {
    const pdfFile = formData.get('input-pdf') as File

    try {
        // Upload pdf
        const { error: pdfUploadError } = await uploadFileToBucket(storagePdfs, pdfFile)

        if (pdfUploadError) {
            throw new Error(pdfUploadError.message)
        }

        // Get pdf download URL
        const {data: pdfDownloadUrl, error: pdfError} = await getMaterialDownloadUrl(pdfFile.name)

        if (pdfError) {
            await removeFileFromBucket(storagePdfs, pdfFile.name)

            throw new Error(pdfError.message)
        }

        const {error} = await supabase
            .from(dbName)
            .update({
                pdf_path: pdfDownloadUrl,
                pdf_name: pdfFile.name
            })
            .eq('id', material.id)

        if (error) {
            await removeFileFromBucket(storagePdfs, pdfFile.name)

            throw new Error(error.message)
        }

        await removeFileFromBucket(storagePdfs, material.pdf_name)

        return {data: pdfDownloadUrl, error: null}

    } catch(error) {
        console.error((error as Error).message)

        return {data: null, error: (error as Error).message}
    }

}