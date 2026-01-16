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
        <form className="flex justify-center m-auto" onSubmit={onSubmit}>
            <div className="flex bg-white text-black lg:rounded-lg rounded-full md:w-fit w-full lg:h-[50] lg:text-base text-xl p-4 h-fit">
                <button className="cursor-pointer z-50" type="submit">
                    <FaSearch className="text-slate-500" />
                </button>
                <input
                    className="ml-[-20] outline-none w-full text-center md:text-left md:ml-2"  
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
