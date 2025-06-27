'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { z } from "zod"
import { useState } from "react"
import { NewLockerForm, formSchema } from "./NewLockerForm"

export function NewLockerDialog() {
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
                    Novo Armário
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">

                <DialogHeader>
                    <DialogTitle>
                        Adicionar novo Armário
                    </DialogTitle>
                    <DialogDescription>
                        Preencha as informações para o novo armário
                    </DialogDescription>
                </DialogHeader>
                <NewLockerForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>

    )

}
