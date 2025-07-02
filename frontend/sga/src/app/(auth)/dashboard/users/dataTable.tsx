'use client'
import { NewUserDialog } from "@/app/forms/Users/NewUserDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import React from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const groupOptions = [

    {
        value: "Professor",
        label: "Professor",
    },
    {
        value: "Aluno",
        label: "Aluno",
    },
    {
        value: "Terceirizado",
        label: "Terceirizado",
    }

]
export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [value, setValue] = React.useState<string | undefined>(undefined)
    const [key, setKey] = React.useState(+new Date())


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
    })

    return (

        <div>

            <div className="flex items-center py-4 mb-4 justify-between">
                <div className="flex gap-2">
                    <Input
                        placeholder="Buscar por nome..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Select
                        onValueChange={(event) => {
                            { console.log(event) }
                            table.getColumn("role")?.setFilterValue(event)
                        }
                        }
                        key={key} value={value}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Grupo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup

                            >
                                <SelectLabel>Grupo</SelectLabel>
                                {
                                    groupOptions.map((options) => (
                                        <SelectItem key={options.value} value={options.value}



                                        >
                                            {options.label}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                            <SelectSeparator />
                            <Button
                                className="w-full px-2"
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setValue(undefined)
                                    setKey(+new Date())
                                    table.getColumn("role")?.setFilterValue(null)
                                }}
                            >
                                Limpar
                            </Button>
                        </SelectContent>
                    </Select>



                </div>
                <NewUserDialog />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Proximo
                </Button>
            </div>
        </div>
    )
}

