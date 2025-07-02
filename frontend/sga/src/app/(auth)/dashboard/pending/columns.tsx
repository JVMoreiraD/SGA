"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"

export type Pending = {
    key: string
    user: string
}


export const columns: ColumnDef<Pending>[] = [
    {
        accessorKey: "key",
        header: "Chave"
    },
    {
        accessorKey: "user",
        header: "Usuário"
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                        >
                            <EditIcon />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Trash2Icon />
                            Deletar
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
