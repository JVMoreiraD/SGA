import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(nextAuthOptions)

    if (!session) {
        redirect("/")
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col mx-auto w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
