import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Group } from "../dashboard/management/columns"


export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Insira a identificação da chave",
    }),
    description: z.string().min(2, {
        message: "Insira a identificação da chave",
    }),

})

type UserFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onCancel: () => void
    groupProps: Group
}

export function EditGroupForm({ onSubmit, onCancel, groupProps }: UserFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: groupProps.Name,
            description: groupProps.Description,
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
                                    <FormLabel>Numeração da chave</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do novo grupo" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}

                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => {
                            return (
                                <FormItem className="py-4">
                                    <FormLabel>Descrição do novo grupo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insira a descrição para o novo grupo" {...field} />
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
