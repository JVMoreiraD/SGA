// 'use client'
// import { DialogDemo } from "@/app/forms/dialog"
// import { fetchClient } from "@/lib/fetchClient"
import { columns, User } from "./column"
import { DataTable } from "./dataTable"
import { getApiUrl } from "@/lib/utils"
import { fetchServer } from "@/lib/fetchServer"
type Role = {
    ID: string
    RoleName: string
}
type ResponseUser = {
    ID: string
    Name: string
    Phone: string
    Email: string
    Role: Role
}
async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    const usersResponse = await fetchServer(getApiUrl("/users"))

    const userData = await usersResponse.json()
    const response: User[] = userData.users.map((user: ResponseUser) => (
        {
            name: user.Name,
            phone: user.Phone,
            email: user.Email,
            role: user.Role.RoleName
        }
    ))
    return response

}

export default async function DemoPage() {
    const data = await getData()
    return (
        <div className="w-full flex items-center justify-center">

            <DataTable columns={columns} data={data} />

        </div>

    )
}

