import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout";
import Page404 from "../pages/page404";
import { useDispatch, useSelector } from "react-redux";
import PageOne from "../pages/diagramsvg";
import DiagramSVG from "../pages/diagramsvg";
import Templete from "../pages/TemplateManpower";
import Home from "../pages/home";
import QrCode from "../pages/qrcode";
import Manpower from "../pages/manpower";
import ManpowerView from "../pages/Manpower/ManpowerView";
import ManpowerEdit from "../pages/Manpower/ManpowerEdit";
import ManpowerGrid from "../pages/Manpower/ManpowerGrid";
import Management from "../pages/management";
import Login from "../pages/login";
const Routers = () => {
    const dispatch = useDispatch();
    const BASE = import.meta.env.VITE_PATH;
    const version = import.meta.env.VITE_VERSION;
    const reducer = useSelector(state => state.reducer);
    if (reducer.version == 'undefined' || reducer.version != version) {
        dispatch({ type: 'RESET', payload: { version: version, login: false } });
    }
    console.log(BASE)
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {/* <Route path={`${BASE}/:layout`} element={<ManpowerView />} /> */}
                    <Route path={`${BASE}/edit`} element={<ManpowerEdit />} />
                    <Route path={`${BASE}/management`} element={<Management />} />
                </Route>
                <Route path={`${BASE}/:layout`} element={<ManpowerView />} />
                <Route path={`/*`} element={<Login />} />
                <Route path={`${BASE}/login`} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;