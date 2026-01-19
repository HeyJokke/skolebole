"use client"

import { IoMdArrowRoundUp } from "react-icons/io";

export default function ScrollToTop() {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div onClick={handleScrollToTop} className="h-[75] w-[75] mt-auto aspect-square fixed lg:sticky bottom-4 right-6 z-50 bg-orange-600 backdrop-blur-sm rounded-xl shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer">
            <IoMdArrowRoundUp className="w-full h-full text-white" />
        </div>
    )
}