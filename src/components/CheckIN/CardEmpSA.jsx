import { Avatar, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

function CardEmpSA(props) {
    const { listSA } = props;
    console.log(listSA)
    return (
        <Card >
            <div className='flex gap-2 items-center px-3 py-3 pb-2.5 bg-green-600 text-white text-right'>
                <Avatar sx={{ bgcolor: 'white', color: 'black' }}>SA</Avatar>
                <Typography>ของพนักงาน</Typography>
            </div>
            <Divider />
            <CardContent className='p-0'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='py-1 font-sans text-[#626262]  w-[45%]'>รหัส</TableCell>
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
                            }) : <TableRow><TableCell colSpan={2} className='text-center font-semibold text-red-400'>* พนักงานยังไม่มีสกิลเฉพาะทาง</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default CardEmpSA