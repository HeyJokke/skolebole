'use client'

import React from 'react'
import { getAllMaterials } from '../database/db'
import type { Material } from '@/lib/types'

type MaterialsContextType = {
  materials: Material[] | null
  error: string | null
  loading: boolean
}

const MaterialsContext = React.createContext<MaterialsContextType>({
  materials: null,
  error: null,
  loading: true
})

export function MaterialsProvider({ children }: { children: React.ReactNode }) {
  const [materials, setMaterials] = React.useState<Material[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            try {
                const {data, error} = await getAllMaterials()
        
                if (error) {
                    throw new Error(error)
                }

                setMaterials(data)

            } catch(error) {
                setError(error instanceof Error ? error.message : null)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    
    return (
        <MaterialsContext.Provider value={{materials, error, loading}}>
            {children}
        </MaterialsContext.Provider>
    )
}

export function useMaterials() {
    const context = React.useContext(MaterialsContext)

    if (!context) {
        throw new Error('useMaterials must be used within a MaterialsProvider')
    }

    return context
}