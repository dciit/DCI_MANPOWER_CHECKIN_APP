import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

function CardEmpMQ(props) {
    const { listMQ } = props;
    return (
        <Card >
            <div className='px-3 py-3 pb-2.5 bg-green-600 text-white text-right'>
                MQ REQUIRED
            </div>
            <Divider />
            <CardContent className='p-0'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='py-1 font-sans text-[#626262]  w-[45%]'>CODE</TableCell>
                            <TableCell className='py-1 font-sans text-[#626262]'>NAME</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (listMQ?.length) ? listMQ.map((mq, index) => {
                                return <TableRow key={index}>
                                    <TableCell className='text-[#b61d1d]'>({mq.mqCode}) </TableCell>
                                    <TableCell className='font-semibold'>{mq.mqName}</TableCell>
                                </TableRow>
                            }) : <TableRow><TableCell colSpan={2} className='text-center font-semibold text-red-400'>* NO LICENSE REQUIRED</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default CardEmpMQ