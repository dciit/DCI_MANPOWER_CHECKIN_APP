import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
    return (
        <div className='flex flex-col w-full justify-center items-center p-6 h-full gap-2'>
            <CircularProgress />
            <span>กำลังโหลดข้อมูล</span>
        </div>
    )
}

export default Loading