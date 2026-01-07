"use server"

import React from 'react'
import SearchPage from './searchPage'

const Spinner = () => (
    <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-5 border-blue-500"></div>
    </div>
)

export default async function Page() {
    return (
        <React.Suspense fallback={<Spinner />}>
            <SearchPage />
        </React.Suspense>
    )
}