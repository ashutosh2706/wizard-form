import { createContext, Dispatch, SetStateAction } from "react";

interface StepperContextType {
    tempData: any; // Specify the type for tempData
    setTempData: Dispatch<SetStateAction<any>>; // Specify the type for setTempData
    finalData: any; // Specify the type for finalData
    setFinalData: Dispatch<SetStateAction<any>>; // Specify the type for setFinalData
}

export const StepperContext = createContext<StepperContextType>({
    tempData: null,
    setTempData: () => {},
    finalData: null,
    setFinalData: () => {}
});