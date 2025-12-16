"use server"

import { insertMaterial } from "@/lib/database/server"
import type {Material} from '@/lib/types'

type FormPayload = {
    name: string,
    shortDesc: string,
    cats: string,
    tags: string | null,
    longdesc: string,
}

export async function insertMaterialAction(payload: FormPayload, image: {image_path:string, image_name:string}, pdf: {pdf_path:string, pdf_name:string}):Promise<{data: Material | null, error: string | null}> {
    const {data , error} = await insertMaterial(payload.name, payload.shortDesc, payload.cats, payload.tags, payload.longdesc, image, pdf)
    return {data, error}
}