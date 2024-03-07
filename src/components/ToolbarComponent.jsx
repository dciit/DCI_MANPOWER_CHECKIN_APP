import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ApiSharpIcon from '@mui/icons-material/ApiSharp';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
function ToolbarComponent() {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const ActiveMenuToolbar = useSelector(state => state.reducer.activeMenuToolbar);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleAppbarMenu(link = 'home', code = '') {
        navigate(`../${link}`);
        dispatch({ type: 'UPDATE_MENU_TOOLBAR', payload: code })
    }
    useEffect(() => {
        if (ActiveMenuToolbar == undefined) {
            dispatch({ type: 'UPDATE_MENU_TOOLBAR', payload: 'checkin' });
        }
    }, [])
    return (
        <Grid item xs={12} py={1} className="bg-[#556ee5]">
            <div className="toolbar flex items-center px-[7.5%] gap-6 cursor-pointer">
                {
                    [
                        { code: 'checkin', text: 'MANPOWER CHECK-IN', icon: <FmdGoodOutlinedIcon />, active: false, link: `/${VITE_PATH}/view/all` },
                        { code: 'efficiency', text: 'LINE EFFICIENCY', icon: <ApiSharpIcon />, active: false, link: `/${VITE_PATH}/efficiency/` }
                    ].map((oMenu, iMenu) => {
                        return <div key={iMenu} className={`${ActiveMenuToolbar == oMenu.code ? 'text-white' : 'text-[#d8d8d8]'} hover:text-white transition-all duration-300 hover:scale-105 flex  items-center gap-1`} style={{ letterSpacing: '1px' }} onClick={() => handleAppbarMenu(oMenu.link, oMenu.code)}>
                            {oMenu.icon}
                            <span>{oMenu.text}</span>
                        </div>
                    })
                }
            </div>
        </Grid>
    )
}

export default ToolbarComponent