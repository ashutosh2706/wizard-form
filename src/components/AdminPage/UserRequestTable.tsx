import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { UserRequestAdmin } from "../../types/userRequestAdmin";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TableSearch from "../TableSearch"
import ModalDialog from "./ModalDialog";
import { UserRequestAPI } from "../../types/userRequest";
import { requestService } from "../../services/requestService";


export default function UserRequestTable() {

    const [renderComponent, setRenderComponent] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [requestId, setRequestId] = useState<number | unknown>();
    const [userRequestData, setUserRequestData] = useState<UserRequestAdmin[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);


    const fetchData = () => {

        requestService.getUserRequestsAdmin().then((data: UserRequestAPI[]) => {

            const mappedData: UserRequestAdmin[] = data.map((item: UserRequestAPI) => ({
                requestId: item.requestId,
                userId: item.userId,
                title: item.title,
                priority: item.priorityCode === 1 ? 'High' : item.priorityCode === 2 ? 'Normal' : 'Low',
                status: item.statusCode === 1 ? 'pending' : item.statusCode === 2 ? 'approved' : 'rejected'
            }));

            setUserRequestData(mappedData);

        }).catch((error: Error) => window.alert(error.message));
    }

    useEffect(() => fetchData(), [renderComponent]);

    const columnHelper = createColumnHelper<UserRequestAdmin>();

    const defaultColumns = [
        columnHelper.accessor('requestId', {
            cell: info => info.getValue(),
            header: "REQUEST ID"

        }),
        columnHelper.accessor('userId', {
            cell: info => info.getValue(),
            header: "USER ID"
        }),
        columnHelper.accessor('title', {
            cell: info => info.getValue(),
            header: "TITLE"
        }),
        columnHelper.accessor('priority', {
            cell: info => info.getValue(),
            header: "PRIORITY"
        }),
        columnHelper.accessor('status', {
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
                        </span>)
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

    const table = useReactTable({
        data: userRequestData,
        columns: defaultColumns,
        enableSorting: true,
        state: {
            globalFilter,
            sorting: sorting
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })


    table.getState().pagination.pageSize = 10;


    return (
        <>
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-md w-auto">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start text-xl p-5 font-medium" >User Requests</caption>
                        <thead className="bg-white border-b-2 border-gray-200">
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-3 text-md font-semibold tracking-wide text-left whitespace-nowrap" colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : (
                                                        <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={header.column.getToggleSortingHandler()}
                                                            title={header.column.getCanSort() ? header.column.getNextSortingOrder() === 'asc' ? 'Sort ascending' : header.column.getNextSortingOrder() === 'desc' ? 'Sort descending' : 'Clear sort' : undefined}>
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                            {{ asc: ' 🔼', desc: ' 🔽', }[header.column.getIsSorted() as string] ?? null}
                                                        </div>
                                                    )}
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
                                        <tr key={row.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-slate-200 transition-all duration-100 cursor-pointer`}
                                            onClick={() => {
                                                row.getAllCells().forEach(cell => {
                                                    if (cell.column.id === 'requestId') {
                                                        setRequestId(cell.getValue());
                                                    }
                                                })
                                                setIsModalVisible(!isModalVisible);
                                            }}>
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id} className="p-3 text-gray-700 whitespace-nowrap">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<tr><td className="text-red-600 font-medium p-5 items-center justify-center text-xl">No record found!</td></tr>)
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
                    <span className="items-center gap-1 hidden md:flex">
                        <div>Page </div>
                        <strong>{table.getState().pagination.pageIndex + 1} of {" "}{table.getPageCount()}</strong>
                    </span>
                    <span className="items-center gap-1 hidden md:flex">
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
            {/* Modal Dialog */}
            <ModalDialog requestId={requestId} isModalVisible={isModalVisible} reRenderComponent={() => setRenderComponent(!renderComponent)} onClose={() => setIsModalVisible(!isModalVisible)} />
        </>
    )
}