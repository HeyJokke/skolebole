"use server"

import { insertMaterial } from "@/lib/database/db"
import type {Material} from '@/lib/types'

export async function insertMaterialAction(formData: FormData):Promise<{data: Material | null, error: string | null}> {
    const name = formData.get('input-name') as FormDataEntryValue
    const shortdesc = formData.get('input-shortdesc') as FormDataEntryValue
    const cats = formData.get('input-cats') as FormDataEntryValue
    const tags = formData.get('input-tags') as FormDataEntryValue | null
    const longdesc = formData.get('input-longdesc') as FormDataEntryValue
    const imageFile = formData.get('input-img') as File
    const pdfFile = formData.get('input-pdf') as File

    const {data , error} = await insertMaterial(name, shortdesc, cats, tags, longdesc, imageFile, pdfFile)
    return {data, error}
}