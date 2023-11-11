import React, { createContext, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography, DialogContent, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, InputBase, DialogTitle, DialogActions } from '@mui/material'
import moment from 'moment/moment'
import { API_CHECK_INOUT, API_GET_MQSA_OF_LAYOUT, API_GET_OBJECT, API_GET_OBJECT_BY_CODE, API_GET_OBJECT_INFO } from '../Service'
import { useDispatch, useSelector } from 'react-redux'
import CardPosition from './CheckIN/CardPosition'
import CardEmp from './CheckIN/CardEmp'
function DialogCheckin(props) {
    const { open, close, data, setData, refObj } = props;
    const dispatch = useDispatch();
    const objectSelected = useSelector(state => state.reducer.objectSelected);
    const [mqs, setMqs] = useState([]);
    const [SAs, setSAs] = useState([]);
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open]);
    async function init() {
        const objectDetail = await API_GET_OBJECT_INFO({ objCode: data.objCode });
        setData(objectDetail[0])
        dispatch({ type: 'SET_OBJECT_SELECTED', payload: objectDetail[0] })
    }


    async function handleCheckInOut() {
        let inpEmpCode = document.querySelector('input#inpEmpCode').value;
        let inpYMD = document.querySelector('input#inpYMD').value;
        let inpShift = document.querySelector('input#inpShift').value;
        let inpType = document.querySelector('input#inpType').value;
        const checkin = await API_CHECK_INOUT({
            "objCode": data.objCode,
            "empCode": inpEmpCode,
            "ckdate": inpYMD,
            "ckshift": inpShift,
            "cktype": inpType
        });
        if (checkin.status == "1") {
            setData({});
            alert(`empcode : ${inpEmpCode} ,ckshift : ${inpYMD} ,ckdate : ${inpShift} ,cktype : ${inpType} ,`);
            init();
            refObj(data.objCode);
        } else if (checkin.status == "0") {
            alert(checkin.msg);
        }
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth='md'>
            <DialogTitle className='text-center'>
                WORKING POSITION AND EMPLOYEE INFORMATION
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <button style={{ display: 'none' }} id="handleCheckInOut" onClick={handleCheckInOut}></button>
                        <Stack gap={2}>
                            <CardPosition data={objectSelected} />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack gap={2}>
                            <CardEmp data={objectSelected} eventCheckIn={handleCheckInOut} />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>ปิดหน้าต่าง</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCheckin
