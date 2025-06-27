'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { z } from "zod"
import { useState } from "react"
import { formSchema, NewGroupForm } from "./NewGroupForm"

export function NewGroupDialog() {
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
                    Novo Grupo
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">

                <DialogHeader>
                    <DialogTitle>
                        Adicionar novo Grupo
                    </DialogTitle>
                    <DialogDescription>
                        Preencha as informações para o novo grupo de usuários
                    </DialogDescription>
                </DialogHeader>
                <NewGroupForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>

    )

}
