"use client"
import { useAuthStore } from '@/srore/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function AuthLayout({ children }: {
    children: React.ReactNode
}) {

    const router = useRouter()
    const { session } = useAuthStore()

    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])

    if (session) {
        return null
    }

    return (
        <div className='h-screen w-screen grid place-items-center bg-zinc-900'>
            {children}
        </div>
    )
}

export default AuthLayout