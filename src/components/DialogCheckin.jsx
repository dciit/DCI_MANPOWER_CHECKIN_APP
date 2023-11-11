import React, { createContext, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography, DialogContent, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, InputBase, DialogTitle, DialogActions } from '@mui/material'
import moment from 'moment/moment'
import { API_CHECK_INOUT, API_GET_MQSA_OF_LAYOUT, API_GET_OBJECT, API_GET_OBJECT_BY_CODE, API_GET_OBJECT_INFO } from '../Service'
import { useDispatch, useSelector } from 'react-redux'
import CardPosition from './CheckIN/CardPosition'
import CardEmp from './CheckIN/CardEmp'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function DialogCheckin(props) {
    const { open, close, data, setData, refObj } = props;
    const dispatch = useDispatch();
    const objectSelected = useSelector(state => state.reducer.objectSelected);
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
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth='lg'>
            <DialogTitle className='text-center'>
                WORKING POSITION AND EMPLOYEE INFORMATION
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}  lg={6}>
                        <button style={{ display: 'none' }} id="handleCheckInOut" onClick={handleCheckInOut}></button>
                        <Stack gap={2}>
                            <CardPosition data={objectSelected} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}  lg={6}>
                        <Stack gap={2}>
                            <CardEmp data={objectSelected} eventCheckIn={handleCheckInOut} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}  lg={6}>
                        <Card variant="outlined" >
                            <CardHeader title={<Typography className='font-semibold'>WORK CHECK-IN HISTORY LAST IN 7 DAY</Typography>} subheader="ประวัติการเข้าทำงานในจุดทำงานนี้ล่าสุด 7 วัน" className='bg-yellow-600 ' />
                            <Divider />
                            <CardContent>
                                <Timeline>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot color='primary' />
                                            <TimelineConnector  color='primary'  />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                                <Avatar className='w-[36px] h-[36px]'>

                                                </Avatar>
                                            <Typography>PEERAPONG.K [OP3]</Typography>
                                            </Stack>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Code</TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                        </TimelineSeparator>
                                        <TimelineContent>Sleep</TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}  lg={6}>
                        <Timeline>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Eat</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Code</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                   <TimelineDot color="secondary">
                                        <CheckCircleIcon/>
                                        </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent>Sleep</TimelineContent>
                            </TimelineItem>
                        </Timeline>
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
