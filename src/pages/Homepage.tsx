import Navbar from "../components/Navbar";
import AdminPage from "../components/AdminPage";
import UserPage from "../components/UserPage";


interface HomepageProps {
    role: string | undefined;
    logout: () => void;
}

export default function Homepage({ role, logout }: HomepageProps) {

    return (
        <>
            <Navbar logout={logout} />
            {role === 'admin' && (<AdminPage />)}
            {role === 'user' && (<UserPage />)}
        </>
    )
}