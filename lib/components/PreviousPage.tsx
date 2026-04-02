"use client"

import { FaArrowLeft } from "react-icons/fa";

export default function PreviousPage() {
    const hasPreviousPage = typeof window !== 'undefined' && window.history.length > 1

    if (!hasPreviousPage) return null

    return (
        <button 
            onClick={() => window.history.back()} 
            className="flex mt-3 items-center mb-5 hover:underline hover:cursor-pointer hover:scale-105">
            <FaArrowLeft className="mr-2"/> 
            Tilbage
        </button>
    )
}