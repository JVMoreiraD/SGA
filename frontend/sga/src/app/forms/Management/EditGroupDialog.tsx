// import { Button } from "@/components/ui/button"
import {
    // Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"

import { useState } from "react"
import { Group } from "../../dashboard/management/columns"
import { EditGroupForm, formSchema } from "./EditGroupForm"



interface EditGroupDialogProps {
    groupProps: Group
    setDialogMenu: (menu: string) => void
}
export function EditGroupDialog({ groupProps, setDialogMenu }: EditGroupDialogProps) {
    const [, setIsDialogOpen] = useState(false)

    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Editar informações do Grupo
                </DialogTitle>
                <DialogDescription>
                    Edite as informações do Grupo
                </DialogDescription>
            </DialogHeader>
            <EditGroupForm
                groupProps={groupProps}
                onSubmit={handleSubmit}
                onCancel={() => setDialogMenu("none")}

            />
        </DialogContent>
    )
}
