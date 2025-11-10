"use client"
import React from "react"
import {useSearchParams, usePathname, useRouter, redirect} from "next/navigation"

export default function SearchForm() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const params = new URLSearchParams(searchParams)

    function handleSearch(searchTerm: string) {
        if (searchTerm) {
            params.set('query', searchTerm)
        } else {
            params.delete('query')
        }
        
        replace(`${pathname}?${params.toString()}`)
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const searchTerm = data.get("search")

        if (searchTerm) {
            params.set('query', searchTerm.toString())
        } else {
            params.delete('query')
        }

        if (!pathname.startsWith('/search')) {
            redirect(`/search?${params.toString()}`)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                className="border pl-2 text-black" 
                placeholder="Søg..."
                defaultValue={searchParams.get('query')?.toString()}
                name="search"
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
            />
        </form>
    )
}
