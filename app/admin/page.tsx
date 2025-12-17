"use server"

import { cookies } from 'next/headers'
import AdminClient from './AdminClient'
import Login from './Login'

export default async function AdminPage() {
    const isAdmin = (await cookies()).get("admin")?.value === 'true'

    if (!isAdmin) {
        return <Login />
    }

    return <AdminClient />
}