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
            params.set('q', searchTerm)
        } else {
            params.delete('q')
        }

        if (searchTerm.length === 0 && pathname.startsWith('/materialer/search')) {
            redirect(`/materialer`)
        }
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const searchTerm = data.get("search")

        if (searchTerm) {
            params.set('q', searchTerm.toString())
        } else {
            params.delete('q')
        }

        redirect(`/materialer/search?${params.toString()}`)
    }

    return (
        <form className="flex justify-center lg:mt-0 mt-5" onSubmit={onSubmit}>
            <input 
                className="border pl-2 text-black" 
                placeholder="Søg..."
                defaultValue={searchParams.get('q')?.toString()}
                name="search"
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
            />
        </form>
    )
}
