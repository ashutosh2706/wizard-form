import Navbar from "../components/Navbar";
import AdminPage from "../components/AdminPage";
import UserPage from "../components/UserPage";


interface HomepageProps {
    role: string | undefined;
}

export default function Homepage({ role }: HomepageProps) {

    return (
        <>
            <Navbar/>
            {role === 'admin' && (<AdminPage />)}
            {role === 'user' && (<UserPage />)}
        </>
    )
}