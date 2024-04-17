import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { deleteCookie, getCookie } from "../utils/cookieUtil";
import { decodeJwt } from "../utils/decodeJwt";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";


interface NavbarProps {
    logout: () => void
}

export default function Navbar({ logout }: NavbarProps) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuExpanded, setMenuExpanded] = useState(false);

    function handleLogout() {

        Swal.fire({
            title: "Confirm",
            text: "Are you sure you want to logout ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4369ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCookie('token');
                deleteCookie('role');
                logout();
            }
        });
    }

    const fullName = (): string => {
        const token = getCookie('token');
        if (token) {
            const data = decodeJwt(token);
            return `${data.FirstName} ${data.LastName}`;
        }
        return '';
    }

    return (
        <>
            <nav className="bg-gray-800 p-5">
                <div className="container mx-auto flex justify-between items-center relative">

                    <div className="text-white flex flex-col items-center justify-center">
                        <img src='./vite.svg' alt="Logo" className="rounded-full h-10 w-10 mr-2 hidden md:block" />
                        <div className="flex flex-col md:hidden absolute top-0 left-0">
                            <Menu className="h-10 w-10" onClick={() => setMenuExpanded(!isMenuExpanded)} />
                            {isMenuExpanded && (
                                <div className="w-[200px] mt-5 flex flex-col items-center justify-center bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg rounded-lg">
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 hover:bg-gray-500 rounded-xl h-8">Home</a>
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 hover:bg-gray-500 rounded-xl h-8">About</a>
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 hover:bg-gray-500 rounded-xl h-8">Services</a>
                                    <a href="#" className="mt-5 w-full text-lg text-black px-5 pb-5 hover:bg-gray-500 rounded-xl h-8">Contact</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div className="text-white hidden md:block">
                        <a href="#" className="mr-5 text-lg">Home</a>
                        <a href="#" className="mr-5 text-lg">About</a>
                        <a href="#" className="mr-5 text-lg">Services</a>
                        <a href="#" className="mr-5 text-lg">Contact</a>
                    </div> */}


                    <div className="relative">
                        <div className="flex items-center">
                            <div className="h-10 w-10 flex items-center justify-center bg-gray-300 rounded-full mr-2">
                                <User className="h-6 w-6 text-gray-600" />
                            </div>
                            <span className="text-white mr-4 font-medium hover:underline cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{fullName()}</span>
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