'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"

import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
export const formSchema = z.object({
    email: z.string().min(2, {
        message: "Insira a email da chave",
    }),
    password: z.string().min(2, {
        message: "Insira a password da chave",
    }),

})
export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await signIn("credentials", {
                ...values,
                redirect: false
            })


            if (result?.error) {
                // setError("Invalid email or password")
                return
            }

            router.replace("/dashboard/users")
            // router.refresh()
        } catch (error) {
            console.error(error)
            console.log(values.email)

            // setError("Something went wrong. Please try again.")
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Insira o Email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <fieldset>
                                <div className="flex flex-col gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel>Email</FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="Insira seu Email"
                                                            required
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel>Senha</FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            placeholder="********"
                                                            required
                                                            {...field} />

                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />

                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>

                            </fieldset>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
