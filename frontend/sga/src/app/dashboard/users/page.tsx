// 'use client'
// import { DialogDemo } from "@/app/forms/dialog"
import { columns, User } from "./column"
import { DataTable } from "./dataTable"
// import { InputSearchName } from "@/components/InputSearchName"


async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    return [
        {
            name: "Carlos Silva",
            phone: "(11) 98765-4321",
            email: "carlos.silva@example.com",
            role: "Professor",
        },
        {
            name: "Ana Oliveira",
            phone: "(21) 99876-5432",
            email: "ana.oliveira@example.com",
            role: "Aluno",
        },
        {
            name: "Rafael Souza",
            phone: "(31) 99123-4567",
            email: "rafael.souza@example.com",
            role: "Terceirizado",
        },
        {
            name: "Mariana Costa",
            phone: "(51) 99234-5678",
            email: "mariana.costa@example.com",
            role: "Professor",
        },
        {
            name: "Lucas Pereira",
            phone: "(19) 99345-6789",
            email: "lucas.pereira@example.com",
            role: "Aluno",
        },
        {
            name: "Juliana Santos",
            phone: "(27) 99456-7890",
            email: "juliana.santos@example.com",
            role: "Terceirizado",
        },
        {
            name: "Fernando Alves",
            phone: "(85) 99567-8901",
            email: "fernando.alves@example.com",
            role: "Professor",
        },
        {
            name: "Patrícia Lima",
            phone: "(47) 99678-9012",
            email: "patricia.lima@example.com",
            role: "Aluno",
        },
        {
            name: "Roberto Nunes",
            phone: "(61) 99789-0123",
            email: "roberto.nunes@example.com",
            role: "Terceirizado",
        },
        {
            name: "Camila Rocha",
            phone: "(71) 99890-1234",
            email: "camila.rocha@example.com",
            role: "Professor",
        },
        {
            name: "Bruno Mendes",
            phone: "(62) 99901-2345",
            email: "bruno.mendes@example.com",
            role: "Aluno",
        },
        {
            name: "Amanda Freitas",
            phone: "(48) 99112-3456",
            email: "amanda.freitas@example.com",
            role: "Terceirizado",
        },
        {
            name: "Diego Martins",
            phone: "(81) 99223-4567",
            email: "diego.martins@example.com",
            role: "Professor",
        },
        {
            name: "Tatiane Ribeiro",
            phone: "(98) 99334-5678",
            email: "tatiane.ribeiro@example.com",
            role: "Aluno",
        },
        {
            name: "Gustavo Henrique",
            phone: "(67) 99445-6789",
            email: "gustavo.henrique@example.com",
            role: "Terceirizado",
        },
        {
            name: "Isabela Castro",
            phone: "(92) 99556-7890",
            email: "isabela.castro@example.com",
            role: "Professor",
        },
        {
            name: "Vinícius Cardoso",
            phone: "(84) 99667-8901",
            email: "vinicius.cardoso@example.com",
            role: "Aluno",
        },
        {
            name: "Larissa Gomes",
            phone: "(79) 99778-9012",
            email: "larissa.gomes@example.com",
            role: "Terceirizado",
        },
        {
            name: "Thiago Barbosa",
            phone: "(86) 99889-0123",
            email: "thiago.barbosa@example.com",
            role: "Professor",
        },
        {
            name: "Natália Duarte",
            phone: "(54) 99990-1234",
            email: "natalia.duarte@example.com",
            role: "Aluno",
        },
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

