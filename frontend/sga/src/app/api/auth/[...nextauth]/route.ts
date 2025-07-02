import { getApiUrl } from "@/lib/utils"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

const nextAuthOptions: NextAuthOptions = {
    secret: "kokokokok",
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const resp = await fetch(getApiUrl("/login"), {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    })

                    if (resp.status !== 200) {
                        return null
                    }

                    const authData = await resp.json()

                    if (!authData.jwt || !authData.id) {
                        return null
                    }

                    (await cookies()).set("jwt", authData.jwt)

                    return {
                        id: authData.id,
                        name: authData.name,
                        email: authData.email,
                    }

                    // if (user && resp.ok) {
                    // 	return user
                    // }

                    // return null
                } catch {
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: ""
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }

            return token
        },
        async session({ session, token }) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session = token.user as any

            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
