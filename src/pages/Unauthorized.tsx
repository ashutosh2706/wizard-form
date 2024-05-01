import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function Unauthorized() {

    const navigate = useNavigate();

    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen'>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>} />
            </div>
        </>
    )
}