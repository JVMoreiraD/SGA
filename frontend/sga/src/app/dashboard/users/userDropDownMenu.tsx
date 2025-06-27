import { EditUserDialog } from "@/app/forms/EditUserDialog";
import { DeleteDialog } from "@/components/DeleteDialog";
import { JSX, useMemo, useState } from "react";
import { User } from "./column";
import { Dialog } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { EditIcon, MoreHorizontal } from "lucide-react";

interface IUserDropdown {
    user: User
}

export function UserDropdown({ user }: IUserDropdown) {
    const [dialogMenu, setDialogMenu] = useState<string>("none");

    const handleDialogMenu = useMemo((): JSX.Element | null => {
        switch (dialogMenu) {
            case "edit":
                return <EditUserDialog user={user} setDialogMenu={setDialogMenu} />
            case "delete":
                return <DeleteDialog />;
            default:
                return null;
        }
    }, [dialogMenu, user])

    return (
        <Dialog open={!!handleDialogMenu} onOpenChange={() => setDialogMenu("none")}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setDialogMenu("edit")}>
                            <EditIcon />
                            Editar
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onSelect={() => setDialogMenu("delete")}>
<Trash2Icon />
Deletar
</DropdownMenuItem> */}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {handleDialogMenu}
        </Dialog>
    );
}
