'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { z } from "zod"
import { useState } from "react"
import { NewUserForm, formSchema } from "./newUserForm"

export function NewUserDialog() {
    const [dialogIsOpen, setIsDialogOpen] = useState(false)


    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    return (
        <Dialog open={dialogIsOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusIcon />
                    Novo Usuário
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">

                <DialogHeader>
                    <DialogTitle>
                        Adicionar novo Usuário
                    </DialogTitle>
                    <DialogDescription>
                        Preencha as informações com os dados do novo usuário
                    </DialogDescription>
                </DialogHeader>
                <NewUserForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>

    )

}
