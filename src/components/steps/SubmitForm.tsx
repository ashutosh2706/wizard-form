import { useContext, useState } from "react";
import { StepperContext } from "../../contexts/stepperContext";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtil";
import { decodeJwt } from "../../utils/decodeJwt";
import { UserRequestAPI } from "../../types/userRequest";
import { submitRequest } from "../../api/request";


interface SubmitFormProps {
    callBack: (direction: string) => void
}

export default function SubmitForm({ callBack }: SubmitFormProps) {

    const { tempData } = useContext(StepperContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    function getCurrentDate(): string {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    function getPriorityCode(priority: string) {
        return priority === 'high' ? 1 : priority === 'medium' ? 2 : 3;
    }

    const handleFormSubmit = () => {

        console.error(tempData);

        setIsSubmitted(true);

        const token = getCookie('token') ?? '';
        const uid = decodeJwt(token).UserId;

        const request: UserRequestAPI = {
            requestId: 0,   // => this is auto-generated in backend
            title: tempData['request-title'],
            userId: parseInt(uid, 10),
            phone: tempData.phone,
            guardianName: tempData['guardian-name'],
            requestDate: getCurrentDate(),
            priorityCode: getPriorityCode(tempData['request-priority']),
            statusCode: 1,
            file: tempData['file-upload'],
        };


        submitRequest(request).then(() => console.log('submitted')).catch(err => console.error(err));

        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-3xl">
                    <div className={`rounded-full
                border-2 h-24 w-24 flex items-center justify-center text-white text-4xl font-medium mt-16 ${isSubmitted ? 'bg-[#29d331] border-[#29d331]' : 'bg-[#4369ff] border-[#4369ff]'} `}>
                        {
                            isSubmitted ? <span>&#10003;</span> : <span>&#63;</span>
                        }
                    </div>

                </div>
                {!isSubmitted && (
                    <div className="p-5 mt-5 font-medium text-lg">
                        Submit your Request ?
                    </div>
                )}
                <div className="flex flex-col items-center justify-center">
                    {
                        isSubmitted ?
                            <div className="text-black font-medium text-2xl mt-7">
                                Submitted Successfully <span className="text-4xl">🎉</span>
                            </div> : <div className="flex flex-col">
                                <button className="bg-gray-500 rounded-3xl text-white py-2 font-medium p-14 text-lg mt-10" onClick={() => callBack("previous")}>Review details</button>
                                <button className="bg-[#20a827] rounded-3xl text-white py-2 font-medium p-14 text-lg mt-5" onClick={handleFormSubmit}>Submit</button>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}