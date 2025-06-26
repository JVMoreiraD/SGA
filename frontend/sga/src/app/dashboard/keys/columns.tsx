"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"

export type Key = {
    id: string
    quantity: number
}


export const columns: ColumnDef<Key>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "quantity",
        header: ({}) => (
            <div className="flex justify-center">Capacidade</div>
        ),
        cell: ({ row }) => (
            < div className="flex justify-center" >{row.getValue("quantity")}</div>
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
