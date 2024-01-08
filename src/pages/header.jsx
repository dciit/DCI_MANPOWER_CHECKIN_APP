import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import React, { useState } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import { Badge, Divider, Paper, InputBase, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuComponent from '../components/menu.component';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/icon-dci.ico'
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import { persistor } from "../redux/store";
import { useNavigate } from 'react-router';
function Header() {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const navigate = useNavigate();
    const reducer = useSelector(state => state.reducer);
    const [openMenu, setOpenMenu] = useState(null);
    const open = Boolean(openMenu);
    async function handleOpenMenu(event) {
        setOpenMenu(event.currentTarget)
    }
    async function handleCloseMenu() {
        setOpenMenu(null);
    }
    async function handleLogout() {
        if (confirm('คุณต้องการออกจากระบบ ใช่หรือไม่ ? ')) {
            persistor.purge();
            location.reload();
        }
    }
    async function handleHome(){
        navigate(`${VITE_PATH}/management`)
    }
    return (
        <div className='h-[75px] bg-[#f6f8fa]' style={{ borderBottom: '1px solid #ddd' }}>
            <Stack direction={'row'} justifyContent={'space-between'} px={3} className='h-full' alignContent={'center'}>
                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    {/* <Stack className='cursor-pointer'>
                        <Box className='bg-[#f6f8fa] px-2 pb-2 pt-1 rounded-lg' style={{ border: '1px solid #ddd' }}>
                            <MenuIcon />
                        </Box>
                    </Stack> */}
                    <Stack alignItems={'center'} spacing={2} direction={'row'} className='cursor-pointer select-none' onClick={handleHome}>
                        <Avatar src={logo} variant='square' className='w-[35px]' />
                        <Typography className='uppercase  flex justify-center items-center text-[1.5em]' >DCI MANPOWER</Typography>
                    </Stack>
                </Stack>
                <Stack justifyContent={'center'}>
                    <div onClick={handleOpenMenu} className='flex items-center gap-2'>
                        <Typography className=''>{reducer.name}</Typography>
                        <Avatar>{reducer.name?.substring(3, 4)}</Avatar>
                    </div>
                </Stack>
            </Stack>
            <MenuComponent open={open} openMenu={openMenu} closeMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} logout={handleLogout} />
        </div>
    )
}
export default Header;