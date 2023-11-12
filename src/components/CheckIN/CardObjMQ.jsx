import { Avatar, Button, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import DialogAddMQ from '../DialogAddMQ';
import AddCircleIcon from '@mui/icons-material/AddCircle';
function CardObjMQ(props) {
    const [openDialogAddMQ, setOpenDialogAddMQ] = useState(false);
    const { listMQ, data } = props;
    return (
        <Card >
            <div className='flex justify-between px-3 py-3 pb-2.5 bg-blue-600 text-white text-right'>
                <div className='flex items-center gap-2'>
                    <Avatar sx={{ bgcolor: 'white', color: 'black' }}>MQ</Avatar>
                    <Typography>ที่ระบบต้องการ</Typography>
                </div>
                <div>
                    <Button  startIcon = {<AddCircleIcon/>} onClick={() => setOpenDialogAddMQ(true)} variant='contained'  className='bg-white text-black '>จัดการ MQ</Button>
                </div>
            </div>
            <Divider />
            <CardContent className='p-0'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='py-1 font-sans text-[#626262]  w-[45%]'>รหัส</TableCell>
                            <TableCell className='py-1 font-sans text-[#626262]'>ชื่อหลักสูตร</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (listMQ?.length) ? listMQ.map((mq, index) => {
                                return <TableRow key={index}>
                                    <TableCell className='text-blue-600 font-semibold'>({mq.mqCode}) </TableCell>
                                    <TableCell >{mq.mqName}</TableCell>
                                </TableRow>
                            }) : <TableRow><TableCell colSpan={2} className='text-center font-semibold text-red-400'>* ไม่พบหลักสูตรอบรมที่ระบบต้องการ</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <DialogAddMQ open={openDialogAddMQ} close={setOpenDialogAddMQ} data={data} />
        </Card>
    )
}

export default CardObjMQ