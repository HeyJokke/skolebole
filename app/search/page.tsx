"use client"

import { useMaterials } from "@/lib/context/MaterialsProvider"
import React from 'react'
import RenderDatabase from "@/lib/components/renderDatabase"

export default function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }): React.ReactElement {
    const [query, setQuery] = React.useState("")
    const {materials,error,loading} = useMaterials()

    React.useEffect(() => {
        async function getQuery() {
            const params = await searchParams
            const query = params.query ? params.query : ""

            setQuery(query)
        }

        getQuery()
    }, [searchParams])

    return (
        <main>
            <h1>This is the searchpage</h1>
            <RenderDatabase materials={materials} error={error} />
        </main>
    )
}