import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TableContainer, Paper } from '@mui/material'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { API_ADD_MQSA, API_GET_MQ, API_GET_MQSA_BY_CODE, API_GET_OBJECT_INFO } from '../Service'
import { useDispatch, useSelector } from 'react-redux'

function DialogAddMQ(props) {
    const { open, close, data } = props;
    const dispatch = useDispatch();
    const layoutSelected = useSelector(state => state.reducer.layout);
    const [mqSelected, setMQSelected] = useState('');
    const [listMQ, setListMQ] = useState([]);
    const reduxListMQ = useSelector(state => state.reducer.mq);
    const layout = useSelector(state => state.reducer.layout);
    useEffect(() => {
        if (open == true) {
            init();
        }
    }, [open])

    async function init() {
        // const getSA = await API_GET_MQSA_BY_CODE({ searchCode: data.objCode, searchType: "SA" });
        if (mqSelected == '') {
            setMQSelected(reduxListMQ[0].processCode)
        }
        initListMQ();
    }
    async function initListMQ() {
        let listMQOfObj = await API_GET_MQSA_BY_CODE({ searchCode: data.objCode, searchType: "MQ" });
        setListMQ(listMQOfObj);
    }
    async function handleAddMQ() {
        const insertMQ = await API_ADD_MQSA({
            objCode: data.objCode,
            layOutCode: layout.layoutCode,
            dictCode: mqSelected,
            dictType: "MQ",
            empCode: "99999"
        });
        console.log(insertMQ)
        if (insertMQ.status) {
            initListMQ();
            const refreshCheckInInfo = await API_GET_OBJECT_INFO({ objCode: data.objCode });
            dispatch({ type: 'SET_OBJECT_SELECTED', payload: refreshCheckInInfo[0] })
        } else {
            alert('ไม่สามารถเพิ่ม MQ ได้')
        }
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                <Typography>Add MQ Rquired</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <div>
                        <Select value={mqSelected} fullWidth size='small' onChange={(e) => setMQSelected(e.target.value)}>
                            {
                                reduxListMQ.map((item, index) => {
                                    return <MenuItem key={index} value={item.processCode}>{item.processCode}:{item.processName}</MenuItem>
                                })
                            }
                        </Select>
                        <Button variant='contained' onClick={handleAddMQ}>ADD</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>CODE</TableCell>
                                    <TableCell>NAME</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    listMQ.length ? listMQ.map((item, index) => {
                                        return <TableRow key={index}>
                                            <TableCell>{item.dictCode}</TableCell>
                                            <TableCell>{item.dictDesc}</TableCell>
                                        </TableRow>
                                    }) : <TableRow>
                                        <TableCell colSpan={2} className='text-center'>* NO MQ ACHIEVE</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddMQ