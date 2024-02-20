import { Avatar, Divider, Grid, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ApiSharpIcon from '@mui/icons-material/ApiSharp';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Battery1BarOutlinedIcon from '@mui/icons-material/Battery1BarOutlined';
import { API_GET_LAYOUT } from '../../Service';
function Dashboard() {
    let [menu] = useState([
        { text: 'Manpower Check-in', icon: '' },
        { text: 'Line Efficiency', icon: '' }
    ]);
    const [layouts, setLayouts] = useState([]);
    useEffect(() => {
        init();
    }, []);
    async function init() {
        let listLayout = await API_GET_LAYOUT();
        setLayouts(listLayout);
    }
    return (
        <div className='bg-[#f3f3f3] h-[100%]' style={{ fontFamily: 'apple' }}>
            <div className='flex justify-between px-[13.5%] h-[5%]'>
                <div className='w-[25%] flex gap-2  items-center '>
                    <ApiSharpIcon className='text-[18px]' />
                    <span className='text-[#303030] font-semibold' style={{ fontFamily: 'apple', letterSpacing: '1px' }}>DCI IoT</span>
                </div>
                <div className='w-[50%] flex gap-3 justify-around items-center cursor-pointer'>
                    {
                        menu.map((oMenu, iMenu) => {
                            return <div key={iMenu} className='flex items-center gap-2 text-[#575757] hover:text-[#0071e3] transition-all duration-300' style={{ letterSpacing: '1px' }}>
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                </span>
                                {oMenu.text}</div>
                        })
                    }
                </div>
                <div className='w-[25%] flex items-center justify-end'>
                    <div className='flex justify-end   gap-2  rounded-full items-center'>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[500] }}>P</Avatar>
                        <div className='flex flex-col text-[12px]'>
                            <span className='text-[#303030]' style={{ letterSpacing: '1px' }}>Username</span>
                            <span className='text-[#acacac]'>Description</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex h-[10%] bg-[#474747] justify-center items-center ' style={{ borderBottom: '1px solid #d6d6d6' }}>
                <div style={{ overflow: 'auto' }} className='w-[50%] bg-red flex'>
                    <Tabs
                    className='text-white'
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {
                            layouts.filter(o => o.layoutName != 'TEST' && o.layoutStatus == 'ACTIVE').map((oMap, iMap) => {
                                console.log(oMap)
                                return <Tab icon={<ApiSharpIcon/>} iconPosition='top' label={oMap.layoutName} className='text-white'>

                                </Tab>
                                return <div className='w-[150px] bg-red-500'>
                                    <span className='text-[14px] text-white'>{oMap.layoutName}</span>
                                </div>
                            })
                        }
                    </Tabs>
                </div>
            </div>
            <Grid container className='h-[90%]'>
                <div className='w-full flex text-white'>
                    <div className='w-[5%] bg-gray-600 h-[100%]'>
                        <ChevronRightIcon />
                    </div>
                    <div className='w-full h-[100%] px-1'>
                        <div className='h-[7.5%]'>
                            <div className='bg-[#1f1f1f] h-full w-full rounded-full p-1 flex justify-between' style={{ border: '1px solid rgb(33 33 33)' }}>
                                <div className='flex'>
                                    <div className='rounded-full bg-[#333333] w-fit h-full flex justify-center items-center px-4'><MyLocationIcon className='text-[2em]' /></div>
                                    <div className='flex flex-col justify-center pl-3 pr-3'>
                                        <div className='text-white'>F3-MAIN-L6</div>
                                        <div className='text-gray-400 text-xs'>LAY23008</div>
                                    </div>
                                </div>
                                <div className='flex font-bold justify-between gap-6'>
                                    <div className='h-full w-[1px] bg-[#ddd] '>
                                    </div>
                                    <div className='text-xs flex flex-col items-center'>
                                        <span>TOTAL</span>
                                        <span className=''>00</span>
                                    </div>
                                    <div className='h-full w-[1px] bg-[#ddd] '>
                                    </div>
                                    <div className='text-xs'>CHECK-IN</div>
                                    <div className='h-full w-[1px] bg-[#ddd] '>
                                    </div>
                                    <div className='text-xs'>CERTIFICATE</div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[92.5%] p-3'>
                            content
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    )
}

export default Dashboard