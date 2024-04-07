import { useEffect, useState } from "react"


export default function TableSearch({ initValue, debounce, onChange }: {initValue: string, debounce: number, onChange: (value: string) => void}) {
    const [value, setValue] = useState<string>(initValue);

    useEffect(() => {
        setValue(initValue);
    }, [initValue])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeOut);
    }, [value])

    return (
        <input placeholder="🔍 Search..." className="rounded-xl ps-5 p-2 bg-transparent outline-none border-2 border-gray-300 w-full focus:border-gray-600 duration-300 focus:bg-white" value={value} onChange={(e) => setValue(e.target.value)}/>
    )
}