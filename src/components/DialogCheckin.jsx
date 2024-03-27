import React, { createContext, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography, DialogContent, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, InputBase, DialogTitle, DialogActions, CircularProgress } from '@mui/material'
import moment from 'moment/moment'
import { API_CHECK_INOUT, API_GET_MQSA_OF_EMPCODE, API_GET_OBJECT_INFO } from '../Service'
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
import { TimelineOppositeContent } from '@mui/lab'
function DialogCheckin(props) {
    const { open, close, data, setData, refObj, refHeaderManpower, backdrop, inpType, refInpEmpCode, inpEmpCode } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingBtnCheckIn, setLoadingBtnCheckIn] = useState(false);
    const objectSelected = useSelector(state => state.reducer.objectSelected);
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open]);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    async function init() {
        setLoading(true);
        const objectDetail = await API_GET_OBJECT_INFO({ objCode: data.objCode });
        if (typeof objectDetail == 'object' && objectDetail.length) {
            setData(objectDetail[0]);
            inpType('OUT');
            dispatch({ type: 'SET_OBJECT_SELECTED', payload: objectDetail[0] });
            await sleep(2000);
            setLoading(false);
        } else {
            inpType('IN')
        }
    }
    async function handleCheckInOut() {
        setLoadingBtnCheckIn(true);
        let inpEmpCode = document.querySelector('input#inpEmpCode').value;
        let inpYMD = document.querySelector('input#inpYMD').value;
        let inpShift = document.querySelector('input#inpShift').value;
        let inpType = document.querySelector('input#inpType').value;
        if (inpEmpCode != '') {
            let state = false;
            data.empCode = data?.empCode == undefined ? '' : data.empCode;
            if (data?.empCode != '' && inpType == 'OUT' || data?.empCode == '' && inpType == 'IN') {
                state = true;
            } else {
                state = false;
            }
            if (state) {
                backdrop(true);
                const checkin = await API_CHECK_INOUT({
                    "objCode": data.objCode,
                    "empCode": inpEmpCode,
                    "ckdate": inpYMD,
                    "ckshift": inpShift,
                    "cktype": inpType
                });
                if (checkin.status == "1") {
                    setData({});
                    init();
                    refObj(data.objCode);
                    refHeaderManpower();
                    await sleep(3500)
                    backdrop(false);
                } else if (checkin.status == "0") {
                    await sleep(3500)
                    backdrop(false);
                    alert(checkin.msg);
                }
                setLoadingBtnCheckIn(false);
            }
        }
    }


    // (##) REAL-TIME READ CARD
    const [empcode, setEmpcode] = useState();
    const [MQSAofEmpcode, setMQSAofEmpcode] = useState([]);
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(refInpEmpCode.current.value)
            setEmpcode(refInpEmpCode.current.value);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (refInpEmpCode.current.value != '') {
            initCompareCert();
        } else {
            setMQSAofEmpcode([]);
        }
    }, [empcode]);
    async function initCompareCert() {
        let apiCompareCert = await API_GET_MQSA_OF_EMPCODE(refInpEmpCode.current.value);
        setMQSAofEmpcode(apiCompareCert);
    }
    // (##) END 

    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth='lg'>
            <DialogTitle className='text-center'>ข้อมูลพื้นที่ปฎิบัติงานและพนักงาน</DialogTitle>
            <DialogContent>
                {
                    loading ? <div className='w-[100%] flex flex-col justify-center items-center py-[1em]'>
                        <Typography>กำลังโหลดข้อมูล</Typography>
                        <CircularProgress />
                    </div>
                        :
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <button style={{ display: 'none' }} id="handleCheckInOut" onClick={handleCheckInOut}>CHECKIN</button>
                                <Stack gap={2}>
                                    <CardPosition data={data} refInpEmpCode={refInpEmpCode} MQSAofEmpcode={MQSAofEmpcode} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Stack gap={2}>
                                    <CardEmp data={objectSelected} eventCheckIn={handleCheckInOut} loadingBtnCheckIn = {loadingBtnCheckIn} refInpEmpCode={refInpEmpCode} MQSAofEmpcode={MQSAofEmpcode} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Card variant="outlined" >
                                    <CardHeader title={<Typography className='font-semibold'>ประวัติการเข้าทำงานในจุดนี้ล่าสุด 7 วัน</Typography>} subheader="" className='bg-yellow-600 ' />
                                    <Divider />
                                    <CardContent>
                                        <Timeline position="alternate">
                                            {
                                                objectSelected?.objLog.length ? objectSelected?.objLog.map((vLog, iLog) => {
                                                    return <TimelineItem key={iLog}>
                                                        <TimelineOppositeContent
                                                            sx={{ m: 'auto 0' }}
                                                            align="right"
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            <Typography variant='inherit' className={`${vLog.cktype == 'IN' ? 'text-green-800' : 'text-red-500'}`}>{moment(vLog.ckdateTime, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss')} {vLog.cktype}</Typography>
                                                        </TimelineOppositeContent>
                                                        <TimelineSeparator>
                                                            <TimelineConnector />
                                                            <TimelineDot color={`${vLog.cktype == 'IN' ? 'success' : 'error'}`}>
                                                                {
                                                                    (iLog == 0 && (typeof objectSelected.empCode !== 'undefined' && objectSelected.empCode != "")) ? <CheckCircleIcon /> : ''
                                                                }
                                                            </TimelineDot>
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent className={`${iLog > 0 ? 'text-[#818181]' : ''}`} sx={{ py: '12px', px: 2 }}>
                                                            <Typography variant="h6" component="span">
                                                                {vLog.empName}
                                                            </Typography>
                                                            <Typography> {vLog.empCode} [{vLog.posit}]</Typography>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                }) : <Typography className='w-full text-center'>ไม่พบประวัติการเข้าทำงาน</Typography>
                                            }
                                        </Timeline>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Card variant="outlined" >
                                    <CardHeader title={<Typography className='font-semibold'>ประวัติการเข้าทำงานของพนักงานล่าสุด 7 วัน</Typography>} subheader="" className='bg-blue-300 ' />
                                    <Divider />
                                    <CardContent>
                                        <Timeline position="alternate">
                                            {
                                                objectSelected?.empLog.length ? objectSelected?.empLog.map((vLog, iLog) => {
                                                    return <TimelineItem key={iLog}>
                                                        <TimelineOppositeContent
                                                            sx={{ m: 'auto 0' }}
                                                            align="right"
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            <Typography variant='inherit' className={`${vLog.cktype == 'IN' ? 'text-green-800' : 'text-red-500'}`}>{moment(vLog.ckdateTime, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss')} {vLog.cktype}</Typography>
                                                        </TimelineOppositeContent>
                                                        <TimelineSeparator>
                                                            <TimelineConnector />
                                                            <TimelineDot color={`${vLog.cktype == 'IN' ? 'success' : 'error'}`}>
                                                                {
                                                                    (iLog == 0 && (typeof objectSelected.empCode !== 'undefined' && objectSelected.empCode != "")) ? <CheckCircleIcon /> : ''
                                                                }
                                                            </TimelineDot>
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent className={`${iLog > 0 ? 'text-[#818181]' : ''}`} sx={{ py: '12px', px: 2 }}>
                                                            <Typography variant="h6" component="span">
                                                                {vLog.empName}
                                                            </Typography>
                                                            <Typography> {vLog.empCode} [{vLog.posit}]</Typography>
                                                        </TimelineContent>
                                                    </TimelineItem>

                                                }) : <Typography className='w-full text-center'>ไม่พบประวัติการเข้าทำงาน</Typography>
                                            }
                                        </Timeline>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>ปิดหน้าต่าง</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCheckin
