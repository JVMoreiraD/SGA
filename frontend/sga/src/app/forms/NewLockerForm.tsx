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
    { label: 'nextjs', value: 'nextjs', group: 'React' },
    { label: 'React', value: 'react', group: 'React' },
    { label: 'Remix', value: 'remix', group: 'React' },
    { label: 'shadcn-ui', value: 'shadcn-ui', group: 'React' },
    { label: 'mui', value: 'mui', group: 'React' },
    { label: 'Vite', value: 'vite', group: 'Vue' },
    { label: 'Nuxt', value: 'nuxt', group: 'Vue' },
    { label: 'Vue', value: 'vue', group: 'Vue' },
    { label: 'Quasar', value: 'quasar', group: 'Vue' },
    { label: 'Angular', value: 'angular', group: 'Angular' },
    { label: 'Material UI', value: 'material-ui', group: 'Angular' },
    { label: 'Ng-zorro', value: 'ng-zorro', group: 'Angular' },
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
                                            maxSelected={1}
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
