import React, { useEffect, useState } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, Grid, Stack, Button, Table, TableBody, TableRow, TableCell, styled, Badge, CircularProgress } from '@mui/material'
import CardEmpMQ from './CardEmpMQ';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CardEmpSA from './CardEmpSA';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
function CardEmp(props) {
    const { data, eventCheckIn, refInpEmpCode, MQSAofEmpcode, loadingBtnCheckIn } = props;
    const RowContent = (props) => {
        return <Stack >
            <Typography className='text-[14px] font-sans'>{props.title}</Typography>
            <Typography className={`pl-3 font-semibold text-[21px] font-sans `}>{props.value != '' ? props.value : '-'}</Typography>
        </Stack>
    }
    const [empcode, setEmpcode] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
            setEmpcode(refInpEmpCode.current.value);
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    return (
        <Card variant="outlined" className='min-h-[200px]' >
            <CardHeader title="ข้อมูลพนักงาน" className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent className='min-h-[200px]'>
                <Grid container spacing={3} >
                    <Grid item xs={6} className='flex justify-center flex-col items-center gap-2 h-[165px]'>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            {
                                Object.keys(MQSAofEmpcode).length ? <Avatar aria-label="recipe" src={MQSAofEmpcode?.empImage} sx={{ width: 128, height: 128 }} style={{ border: '1px solid #CCCCCC' }}>
                                </Avatar> : <Avatar aria-label="recipe" src={data?.empImage} sx={{ width: 128, height: 128 }} style={{ border: '1px solid #CCCCCC' }}>
                                </Avatar>
                            }
                        </StyledBadge>
                        {
                            Object.keys(MQSAofEmpcode).length ? <span>{MQSAofEmpcode?.empCode}</span> : <span>{data?.empCode}</span>
                        }

                    </Grid>
                    <Grid item xs={6}>
                        <div className='flex  flex-col  justify-center'>
                            {
                                Object.keys(MQSAofEmpcode).length ?
                                    <>
                                        <RowContent title='ชื่อ ' value={MQSAofEmpcode?.empName} />
                                        <RowContent title='ตำแหน่ง ' value={MQSAofEmpcode?.empPosit} />
                                        <RowContent title='อายุงาน ' value={`${MQSAofEmpcode?.empWorkYear} ปี ${(Math.floor((MQSAofEmpcode?.empWorkDay - (MQSAofEmpcode?.empWorkYear * 365)) / 31)) > 0 ? (Math.floor((MQSAofEmpcode?.empWorkDay - (MQSAofEmpcode?.empWorkYear * 365)) / 31) + ' เดือน') : ''} `} />
                                    </> :
                                    <>
                                        <RowContent title='ชื่อ ' value={data?.empName} />
                                        <RowContent title='ตำแหน่ง ' value={data?.empPosit} />
                                        <RowContent title='อายุงาน ' value={`${data?.empWorkYear} ปี ${(Math.floor((data?.empWorkDay - (data?.empWorkYear * 365)) / 31)) > 0 ? (Math.floor((data?.empWorkDay - (data?.empWorkYear * 365)) / 31) + ' เดือน') : ''} `} />
                                    </>
                            }

                        </div >
                    </Grid>
                    <Grid item xs={12}>
                        {
                            loadingBtnCheckIn ? <Stack justifyContent={'center'} alignItems={'center'} gap={1}>
                                <CircularProgress />
                                <Typography>ระบบกำลังตรวจสอบใบอนุญาติการทำงาน</Typography>
                            </Stack> :
                                data?.empCode != '' ? (
                                    empcode != '' ? <div onClick={eventCheckIn} className=' h-[100px] pb-2 cursor-pointer ring-2 ring-red-500 w-full rounded-xl bg-mp-absend  flex items-center justify-center shadow-2xl gap-2' >
                                        <CheckCircleIcon className='text-[3em]' /><span className='text-[3em] text-white'>CHECK OUT</span>
                                    </div> : ''
                                ) : (
                                    empcode != '' ? <div onClick={eventCheckIn} className='h-[100px] pb-2 cursor-pointer ring-2 ring-green-500 w-full rounded-xl bg-mp-check-in  flex items-center justify-center shadow-2xl gap-2' >
                                        <CheckCircleIcon className='text-[3em]' /><span className='text-[3em] text-white'>CHECK IN</span>
                                    </div> : ''
                                )
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            (Object.keys(MQSAofEmpcode).length && typeof MQSAofEmpcode.empMQ != 'undefined') ? <CardEmpMQ listMQ={MQSAofEmpcode?.empMQ} /> : <CardEmpMQ listMQ={data?.empMQ} />
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            (Object.keys(MQSAofEmpcode).length && typeof MQSAofEmpcode.empSA != 'undefined') ? <CardEmpSA listSA={MQSAofEmpcode?.empSA} /> : <CardEmpSA listSA={data?.empSA} />
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardEmp