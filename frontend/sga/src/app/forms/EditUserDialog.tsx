import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EditIcon } from "lucide-react"
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
}
export function EditUserDialog({ user }: EditUSerDialogProps) {
    const [dialogIsOpen, setIsDialogOpen] = useState(false)


    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    console.log(user)
    return (
        <Dialog open={dialogIsOpen} onOpenChange={setIsDialogOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="flex justify-start">
                        <EditIcon />
                        Editar
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Adicionar novo Usuário
                        </DialogTitle>
                        <DialogDescription>
                            Preencha as informações com os dados do novo usuário
                        </DialogDescription>
                    </DialogHeader>
                    <EditUserForm
                        user={user}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsDialogOpen(false)}

                    />
                </DialogContent>
            </form>
        </Dialog>
    )
}
