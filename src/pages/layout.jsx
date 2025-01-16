import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Login from "./login";
import ToolbarComponent from "../components/ToolbarComponent";
import { useEffect } from "react";
function Layout() {
    const base = import.meta.env.VITE_PATH;
    const reducer = useSelector(state => state.reducer);
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(typeof reducer.login != 'undefined' && reducer.login == true){
    //         navigate(`${base}/management`);
    //     }
    // },[])
    return <>
        {
            reducer?.login
                ?
                <div className='h-[100%] select-none'>
                    <ToolbarComponent />
                    <Outlet />
                </div>
                : <Login />
        }
    </>
}
export default Layout;  