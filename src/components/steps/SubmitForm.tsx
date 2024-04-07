import { useContext, useState } from "react";
import { StepperContext } from "../../contexts/stepperContext";
import { useNavigate } from "react-router-dom";


interface SubmitFormProps {
    callBack: (direction: string) => void
}

export default function SubmitForm({ callBack }: SubmitFormProps) {

    const { tempData, setFinalData } = useContext(StepperContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();


    const handleFormSubmit = () => {
        setIsSubmitted(true);
        setFinalData(tempData);
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
                            </div> : (<div className="flex flex-col">
                                <button className="bg-gray-500 rounded-3xl text-white py-2 font-medium p-14 text-lg mt-10" onClick={() => callBack("previous")}>Review details</button>
                                <button className="bg-[#20a827] rounded-3xl text-white py-2 font-medium p-14 text-lg mt-5" onClick={handleFormSubmit}>Submit</button>
                            </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}