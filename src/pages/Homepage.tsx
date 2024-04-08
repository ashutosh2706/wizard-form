import Navbar from "../components/Navbar";
import Tab from "../components/Tab";
import UserRequestTable from "../components/UserRequestTable";


interface HomepageProps {
    role: string | undefined,
    username: string,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Homepage({ role, username, setLoggedIn }: HomepageProps) {
    return (
        <>
            <Navbar username={username} setLoggedIn={setLoggedIn} />
            {role === 'admin' && (<Tab />)}
            {role === 'user' && (<UserRequestTable />)}
        </>
    )
}