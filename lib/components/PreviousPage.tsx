"use client"

import { FaArrowLeft } from "react-icons/fa";

export default function PreviousPage() {
    function handleBack() {
        if (document.referrer.startsWith('https://skolebole.dk') || document.referrer.startsWith('https://www.skolebole.dk')) {
            window.history.back()
        } else {
            window.location.href = '/'
        }
    }

    return (
        <button 
            onClick={handleBack} 
            className="flex mt-3 items-center mb-5 hover:underline hover:cursor-pointer hover:scale-105">
            <FaArrowLeft className="mr-2"/> 
            Tilbage
        </button>
    )
}