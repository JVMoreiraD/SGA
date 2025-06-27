import { DeleteDialog } from "@/components/DeleteDialog";
import { JSX, useMemo, useState } from "react";
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
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import { EditLockerDialog } from "@/app/forms/EditLockerDialog";

type Locker = {
    Name: string;
    Description: string;

}
interface ILockerDropdown {
    locker: Locker
}

export function LockerDropDown({ locker }: ILockerDropdown) {
    const [dialogMenu, setDialogMenu] = useState<string>("none");

    const handleDialogMenu = useMemo((): JSX.Element | null => {
        switch (dialogMenu) {
            case "edit":
                return <EditLockerDialog locker={locker} setDialogMenu={setDialogMenu} />
            case "delete":
                return <DeleteDialog />;
            default:
                return null;
        }
    }, [dialogMenu, locker])

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
                        <DropdownMenuItem onSelect={() => setDialogMenu("delete")}>
                            <Trash2Icon />
                            Deletar
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {handleDialogMenu}
        </Dialog>
    );
}
