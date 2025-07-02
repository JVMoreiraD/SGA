import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Key } from "../../(auth)/dashboard/keys/columns"


export const formSchema = z.object({
    identificação: z.string().min(2, {
        message: "Insira a identificação da chave",
    }),
    quantidade: z.coerce.number(
        {
            required_error: "O número é obrigatório",
            invalid_type_error: "Deve ser um número",
        }
    ).int().positive(),

})

type UserFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onCancel: () => void
    keyProps: Key
}

export function EditKeyForm({ onSubmit, onCancel, keyProps }: UserFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identificação: keyProps.id,
            quantidade: keyProps.quantity,
        },
    })

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className="flex-row" >
                    <FormField
                        control={form.control}
                        name="identificação"
                        render={({ field }) => {
                            return (
                                <FormItem className="py-4">
                                    <FormLabel>Numeração da chave</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Identificação da chave" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}

                    />
                    <FormField
                        control={form.control}
                        name="quantidade"
                        render={({ field }) => {
                            return (
                                <FormItem className="py-4">
                                    <FormLabel>Quantidade de copias</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
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
                        <Button type="submit">Salvar</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )

}
