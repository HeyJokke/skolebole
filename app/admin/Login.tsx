"use client"

import { loginAction } from "./action"
import React from 'react'

export default function Login() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const formData = new FormData(e.currentTarget)

        const {success, error} = await loginAction(formData)

        if (success && !error) {
            window.location.reload()
        }

        if (!success && error) {
            setError("Wrong password")
        }

        setLoading(false)
    }

    return (
        <main className="flex flex-col h-screen items-center justify-center">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <p className="text-4xl">Admin</p>
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border-1 border-grey-300 p-1 rounded-sm mb-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-200 rounded-sm hover:bg-green-400 text-green-900 font-bold"
                    disabled={loading}
                >{loading ? "Loggin in..." : "Login"}</button>

                {error && (
                    <p>{error}</p>
                )}
            </form>
        </main>
    )
}