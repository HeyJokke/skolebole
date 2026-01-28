'use client'

import React from 'react'
import { getAllMaterials } from '../database/queries'
import type { Material } from '@/lib/types'

type MaterialsContextType = {
  materials: Material[] | null
  error: string | null
  loading: boolean
  refreshAdminMaterials: () => Promise<void>
}

const MaterialsContextAdmin = React.createContext<MaterialsContextType | null>(null)

export function MaterialsProviderAdmin({ children }: { children: React.ReactNode }) {
  const [materials, setMaterials] = React.useState<Material[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

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

    React.useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <MaterialsContextAdmin.Provider value={{
            materials, 
            error, 
            loading, 
            refreshAdminMaterials: fetchData
        }}>
            {children}
        </MaterialsContextAdmin.Provider>
    )
}

export function useAdminMaterials() {
    const context = React.useContext(MaterialsContextAdmin)

    if (!context) {
        throw new Error('useAdminMaterials must be used within a MaterialsProvider')
    }

    return context
}