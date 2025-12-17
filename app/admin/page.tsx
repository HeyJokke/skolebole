"use client"
import MaterialCard from "@/lib/components/materialCard"
import type { Material } from '@/lib/types'
import React, { FormEvent } from 'react'
import { insertMaterialAction } from "./action"
import {useMaterials} from "@/lib/context/MaterialsProvider"
import TableMaterials from '@/lib/components/tableMaterials'
import { insertMaterialStorage, removeFileFromBucket } from '@/lib/database/client'

export default function AdminPage() {
    const {refreshMaterials} = useMaterials()
    const [material, setMaterial] = React.useState<Material | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)

    const basicMaterial:Material = {
        id: 1, 
        created_at: new Date, 
        name: "Navn", 
        short_description: "Kort beskrivelse står her og er max. 65 karakterer ligesom her.", 
        long_description: "", 
        image_path: "", 
        image_name: "", 
        pdf_path: "", 
        pdf_name: "", 
        categories_array: ["Kategori 1", "Kategori 2"], 
        meta_tags: [],
        nDownloads: 0
    }

    async function uploadMaterial(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const form = e.currentTarget
        const formData = new FormData(e.currentTarget)

        const {data: storageData, error: storageError} = await insertMaterialStorage(formData)

        if (storageData && !storageError) {
            const payload = {
                name: formData.get('input-name') as string,
                shortDesc: formData.get('input-shortdesc') as string,
                cats: formData.get('input-cats') as string,
                tags: formData.get('input-tags') as string | null,
                longdesc: formData.get('input-longdesc') as string
            }

            const {data, error} = await insertMaterialAction(payload, storageData.image, storageData.pdf)
            
            if (!error) {
                setMaterial(data)
                setError(null)
                refreshMaterials()
                form.reset()
            } else {
                removeFileFromBucket('materials-images', storageData.image.image_name)
                removeFileFromBucket('materials-pdfs', storageData.pdf.pdf_name)
                setMaterial(null)
                setError(error)
            }        
        }
        setLoading(false)
    }

    return (
        <main>
            <div className="flex">
                <form className="w-1/2" onSubmit={uploadMaterial}>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Navn" name="input-name"  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Kort beskrivelse (65)" name="input-shortdesc" maxLength={65} required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Kategorier" name="input-cats"  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Skjulte tags" name="input-tags" /><br/>
                    <textarea className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 resize-none w-100 h-100" placeholder="Lang beskrivelse (1800)" name="input-longdesc" maxLength={1800} required></textarea><br/>
                    <label className="font-semibold" htmlFor="input-pdf">Upload PDF: </label>
                    <input 
                        className="  
                        block w-auto text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-pink-100 file:text-pink-700
                        hover:file:bg-pink-200 hover:file:cursor-pointer hover:cursor-pointer" 
                        type="file" multiple={false} name="input-pdf" accept=".pdf" required /><br/>
                    <label className="font-semibold" htmlFor="input-img">Upload billede: </label>
                    <input 
                        className="  
                        block w-auto text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200 hover:file:cursor-pointer hover:cursor-pointer" 
                        type="file" multiple={false} name="input-img" accept="image/*" required /><br/>
                    <div className="flex w-full justify-end pr-5">
                        <button className="bg-green-200 rounded-md px-5 py-2 w-25 hover:bg-green-300 text-green-800 font-semibold hover:cursor-pointer disabled:bg-gray-100 disabled:text-gray-800 disabled:cursor-not-allowed" disabled={loading} type="submit">{loading ? "..." : "Upload"}</button>
                    </div>
                </form>
                
                <span className="border-1"></span>

                <div className="flex w-1/2 w-60 m-auto">
                    <div className="m-auto">
                        {(!material && !error) && <MaterialCard m={basicMaterial} /> }
                        {(material && !error) && <MaterialCard m={material} /> }
                        {error && <p className="text-white bg-red-500 rounded-md p-2"> {error} </p>}
                    </div>
                </div>
            </div>

            <div className="border-1 border-gray-300 rounded-lg mt-10">
                <TableMaterials />
            </div>
        </main>
    )
}