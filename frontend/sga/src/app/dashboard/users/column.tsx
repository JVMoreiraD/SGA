"use client"

import { ColumnDef } from "@tanstack/react-table"


export type User = {
    name: string,
    phone: string,
    email: string,
    role: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nome"
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
    }
]
