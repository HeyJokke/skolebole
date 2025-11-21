"use client"
import MaterialCard from "@/lib/components/materialCard"
import type {Material} from '@/lib/types'
import React, {FormEvent} from 'react'
import {supabase} from '@/lib/database/supabaseClient'
import {insertMaterial} from '@/lib/database/db'

export default function AdminPage() {
    const [materialCard, setMaterialCard] = React.useState(null)

    async function uploadMaterial(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get('input-name')
        const cats = formData.get('input-cats')
        const tags = formData.get('input-tags')
        const desc = formData.get('input-desc')

        const material = insertMaterial(name!, cats!, tags!, desc!)

        // Handle upload file and render material card
    }

    return (
        <main className="flex">
            <form onSubmit={uploadMaterial}>
                <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Navn" name="input-name" /><br/>
                <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Kategorier" name="input-cats" /><br/>
                <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3" type="text" placeholder="Tags" name="input-tags" /><br/>
                <textarea className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 resize-none w-100 h-100" placeholder="Beskrivelse" name="input-desc"></textarea><br/>
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
                    type="file" multiple={false} name="input-img" accept="image/*" /><br/>
                <button className="bg-green-200 rounded-md px-5 py-2 hover:bg-green-300 text-green-800 font-semibold" type="submit">Upload</button>
            </form>

            <div>
                <p className="font-semibold">Preview:</p>
                {materialCard && <MaterialCard m={materialCard}/>}
            </div>
        </main>
    )
}