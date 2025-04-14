"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Key = {
    id: string
    status: "rented" | "available"
    locker: string
    block: string
}


export const columns: ColumnDef<Key>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "block",
        header: "Bloco",
    },
    {
        accessorKey: "locker",
        header: "Armário",
    },
    {
        accessorKey: "status",
        header: "Status",

    },
]
