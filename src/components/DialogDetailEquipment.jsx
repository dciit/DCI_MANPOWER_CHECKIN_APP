import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, TextField, Stack, Divider, CircularProgress, Skeleton } from '@mui/material'
import { useEffect } from 'react'
import { ServiceDelEquipmentOfLayout, ServiceGetDetailEquipment } from '../Service'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
function DialogDetailEquipment(props) {
    const { open, close, eqpId, draw } = props;
    const [loading, setLoading] = useState(true);
    const [equipment, setEquipment] = useState();
    useEffect(() => {
        setLoading(true);
        if (open) {
            async function initData() {
                const res = await ServiceGetDetailEquipment(eqpId);
                console.log(res)
                setTimeout(() => {
                    setLoading(false)
                    setEquipment(res);
                }, 1000);
            }
            initData();
        }
    }, [open]);

    function handleSave() {
        console.log('handleSave')
    }
    async function handleDelete() {
        const res = await ServiceDelEquipmentOfLayout(eqpId);
        let svgContent = document.querySelector('#svgContent');
        svgContent.querySelector(`#${eqpId}`).remove();
    }
    const BoxMstrCheckBox = () => {
        return <div className='flex bg-[#ddd] flex-1 rounded-md p-3 gap-2 items-center justify-center'>
            <input type='checkbox' />
            <span>1 Month</span>
        </div>
    }

    const BoxMstrTitle = ({ title = '', value = '' }) => {
        return <Stack className=' px-3 pt-1 pb-2 rounded-lg border-[#ddd]  w-full' style={{ border: '1px solid #ddd' }}>
            <span className='text-[#9b9b9b]  text-[14px]'>{title}</span>
            <span className='text-[#4e4e4e] font-semibold'>{value}</span>
        </Stack>
    }

    const BoxMstrInput = ({ title = '', value = '', placeholder = 'กรุณากรอกข้อมูล' }) => {
        return <Stack className='border-2 px-3 pt-1 pb-2 gap-1 rounded-lg border-[#00a9ff]  w-full' >
            <span className='text-[#00a9ff] font-thin'>{title}</span>
            <input type='text' value={value} className='border-none outline-none  focus:border-[#ddd]' placeholder={placeholder} />
        </Stack>
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth >
            <DialogTitle>
                รายละเอียด
            </DialogTitle>
            <DialogContent dividers className='flex flex-col gap-3' >
                {
                    loading ? <div><Skeleton animation='wave' className='rounded-md' variant="rectangular" width={'100%'} height={500} /></div> : (
                        <>
                            <Stack direction={'row'} gap={2}>
                                <BoxMstrTitle title='รหัส' value={equipment?.eqpId} />
                            </Stack>
                            <Stack direction={'row'} gap={2}>
                                <BoxMstrTitle title='โรงงาน' value={equipment?.factory} />
                                <BoxMstrTitle title='พื้นที่' value={equipment?.layout} />
                                <BoxMstrTitle title='รอบตรวจ' value={'-'} />
                            </Stack>
                            <Divider className='my-3' />
                            <Stack direction={'col'} gap={2} justifyContent={'center'}>
                                <BoxMstrInput title='ชื่อจุด' placeholder='กรอกชื่อจุดของคุณ' value={equipment?.eqpTitle} />
                                <BoxMstrInput title='รายละเอียด' placeholder='กรอกรายละเอียด' value={equipment?.eqpSubTitle} />
                            </Stack>
                        </>
                    )


                }
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => close(false)}>ปิดหน้าต่าง</Button>
                <Button variant='contained' color='error' onClick={() => handleDelete()} disabled={loading && true}><DeleteIcon />ลบ</Button>
                <Button variant='contained' onClick={() => handleSave()} disabled={loading && true}><CheckIcon />บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDetailEquipment