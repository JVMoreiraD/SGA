import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"


export const formSchema = z.object({
    user: z.string().min(2, {
        message: "Insira o nome do aluno",
    }),
    key: z.string().min(1, {
        message: "Insira a identificação da chave",
    }),

})

type UserFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onCancel: () => void
}

type Status = {
    value: string
    label: string
}
const statuses: Status[] = [
    {
        value: "backlog",
        label: "Backlog",
    },
    {
        value: "todo",
        label: "Todo",
    },
    {
        value: "in progress",
        label: "In Progress",
    },
    {
        value: "done",
        label: "Done",
    },
    {
        value: "canceled",
        label: "Canceled",
    },
]
export function BookKeyForm({ onSubmit, onCancel }: UserFormProps) {
    // const [open, setOpen] = React.useState(false)
    // const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    //     null
    // )
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            key: "",
        },
    })

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className="flex-row" >
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => {
                            return (
                                <FormItem className="py-2">
                                    <FormLabel>Nome Do Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do usuário" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}

                    />
                    <FormField
                        control={form.control}
                        name="key"
                        render={({ field }) => {
                            return (
                                <FormItem className="py-4">
                                    <FormLabel>Chave</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? statuses.find(
                                                                (language) => language.value === field.value
                                                            )?.label
                                                            : "Select language"}
                                                        <ChevronsUpDown className="opacity-50" />

                                                    </Button>
                                                </FormControl>

                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search framework..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>No framework found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {statuses.map((language) => (
                                                                <CommandItem
                                                                    value={language.label}
                                                                    key={language.value}
                                                                    onSelect={() => {
                                                                        form.setValue("key", language.value)
                                                                    }}
                                                                >
                                                                    <>
                                                                        {language.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                language.value === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </>

                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}

                    />


                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={onCancel} type="button">
                            Cancelar
                        </Button>
                        <Button type="submit">Cadastrar</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )

}
