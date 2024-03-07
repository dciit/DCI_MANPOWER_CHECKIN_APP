import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/layout";
import { useDispatch, useSelector } from "react-redux";
import ManpowerView from "../pages/Manpower/ManpowerView";
import ManpowerEdit from "../pages/Manpower/ManpowerEdit";
import Management from "../pages/management";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard/dashboard";
import Efficiency from "../pages/efficiency";
const Routers = () => {
    const dispatch = useDispatch();
    const BASE = import.meta.env.VITE_PATH;
    const version = import.meta.env.VITE_VERSION;
    const reducer = useSelector(state => state.reducer);
    if (reducer.version == 'undefined' || reducer.version != version) {
        dispatch({ type: 'RESET', payload: { version: version, login: false } });
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {/* <Route path={`${BASE}/:layout`} element={<ManpowerView />} /> */}
                    <Route path={`${BASE}/edit`} element={<ManpowerEdit />} />
                    <Route path={`${BASE}/management`} element={<Management />} />
                    <Route path={`${BASE}/efficiency`} element={<Efficiency/>}/>
                </Route>
                {/* <Route path={`${BASE}/:layout`} element={<ManpowerView />} /> */}
                <Route path={`/*`} element={<Login />} />
                <Route path={`${BASE}/login`} element={<Login />} />
                <Route path={`${BASE}/view/:layout`} element={<ManpowerView />} />
                <Route path={`${BASE}/dashboard`} element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;