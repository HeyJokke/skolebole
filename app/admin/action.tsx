"use server"

import { insertMaterial } from "@/lib/database/server"
import type {Material} from '@/lib/types'
import { cookies } from 'next/headers'

type FormPayload = {
    name: string,
    shortDesc: string,
    cats: string,
    tags: string | null,
    longdesc: string,
    showOnPage: boolean
}

export async function insertMaterialAction(payload: FormPayload, image: {image_path:string, image_name:string}, pdf: {pdf_path:string, pdf_name:string}):Promise<{data: Material | null, error: string | null}> {
    if ((await cookies()).get('admin')?.value !== "true") {
        throw new Error("Unauthorized")
    }
    
    const {data , error} = await insertMaterial(payload.name, payload.shortDesc, payload.cats, payload.tags, payload.longdesc, payload.showOnPage, image, pdf)
    return {data, error}
}

export async function loginAction(formData: FormData) {
    const password = formData.get('password')

    if (password !== process.env.ADMIN_PASSWORD) {
        return { success: null, error: "Invalid password" }
    }

    (await cookies()).set("admin", "true", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    })

    return { success: true, error: null}
}