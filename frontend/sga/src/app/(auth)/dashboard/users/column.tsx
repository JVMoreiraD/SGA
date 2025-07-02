"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { UserDropdown } from "./userDropDownMenu"


export type User = {
    name: string,
    phone: string,
    email: string,
    role: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Telefone",
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "role",
        header: "Grupo"
    },
    {
        id: "actions",
        enableHiding: false,

        cell: ({ row }) => {

            return (
                <UserDropdown user={{ email: row.getValue("email"), name: row.getValue("name"), phone: row.getValue("phone"), role: row.getValue("role") }} />

            )
        },
    },
]
