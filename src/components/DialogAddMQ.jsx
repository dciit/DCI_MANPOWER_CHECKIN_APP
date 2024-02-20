import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TableContainer, Paper, Stack, IconButton, Alert, Snackbar } from '@mui/material'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { API_ADD_MQSA, API_DELETE_MQSA, API_GET_MQ, API_GET_MQSA_BY_CODE, API_GET_OBJECT_INFO } from '../Service'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab'
import AddIcon from '@mui/icons-material/Add';
function DialogAddMQ(props) {
    const { open, close, data } = props;
    const dispatch = useDispatch();
    const layoutSelected = useSelector(state => state.reducer.layout);
    const objectSelected = useSelector(state => state.reducer.objectSelected);
    const [mqSelected, setMQSelected] = useState('');
    const [listMQ, setListMQ] = useState([]);
    const reduxListMQ = useSelector(state => state.reducer.mq);
    const layout = useSelector(state => state.reducer.layout);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [insertResult, setInsertResult] = useState({});
    const [loadingInsert, setLoadingInsert] = useState(false);
    useEffect(() => {
        if (open == true) {
            init();
            setLoadingInsert(false)
        }
    }, [open])

    async function init() {
        if (mqSelected == '' && Object.keys(reduxListMQ).length) {
            setMQSelected(reduxListMQ[0].processCode)
        }
        // await initListMQ();
    }
    async function initListMQ() {
        let listMQOfObj = await API_GET_MQSA_BY_CODE({ searchCode: data.objCode, searchType: "MQ" });
        setListMQ(listMQOfObj);
    }
    async function handleAddMQ() {
        setLoadingInsert(true);
        const insertMQ = await API_ADD_MQSA({
            objCode: data.objCode,
            layOutCode: layout.layoutCode,
            dictCode: mqSelected,
            dictType: "MQ",
            empCode: "99999"
        });
        insertMQ.msg = insertMQ.status == '1' ? 'ADD MQ SUCCESS ' : insertMQ.msg;
        setInsertResult(insertMQ);
        setOpenSnackBar(true);
        if (insertMQ.status) {
            await refreshMASA();
        }
        setLoadingInsert(false);
    }

    async function refreshMASA() {
        const refreshCheckInInfo = await API_GET_OBJECT_INFO({ objCode: data.objCode });
        dispatch({ type: 'SET_OBJECT_SELECTED', payload: refreshCheckInInfo[0] });
    }
    function closeSnackBar() {
        setOpenSnackBar(false);
    }

    async function handleDelete(dictCode) {
        const del = await API_DELETE_MQSA({
            "objCode": data.objCode,
            "dictCode": dictCode,
            "dictType": 'MQ',
        });
        // await initListMQ();
        await refreshMASA();
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                <Typography>จัดการหลักสูตรอบรม (MQ) ที่ระบบต้องการ</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <Stack gap={2}>
                        <Stack gap={1}>
                            <Stack direction={'col'}>
                                <Select value={mqSelected} className='rounded-e-none w-[85%]' fullWidth size='small' onChange={(e) => setMQSelected(e.target.value)} disabled={(reduxListMQ != null && typeof reduxListMQ == 'object' && reduxListMQ.length) ? false : true}>
                                    {
                                        reduxListMQ.map((item, index) => {
                                            return <MenuItem key={index} value={item.processCode}>{item.processCode}:{item.processName}</MenuItem>
                                        })
                                    }
                                </Select>
                                <LoadingButton disabled={reduxListMQ?.length ? false : true} loading={loadingInsert ? true : false} loadingPosition='start' startIcon={<AddIcon />} variant='contained' className='rounded-s-none w-[15%]' onClick={handleAddMQ}>เพิ่ม</LoadingButton>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography variant='overline'>  รายการหลักสูตรอบรม</Typography>
                            <TableContainer component={Paper}>
                                <Table size='small' >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className='w-[35%]'>รหัส</TableCell>
                                            <TableCell>ชื่อหลักสูตรอบรม</TableCell>
                                            <TableCell className='text-center w-[7.5%]'>#</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            objectSelected?.objMQ?.length ? objectSelected?.objMQ?.map((item, index) => {
                                                return <TableRow key={index}>
                                                    <TableCell className='font-semibold'>{item.mqCode}</TableCell>
                                                    <TableCell className='pl-3'>{item.mqName != '' ? item.mqName : '-'}</TableCell>
                                                    <TableCell className='text-center'>
                                                        <IconButton onClick={() => handleDelete(item.mqCode)}>
                                                            <DeleteIcon className='text-red-300 hover:text-red-500 transition-all duration-500' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            }) : <TableRow>
                                                <TableCell colspan={3} className='text-center font-semibold text-red-500'>* ไม่พบหลักสูตรอบรมที่ระบบต้องการ</TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Stack>
                </DialogContentText>
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={closeSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={closeSnackBar} severity={`${insertResult.status == '1' ? 'success' : 'error'}`} sx={{ width: '100%' }}>
                        {insertResult?.msg}
                    </Alert>
                </Snackbar>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>ปิดหน้าต่าง</Button>
            </DialogActions>
        </Dialog >
    )
}

export default DialogAddMQ