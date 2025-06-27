import { Key, columns } from "./columns"
import { DataTable } from "./dataTable"

async function getData(): Promise<Key[]> {
    // Fetch data from your API here.
    return [
        { id: "2021", quantity: 2 },
        { id: "2032", quantity: 2 },
        { id: "2133", quantity: 2 },
        { id: "2136", quantity: 2 },
        { id: "2141", quantity: 2 },
        { id: "2154", quantity: 2 },
        { id: "2155", quantity: 2 },
        { id: "2276", quantity: 2 },
        { id: "2659", quantity: 2 },
        { id: "2689", quantity: 2 },
        { id: "2728", quantity: 2 },
        { id: "2767", quantity: 2 },
        { id: "2428", quantity: 2 },
        { id: "2556", quantity: 2 },
        { id: "2561", quantity: 2 },
        { id: "2648", quantity: 2 },
        { id: "2674", quantity: 2 },
        { id: "2678", quantity: 2 },
        { id: "2685", quantity: 2 },
        { id: "2704", quantity: 2 },
        { id: "2714", quantity: 2 },
        { id: "2773", quantity: 2 },
        { id: "2775", quantity: 2 },
        { id: "2778", quantity: 2 },
        { id: "2417", quantity: 2 },
        { id: "2425", quantity: 2 },
        { id: "2641", quantity: 2 },
        { id: "2661", quantity: 2 },
        { id: "2682", quantity: 2 },
        { id: "2683", quantity: 2 },
        { id: "2687", quantity: 2 },
        { id: "2701", quantity: 2 },
        { id: "2702", quantity: 2 },
        { id: "2713", quantity: 2 },
        { id: "2722", quantity: 2 },
        { id: "2730", quantity: 2 }
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

