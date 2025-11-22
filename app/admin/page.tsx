"use client"
import MaterialCard from "@/lib/components/materialCard"
import type { Material } from '@/lib/types'
import React, { FormEvent } from 'react'
import { insertMaterial } from '@/lib/database/db'

export default function AdminPage() {
    const [material, setMaterial] = React.useState<Material | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    async function uploadMaterial(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get('input-name')
        const cats = formData.get('input-cats')
        const tags = formData.get('input-tags')
        const desc = formData.get('input-desc')
        const imageUrl = (formData.get('input-img') as File).name

        console.log(imageUrl)

        try {
            const {data , error} = await insertMaterial(name!, cats!, tags!, desc!)

            if (error) {
                throw new Error(error)
            }
            setError(null)
            setMaterial(data)

        } catch(error) {
            setMaterial(null)
            setError(error instanceof Error ? error.message : null)
        }

    }

    return (
        <main>
            <div className="flex">
                <form className="w-1/2" onSubmit={uploadMaterial}>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Navn" name="input-name"  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Kategorier" name="input-cats"  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Tags" name="input-tags" /><br/>
                    <textarea className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 resize-none w-100 h-100" placeholder="Beskrivelse" name="input-desc" required></textarea><br/>
                    <label className="font-semibold" htmlFor="input-pdf">Upload PDF: </label>
                    <input 
                        className="  
                        block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-pink-100 file:text-pink-700
                        hover:file:bg-pink-200" 
                        type="file" multiple={false} name="input-pdf" accept=".pdf" /><br/>
                    <label className="font-semibold" htmlFor="input-img">Upload billede: </label>
                    <input 
                        className="  
                        block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200" 
                        type="file" multiple={false} name="input-img" accept="image/*" required /><br/>
                    <button className="bg-green-200 rounded-md px-5 py-2 hover:bg-green-300 text-green-800 font-semibold" type="submit">Upload</button>
                </form>
                
                <span className="border-1"></span>

                <div className="flex w-1/2">
                    <div className="m-auto">
                        {(!material && !error) && <MaterialCard m={{id: 1, created_at: new Date, name: "Preview", description: "Beskrivelse står her", image: "", categories_array: ["Kategori 1", "Kategori 2"], meta_tags: []}} /> }
                        {(material && !error) && <MaterialCard m={material} /> }
                        {error && <p className="text-white bg-red-500 rounded-md p-2"> An error occured, the database may be down or connection has been lost </p>}
                    </div>
                </div>
            </div>
        </main>
    )
}