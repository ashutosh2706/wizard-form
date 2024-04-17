import { useState } from "react";


interface ToggleSwitchProps {
    switchState: boolean
}

export default function ToggleSwitch({ switchState }: ToggleSwitchProps) {

    const [isChecked, setIsChecked] = useState(switchState);

    return (
        <>
            <div>
                <label htmlFor="check" className="flex bg-gray-200 border border-gray-300 cursor-pointer relative w-10 h-5 rounded-full">
                    <input
                        type="checkbox"
                        id="check"
                        className="sr-only peer"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <span
                        className={`w-2/5 h-4/5 bg-red-600 absolute rounded-full left-0.5 top-0.5 peer-checked:bg-green-600 peer-checked:left-5 ${isChecked ? 'peer-checked' : ''}`}>
                    </span>
                </label>
            </div>
        </>
    )
}