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
function DialogAddSA(props) {
    const { open, close, data } = props;
    const dispatch = useDispatch();
    const [SASelected, setSASelected] = useState('');
    const [listSA, setListSA] = useState([]);
    const reduxListSA = useSelector(state => state.reducer.sa);
    const objectSelected = useSelector(state => state.reducer.objectSelected);
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
        if (SASelected == '' && reduxListSA.length) {
            setSASelected(reduxListSA[0].processCode)
        }
    }
    async function handleAddSA() {
        setLoadingInsert(true);
        const insertSA = await API_ADD_MQSA({
            objCode: data.objCode,
            layOutCode: layout.layoutCode,
            dictCode: SASelected,
            dictType: "SA",
            empCode: "99999"
        });
        insertSA.msg = insertSA.status == '1' ? 'ADD SA SUCCESS ' : insertSA.msg;
        setInsertResult(insertSA);
        setOpenSnackBar(true);
        if (insertSA.status) {
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
            "dictType": 'SA',
        });
        await refreshMASA();
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                <Typography>จัดการสกิลเฉพาะทาง (SA) ที่ระบบต้องการ</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <Stack gap={2}>
                        <Stack gap={1}>
                            <Stack direction={'col'}>
                                <Select value={SASelected} className='rounded-e-none w-[85%]' fullWidth size='small' onChange={(e) => setSASelected(e.target.value)}>
                                    {
                                        reduxListSA.map((item, index) => {
                                            return <MenuItem key={index} value={item?.processCode}>{item?.processCode}:{item?.processName}</MenuItem>
                                        })
                                    }
                                </Select>
                                <LoadingButton disabled={reduxListSA.length ? false : true} loading={loadingInsert ? true : false} loadingPosition='start' startIcon={<AddIcon />} variant='contained' className='rounded-s-none w-[15%]' onClick={handleAddSA}>เพิ่ม</LoadingButton>
                            </Stack>

                        </Stack>
                        <Stack>
                            <Typography variant='overline'>  รายการสกิลเฉพาะทาง</Typography>
                            <TableContainer component={Paper}>
                                <Table size='small' >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className='w-[35%]'>รหัส</TableCell>
                                            <TableCell>ชื่อสกิล</TableCell>
                                            <TableCell className='text-center w-[7.5%]'>#</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            objectSelected?.objSA?.length ? objectSelected?.objSA?.map((item, index) => {
                                                return <TableRow key={index}>
                                                    <TableCell className='font-semibold'>{item.saCode}</TableCell>
                                                    <TableCell className='pl-3'>{item.saName != '' ? item.saName : '-'}</TableCell>
                                                    <TableCell className='text-center'>
                                                        <IconButton onClick={() => handleDelete(item.saCode)}>
                                                            <DeleteIcon className='text-red-300 hover:text-red-500 transition-all duration-500' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            }) : <TableRow>
                                                <TableCell colSpan={3} className='text-center font-semibold text-red-500'>* ไม่พบสกิลเฉพาะทางที่ระบบต้องการ</TableCell>
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

export default DialogAddSA