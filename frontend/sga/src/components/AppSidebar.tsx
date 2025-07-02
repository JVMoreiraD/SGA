'use client'
import { UsersRound, LockKeyhole, Settings, KeyRoundIcon, User2, ChevronUp, BookKey } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

// import { getServerSession } from "next-auth"

// import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
// Menu items.
const items = [
    {
        title: "Usuários",
        url: "users",
        isActive: true,
        icon: UsersRound,

    },
    {
        title: "Armários",
        url: "lockers",
        icon: LockKeyhole,
    },
    {
        title: 'Chaves',
        url: "keys",
        icon: KeyRoundIcon
    },
    {
        title: 'Chaves Pendentes',
        url: 'pending',
        icon: BookKey
    },
    {
        title: "Configurações",
        url: "management",
        icon: Settings,
    }

]

export function AppSidebar() {
    const router = useRouter()
    // const session = getServerSession(nextAuthOptions)
    // console.log(session)
    async function handleSignOut() {
        await signOut({
            redirect: false
        })

        router.replace("/")
    }
    return (
        <Sidebar className="overflow-hidden">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>SGA - Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Usuário
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Conta</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={({}) => (handleSignOut())}>
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
