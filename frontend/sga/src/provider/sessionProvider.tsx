"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface INextAuthSessionProvider {
    children: ReactNode
}

export default function NextAuthSessionProvider({ children }: INextAuthSessionProvider) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
