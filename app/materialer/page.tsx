"use client"
import React from 'react'
import { getAllMaterials, filterMaterials  } from '@/lib/database/db'
import type { Material } from '@/lib/types'
import RenderDatabase from '@/lib/components/renderDatabase'

export default function Materialer() {
    const [materials, setMaterials] = React.useState<Material[] | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        async function fetchData() {
            const {data, error} = await getAllMaterials()

            if (error) {
                setError(error)
            } else {
                setMaterials(data)
            }
        }

        fetchData()
    },[])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setMaterials(null)
        setError(null)
        
        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const description = formData.get('description') as string

        if (name || description) {
            try {
                const {data, error} = await filterMaterials(name, description)
    
                if (error) {
                    throw new Error(error)
                }
    
                setMaterials(data)
    
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error occurred')
            }
        }
        
        if (!name && !description) {
            try {
                const { data, error } = await getAllMaterials()

                if (error) {
                    throw new Error(error)
                }

                setMaterials(data)
            } catch(error) {
                setError(error instanceof Error ? error.message : 'Unknown error occurred')
            }
        }

    }

    return (
        <main>
            <form onSubmit={onSubmit} className="mb-20">
                <label htmlFor='input-name'>Navn:</label>
                <input className='bg-gray-100 mr-10 px-2 ml-2' name="name"/>
                <label htmlFor='input-description'>Beskrivelse:</label>
                <input className='bg-gray-100 mr-10 px-2 ml-2' name="description"/>
                <button type="submit" className='bg-gray-100 px-2 border'>Søg</button>
            </form>

            <RenderDatabase materials={materials} error={error} />

        </main>

    )
}