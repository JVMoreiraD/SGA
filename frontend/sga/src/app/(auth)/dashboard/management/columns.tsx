"use client"

import { ColumnDef } from "@tanstack/react-table"
import { GroupDropdown } from "./managementDropdownMenu"

export type Group = {
    Name: string
    Description: string
}


export const columns: ColumnDef<Group>[] = [
    {
        accessorKey: "Name",
        header: "Name"
    },
    {
        accessorKey: "Description",
        header: "Descrição",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <GroupDropdown groupProps={{ Name: row.getValue("Name"), Description: row.getValue("Description") }} />

            )
        },
    },
]
