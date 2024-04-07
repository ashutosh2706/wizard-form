import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Homepage from "./Homepage";

export default function Login() {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);


    useEffect(() => {
        // check for cookies
        // if cookies present, setLoggedIn(true);
    }, [])


    function loginUser(email: string, password: string) {

        /** TODO handle login
         * if logged in, save cookie
         */

        
        console.error(`${email} ${password}`);
        setLoggedIn(true);
        
    }



    if(!loggedIn) {
        return (
            <>
                <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="bg-gray-100 flex rounded-2xl shadow-lg pt-10 pb-10">
                        <div className="max-w-3xl px-20">
                            <h2 className="font-bold text-2xl">LOGIN</h2>
                            <p className="text-sm mt-4">Please login to continue</p>
                            <form action="" className="flex flex-col gap-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const email = formData.get("email") as string;
                                const password = formData.get("password") as string;
                                loginUser(email, password);
                            }}>
                                <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" required />
                                <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password" required />
                                <button className="bg-[#4369ff] rounded-xl text-white py-2 font-medium hover:bg-[#3451c7]" type="submit">Login</button>
                            </form>
    
                            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                                <hr className="border-gray-500" />
                                <p className="text-center">OR</p>
                                <hr className="border-gray-500" />
    
                            </div>
                            <p className="text-center mt-5 text-black">Don't have account ? <span className="text-blue-700 font-semibold hover:underline cursor-pointer" onClick={() => navigate("/register")}>Register</span></p>
                            
                        </div>
                    </div>
                </section>
            </>
        )
    } else {
        // check user role from server and pass accordingly as 'admin' | 'user'
        return (<Homepage role="user" username="John Doe" setLoggedIn={setLoggedIn}/>)
    }
}