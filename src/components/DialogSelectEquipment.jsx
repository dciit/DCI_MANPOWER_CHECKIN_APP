import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { InputBase, Stack, Paper, Divider, Select, MenuItem, Card, CardHeader, Avatar, IconButton, Typography, CardContent } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect } from 'react'
import { API_GET_MASTER, ServiceAddEquipment, ServiceGetMasterEquipment } from '../Service'
import { useState } from 'react'
function DialogSelectEquipment(props) {
    const { open, close, layout } = props;
    const [master, setMaster] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [MasterSelected, setMasterSelected] = useState({
        eqpTitle: '', eqpSubTitle: ''
    });
    let msgObjSubTitle = 'กรุณากรอกข้อมูล';
    useEffect(() => {
        if (open) {
            intialContent();
        }
    }, [open]);
    async function intialContent() {
        setMaster(await API_GET_MASTER());
    }

    async function handleAddEquipment() {
        if ((typeof MasterSelected.eqpTitle == 'undefined' || MasterSelected?.eqpTitle.length == 0) || typeof MasterSelected.eqpSubTitle == 'undefined' || MasterSelected?.eqpSubTitle.length == 0) {
            return false;
        }
        const resAddEquipment = await ServiceAddEquipment({
            "layoutCode": layout.layoutCode,
            "objId": MasterSelected.objId,
            "eqpTitle": MasterSelected.eqpTitle,
            "eqpSubTitle": MasterSelected.eqpSubTitle,
            "eqpX": 0,
            "eqpW": 0,
            "eqpY": 0,
            "eqpH": 0,
            "eqpStatus": "normal",
            "layout": layout.layoutCode,
            "factory": "X",
            "eqpLastCheckBy": "string",
            "eqpRemark": "",
            "eqpTrigger": MasterSelected.eqpTrigger,
        });
    }

    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle className='px-3 py-2'>
                <div className='flex gap-2 items-center text-black p-0'>
                    <AddCircleOutlineOutlinedIcon />
                    <span>Add Object</span>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Stack gap={2}>
                    <Card>
                        <CardContent >
                            <div>
                                Master List
                            </div>
                            <Select fullWidth value={MasterSelected.objId} onChange={(e) => { setMasterSelected({ ...MasterSelected, ...e.target.value }) }} size='small'>
                                {
                                    master.map((item, index) => {
                                        return <MenuItem key={index} value={item}>{item.objName} ({item.objId})</MenuItem>
                                    })
                                }
                            </Select>
                            <div className='w-full select-none mt-3' style={{ borderBottom: '1px solid #ddd' }}>
                                <p className='font-semibold text-[#676767] text-[14px]'>Master Name</p>
                                <InputBase className='text-[18px] w-full' value={MasterSelected.mstName} readOnly />
                            </div>
                            <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                                <p className='font-semibold text-[#676767] text-[14px]'>Master Code</p>
                                <InputBase className='text-[18px] w-full' value={MasterSelected.masterCode} readOnly />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className='pt-1'>
                            <Stack direction={'row'} gap={2} p={2}>
                                <Stack alignItems={'start'} className='w-full' >
                                    <div className='pb-6'>
                                        Information
                                    </div>
                                    <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                                        <div className='flex flex-row gap-1  items-center'>
                                            <span className='font-semibold text-[#676767] text-[14px]'>Title </span>
                                            <span className='text-red-500 text-sm'>{!MasterSelected?.objTitle && (`* ${msgObjSubTitle}`)}</span>
                                        </div>
                                        <InputBase className='text-[18px] w-full' value={MasterSelected?.objTitle}
                                            onChange={(e) => setMasterSelected({ ...MasterSelected, objTitle: e.target.value })} />
                                    </div>
                                    <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                                        <div className='flex flex-row gap-1  items-center'>
                                            <span className='font-semibold text-[#676767] text-[14px]'>SubTitle </span>
                                            <span className='text-red-500 text-sm'>{!MasterSelected?.objSubTitle && (`* ${msgObjSubTitle}`)}</span>
                                        </div>
                                        <InputBase className='text-[18px] w-full' value={MasterSelected.eqpSubTitle}
                                            onChange={(e) => setMasterSelected({ ...MasterSelected, eqpSubTitle: e.target.value })} />
                                    </div>

                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => close(false)}>ปิดหน้าต่าง</Button>
                <Button variant='contained' onClick={() => handleAddEquipment()} startIcon={<AddCircleOutlineOutlinedIcon />}>บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSelectEquipment