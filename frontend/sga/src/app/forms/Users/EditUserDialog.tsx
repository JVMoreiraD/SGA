// import { Button } from "@/components/ui/button"
import {
    // Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
// import { EditIcon } from "lucide-react"
import { z } from "zod"

import { EditUserForm, formSchema } from "./EditUserForm"
import { useState } from "react"
export type User = {
    name: string,
    phone: string,
    email: string,
    role: string
}


interface EditUSerDialogProps {
    user: User
    setDialogMenu: (menu: string) => void
}
export function EditUserDialog({ user, setDialogMenu }: EditUSerDialogProps) {
    const [, setIsDialogOpen] = useState(false)

    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    console.log(user)
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Edição de Usuário
                </DialogTitle>
                <DialogDescription>
                    Altere as informações necessárias do usuário
                </DialogDescription>
            </DialogHeader>
            <EditUserForm
                user={user}
                onSubmit={handleSubmit}
                onCancel={() => setDialogMenu("none")}

            />
        </DialogContent>
    )
}
