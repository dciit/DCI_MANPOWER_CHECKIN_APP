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
import { Badge, Divider, Paper, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import DirectionsIcon from '@mui/icons-material/Directions';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return <div className='h-[5%] px-3 bg-white text-center text-black flex justify-between items-center leading-[1.4]' style={{ borderBottom: '1px solid #ddd' }}>
        <div>
            LOGO
        </div>
        <div className='flex gap-2 text-left cursor-pointer'>
            <Avatar className='hover:scale-105 transition-all' src='src/images/profile.jpg' />
            <div className='flex-col justify-start' style={{ lineHeight: 1.2 }}>
                <div className='text-black uppercase'>Peerapong.k</div>
                <div className='text-[#9ca3af] text-[14px] '>peerapong.k@dci.daikin.co.jp</div>
            </div>
        </div>
    </div>
}
export default Header;