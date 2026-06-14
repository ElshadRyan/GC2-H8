import {Navigate, Outlet} from 'react-router';
import Navbar from '../components/Navbar';

export default function BaseLayout(){
    if(!localStorage.access_token)
    {
        return <Navigate to = "/login"/>
    }

    return (
        <>
                <Navbar />
            <div className="p-5">
                <Outlet />
            </div>
        </>
    )
}