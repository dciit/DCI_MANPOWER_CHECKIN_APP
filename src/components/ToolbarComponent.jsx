import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { _IMG_PATH } from '../constants';
import { persistor } from '../redux/store';
import { UserOutlined, ThunderboltFilled, AimOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Avatar, Divider, Popconfirm, Segmented } from 'antd';
import { HiMiniShieldCheck } from "react-icons/hi2";

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
        <div className='h-[50px] flex bg-[#ffffff] w-full  border-b-2  border-black ' style={{border:'1px solid #ddd'}}>
            <div className=' grow flex items-center pl-6 gap-6'>
                <div className='flex gap-2 justify-center items-center'>
                    <HiMiniShieldCheck className='text-sky-500' size={26} />
                    <span className='text-sky-500 font-semibold select-none cursor-pointer drop-shadow-md'>DCI MANPOWER CHECK-IN</span>
                    <Divider type="vertical" />
                </div>
                <div id='menu-toolbar' className='flex gap-3'>
                    <div style={{ padding: 4 }} className='cursor-pointer flex gap-2' onClick={() => handleAppbarMenu(`/${VITE_PATH}/view/all/`, 'checkin')}>
                        <AimOutlined className='' />
                        <div>CHECK-IN</div>
                    </div>
                    <div style={{ padding: 4 }} className='cursor-pointer flex gap-2' onClick={() => handleAppbarMenu(`/${VITE_PATH}/efficiency/`, 'efficiency')}>
                        <ThunderboltFilled />
                        <div>EFFICIENCY</div>
                    </div>
                </div>
            </div>
            <div className='flex-none flex  pr-[16px] justify-end  '>
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
                            <div className='flex items-center gap-2 cursor-pointer select-none px-3' >
                                <Typography className=''>{
                                    (redux.login) ? `${redux.empcode}` : 'LOGIN'
                                }</Typography>
                                <Avatar size={32} icon={<UserOutlined />} src={`${_IMG_PATH}${redux.empcode}.jpg`} />
                            </div>
                        }
                    </Popconfirm> : <div className='flex items-center gap-2 cursor-pointer select-none' onClick={() => navigate(`./login`)}>
                        <Typography className=''>LOGIN</Typography>
                        <Avatar size={32} icon={<UserOutlined />} />
                    </div>
                }
            </div>
        </div >
    )
}

export default ToolbarComponent