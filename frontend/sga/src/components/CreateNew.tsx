import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

interface CreateNewProps {
    text: string
}
export function CreateNew({ text }: CreateNewProps) {
    return (
        <Button variant={"secondary"}>
            <PlusIcon />
            {text}
        </Button>
    )
}
