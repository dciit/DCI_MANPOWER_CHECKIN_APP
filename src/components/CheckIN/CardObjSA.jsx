import { Avatar, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material'
import React from 'react'
import DialogAddSA from '../DialogAddSA'
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
function CardObjSA(props) {
    const { listSA, data } = props;
    const login = useSelector(state => state.reducer.login);
    const [openDialogAddSA, setOpenDialogAddSA] = useState(false);
    return (
        <Card >
            <div className='flex justify-between px-3 py-3 pb-2.5 bg-blue-600 text-white text-right'>
                <div className='flex items-center gap-2'>
                    <Avatar sx={{ bgcolor: 'white', color: 'black' }}>SA</Avatar>
                    <Typography>ที่ระบบต้องการ</Typography>
                </div>
                <div>
                    {
                        (typeof login == 'boolean' && login == true) && <Button startIcon={<AddCircleIcon />} onClick={() => setOpenDialogAddSA(true)} variant='contained' className='bg-white text-black '>จัดการ SA</Button>
                    }
                </div>
            </div>
            <Divider />
            <CardContent className='p-0'>
                <Table size='small' className='bg-blue-50'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='py-1 font-sans text-[#626262] w-[45%]'>รหัส</TableCell>
                            <TableCell className='py-1 font-sans text-[#626262]'>ชื่อสกิล</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (listSA?.length) ? listSA.map((sa, index) => {
                                return <TableRow key={index}>
                                    <TableCell className='text-[#b61d1d]'>({sa.saCode}) </TableCell>
                                    <TableCell className='font-semibold'>{sa.saName}</TableCell>
                                </TableRow>
                            }) : <TableRow><TableCell colSpan={2} className='text-center font-semibold text-red-400'>* ไม่พบสกิลเฉพาะทางที่ระบบต้องการ</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <DialogAddSA open={openDialogAddSA} close={setOpenDialogAddSA} data={data} />
        </Card>
    )
}

export default CardObjSA