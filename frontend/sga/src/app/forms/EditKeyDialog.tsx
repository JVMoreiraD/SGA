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
import { Key } from "../dashboard/keys/columns"
import { EditKeyForm, formSchema } from "./EditKeyForm"



interface EditKeyDialogProps {
    keyProps: Key
    setDialogMenu: (menu: string) => void
}
export function EditKeyDialog({ keyProps, setDialogMenu }: EditKeyDialogProps) {
    const [, setIsDialogOpen] = useState(false)

    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Editar informações da chave
                </DialogTitle>
                <DialogDescription>
                    Preencha as informações com os dados do novo usuário
                </DialogDescription>
            </DialogHeader>
            <EditKeyForm
                keyProps={keyProps}
                onSubmit={handleSubmit}
                onCancel={() => setDialogMenu("none")}

            />
        </DialogContent>
    )
}
