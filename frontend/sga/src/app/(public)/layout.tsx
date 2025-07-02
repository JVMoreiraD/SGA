import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(nextAuthOptions)

    if (session) {
        redirect("/dashboard/users")
    }

    return (
        <>{children}</>
    )
}
