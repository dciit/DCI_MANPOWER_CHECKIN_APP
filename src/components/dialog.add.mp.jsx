import { CheckCircle, CheckCircleOutline } from '@mui/icons-material'
import { Button, Flex, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { APIAddPointMP } from '../services/mp.service';
import { useSelector } from 'react-redux';
import { contact } from '../constants';
import { notification } from 'antd';
function DialogAddMP({ open, setOpen, layoutCode, setOnce,once }) {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, message) => {
        api[type]({
            message: message
        });
    };
    const redux = useSelector((state) => state.reducer);
    const empcode = redux?.empcode == true ? redux?.empcode : '99999';
    const [mp, setMp] = useState({
        layoutCode: layoutCode,
        objMasterID: 'MST23028',
        objTitle: '',
        objSubTitle: '',
        empCode: empcode
    })
    const handleAddMP = async () => {
        let RESAddPointMP = await APIAddPointMP(mp);
        try {
            if (RESAddPointMP.status == true) {
                setOnce(!once);
                openNotification('success', 'เพิ่มจุดเช็คอินเรียบร้อย')
            } else {
                alert(`ไม่สามารถเพิ่มจุดเช็คอินได้ ${contact}`)
            }
        } catch (e) {
            alert(e.message)
        }
    }
    return (
        <Modal open={open} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} footer={
            <Flex justify='end' gap={6}>
                <Button onClick={() => setOpen(false)}>ปิดหน้าต่าง</Button>
                <Button type='primary' onClick={handleAddMP} disabled={mp.objTitle == '' || mp.objSubTitle == ''}>เพิ่ม</Button>
            </Flex>
        }>

            <div className='pt-12 pb-6 px-3 grid  gap-3'>

                {contextHolder}
                <div className='grid grid-cols-2'>
                    <div className='flex justify-end items-center pr-3'>ชื่อจุดเช็คอิน : </div>
                    <Input type='text' placeholder='ชื่อจุดเช็คอิน' value={mp.objTitle} onChange={(e) => setMp({ ...mp, objTitle: e.target.value })} />
                </div>
                <div className='grid grid-cols-2'>
                    <div className='flex justify-end items-center pr-3'>รายละเอียด : </div>
                    <Input type='text' placeholder='รายละเอียดเพิ่มเติม' value={mp.objSubTitle} onChange={(e) => setMp({ ...mp, objSubTitle: e.target.value })} />
                </div>
            </div>
        </Modal>
    )
}

export default DialogAddMP