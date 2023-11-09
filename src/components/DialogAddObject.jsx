import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux'
import { API_ADD_OBJECT, API_GET_MASTER } from '../Service'
function DialogAddObject(props) {
    const { open, close, layout } = props;
    const reducer = useSelector(state => state.reducer);
    const [object, setObject] = useState({
        layoutCode: '',
        objType: "MP",
        objTitle: "",
        objSubTitle: "",
        objX: 0,
        objY: 0
    });
    const [masters, setMasters] = useState([]);
    const [masterSelected, setMasterSelected] = useState('');
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open])

    async function init() {
        const listMaster = await API_GET_MASTER();
        if (masterSelected == '') {
            setMasterSelected(listMaster[0].objMasterId)
        }
        setMasters(listMaster);
    }

    async function handleAddObject() {
        const res = await API_ADD_OBJECT({
            ...object, objMasterId: masterSelected, layoutCode: layout.layoutCode
        });
        console.log(res)
    }
    const handleClose = () => {
        close(false)
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle className='px-6 pt-4 pb-3' id="customized-dialog-title">
                Add Object
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
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
                    <Typography variant="h5" component="div">Layout</Typography>
                    <Typography color="text.secondary" className='pl-3'>
                        พื้นที่ที่คุณกำลังใช้งาน
                    </Typography>
                </Stack>
                <Stack mt={1} mb={0} gap={2}>
                    <TextField
                        required
                        label="Layout Selected"
                        placeholder="กรุณากรอก Master Name "
                        disabled
                        defaultValue={""}
                        variant='filled'
                        value={layout.layoutCode}
                    />
                    <Stack mb={3}>
                        <Stack mb={1}>
                            <Typography variant="h5" component="div">Master List</Typography>
                            <Typography color="text.secondary">
                                กรุณาเลือก Master ที่ต้องการ
                            </Typography>
                        </Stack>
                        <Select value={masterSelected} onChange={(e) => setMasterSelected(e.target.value)}>
                            {
                                masters.map((master, index) => {
                                    return <MenuItem value={master.objMasterId} key={index}>{master.mstName} ({master.objMasterId})</MenuItem>
                                })
                            }
                        </Select>
                    </Stack>
                </Stack>
                <Divider />
                <Card >
                    <CardContent className='p-3'>
                        <Stack mt={1} mb={0} gap={2}>
                            <Stack mb={3}>
                                <Stack mb={1}>
                                    <Typography variant="h5" component="div">Object Detail</Typography>
                                    <Typography color="text.secondary">
                                        กรุณากรอกข้อมูล Object ที่คุณต้องการ
                                    </Typography>
                                </Stack>

                                <Stack p={1}>
                                    <Typography color={'text.secondary'}>Title</Typography>
                                    <TextField size='small' value={object?.objTitle} onChange={(e) => setObject({ ...object, objTitle: e.target.value })}></TextField>
                                </Stack>
                                <Stack p={1}>
                                    <Typography color={'text.secondary'}>SubTitle</Typography>
                                    <TextField size='small' value={object?.objSubTitle} onChange={(e) => setObject({ ...object, objSubTitle: e.target.value })}></TextField>
                                </Stack>
                                <Grid container >
                                    <Grid item xs={4} gap={1} p={1}>
                                        <Typography color={'text.secondary'}>Object Type</Typography>
                                        <Select value={object.objType} size='small' fullWidth onChange={(e) => setObject({ ...object, objType: e.target.value })}>
                                            {
                                                ["MP", "OTHER"].map((type, index) => {
                                                    return <MenuItem value={type} key={index}>{type}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </Grid>
                                    <Grid item xs={8} gap={1} p={1}>
                                        <Typography color={'text.secondary'}>Path</Typography>
                                        <TextField fullWidth size='small' value={object?.objPath} onChange={(e) => setObject({ ...object, objPath: e.target.value })}></TextField>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)} >Close</Button>
                <Button className='min-w-[6rem]' onClick={() => handleAddObject()} variant='contained'>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddObject