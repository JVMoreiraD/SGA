"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"

export type Locker = {
    Name: string
    Description: string
    Group: string
    Capacity: string
}


export const columns: ColumnDef<Locker>[] = [
    {
        accessorKey: "Name",
        header: "Name"
    },
    {
        accessorKey: "Description",
        header: "Descrição",
    },
    {

        accessorKey: "Group",
        header: "Grupo",
    },
    {
        accessorKey: "Capacity",
        header: "Capacidade",
        cell: ({ row }) => (
            < div className="flex justify-center" >{row.getValue("Capacity")}</div>
        )

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
    },
]
