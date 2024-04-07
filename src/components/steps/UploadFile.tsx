import { useContext } from "react";
import { StepperContext } from "../../contexts/stepperContext";



export default function UplodadFile() {


    const { tempData, setTempData } = useContext(StepperContext);


    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target?.result;
                setTempData({ ...tempData, "file-upload": fileContent });
            };
            reader.readAsDataURL(file);
        } else {
            setTempData({ ...tempData, "file-upload": "" });
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="max-w-3xl px-20">
                    <h2 className="font-medium underline text-2xl text-center mb-10 font-sans">Attach File</h2>
                    <div className="flex flex-col gap-4">
                        <div className="font-bold h-6 mt-3 text-sm leading-8 uppercase"> Attach file <span className="text-xs font-normal">(pdf/doc/jpeg)</span> <span className="text-red-600 font-bold text-lg">*</span></div>
                        <input
                            onChange={handleFileChange}
                            className="p-2 rounded-xl border" type="file" name="file-upload" accept=".pdf, .doc, .docx, .jpeg" />
                    </div>
                </div>
            </div>
        </>
    )
}