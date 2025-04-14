import { Key, columns } from "./columns"
import { DataTable } from "./dataTable"

async function getData(): Promise<Key[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        },
        {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }, {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        },
        {
            id: "728ed52f",
            status: "available",
            block: '01',
            locker: '03'
        }

        // ...
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <DataTable columns={columns} data={data} />

            </div>
        </div>
    )
}

