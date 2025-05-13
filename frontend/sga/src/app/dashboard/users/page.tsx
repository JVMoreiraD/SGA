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
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão vitor de franca leitao",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão vitor vasconselos do flamengo",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        }, {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        }, {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        }, {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        }, {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        }, {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
            email: "vitor@gmail.com",
            phone: "858012430",
            role: "Admin"
        },
        {
            name: "joão",
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

