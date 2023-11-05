import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "./login";
function Layout() {
    const reducer = useSelector(state => state.reducer);
    return <>
        {
            !reducer?.login
                ?
                <div className='h-[100%] select-none'>
                    {/* <Header /> */}
                    <Outlet />
                </div>
                : <Login />
        }
    </>
}
export default Layout;