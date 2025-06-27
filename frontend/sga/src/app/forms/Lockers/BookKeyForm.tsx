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

const userOptions = [
    { label: 'Carlos Silva', value: 'Carlos Silva' },
    { label: 'Ana Oliveira', value: 'Ana Oliveira' },
    { label: 'Rafael Souza', value: 'Rafael Souza' },
    { label: 'Mariana Costa', value: 'Mariana Costa' },
    { label: 'Lucas Pereira', value: 'Lucas Pereira' },
    { label: 'Juliana Santos', value: 'Juliana Santos' },
    { label: 'Fernando Alves', value: 'Fernando Alves' },
    { label: 'Patrícia Lima', value: 'Patrícia Lima' },
    { label: 'Roberto Nunes', value: 'Roberto Nunes' },
    { label: 'Camila Rocha', value: 'Camila Rocha' },
    { label: 'Bruno Mendes', value: 'Bruno Mendes' },
    { label: 'Amanda Freitas', value: 'Amanda Freitas' },
    { label: 'Diego Martins', value: 'Diego Martins' },
    { label: 'Tatiane Ribeiro', value: 'Tatiane Ribeiro' },
    { label: 'Gustavo Henrique', value: 'Gustavo Henrique' },
    { label: 'Isabela Castro', value: 'Isabela Castro' },
    { label: 'Vinícius Cardoso', value: 'Vinícius Cardoso' },
    { label: 'Larissa Gomes', value: 'Larissa Gomes' },
    { label: 'Thiago Barbosa', value: 'Thiago Barbosa' },
    { label: 'Natália Duarte', value: 'Natália Duarte' }
];
const defaultOptions: Option[] = [
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
]

const mockSearchKey = async (value: string): Promise<Option[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = defaultOptions.filter((option) => option.value.includes(value));
            resolve(res);
        }, 1000);
    });
};




const mockSearchUser = async (value: string): Promise<Option[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = userOptions.filter((option) => option.value.includes(value));
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

                                            defaultOptions={defaultOptions}
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
                        <Button type="submit">Salvar</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )

}
