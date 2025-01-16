import { Grid, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ApiSharpIcon from '@mui/icons-material/ApiSharp';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { _IMG_PATH } from '../constants';
import logo from '../assets/icon-dci.ico';
import { persistor } from '../redux/store';
import { UserOutlined, ThunderboltFilled, AimOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Segmented } from 'antd';
function ToolbarComponent() {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const ActiveMenuToolbar = useSelector(state => state.reducer.activeMenuToolbar);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redux = useSelector(state => state.reducer);
    async function handleAppbarMenu(link = 'home', code = '') {
        navigate(`../${link}`);
        dispatch({ type: 'UPDATE_MENU_TOOLBAR', payload: code })
    }
    useEffect(() => {
        if (ActiveMenuToolbar == undefined) {
            dispatch({ type: 'UPDATE_MENU_TOOLBAR', payload: 'checkin' });
        }
    }, []);
    function handleLogout() {
        persistor.purge();
        setTimeout(() => {
            location.reload();
        }, 500);
    }
    return (
        <div className='h-[7.5%] flex bg-[#556ee5] w-full py-1'>
            <div className='w-[15%] flex items-center pl-6 gap-2  drop-shadow-sm'>
                <UserOutlined style={{ color: 'white' }} />
                <span className='text-white font-semibold select-none cursor-pointer'>DCI MANPOWER</span>
            </div>
            <div className='grow flex justify-center gap-3 items-center'>
                <Segmented
                    options={[
                        {
                            label: (
                                <div style={{ padding: 4 }} className='drop-shadow-md flex gap-2'  onClick={() => handleAppbarMenu(`/${VITE_PATH}/view/all/`, 'checkin')}>
                                    <AimOutlined className='text-[#556ee5]' />
                                    <div>CHECK-IN</div>
                                </div>
                            ),
                            value: 'spring',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }} className='drop-shadow-md flex gap-2'  onClick={() => handleAppbarMenu(`/${VITE_PATH}/efficiency/`, 'efficiency')}>
                                    <ThunderboltFilled />
                                    <div>EFFICIENCY</div>
                                </div>
                            ),
                            value: 'summer',
                        }
                    ]}
                />
                {/* {
                    [
                        { code: 'checkin', text: ' CHECK-IN', icon: <FmdGoodOutlinedIcon />, active: false, link: `/${VITE_PATH}/view/all` },
                        { code: 'efficiency', text: 'LINE EFFICIENCY', icon: <ApiSharpIcon />, active: false, link: `/${VITE_PATH}/efficiency/` }
                    ].map((oMenu, iMenu) => {
                        return <div key={iMenu} className={`${ActiveMenuToolbar == oMenu.code ? 'text-white font-semibold text-[18px]' : 'text-[#d8d8d8]'} hover:text-white transition-all duration-300 flex  items-center gap-1 cursor-pointer`} style={{ letterSpacing: '1px' }} onClick={() => handleAppbarMenu(oMenu.link, oMenu.code)}>
                            {oMenu.icon}
                            <span>{oMenu.text}</span>
                        </div>
                    })
                } */}

            </div>
            <div className='w-[15%] flex-none flex  pr-2 justify-end '>
                {
                    redux.login != '' && redux.login == true ? <Popconfirm
                        placement="bottomLeft"
                        title={'แจ้งเตือน'}
                        description={'คุณต้องการออกจากระบบใช่หรือไม่ ?'}
                        okText="ใช่"
                        onConfirm={handleLogout}
                        cancelText="ยกเลิก"
                    >
                        {
                            <div className='flex items-center gap-2 cursor-pointer select-none' >
                                <Typography className='text-white'>{
                                    (redux.login) ? `${redux.empcode}` : 'LOGIN'
                                }</Typography>
                                <Avatar size={32} icon={<UserOutlined />} src={`${_IMG_PATH}${redux.empcode}.jpg`} />
                            </div>
                        }
                    </Popconfirm> : <div className='flex items-center gap-2 cursor-pointer select-none' onClick={() => navigate(`./login`)}>
                        <Typography className='text-white'>LOGIN</Typography>
                        <Avatar size={32} icon={<UserOutlined />} />
                    </div>
                }
            </div>
        </div >
    )
}

export default ToolbarComponent