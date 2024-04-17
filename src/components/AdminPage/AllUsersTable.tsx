import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { UserModel } from "../../types/userModel";
import TableSearch from "../TableSearch"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";
import { getCookie } from "../../utils/cookieUtil";
import { decodeJwt } from "../../utils/decodeJwt";
import { userService } from "../../services/userService";
import RoleModal from "./RoleModal";
import Swal from "sweetalert2";
import { SuccessToast } from "../../lib/Toast";


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
        columnHelper.accessor('isAllowed', {
            cell: info => <ToggleSwitch switchState={info.getValue() === 'allowed' ? true : false} />,
            header: "ALLOWED",
        }),
        columnHelper.accessor('roleId', {
            cell: info => {
                if (info.getValue() === 1) {
                    return (
                        <div className="flex items-center justify-start gap-2">
                            <span>User</span>
                            <Settings className="w-5 h-5 cursor-pointer" />
                        </div>
                    )
                } else {
                    return (
                        <div className="flex items-center justify-start gap-2">
                            <span>Admin</span>
                            <Settings className="w-5 h-5 cursor-pointer" />
                        </div>
                    )
                }
            },
            header: "Role"
        })
    ]


    const [userData, setUserData] = useState<UserModel[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [renderComponent, setRenderComponent] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(-1);
    const [roleId, setRoleId] = useState<number>(-1);


    const fetchData = () => {

        const token = getCookie('token') ?? '';
        const loggedInUserId = decodeJwt(token).UserId;

        userService.getUsers().then((data: UserModel[]) => {
            const filteredData = data.filter(e => e.userId != parseInt(loggedInUserId, 10));    // remove the user which is currently logged in
            setUserData(filteredData);
        }).catch((error: Error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`,
                confirmButtonColor: '#4369ff'
            });
        });
    }

    useEffect(() => fetchData(), [renderComponent]);

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

    table.getState().pagination.pageSize = 10;


    const handleRoleChange = (userId: unknown, roleId: unknown) => {
        if (typeof userId === 'number' && typeof roleId === 'number') {
            setUserId(userId);
            setRoleId(roleId);
            setIsModalVisible(true);    // open modal
        }
    }


    const handleUserStatus = (userId: unknown, status: unknown) => {

        /**
         * => sync the update of status with api
         */

        if (status === 'allowed') {
            setUserData(prevUserData => {
                return prevUserData.map(user => {
                    if (user.userId === userId) {
                        return { ...user, isAllowed: 'restricted' };
                    }
                    return user;
                });
            });
        } else {
            setUserData(prevUserData => {
                return prevUserData.map(user => {
                    if (user.userId === userId) {
                        return { ...user, isAllowed: 'allowed' };
                    }
                    return user;
                });
            });
        }

        userService.allowUser(userId).then(() => {
            SuccessToast.fire({
                title: "Action completed successfully"
            });
        }).catch((error: Error) => {
            Swal.fire({
                icon: "error",
                title: "Changes not saved",
                text: `${error.message}`,
                confirmButtonColor: '#4369ff'
            });
        });
    }


    return (
        <>
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-base w-auto">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start md:text-xl text-base p-5 font-medium">Account Requests</caption>
                        <thead className="bg-white border-b-2 border-gray-200">
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-3 md:text-base text-sm font-semibold tracking-wide text-left whitespace-nowrap">
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
                                                    <td key={cell.id} className="p-3 md:text-base text-sm text-gray-700 whitespace-nowrap" onClick={() => {
                                                        if (cell.column.id === 'isAllowed') {
                                                            const row = cell.row;
                                                            const userId = row.getAllCells().find(c => c.column.id === 'userId')?.getValue();
                                                            const status = row.getAllCells().find(c => c.column.id === 'isAllowed')?.getValue();
                                                            handleUserStatus(userId, status);
                                                        } else if (cell.column.id === 'roleId') {
                                                            const row = cell.row;
                                                            const userId = row.getAllCells().find(c => c.column.id === 'userId')?.getValue();
                                                            const roleId = row.getAllCells().find(c => c.column.id === 'roleId')?.getValue();
                                                            handleRoleChange(userId, roleId);
                                                        }
                                                    }}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<tr><td className="text-red-600 font-medium p-5 items-center justify-center md:text-xl text-sm">No record found!</td></tr>)
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
            <RoleModal isModalVisible={isModalVisible} onClose={() => setIsModalVisible(!isModalVisible)} reRenderComponent={() => setRenderComponent(!renderComponent)} userId={userId} roleId={roleId} />
        </>
    )
}