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
const Routers = () => {
    const dispatch = useDispatch();
    const BasePath = import.meta.env.VITE_PATH;
    const version = import.meta.env.VITE_VERSION;
    const reducer = useSelector(state => state.reducer);
    if (reducer.version == 'undefined' || reducer.version != version) {
        dispatch({ type: 'RESET', payload: { version: version, login: false } });
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`${BasePath}/:layout`} element={<ManpowerView />} />
                    <Route path={`${BasePath}/edit`} element={<ManpowerEdit />} />
                </Route>
                <Route path={`${BasePath}/*`} element={<ManpowerView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;