import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2Icon } from "lucide-react"

export function DeleteDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="flex justify-start">
                        <Trash2Icon />
                        Deletar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Deletar item</DialogTitle>
                        <DialogDescription>
                            Voce deseja mesmo deletar este item ?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" variant={"destructive"}>Deletar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
