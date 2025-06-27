import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import React from "react"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector"


const optionsKeysSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional()
})
export const formSchema = z.object({
    user: z.string(optionsKeysSchema).max(1),

    keys: z.string(optionsKeysSchema).max(1),
})

type UserFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void
    onCancel: () => void
}

const OPTIONSKey: Option[] = [
    { label: '26153', value: '26153' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'shadcn-ui', value: 'shadcn-ui' },
    { label: 'mui', value: 'mui' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Quasar', value: 'quasar' },
    { label: 'Angular', value: 'angular' },
    { label: 'Material UI', value: 'material-ui' },
    { label: 'Ng-zorro', value: 'ng-zorro' },
];

const mockSearchKey = async (value: string): Promise<Option[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = OPTIONSKey.filter((option) => option.value.includes(value));
            resolve(res);
        }, 1000);
    });
};


const OPTIONSUser: Option[] = [
    { label: '26153', value: '26153' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'shadcn-ui', value: 'shadcn-ui' },
    { label: 'mui', value: 'mui' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Quasar', value: 'quasar' },
    { label: 'Angular', value: 'angular' },
    { label: 'Material UI', value: 'material-ui' },
    { label: 'Ng-zorro', value: 'ng-zorro' },
];

const mockSearchUser = async (value: string): Promise<Option[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = OPTIONSUser.filter((option) => option.value.includes(value));
            resolve(res);
        }, 1000);
    });
};

export function BookKeyForm({ onSubmit, onCancel }: UserFormProps) {

    const [, setIsTriggered] = React.useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            keys: "",
        },
    })

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className="flex-row" >
                    <FormField

                        control={form.control}
                        name="user"
                        render={({}) => {
                            return (
                                <FormItem className="pb-4">
                                    <FormLabel>Nome do usuário</FormLabel>
                                    <FormControl>
                                        <MultipleSelector
                                            maxSelected={1}
                                            onSearch={async (value) => {
                                                setIsTriggered(true);
                                                const res = await mockSearchUser(value);
                                                setIsTriggered(false);
                                                return res;
                                            }}

                                            defaultOptions={[]}
                                            placeholder="Busque pelo usuário"
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
                        name="keys"
                        render={({}) => {
                            return (
                                <FormItem className="pb-4">
                                    <FormLabel>Identificação da chave disponível</FormLabel>
                                    <FormControl>
                                        <MultipleSelector
                                            maxSelected={1}
                                            onSearch={async (value) => {
                                                setIsTriggered(true);
                                                const res = await mockSearchKey(value);
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
