import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, Stack } from '@mui/material'
import { ServiceAddMaster } from '../Service'
import { useState } from 'react'
function DialogAddMaster(props) {
    const { open, close } = props;
    const [master, setMaster] = useState({
        objId: '',
        objName: '',
        objSvg: ''
    })
    async function handleAddMaster() {
        const res = await ServiceAddMaster(master);
        console.log(res)
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle >
                เพิ่มตัวเลือก
            </DialogTitle>
            <DialogContent dividers>
                <Stack direction={'row'}>
                    <span>รหัส</span>
                    <input type='text' value={master?.objId} onChange={(e) => setMaster({ ...master, objId: e.target.value })} />
                </Stack>
                <Stack direction={'row'}>
                    <span>ชื่อ</span>
                    <input type='text' value={master?.objName} onChange={(e) => setMaster({ ...master, objName: e.target.value })} />
                </Stack>
                <textarea rows={5} className='w-full rounded-lg p-3' style={{ border: '1px solid #ddd' }} placeholder='กรุณาใส่โค้ด SVG ที่ช่องนี้' value={master?.objSvg} onChange={(e) => setMaster({ ...master, objSvg: e.target.value })} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)} variant='outlined'>ปิดหน้าต่าง</Button>
                <Button onClick={() => handleAddMaster()} variant='contained'>เพิ่มตัวเลือก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddMaster