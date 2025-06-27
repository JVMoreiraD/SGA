"use client"

import { ColumnDef } from "@tanstack/react-table"
import { KeyDropdown } from "./keysDropDownMenu"

export type Key = {
    id: string
    quantity: number
}


export const columns: ColumnDef<Key>[] = [
    {
        accessorKey: "id",
        header: "Identificação"
    },
    {
        accessorKey: "quantity",
        header: ({}) => (
            <div className="flex justify-center">Copias</div>
        ),
        cell: ({ row }) => (
            < div className="flex justify-center" >{row.getValue("quantity")}</div>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            console.log(row.getValue("id"))
            return (
                <KeyDropdown keyProps={{ id: row.getValue("id"), quantity: row.getValue("quantity") }} />
            )
        },
    },
]
