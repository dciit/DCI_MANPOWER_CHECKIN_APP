import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { API_ADD_MASTER, API_GEN_MASTERID } from '../Service'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab'
function DialogAddMaster(props) {
    const { open, close, snackbar } = props;
    const [masterId, setMasterId] = useState();
    const [loading, setLoading] = useState(false);
    const [master, setMaster] = useState({
        "objMasterId": "",
        "mstName": "",
        "objSvg": "",
        "mstStatus": "ACTIVE"
    })
    useEffect(() => {
        if (open) {
            getMasterId();
        }
    }, [open]);

    async function getMasterId() {
        const res = await API_GEN_MASTERID();
        setMaster({ ...master, objMasterId: (typeof res.docNbr != 'undefined' ? res.docNbr : '') })
    }

    async function handleAddMaster() {
        setLoading(true);
        snackbar({ vertical: 'top', horizontal: 'right' });
        const res = await API_ADD_MASTER(master);
        if (res.status == "1") {
            const nbr = await getMasterId();
            setLoading(false);
        } else {
            alert('ไม่สามารถเพิ่ม Master ได้ !');
        }
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle className='px-6 pt-4 pb-3' id="customized-dialog-title">
                Add Master
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
                    <Typography variant="h5" component="div">Master</Typography>
                    <Typography color="text.secondary">
                        กรุณากรอกข้อมูล Master ที่ต้องการ
                    </Typography>
                </Stack>
                <Stack mt={3} mb={2} gap={2}>
                    <TextField
                        variant='filled'
                        required
                        label="Master ID"
                        value={master?.objMasterId}
                    />
                    <TextField
                        required
                        label="Master Name"
                        placeholder="กรุณากรอก Master Name "
                        value={master?.mstName}
                        onChange={(e) => setMaster({ ...master, mstName: e.target.value })}
                    />
                </Stack>
                <Stack>
                    <Typography color="text.secondary">
                        SVG Code
                    </Typography>
                    <textarea rows={5} className='w-full rounded-lg p-3 mb-3' style={{ border: '1px solid #ddd' }} placeholder='กรุณาใส่โค้ด SVG ที่ช่องนี้' value={master?.objSvg} onChange={(e) => setMaster({ ...master, objSvg: e.target.value })} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)} >ปิดหน้าต่าง</Button>
                <LoadingButton className='min-w-[6rem]' loading={loading ? true : false} loadingPosition='start' startIcon={<SaveIcon />} onClick={() => handleAddMaster()} variant='contained'>เพิ่ม</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddMaster