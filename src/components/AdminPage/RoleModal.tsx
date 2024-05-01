import { X } from "lucide-react"
import { useState } from "react";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";
import { SuccessToast } from "../../lib/Toast";
import { message } from "antd";


interface RoleModalProps {
    isModalVisible: boolean,
    onClose: () => void,
    reRenderComponent: () => void,
    userId: number,
    roleId: number
}

export default function RoleModal({ isModalVisible, onClose, reRenderComponent, userId, roleId }: RoleModalProps) {

    const [newRoleId, setNewRoleId] = useState<number>(-1);
    const [messageApi, contextHolder] = message.useMessage();


    const handleDropdownChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const target = e.target as HTMLSelectElement;
        target.value === 'admin' ? setNewRoleId(2) : target.value === 'user' ? setNewRoleId(1) : setNewRoleId(-1);
    }


    const changeRole = () => {
        if (newRoleId !== -1) {
            userService.changeRole(userId, newRoleId).then(() => {
                SuccessToast.fire({
                    title: "Role changed successfully"
                });
                reRenderComponent();
                onClose();
            }).catch((error: Error) => {
                messageApi.open({
                    type: 'error',
                    content: `${error.message}`,
                });
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "Please select a role",
                confirmButtonColor: '#4369ff'
            });
        }
    }


    return isModalVisible && (
        <>  
            {contextHolder}
            <div className="fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
                <div className="w-[600px] flex flex-col">
                    <X className="h-8 w-8 text-white place-self-end cursor-pointer hover:text-red-600" onClick={() => onClose()} />
                    <div className="bg-white p-2 rounded-2xl border-2 border-gray-300">

                        <div className="flex flex-col px-3 mt-5">
                            <div className="text-lg p-2 flex flex-wrap items-center">
                                <span className="font-medium mr-1">Current Role:&nbsp;</span>
                                <div className="break-words ms-1">{roleId === 1 ? 'User' : 'Admin'}</div>
                            </div>
                            <div className="text-lg p-2">
                                <span className="font-medium">New role:&nbsp;</span>
                                <select className="p-1 rounded-lg border border-gray-700 ms-5" onChange={handleDropdownChange}>
                                    <option value="">Select Role</option>
                                    <option value="user">USER</option>
                                    <option value="admin">ADMIN</option>
                                </select>
                            </div>
                            <div className="text-lg flex p-2 items-center justify-center">
                                <button className="bg-[#4369ff] rounded-lg text-white px-3 py-1 mb-5 mt-7 font-medium hover:bg-[#34c79b] transition-all duration-150"
                                    onClick={() => changeRole()}>Change Role</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}