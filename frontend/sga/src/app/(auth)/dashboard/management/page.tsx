import { Group, columns } from "./columns"
import { DataTable } from "./dataTable"

async function getData(): Promise<Group[]> {
    // Fetch data from your API here.
    return [
        {
            Name: "Professores",
            Description: "Grupo de usuários dos professores"
        },
        {
            Name: "Alunos",
            Description: "Grupo de usuários dos alunos"
        }, {
            Name: "Terceirizados",
            Description: "Grupo de usuários dos terceirizados"
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

