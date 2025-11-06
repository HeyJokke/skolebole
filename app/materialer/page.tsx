import { supabase } from '@/lib/supabaseClient'
import React from 'react'

export default async function Materialer({searchParams}:URLSearchParams) {
    const { name, description } = await searchParams
    const { data } = await supabase.from('materialer').select('*')
    
    const filteredData = name || description ? 
        data!.filter(m => 
            m.name?.toLowerCase().includes(name.toLowerCase()) || 
            m.description?.toLowerCase().includes(description.toLowerCase())
        ) : data

    return (
        <main>
            <form className="mb-20">
                <label htmlFor='input-name'>Navn:</label>
                <input className='bg-gray-100 mr-10 px-2 ml-2' name="name"/>
                <label htmlFor='input-description'>Beskrivelse:</label>
                <input className='bg-gray-100 mr-10 px-2 ml-2' name="description"/>
                <button type="submit" className='bg-gray-100 px-2 border'>Søg</button>
            </form>
    
            <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </main>

    )
}