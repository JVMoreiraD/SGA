'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { z } from "zod"
import { useState } from "react"
import { formSchema, NewKeyForm } from "./NewKeyForm"

export function NewKeyDialog() {
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
                    Nova Chave
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">

                <DialogHeader>
                    <DialogTitle>
                        Adicionar nova Chave
                    </DialogTitle>
                    <DialogDescription>
                        Preencha as informações com os dada chave
                    </DialogDescription>
                </DialogHeader>
                <NewKeyForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>

    )

}
