import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { APIGetLayoutDetailByCode, APIUpdateLayoutDetail } from '../services/mp.service'
import { useSelector } from 'react-redux'
import Switch from '@mui/material/Switch';
import moment from 'moment'
import { notification } from 'antd';
function DialogSettingLayout({ open, setOpen, layout }) {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
            message: message
        });
    };
    const dtNow = moment();
    const redux = useSelector((state) => state.reducer);
    const login = redux?.login != undefined ? redux?.login : false;
    const empcode = redux?.empcode != undefined ? redux?.empcode : '';
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [layoutDetail, setLayoutDetail] = useState({
        layoutCode: '',
        layoutName: '',
        width: 1200,
        height: 500,
        bypassMQ: 'FALSE',
        bypassSA: 'FALSE',
        updateBy: empcode,
        layoutStatus: 'INACTIVE'
    })
    useEffect(() => {
        if (open == true) {
            init();
        }
    }, [open])
    const init = async () => {
        let RESLayoutDetail = await APIGetLayoutDetailByCode(layout.layoutCode);
        setLayoutDetail({ ...layoutDetail, layoutCode: RESLayoutDetail.layoutCode, layoutName: RESLayoutDetail.layoutName, layoutStatus: RESLayoutDetail.layoutStatus, updateBy: empcode, width: RESLayoutDetail.width, height: RESLayoutDetail.height, bypassMQ: RESLayoutDetail.bypassMq == null ? 'FALSE' : RESLayoutDetail.bypassMq, bypassSa: RESLayoutDetail.bypassSa == null ? 'FALSE' : RESLayoutDetail.bypassSa });
    }
    const handleSave = async () => {
        console.table(layoutDetail);
        let RESUpdateLayoutDetail = await APIUpdateLayoutDetail(layoutDetail);
        if (RESUpdateLayoutDetail.status == true) {
            openNotification('success', 'บันทึกข้อมูลเรียบร้อยแล้ว');
        } else {
            openNotification('error', RESUpdateLayoutDetail.message);
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'   >
            {contextHolder}
            <DialogTitle>
                ตั้งค่าพื้นที่
            </DialogTitle>
            <DialogContent dividers>
                <div className='grid grid-cols-1 gap-2'>
                    <div className='grid grid-cols-4'>
                        <div className='col-span-2 flex items-center justify-end pr-3'><span>ชื่อพื้นที่ : </span></div>
                        <div className='col-span-2'><input type="text" value={1} className='border rounded-md px-3 py-1 bg-gray-100 font-semibold' value={layoutDetail.layoutName} onChange={(e) => setLayoutDetail({ ...layoutDetail, layoutName: e.target.value, updateBy: empcode })} /></div>
                    </div>
                    <div className='grid grid-cols-4'>
                        <div className='col-span-2 flex items-center justify-end pr-3'><span>ความกว้าง : </span></div>
                        <div className='col-span-2'><input type="number" value={1} className='border rounded-md px-3 py-1 bg-gray-100 font-semibold' value={layoutDetail.width} onChange={(e) => setLayoutDetail({ ...layoutDetail, width: Number(e.target.value), updateBy: empcode })} /></div>
                    </div>
                    <div className='grid grid-cols-4'>
                        <div className='col-span-2 flex items-center justify-end pr-3'><span>ความสูง : </span></div>
                        <div className='col-span-2'><input type="number" value={1} className='border rounded-md px-3 py-1 bg-gray-100 font-semibold' value={layoutDetail.height} onChange={(e) => setLayoutDetail({ ...layoutDetail, height: Number(e.target.value), updateBy: empcode })} /></div>
                    </div>
                    <div className='grid grid-cols-4'>
                        <div className='col-span-2 flex items-center justify-end pr-3'><span>ตรวจสอบ MQ : </span></div>
                        <Switch {...label} checked={layoutDetail.bypassMQ == 'TRUE' ? true : false} onChange={(e) => setLayoutDetail({ ...layoutDetail, bypassMQ: e.target.checked == true ? 'TRUE' : 'FALSE', updateBy: empcode })} />
                    </div>
                    <div className='grid grid-cols-4'>
                        <div className='col-span-2 flex items-center justify-end pr-3'><span>ตรวจสอบ SA : </span></div>
                        <Switch {...label} checked={layoutDetail.bypassSA == 'TRUE' ? true : false} onChange={(e) => setLayoutDetail({ ...layoutDetail, bypassSA: e.target.checked == true ? 'TRUE' : 'FALSE', updateBy: empcode })} />
                    </div>
                    <div className='grid grid-cols-4'>
                        <div className='col-span-2 flex items-center justify-end pr-3'><span>เปิดใช้งานพื้นที่: </span></div>
                        <Switch {...label} checked={layoutDetail.layoutStatus == 'ACTIVE' ? true : false} onChange={(e) => setLayoutDetail({ ...layoutDetail, layoutStatus: e.target.checked == true ? 'ACTIVE' : 'INACTIVE', updateBy: empcode })} />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpen(false)}>
                    ปิดหน้าต่าง
                </Button>
                <Button variant='contained' onClick={handleSave} disabled={!login}>บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSettingLayout