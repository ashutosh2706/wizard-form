import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { UserRequestAdmin } from "../../types/userRequestAdmin";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TableSearch from "../TableSearch"
import { UserRequestAPI } from "../../types/userRequest";
import { requestService } from "../../services/requestService";
import { message, Select, Skeleton, Empty } from 'antd';
import Swal from "sweetalert2";


export default function UserRequestTable() {

    const [renderComponent, setRenderComponent] = useState<boolean>(false);
    const [userRequestData, setUserRequestData] = useState<UserRequestAdmin[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [totalPage, setTotalPage] = useState(0);


    const fetchData = () => {

        const pageNumber: number = table.getState().pagination.pageIndex + 1;
        const pageSize: number = table.getState().pagination.pageSize;

        requestService.getUserRequestsAdmin(globalFilter.trim(), pageNumber, pageSize).then((data) => {

            setTotalPage(data.total);
            
            const mappedData: UserRequestAdmin[] = data.requests.map((item: UserRequestAPI) => ({
                requestId: item.requestId,
                userId: item.userId,
                title: item.title,
                priority: item.priorityCode === 1 ? 'High' : item.priorityCode === 2 ? 'Normal' : 'Low',
                status: item.statusCode === 1 ? 'pending' : item.statusCode === 2 ? 'approved' : 'rejected'
            }));

            setIsLoading(false);
            setUserRequestData(mappedData);

        }).catch((error: Error) => {
            messageApi.open({
                type: 'error',
                content: `${error.message}`,
            });
            setIsLoading(false);
        });
    }

    useEffect(() => fetchData(), [renderComponent, pagination, globalFilter]);


    const handleRequest = (requestId: number | unknown) => {
        if (typeof requestId === 'number') {
            Swal.fire({
                title: "Confirm Request Action",
                icon: "question",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Approve",
                denyButtonText: "Reject"
            }).then((result) => {
                if (!result.isDismissed && (result.isConfirmed || result.isDenied)) {
                    const statusCode = result.isConfirmed ? 2 : 3;
                    requestService.updateRequestStatus(requestId, statusCode).then(() => {
                        setRenderComponent(!renderComponent);
                        Swal.fire({
                            title: "Success",
                            text: `Request ${result.isConfirmed ? 'approved' : 'rejected'}`,
                            icon: "success"
                        });
                    }).catch((error: Error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `${error.message}`,
                            confirmButtonColor: '#4369ff'
                        });
                    });
                }
            });
        }
    }


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
            sorting: sorting,
            pagination
        },
        pageCount: totalPage,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: true,
        manualFiltering: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })


    

    return (
        <>
            {contextHolder}
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-base w-auto">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start md:text-xl text-base p-5 font-medium">Manage Requests</caption>
                        <thead className="bg-white border-b-2 border-gray-200">
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-3 md:text-base text-sm font-semibold tracking-wide text-left whitespace-nowrap" colSpan={header.colSpan}>
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
                            {isLoading ? (<tr><td colSpan={5} className="p-5 text-center md:text-xl text-sm"><Skeleton active paragraph={{rows: 5}}/></td></tr>) :
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <tr key={row.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-slate-200 transition-all duration-100 cursor-pointer`}
                                            onClick={() => {
                                                row.getAllCells().forEach(cell => {
                                                    if (cell.column.id === 'requestId') {
                                                        handleRequest(cell.getValue());
                                                    }
                                                })

                                            }}>
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id} className="p-3 md:text-base text-sm text-gray-700 whitespace-nowrap">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<tr><td colSpan={5} className="p-5 text-center md:text-xl text-sm"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No record found!"}/></td></tr>)
                            }
                        </tbody>
                    </table>

                </div>
                {/** pagination */}
                <div className="mt-5 flex items-center justify-end gap-2">
                    <button onClick={() => { table.previousPage() }} disabled={!table.getCanPreviousPage()} className="text-lg font-bold rounded-lg p-1 border border-gray-500 px-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button onClick={() => { table.nextPage() }} disabled={!table.getCanNextPage()} className="text-lg font-bold rounded-lg p-1 border border-gray-500 px-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg">
                        <ChevronRight className="w-7 h-7" />
                    </button>
                    <span className="items-center gap-1 hidden md:flex">
                        <div>Page </div>
                        <div>{table.getState().pagination.pageIndex + 1} of {" "}{table.getPageCount()}</div>
                    </span>
                    <Select
                        defaultValue='5'
                        style={{ width: 120 }}
                        onChange={(value) => table.setPageSize(Number(value))}
                        options={[
                            { value: '5', label: '5 / page' },
                            { value: '10', label: '10 / page' },
                            { value: '20', label: '20 / page' },
                        ]}
                    />
                </div>
            </div>
        </>
    )
}