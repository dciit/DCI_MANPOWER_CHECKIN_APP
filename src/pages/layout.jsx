import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "./login";
import Header from "./header";
import ToolbarComponent from "../components/ToolbarComponent";
function Layout() {
    const reducer = useSelector(state => state.reducer);
    alert(1)
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