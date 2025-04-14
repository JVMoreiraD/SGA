// 'use client'
// import { Input } from "@/components/ui/input"
import { DialogDemo } from "@/app/forms/dialog"
import { columns, User } from "./column"
import { DataTable } from "./dataTable"
import { InputDemo } from "@/components/Input"


async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    return [
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
        <div className="w-full">

            <div className="flex justify-center items-start py-4 gap-x-14">
                <InputDemo />
                <DialogDemo />
            </div>

            <div className="flex items-center justify-center">


                <DataTable columns={columns} data={data} />

            </div>
        </div>

    )
}

