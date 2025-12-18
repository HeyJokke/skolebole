"use client"

import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function DonationPopup() {
    const [donationPopup, setDonationPopup] = React.useState<boolean>(true)
    const router = useRouter()

    return (
        <div hidden={!donationPopup} className="ml-5 sticky w-45 h-12 bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer">
            <button onClick={() => setDonationPopup(false)} className="h-12 w-10 mr-[-15] z-60 font-bold rounded-xl hover:cursor-pointer hover:bg-red-600 hover:text-white">X</button>
            <div onClick={() => {
                    router.push('/support')
                    setDonationPopup(false)
                }} className="flex items-center">
                <Image className="ml-[-10] mb-10 mr-[-15] w-24 h-24" alt="Billede af en kop kaffe" src="/images/coffee.png" width={256} height={256} />
                <p className="text-sm font-bold text-gray-800 text-shadow-md">{"Gi'"} en <br/> kop kaffe</p>
            </div>
        </div>
    )
}