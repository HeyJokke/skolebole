"use client"

import { useRouter, usePathname } from 'next/navigation'
import { FaArrowLeft } from "react-icons/fa";


export default function PreviousPage() {
    const router = useRouter()
    const pathName = usePathname()
    const pathArr = pathName.split('/')
    pathArr.pop()
    const lastPath = pathArr.join('/')
    
    return (
        <button 
            onClick={() => lastPath.includes('search') ? router.back() : router.push(lastPath ? lastPath : "/")} 
            className="flex mt-3 items-center mb-5 hover:underline hover:cursor-pointer hover:scale-105">
            <FaArrowLeft className="mr-2"/> 
            Tilbage
        </button>
    )
}