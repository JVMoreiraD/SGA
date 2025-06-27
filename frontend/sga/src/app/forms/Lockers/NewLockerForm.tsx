import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import React from "react"


const roles = ["Professores", "Aluno", "Terceirizados"] as const;
const optionsKeysSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional()
})
export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Coloque o nome completo",
    }),
    description: z.string().email({
        message: "Email invalido"
    }),
    keys: z.array(optionsKeysSchema).min(1),
    rolesEnum: z.enum(roles)

})

const OPTIONS: Option[] = [
    { label: '2021', value: '2021' },
    { label: '2032', value: '2032' },
    { label: '2133', value: '2133' },
    { label: '2136', value: '2136' },
    { label: '2141', value: '2141' },
    { label: '2154', value: '2154' },
    { label: '2155', value: '2155' },
    { label: '2276', value: '2276' },
    { label: '2659', value: '2659' },
    { label: '2689', value: '2689' },
    { label: '2728', value: '2728' },
    { label: '2767', value: '2767' },
    { label: '2428', value: '2428' },
    { label: '2556', value: '2556' },
    { label: '2561', value: '2561' },
    { label: '2648', value: '2648' },
    { label: '2674', value: '2674' },
    { label: '2678', value: '2678' },
    { label: '2685', value: '2685' },
    { label: '2704', value: '2704' },
    { label: '2714', value: '2714' },
    { label: '2773', value: '2773' },
    { label: '2775', value: '2775' },
    { label: '2778', value: '2778' },
    { label: '2417', value: '2417' },
    { label: '2425', value: '2425' },
    { label: '2641', value: '2641' },
    { label: '2661', value: '2661' },
    { label: '2682', value: '2682' },
    { label: '2683', value: '2683' },
    { label: '2687', value: '2687' },
    { label: '2701', value: '2701' },
    { label: '2702', value: '2702' },
    { label: '2713', value: '2713' },
    { label: '2722', value: '2722' },
    { label: '2730', value: '2730' }

];

const mockSearch = async (value: string): Promise<Option[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = OPTIONS.filter((option) => option.value.includes(value));
            resolve(res);
        }, 1000);
    });
};

type UserFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onCancel: () => void
}

export function NewLockerForm({ onSubmit, onCancel }: UserFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            keys: []

        },
    })
    const [, setIsTriggered] = React.useState(false);

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
                                    <FormLabel>Identificação do armário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insira a identificação do armário" {...field} />
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
                                    <FormLabel>Descrição do armário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição da localização" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )
                        }}

                    />
                    <FormField

                        control={form.control}
                        name="keys"
                        render={({}) => {
                            return (
                                <FormItem className="pb-4">
                                    <FormLabel>Chaves</FormLabel>
                                    <FormControl>
                                        <MultipleSelector
                                            onSearch={async (value) => {
                                                setIsTriggered(true);
                                                const res = await mockSearch(value);
                                                setIsTriggered(false);
                                                return res;
                                            }}

                                            defaultOptions={[]}
                                            placeholder="Busque por chaves"
                                            loadingIndicator={
                                                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">Carregando....</p>
                                            }
                                            emptyIndicator={
                                                <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                                                    Sem resultados
                                                </p>
                                            }
                                        />

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
