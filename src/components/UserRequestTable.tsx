import { useState } from "react"
import { dummyData } from "../data/dummyData";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { UserRequest } from "../types/userRequest";
import TableSearch from "./TableSearch";
import { useNavigate } from "react-router-dom";
import { CirclePlus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function UserRequestTable() {

    const navigate = useNavigate();

    const columnHelper = createColumnHelper<UserRequest>();
    const defaultColumns = [

        columnHelper.accessor('requestId', {
            cell: info => info.getValue(),
            header: "ID"
        }),
        columnHelper.accessor('requestDate', {
            cell: info => info.getValue(),
            header: "DATE"
        }),
        columnHelper.accessor('requestTitle', {
            cell: info => info.getValue(),
            header: "TITLE"
        }),
        columnHelper.accessor('requestStatus', {
            cell: info => {
                if (info.getValue() === 'approved') {
                    return (
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-80">
                            approved
                        </span>
                    )
                } else if (info.getValue() === 'pending') {
                    return (
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-80">
                            pending
                        </span>
                    )
                } else {
                    return (
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-80">
                            rejected
                        </span>
                    )
                }
            },
            header: "STATUS"
        })

    ]

    // backend DTO will come with status as string however in backend it is stored as statusCode(int)


    const [requestData, setRequestData] = useState<UserRequest[]>(dummyData);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: requestData,
        columns: defaultColumns,
        state: {
            globalFilter
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    table.getState().pagination.pageSize = 10;          // number of rows per page

    return (
        <>
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-md w-72">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                    <div className="text-xl">
                        <button className="w-52 bg-[#4369ff] rounded-xl text-white py-2 font-medium hover:bg-[#3451c7]" onClick={() => navigate("/new-request")}>
                            <div className="flex items-center justify-center">
                                <CirclePlus className="h-6 w-6 text-white mr-2" />
                                New Request
                            </div>
                        </button>
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start text-xl p-5 font-medium" >My Requests</caption>
                        <thead className="bg-white border-b-2 border-gray-200">
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-3 text-md font-semibold tracking-wide text-left whitespace-nowrap">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <tr key={row.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-slate-200 transition-all duration-100`}>
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id} className="p-3 text-gray-700 whitespace-nowrap">
                                                        {
                                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                                        }
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<div className="text-red-600 font-medium p-5 items-center justify-center text-xl">No record found !</div>)
                            }
                        </tbody>
                    </table>

                </div>
                {/** pagination */}
                <div className="mt-5 flex items-center justify-end gap-2">
                    <button onClick={() => { table.previousPage() }} disabled={!table.getCanPreviousPage()} className="text-lg font-bold p-1 border border-gray-500 px-2 disabled:opacity-30 shadow-lg">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button onClick={() => { table.nextPage() }} disabled={!table.getCanNextPage()} className="text-lg font-bold p-1 border border-gray-500 px-2 disabled:opacity-30 shadow-lg">
                        <ChevronRight className="w-7 h-7" />
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page </div>
                        <strong>{table.getState().pagination.pageIndex + 1} of {" "}{table.getPageCount()}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input type="number" defaultValue={table.getState().pagination.pageIndex + 1}
                            className="border p-1 rounded bg-transparent w-16"
                            max={table.getPageCount()}
                            min={1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }} />
                    </span>
                </div>

            </div>
        </>
    )
}