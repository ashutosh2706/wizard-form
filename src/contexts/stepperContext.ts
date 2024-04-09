import { createContext, Dispatch, SetStateAction } from "react";

interface StepperContextType {
    tempData: any; // Specify the type for tempData
    setTempData: Dispatch<SetStateAction<any>>; // Specify the type for setTempData
}

export const StepperContext = createContext<StepperContextType>({
    tempData: null,
    setTempData: () => {}
});