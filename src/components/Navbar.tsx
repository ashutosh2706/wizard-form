import { User, LogOut } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
    username: string,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ username, setLoggedIn }: NavbarProps) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleLogout() {
        // TODO: delete cookie


        setLoggedIn(false);
    }

    return (
        <>
            <nav className="bg-gray-800 p-5">
                <div className="container mx-auto flex justify-between items-center">

                    <div className="text-white flex items-center">
                        <img src='./vite.svg' alt="Logo" className="rounded-full h-10 w-10 mr-2" />
                    </div>

                    <div className="text-white">
                        <a href="#" className="mr-5 text-lg">Home</a>
                        <a href="#" className="mr-5 text-lg">About</a>
                        <a href="#" className="mr-5 text-lg">Services</a>
                        <a href="#" className="mr-5 text-lg">Contact</a>
                    </div>


                    <div className="relative">
                        <div className="flex items-center">
                            <div className="h-10 w-10 flex items-center justify-center bg-gray-300 rounded-full mr-2">
                                <User className="h-6 w-6 text-gray-600" />
                            </div>
                            <span className="text-white mr-4 font-medium hover:underline cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{username}</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md">
                                <button className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100" onClick={handleLogout}>
                                    <LogOut className="h-5 w-5 inline-block mr-2" /> Logout
                                </button>
                            </div>
                        )}

                    </div>


                </div>
            </nav>
        </>
    )

}