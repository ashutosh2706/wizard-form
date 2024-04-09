import Navbar from "../components/Navbar";
import Tab from "../components/Tab";
import UserRequestTable from "../components/UserRequestTable";


interface HomepageProps {
    role: string | undefined,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Homepage({ role, setLoggedIn }: HomepageProps) {

    return (
        <>
            <Navbar setLoggedIn={setLoggedIn} />
            {role === 'admin' && (<Tab />)}
            {role === 'user' && (<UserRequestTable />)}
        </>
    )
}