'use client'
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function DialogDemo() {
    const [dialogIsOpen, setIsDialogOpen] = useState(false)
    const roles = ["Professores", "Aluno", "Terceirizados"] as const;
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Coloque o nome completo",
        }),
        email: z.string().email({
            message: "Email invalido"
        }),
        rolesEnum: z.enum(roles)

    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",

        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
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
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <fieldset className="flex-row" >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="py-4">
                                            <FormLabel>Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nome" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}

                            />
                            <FormField

                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="pb-4">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o email" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="rolesEnum"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="pb-16">
                                            <FormLabel className="pt-6">
                                                Grupo
                                            </FormLabel>
                                            <br />
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl >
                                                    <SelectTrigger  >
                                                        <SelectValue placeholder="Selecione o grupo" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectGroup>
                                                        {
                                                            roles.map((role) =>
                                                                <SelectItem key={role} value={role}>
                                                                    {role}
                                                                </SelectItem>
                                                            )
                                                        }

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        </FormItem>
                                    )
                                }}
                            />
                            <DialogFooter >
                                <Button className="my-2" variant="secondary" onClick={() => {
                                    setIsDialogOpen(false);
                                }} type="button">Cancelar</Button>

                                <Button className="my-2" type="submit">Cadastrar</Button>
                            </DialogFooter>
                        </fieldset>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )

}
