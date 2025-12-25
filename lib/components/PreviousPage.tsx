"use client"

import {useRouter} from 'next/navigation'
import { FaArrowLeft } from "react-icons/fa";


export default function PreviousPage() {
    const router = useRouter()

    return (
        <button 
            onClick={() => router.back()} 
            className="flex mt-3 items-center mb-5 hover:underline hover:cursor-pointer hover:scale-105">
            <FaArrowLeft className="mr-2"/> 
            Tilbage
        </button>
    )
}