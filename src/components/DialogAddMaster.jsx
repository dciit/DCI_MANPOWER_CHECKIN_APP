import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { API_ADD_MASTER, API_GEN_MASTERID, API_GET_LAYOUT } from '../Service'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab'
import BrightnessHighOutlinedIcon from '@mui/icons-material/BrightnessHighOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
function DialogAddMaster(props) {
    const { open, close, snackbar } = props;
    const [layout, setLayout] = useState([]);
    const [loading, setLoading] = useState(false);
    const [master, setMaster] = useState({
        "objMasterId": "",
        "mstName": "",
        "objSvg": "",
        "mstStatus": "ACTIVE",
        layoutCode: ''
    });
    useEffect(() => {
        if (open) {
            getMasterId();
        }
    }, [open]);

    async function getMasterId() {
        const res = await API_GEN_MASTERID();
        setMaster({ ...master, objMasterId: (typeof res.docNbr != 'undefined' ? res.docNbr : '') });
    }
    useEffect(() => {
        getLayout();
    }, [master])
    async function getLayout() {
        const apiGetLayout = await API_GET_LAYOUT();
        setLayout(apiGetLayout);
    }

    async function handleAddMaster() {
        setLoading(true);
        snackbar({ vertical: 'top', horizontal: 'right' });
        const res = await API_ADD_MASTER(master);
        if (res.status == "1") {
            await getMasterId();
            setLoading(false);
        } else {
            alert('ไม่สามารถเพิ่ม Master ได้ !');
        }
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle className='px-6 pt-4 pb-3' id="customized-dialog-title">
                <div className='flex gap-2 flex-row items-center'>
                    <div className='rounded-full bg-[#5c5fc8] text-[#fff]  w-[36px] h-[36px] flex items-center justify-center'>
                        <BrightnessHighOutlinedIcon sx={{ fontSize: '20px' }} />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[18px]'>ADD MASTER</span>
                        <span className='text-[12px] text-[#939393]'>เพิ่มตัวเลือก</span>
                    </div>
                </div>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => close(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stack >
                    <Typography variant="h5" component="div" className='text-[#5c5fc8]'>Master</Typography>
                    <Typography color="text.secondary">
                        กรุณากรอกข้อมูล Master ที่ต้องการ
                    </Typography>
                </Stack>
                <Stack mt={3} mb={2} gap={2}>
                    <TextField
                        size='small'
                        variant='filled'
                        required
                        label="Master ID"
                        value={master?.objMasterId}
                    />
                    <TextField
                        size='small'
                        required
                        label="Master Name"
                        placeholder="กรุณากรอก Master Name "
                        value={master?.mstName}
                        onChange={(e) => setMaster({ ...master, mstName: e.target.value })}
                    />
                </Stack>
                <div className='mb-3'>
                    <span>เลือก Layout </span>
                    <Select className='w-full' size='small' onChange={(e) => setMaster({ ...master, layoutCode: e.target.value })}>
                        {
                            layout.map((o, i) => {
                                return <MenuItem key={i} value={o.layoutCode} >{`${o.layoutName} (${o.layoutCode})`}</MenuItem>
                            })
                        }
                    </Select>
                </div>
                <Stack>
                    <Typography color="text.secondary">
                        SVG Code
                    </Typography>
                    <textarea rows={5} className='w-full rounded-lg p-3 mb-3 focus-visible:outline-[#5c5fc8] focus-visible:bg-[#f8f9fd]' style={{ border: '1px solid #ddd' }} placeholder='กรุณาใส่โค้ด SVG ที่ช่องนี้' value={master?.objSvg} onChange={(e) => setMaster({ ...master, objSvg: e.target.value })} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}  variant='outlined' className='border-[#5c5fc8] text-[#5c5fc8]'>ปิดหน้าต่าง</Button>
                <LoadingButton className='min-w-[6rem] bg-[#5c5fc8]' loading={loading ? true : false} loadingPosition='start' startIcon={<SaveAltOutlinedIcon />} onClick={() => handleAddMaster()} variant='contained'>เพิ่ม</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddMaster