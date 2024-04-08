import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { UserModel } from "../../types/userModel";
import TableSearch from "../TableSearch"
import { useState } from "react";
import { dummyUsers } from "../../data/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";


export default function AllUserTable() {

    const columnHelper = createColumnHelper<UserModel>();
    const defaultColumns = [
        columnHelper.accessor('userId', {
            cell: info => info.getValue(),
            header: "USER ID"
        }),
        columnHelper.accessor('firstName', {
            cell: info => info.getValue(),
            header: "FIRST NAME"
        }),
        columnHelper.accessor('lastName', {
            cell: info => info.getValue(),
            header: "LAST NAME"
        }),
        columnHelper.accessor('email', {
            cell: info => info.getValue(),
            header: "EMAIl"
        }),
        columnHelper.accessor('status', {
            cell: info => <ToggleSwitch switchState={info.getValue() === 'allowed' ? true : false} />,
            header: "ACTION",
        })
    ]


    const [userData, setUserData] = useState<UserModel[]>(dummyUsers);      // -> user data from api, useEffect to fetch all at once
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data: userData,
        columns: defaultColumns,
        state: {
            globalFilter
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    table.getState().pagination.pageSize = 10;          // -> number of rows per page


    const handleUserStatus = (userId: unknown, status: unknown) => {

        /**
         * ==> sync the update of status in api 
         */

        if(status === 'allowed') {
            setUserData(prevUserData => {
                return prevUserData.map(user => {
                    if (user.userId === userId) {
                        return {...user, status: 'restricted'};
                    }
                    return user;
                });
            });
        } else {
            setUserData(prevUserData => {
                return prevUserData.map(user => {
                    if (user.userId === userId) {
                        return {...user, status: 'allowed'};
                    }
                    return user;
                });
            });
        }


    }


    return (
        <>
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-md w-72">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start text-xl p-5 font-medium" >All Users</caption>
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
                                                    <td key={cell.id} className="p-3 text-gray-700 whitespace-nowrap" onClick={() => {
                                                        if(cell.column.id === 'status') {
                                                            const row = cell.row;
                                                            const userId = row.getAllCells().find(c => c.column.id === 'userId')?.getValue();
                                                            const status = row.getAllCells().find(c => c.column.id === 'status')?.getValue();
                                                            handleUserStatus(userId, status);
                                                        }
                                                    }}>
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