// 'use client'
// import { DialogDemo } from "@/app/forms/dialog"
import { columns, User } from "./column"
import { DataTable } from "./dataTable"
// import { InputSearchName } from "@/components/InputSearchName"


async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    return [
        {
            name: "joão vitor moreira duarte",
            email: "vitormorei@gmail.com",
            phone: "858017734",
            role: "Admin"
        },
        {
            name: "joão vitor de franca leitao",
            email: "jfranca@gmail.com",
            phone: "858420140",
            role: "Admin"
        },
        {
            name: "joão vitor vasconselos do flamengo",
            email: "vitorvasconcelos@gmail.com",
            phone: "858012430",
            role: "aluno"
        },
        {
            name: "Arthur Francisco da Silva",
            email: "artfranc@gmail.com",
            phone: "858010120",
            role: "Admin"
        },
        {
            name: "Marcelo Lucas Silveira",
            email: "marclucas@gmail.com",
            phone: "858030541",
            role: "Admin"
        },
        {
            name: "Matheus Oliveira Dos Santos",
            email: "mathsantos@gmail.com",
            phone: "859072430",
            role: "Admin"
        }, {
            name: "Caio Valério Falcão",
            email: "valeriocaio@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "Assis Guedes Duarte",
            email: "guedesassis@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "Julia Moreira Duarte",
            email: "juliamoreiradu@gmail.com",
            phone: "858012430",
            role: "Admin"
        }, {
            name: "Nicolas Cage",
            email: "nicage@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "zzz",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "xxxx",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        }
    ]
}

export default async function DemoPage() {
    const data = await getData()
    return (
        <div className="w-full flex items-center justify-center">

            <DataTable columns={columns} data={data} />

        </div>

    )
}

