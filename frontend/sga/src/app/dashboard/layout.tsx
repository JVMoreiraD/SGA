import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
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
