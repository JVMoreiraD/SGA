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

import { useState } from "react"
import { EditLockerForm, formSchema } from "./EditLockerForm"
type Locker = {
    Name: string;
    Description: string;

}

interface EditLockerDialogProps {
    locker: Locker
    setDialogMenu: (menu: string) => void
}
export function EditLockerDialog({ locker, setDialogMenu }: EditLockerDialogProps) {
    const [, setIsDialogOpen] = useState(false)

    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    console.log(locker)
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    Adicionar novo Usuário
                </DialogTitle>
                <DialogDescription>
                    Preencha as informações com os dados do novo usuário
                </DialogDescription>
            </DialogHeader>
            <EditLockerForm
                locker={locker}
                onSubmit={handleSubmit}
                onCancel={() => setDialogMenu("none")}

            />
        </DialogContent>
    )
}
