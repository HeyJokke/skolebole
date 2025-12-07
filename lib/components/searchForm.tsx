"use client"

import React from "react"
import {useSearchParams, usePathname, useRouter} from "next/navigation"

export default function SearchForm() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
        setInputValue(searchParams.get('q') ?? '')
    },[searchParams])

    function onChange(searchTerm: string) {
        setInputValue(searchTerm)

        if (searchTerm.length === 0 && pathname.startsWith('/materialer/search')) {
            router.push(`/materialer`)
        }
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const searchTerm = inputValue.trim()

        if (searchTerm.length > 0) {
            const nextParams = new URLSearchParams(Array.from(searchParams.entries()))
            nextParams.delete('kategori')
            nextParams.set('q', searchTerm)
            router.push(`/materialer/search?${nextParams.toString()}`)
        } else {
            router.push('/materialer')
        }

        
    }

    return (
        <form className="flex justify-center lg:mt-0 mt-5" onSubmit={onSubmit}>
            <div className="flex items-center pl-2 pt-1 pb-1 bg-gray-100 text-black rounded-lg">
                <svg className="w-6 h-7 text-body text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                <input
                    className="ml-2 outline-none"  
                    placeholder="Søg..."
                    value={inputValue}
                    name="search"
                    onChange={(e) => {
                        onChange(e.target.value)
                    }}
                />
            </div>
        </form>
    )
}
