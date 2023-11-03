import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "./login";
import { Stack } from "@mui/material";
import Header from "./header";
import logo from "../images/icon.png"
import QrCode from "./qrcode";
function Layout() {
    const reducer = useSelector(state => state.reducer);
    return <>
        {/* <QrCode /> */}
        {
            reducer?.login
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