"use client"

import React from "react"
import {useSearchParams, usePathname, useRouter} from "next/navigation"
import { FaSearch } from "react-icons/fa";

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
        }    
    }

    return (
        <form className="flex justify-center lg:mt-0 mt-5" onSubmit={onSubmit}>
            <div className="flex items-center pl-2 pt-1 pb-1 bg-white text-black rounded-lg">
                <button className="cursor-pointer" type="submit">
                    <FaSearch className="text-slate-500" />
                </button>
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
