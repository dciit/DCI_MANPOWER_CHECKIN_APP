import React, { useEffect } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, Grid, Stack, Button, Table, TableBody, TableRow, TableCell, styled, Badge } from '@mui/material'
import CardEmpMQ from './CardEmpMQ';
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
        <Card variant="outlined" className='min-h-[200px]' >
            <CardHeader title="ข้อมูลพนักงาน" className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent className='min-h-[200px]'>
                <Grid container spacing={3}>
                    <Grid item xs={6} className='flex justify-center flex-col items-center gap-2 h-[165px]' >
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar aria-label="recipe" src={data?.empImage} sx={{ width: 128, height: 128 }} style={{border:'1px solid #CCCCCC'}}>
                            </Avatar>
                        </StyledBadge>

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