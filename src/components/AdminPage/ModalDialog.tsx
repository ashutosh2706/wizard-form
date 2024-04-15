import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { UserRequestAdmin } from "../../types/userRequestAdmin";
import { UserRequestAPI } from "../../types/userRequest";
import { requestService } from "../../services/requestService";

interface ModalProps {
    isModalVisible: boolean,
    onClose: () => void,
    requestId: number | unknown,
    reRenderComponent: () => void
}

export default function ModalDialog({ isModalVisible, onClose, requestId, reRenderComponent }: ModalProps) {


    const [requestDetail, setRequestDetail] = useState<UserRequestAdmin>();

    useEffect(() => {

        
        if(typeof requestId === 'number') {

            requestService.getRequestByRequestId(requestId).then((data: UserRequestAPI) => {
                const request: UserRequestAdmin = {
                    requestId: data.requestId,
                    userId: data.userId,
                    title: data.title,
                    priority: data.priorityCode === 1 ? 'High' : data.priorityCode === 2 ? 'Normal' : 'Low',
                    status: data.statusCode === 1 ? 'Pending' : data.statusCode === 2 ? 'Approved' : 'Rejected'
                }
                setRequestDetail(request);
            }).catch((error: Error) => window.alert(error.message));
        }

    }, [requestId]);



    const handleStatusChange = (requestId: number, approved: boolean) => {
        
        const statusCode = approved ? 2 : 3;
        requestService.updateRequestStatus(requestId, statusCode).then(() => {
            reRenderComponent();
            onClose();
        }).catch((error: Error) => window.alert(error.message));
        
    }


    return isModalVisible && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px] flex flex-col">
                <X className="h-8 w-8 text-white place-self-end cursor-pointer hover:text-red-600" onClick={() => onClose()} />
                <div className="bg-gray-100 p-2 rounded-2xl">

                    <div className="flex flex-col px-3">
                        <div className="text-lg p-2 underline text-center my-3">
                            Request Id:&nbsp;<strong>{requestDetail?.requestId}</strong>
                        </div>
                        <div className="text-lg p-2 flex flex-wrap items-center">
                            <span className="font-bold mr-1">About:&nbsp;</span>
                            <div className="break-words">{requestDetail?.title}</div>
                        </div>
                        <div className="text-lg p-2">
                            <span className="font-bold">Priority:&nbsp;</span>
                            {requestDetail?.priority}
                        </div>
                        <div className="text-lg p-2">
                            <span className="font-bold">Status:&nbsp;</span>
                            {requestDetail?.status}
                        </div>
                        {requestDetail?.status === 'Pending' && (
                            <div className="flex items-center justify-around my-5 py-2">
                                <button className="py-3 px-5 bg-green-500 rounded-xl text-white font-medium hover:bg-green-700 shadow-lg" onClick={() => handleStatusChange(requestDetail.requestId, true)}>
                                    <div className="flex">
                                        <Check />
                                        &nbsp;Approve
                                    </div>
                                </button>

                                <button className="py-3 px-5 bg-red-500 rounded-xl text-white font-medium hover:bg-red-700 shadow-lg" onClick={() => handleStatusChange(requestDetail.requestId, false)}>
                                    <div className="flex">
                                        <X />
                                        &nbsp;Reject
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}