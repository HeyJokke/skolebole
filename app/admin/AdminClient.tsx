"use client"
import MaterialCard from "@/lib/components/materialCard"
import type { Material } from '@/lib/types'
import React, { FormEvent } from 'react'
import { insertMaterialAction } from "./action"
import TableMaterials from '@/lib/components/tableMaterials'
import { insertMaterialStorage, removeFileFromBucket } from '@/lib/database/client'
import { useAdminMaterials } from "@/lib/context/MaterialsProviderAdmin"
import { useMaterials } from "@/lib/context/MaterialsProvider"
import { FaSearch } from "react-icons/fa"

const Spinner = () => (
  <div className="flex m-auto justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-5 border-blue-500"></div>
  </div>
)

export default function AdminClient() {
    const {materials, refreshAdminMaterials} = useAdminMaterials()
    const {refreshMaterials} = useMaterials()
    const [downloads, setDownloads] = React.useState<number>(0)
    const [material, setMaterial] = React.useState<Material | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [inputValue, setInputValue] = React.useState<string>('')
    
    const previewMaterial:Material = {
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
        nDownloads: 0,
        showOnPage: true
    }
    
    React.useEffect(() => {
        if (materials) {
            const totalDownloads = materials.reduce((sum, m) => sum + m.nDownloads, 0)
            setLoading(false)
            setDownloads(totalDownloads)
        }
    }, [materials])

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
                longdesc: formData.get('input-longdesc') as string,
                showOnPage: formData.get('checkbox-show') !== null
            }

            const {data, error} = await insertMaterialAction(payload, storageData.image, storageData.pdf)
            
            if (!error) {
                setMaterial(data)
                setError(null)
                refreshAdminMaterials()
                refreshMaterials()
                form.reset()
            } else {
                removeFileFromBucket('materials-images', storageData.image.image_name)
                removeFileFromBucket('materials-pdfs', storageData.pdf.pdf_name)
                setMaterial(null)
                setError(error)
            }        
        }

        if (storageError) {
            setError(storageError.message)
        }
        setLoading(false)
    }

    function filterMaterialsBySearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const searchValue = formData.get('search') as string
        
        setInputValue(searchValue)
    }

    return (
        <main>
            <div className="block lg:flex bg-white/90 rounded-lg shadow-xl p-8">
                <form className="w-full lg:w-1/2" onSubmit={uploadMaterial}>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Navn" name="input-name"  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Kort beskrivelse" name="input-shortdesc" required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Kategorier" name="input-cats"  required /><br/>
                    <input className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 w-full lg:w-100" type="text" placeholder="Skjulte tags" name="input-tags" /><br/>
                    <textarea className="rounded-md bg-slate-200 font-semibold mb-3 py-1 px-3 resize-none w-full lg:w-100 h-100" placeholder="Lang beskrivelse (1800)" name="input-longdesc" maxLength={1800} required></textarea><br/>
                    <div className="flex mb-3">
                        <label htmlFor="checkbox-show" className="font-semibold mr-2">Vis på siden</label>
                        <input name="checkbox-show" id="checkbox-show" type="checkbox" defaultChecked className="rounded-md bg-slate-200 font-semibold"/>
                    </div>
                    <label className="font-semibold" htmlFor="input-pdf">Upload PDF: </label>
                    <input 
                        className="  
                        block w-auto text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-pink-100 file:text-pink-700
                        hover:file:bg-pink-200 hover:file:cursor-pointer hover:cursor-pointer" 
                        type="file" multiple={false} name="input-pdf" id="input-pdf" accept=".pdf" required /><br/>
                    <label className="font-semibold" htmlFor="input-img">Upload billede: </label>
                    <input 
                        className="  
                        block w-auto text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4 file:rounded-md
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200 hover:file:cursor-pointer hover:cursor-pointer" 
                        type="file" multiple={false} name="input-img" id="input-img" accept="image/*" required /><br/>
                    <div className="flex w-full justify-end pr-5">
                        <button className="bg-green-200 rounded-md px-5 py-2 w-25 hover:bg-green-300 text-green-800 font-semibold hover:cursor-pointer disabled:bg-gray-100 disabled:text-gray-800 disabled:cursor-not-allowed" disabled={loading} type="submit">{loading ? "..." : "Upload"}</button>
                    </div>
                </form>
                
                <span className="border-1 w-full h-full flex mt-5 mb-5 lg:block lg:w-auto lg:h-auto lg:mb-0 lg:mt-0"></span>

                <div className="flex w-1/2 w-60 m-auto">
                    <div className="m-auto">
                        {error && <p className="text-white bg-red-500 rounded-md p-2 mb-5"> {error} </p>}
                        {!material && <MaterialCard m={previewMaterial} /> }
                        {material && <MaterialCard m={material} /> }
                    </div>
                </div>
            </div>

            <div className="border-1 border-gray-300 bg-white/90 rounded-lg mt-10">
                <div className="block lg:flex justify-between text-center">
                    <form onSubmit={filterMaterialsBySearch}>
                        <div className="flex w-[250] m-auto lg:m-0 lg:h-[50] lg:text-base text-xl h-fit p-[16]">
                            <button className="cursor-pointer z-50" type="submit">
                                <FaSearch className="text-slate-500" />
                            </button>
                            <input
                                className="ml-[-20] outline-none w-full text-center md:text-left md:ml-2"  
                                placeholder="Søg..."
                                defaultValue={inputValue}
                                name="search"
                            />
                        </div>
                    </form>
                    <p className="font-bold text-xl p-[16] pb-0">Downloads Totalt: {downloads}</p>
                </div>
                {loading ? <Spinner /> : <TableMaterials query={inputValue}/>}
            </div>
        </main>
    )
}