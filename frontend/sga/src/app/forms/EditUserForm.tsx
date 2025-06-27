import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { User } from "./EditUserDialog"


const roles = ["Professores", "Aluno", "Terceirizados"] as const;
const phoneRegex = new RegExp(
    /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm
);

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Coloque o nome completo",
    }),
    email: z.string().email({
        message: "Email invalido"
    }),
    phone: z.string().regex(phoneRegex, 'numero invalido'),
    rolesEnum: z.enum(roles)

})

type UserFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onCancel: () => void
    user: User
}

export function EditUserForm({ onSubmit, onCancel, user }: UserFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: "",
            phone: "",
            // rolesEnum: user.role,
        },
    })

    return (
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
                        name="phone"
                        render={({ field }) => {
                            return (
                                <FormItem className="py-4">
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Telefone" {...field} />
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
