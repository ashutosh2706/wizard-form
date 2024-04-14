import Navbar from "../components/Navbar";
import AdminPage from "../components/AdminPage";
import UserPage from "../components/UserPage";


interface HomepageProps {
    role: string | undefined,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Homepage({ role, setLoggedIn }: HomepageProps) {

    return (
        <>
            <Navbar setLoggedIn={setLoggedIn} />
            {role === 'admin' && (<AdminPage />)}
            {role === 'user' && (<UserPage />)}
        </>
    )
}