import { supabase } from '@/lib/database/supabaseClient'

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

export async function insertMaterialStorage(formData:FormData):Promise<{data: {image: {image_path: string, image_name: string}, pdf: {pdf_path: string, pdf_name: string}} | null, error: Error | null}> {
    const image = formData.get('input-img') as File
    const pdf = formData.get('input-pdf') as File

    try {
        // Upload image
        const { error: imageUploadError } = await uploadFileToBucket('materials-images', image)

        if (imageUploadError) {
            throw new Error(imageUploadError.message)
        }

        // Upload pdf
        const { error: pdfUploadError } = await uploadFileToBucket('materials-pdfs', pdf)

        if (pdfUploadError) {
            await removeFileFromBucket('materials-images', image.name)

            throw new Error(pdfUploadError.message)
        }

        // Get image URL
        const {data: imageUrl, error: imageError} = await getMaterialImageUrl(image.name)

        if (imageError) {
            await removeFileFromBucket('materials-images', image.name)
            await removeFileFromBucket('materials-pdfs', pdf.name)

            throw new Error(imageError.message)
        }

        // Get pdf download URL
        const {data: pdfDownloadUrl, error: pdfError} = await getMaterialDownloadUrl(pdf.name)

        if (pdfError) {
            await removeFileFromBucket('materials-images', image.name)
            await removeFileFromBucket('materials-pdfs', pdf.name)

            throw new Error(pdfError.message)
        }

        if (!imageUrl || !pdfDownloadUrl) {
            throw new Error("Download URL of Image or PDF failed")
        }

        return {data: {
            image: {
                image_path: imageUrl, 
                image_name: image.name
            }, 
            pdf: {
                pdf_path: pdfDownloadUrl, 
                pdf_name: pdf.name
            }
        }, error: null}
    } catch(error) {
        return {data: null, error: (error as Error)}
    }
}

        