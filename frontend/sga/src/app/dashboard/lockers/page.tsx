import { columns, Locker } from "./column"
import { DataTable } from "./dataTable"

async function getData(): Promise<Locker[]> {
    // Fetch data from your API here.
    return [
        {
            Name: "Armário 3",
            Description: "Armário do bloco 3, corredor direito, primeiro andar",
            Capacity: "4/9",
            Group: "Alunos"
        },
        {
            Name: "Armário 5",
            Description: "Armário do bloco 3, corredor esquerdo, segundo andar",
            Capacity: "3/9",
            Group: "Alunos"
        }, {
            Name: "Armário 4",
            Description: "Armário do bloco 3, corredor direito, primeiro andar",
            Capacity: "3/9",
            Group: "Alunos"
        }
    ]
}
export default async function LockersPage() {
    const data = await getData()
    return (
        <div className="w-full flex items-center justify-center">
            <DataTable columns={columns} data={data} />

        </div>
    )
}

