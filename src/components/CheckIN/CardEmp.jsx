import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, Grid, Stack, Button, Table, TableBody, TableRow, TableCell } from '@mui/material'
import CardEmpMQ from './CardEmpMQ';
import CardEmpSA from './CardEmpSA';
function CardEmp(props) {
    const { data, eventCheckIn } = props;
    const RowContent = (props) => {
        return <Stack >
            <Typography className='text-[14px] font-sans'>{props.title}</Typography>
            <Typography className={`pl-3 font-semibold text-[21px] font-sans `}>{props.value != '' ? props.value : '-'}</Typography>
        </Stack>
    }
    useEffect(() => {

    }, [])
    return (
        <Card variant="outlined" className='min-h-[200px]'>
            <CardHeader title="ข้อมูลพนักงาน" className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent className='min-h-[200px]'>
                <Grid container spacing={3}>
                    <Grid item xs={6} className='flex justify-center flex-col items-center gap-2 h-[165px]' >
                        <Avatar aria-label="recipe" src={data?.empImage} sx={{ width: 128, height: 128 }}>
                        </Avatar>
                        <span>
                            {data?.empCode}
                        </span>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='flex  flex-col  justify-center'>
                            <RowContent title='ชื่อ ' value={data?.empName} />
                            <RowContent title='ตำแหน่ง ' value={data?.empPosit} />
                            <RowContent title='อายุงาน ' value={data?.empWorkYear} />
                        </div >
                    </Grid>
                    <Grid item xs={12}>
                        <CardEmpMQ listMQ={data?.empMQ} />
                    </Grid>
                    <Grid item xs={12}>
                        <CardEmpSA listSA={data?.empSA} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CardEmp