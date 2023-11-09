import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, Grid, Stack, Button } from '@mui/material'
import CardEmpMQ from './CardEmpMQ';
import CardEmpSA from './CardEmpSA';
function CardEmp(props) {
    const { data, eventCheckIn } = props;
    console.log(data);
    const RowContent = (props) => {
        return <Stack direction={'row'}>
            <Typography>{props.title}</Typography>
            <Typography>{props.value != '' ? props.value : '-'}</Typography>
        </Stack>
    }
    useEffect(()=>{

    },[])
    return (
        <Card variant="outlined" className='min-h-[200px]'>
            <CardHeader title="EMPLOYEE" className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent className='min-h-[200px]'>
                <Grid container spacing={3}>
                    <Grid item xs={6} className='flex justify-center'>
                        <Avatar aria-label="recipe" src={data?.empImage} sx={{ width: 128, height: 128 }}>

                        </Avatar>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='flex  flex-col  justify-center'>
                            <RowContent title='CODE : ' value={data?.empCode} />
                            <RowContent title='NAME : ' value={data?.empName} />
                            <RowContent title='POSITION : ' value={data?.empPosit} />
                            <RowContent title='WORK DAY : ' value={`${(data?.empWorkYear >= 1 ? (data?.empWorkYear + ' ปี ') : '')} ${Math.ceil(data?.empWorkDay)} วัน`} />
                            <RowContent title='FACTORY : ' value={data?.factory} />
                            <RowContent title='LINE : ' value={data?.line} />
                        </div >
                    </Grid>
                    <Grid item xs={12}>
                        {/* {
                            `EMPCODE : ${document.querySelector('#inpEmpCode').value}`
                        }
                        {
                            (document.querySelector('#inpEmpCode').value && document.querySelector('#disEmpCode').value == '') && <Button variant='contained' id='handleCheckInOut' onClick={eventCheckIn} >CHECK IN</Button>
                        }
                        {
                            (document.querySelector('#inpEmpCode').value && (document.querySelector('#inpEmpCode').value == document.querySelector('#disEmpCode').value)) && <Button variant='contained' id='handleCheckInOut' onClick={eventCheckIn} >CHECK OUT</Button>
                        } */}
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