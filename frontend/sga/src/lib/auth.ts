import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getApiUrl } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toFormData(obj: any) {
    const formBody = []
    for (const property in obj) {
        const encodedKey = encodeURIComponent(property)
        const encodedValue = encodeURIComponent(obj[property])
        formBody.push(`${encodedKey}=${encodedValue}`)
    }
    return formBody.join("&")
}
const url = getApiUrl("/login")
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
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

                const data = {
                    email: credentials.email,
                    password: credentials.password,
                }
                const formData = toFormData(data)

                try {
                    const res = await fetch(url, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        }
                    })

                    const resData = await res.json()

                    if (res.ok && resData && resData.data) {
                        const { data } = resData.data
                        return data
                    } else {
                        console.error('Authorization failed:', resData)
                        return null
                    }
                } catch (error) {
                    console.error('Authorization error:', error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token
            return session
        },
    },
})
