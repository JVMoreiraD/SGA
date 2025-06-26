import { Key, columns } from "./columns"
import { DataTable } from "./dataTable"

async function getData(): Promise<Key[]> {
    // Fetch data from your API here.
    return [
        {
            id: "2686",
            quantity: 3
        },
        {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        }, {
            id: "2686",
            quantity: 3
        },
        {
            id: "2686",
            quantity: 3
        },
        {
            id: "2686",
            quantity: 3
        }
        // ...
    ]
}

export default async function KeysPage() {
    const data = await getData()

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-screen-md">
                <DataTable columns={columns} data={data} />

            </div>
        </div>
    )
}

