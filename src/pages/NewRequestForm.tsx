import { useState } from "react";
import { StepperContext } from "../contexts/stepperContext";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import RequestDetails from "../components/steps/RequestDetails";
import SubmitForm from "../components/steps/SubmitForm";
import BasicDetails from "../components/steps/BasicDetails";
import UplodadFile from "../components/steps/UploadFile";

export default function NewRequestForm() {

    const [currentStep, setCurrentStep] = useState(1);
    const steps: string[] = ["Basic Details", "Request Details", "Attach File", "Complete"];

    /** form-data */
    const [tempData, setTempData] = useState('');
    const [finalData, setFinalData] = useState([]);
    console.log(finalData);     // => send to api
    /** form-data */

    const displayFragments = (step: number) => {
        switch (step) {
            case 1:
                return <BasicDetails />
            case 2:
                return <RequestDetails />
            case 3:
                return <UplodadFile />
            case 4:
                return <SubmitForm callBack={handleClick} />
        }
    }

    const handleClick = (direction: string) => {
        let newStep = currentStep;
        direction === 'next' ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    }

    return (
        <>
            <div className="h-screen flex justify-center items-center bg-gray-50">
                <div className="md:w-1/2 mx-auto rounded-2xl pb-2 bg-gray-50 border-gray-400 flex flex-col h-screen">
                    <div className="container mt-5 mb-5">
                        <Stepper steps={steps} currentStep={currentStep} />
                    </div>

                    <div className="flex justify-center mt-10 mb-5">
                    <div className="w-4/5 py-12 shadow-lg bg-gray-100 rounded-3xl border-2 border-gray-300">
                        <StepperContext.Provider value={{ tempData, setTempData, finalData, setFinalData }}>
                            {displayFragments(currentStep)}
                        </StepperContext.Provider>
                    </div>
                    </div>
                    
                    {/* ui breaking on resize */}
                    <div className="flex justify-center">
                        {
                            currentStep !== steps.length && <StepperControl callBack={handleClick} currentStep={currentStep} />
                        }
                    </div>
                </div>
            </div>

        </>
    )
}