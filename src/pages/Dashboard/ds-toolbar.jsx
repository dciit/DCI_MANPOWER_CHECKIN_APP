import { LogoDev, Menu } from '@mui/icons-material'
import { Divider, Stack } from '@mui/material'
import React from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
function DSToolbar() {
    return (
        <div className='h-full flex bg-black '>
            <div className='logo w-[5%] text-white flex justify-center items-center' ><PowerSettingsNewIcon /></div>
            <div className='flex w-[80%] gap-12 items-center '>
                {
                    ['Manpower Check-in', 'Andno board', 'MENU3'].map((o, i) => {
                        return <div key={i} className='text-white px-3 uppercase font-normal'>{o}</div>
                    })
                }
            </div>
            <div className='w-[15%] flex items-center justify-center'>
                <div className='w-full px-3 bg-gray-300 rounded-lg text-gray-500 h-[50%]'>ค้นหาที่ต้องการ</div>
            </div>
            <div className='w-[10%]'>

            </div>
        </div>
    )
}

export default DSToolbar