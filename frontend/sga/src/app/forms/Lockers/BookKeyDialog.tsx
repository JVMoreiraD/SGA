'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { z } from "zod"
import { useState } from "react"
import { BookKeyForm, formSchema } from "./BookKeyForm"

export function BookKeyDialog() {
    const [dialogIsOpen, setIsDialogOpen] = useState(false)


    function handleSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(false)
        console.log(values)
    }
    return (
        <Dialog open={dialogIsOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Reservar
                    Armário
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">

                <DialogHeader>
                    <DialogTitle>
                        Reserve o Armário
                    </DialogTitle>
                    <DialogDescription>
                        Selecione o usuário e a chave
                    </DialogDescription>
                </DialogHeader>
                <BookKeyForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>

    )

}
