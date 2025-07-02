"use client"

import { BookKeyDialog } from "@/app/forms/Lockers/BookKeyDialog"
import { ColumnDef } from "@tanstack/react-table"
import { LockerDropDown } from "./lockersDropDown"

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
        accessorKey: "Book",
        header: "Alugar",

        cell: ({}) => (
            <BookKeyDialog />
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <LockerDropDown locker={{ Description: row.getValue("Description"), Name: row.getValue("Name") }} />

            )
        },
    },
]
