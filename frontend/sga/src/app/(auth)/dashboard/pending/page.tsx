import { columns, Pending } from "./columns"
import { DataTable } from "./dataTable"

async function getData(): Promise<Pending[]> {
    return [
        { key: "2021", user: "João Vitor Moreira" },
        { key: "2028", user: "Daniel Alves" }
    ]

}

export default async function PendingPage() {
    const data = await getData()

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-screen-md">
                <DataTable columns={columns} data={data} />

            </div>
        </div>
    )
}
