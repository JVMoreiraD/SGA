"use client"


// import { EditUserDialog } from "@/app/forms/EditUserDialog"
// import { DeleteDialog } from "@/components/DeleteDialog"
import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react" //MoreHorizontal
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
                // <DropdownMenu >
                //     <DropdownMenuTrigger asChild>
                //         <Button variant="ghost" className="h-8 w-8 p-0">
                //             <span className="sr-only">Open menu</span>
                //             <MoreHorizontal />
                //         </Button>
                //     </DropdownMenuTrigger>
                //     <DropdownMenuContent align="end">
                //         <DropdownMenuLabel>Ações</DropdownMenuLabel>
                //         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                //             <EditUserDialog user={{ email: row.getValue("email"), name: row.getValue("name"), phone: row.getValue("phone"), role: row.getValue("role") }} />
                //         </DropdownMenuItem>
                //         <DropdownMenuSeparator />
                //         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                //             <DeleteDialog />
                //         </DropdownMenuItem>

                //     </DropdownMenuContent>
                // </DropdownMenu>
            )
        },
    },
]
