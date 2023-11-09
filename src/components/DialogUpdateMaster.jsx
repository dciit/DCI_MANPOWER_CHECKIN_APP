import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, Card, CardContent, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { API_ADD_MASTER, API_GET_MASTER, API_UPDATE_MASTER } from '../Service'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
function DialogUpdateMaster(props) {
    const { open, close } = props;
    const [masters, setMasters] = useState([]);
    const [masterSelected, setMasterSelected] = useState({});
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open])
    async function init() {
        const master = await API_GET_MASTER();
        if (masterSelected == '' && master.length) {
            setMasterSelected(master[0]);
        }
        setMasters(master);
    }
    async function handleUpdateMaster() {
        const update = await API_UPDATE_MASTER({ ...masterSelected, mstStatus: 'ACTIVE' });
    }
    async function handleChangeMaster(objMasterId) {
        const res = await API_GET_MASTER(objMasterId);
        if (res.length) {
            setMasterSelected(res[0]);
        } else {
            setMasterSelected({});
        }
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle className='px-6 pt-4 pb-3' id="customized-dialog-title">
                Master Update
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
                    <Typography variant="h5" component="div">Master List</Typography>
                    <Typography color="text.secondary">
                        กรุณาเลือกรายการ Master ที่ต้องการแก้ไขข้อมูล
                    </Typography>
                </Stack>
                <Stack pt={2} pb={3}>
                    <Select value={masterSelected.objMasterId} onChange={(e) => handleChangeMaster(e.target.value)} size='small'>
                        {
                            masters.map((master, index) => {
                                return <MenuItem key={index} value={master.objMasterId}>{master.mstName} ({master.objMasterId})</MenuItem>
                            })
                        }
                    </Select>
                </Stack>
                <Card >
                    <CardContent className='p-6'>
                        <Stack>
                            <Typography color={'text.secondary'}>Name</Typography>
                            <TextField size='small' value={masterSelected?.mstName} onChange={(e) => setMasterSelected({ ...masterSelected, mstName: e.target.value })}></TextField>
                        </Stack>
                        <Stack>
                            <Typography color="text.secondary">
                                SVG Code
                            </Typography>
                            <textarea rows={5} className='w-full rounded-lg p-3 mb-3' style={{ border: '1px solid #ddd' }} placeholder='กรุณาใส่โค้ด SVG ที่ช่องนี้' value={masterSelected?.objSvg} onChange={(e) => setMasterSelected({ ...masterSelected, objSvg: e.target.value })} />
                        </Stack>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)} >Close</Button>
                <Button className='min-w-[6rem]' onClick={() => handleUpdateMaster()} variant='contained'>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogUpdateMaster