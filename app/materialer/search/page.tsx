"use server"

import React from 'react'
import SearchPage from './searchPage'

export default async function Page() {
    return (
        <React.Suspense fallback={<p>Siden indlæser...</p>}>
            <SearchPage />
        </React.Suspense>
    )
}