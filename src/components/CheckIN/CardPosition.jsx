import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, Stack, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import React, { useContext } from 'react'
import CardObjMQ from './CardObjMQ';
import CardObjSA from './CardObjSA';

function CardPositionEmployee(props) {
    const { data } = props;
    return (
        <Card variant="outlined"  >
            <CardHeader title="WORK POSITION" className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent >
                <div className='h-[160px]'>
                    <Table className='w-full' size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell width={'50%'}>WORK CODE : </TableCell>
                                <TableCell className='font-sans font-semibold'> {data.objCode}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>WORK NAME : </TableCell>
                                <TableCell className='font-sans font-semibold'> {data.objTitle}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>FACTORY : </TableCell>
                                <TableCell className='font-sans font-semibold'> {data.factory}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>LINE : </TableCell>
                                <TableCell className='font-sans font-semibold'> {data.line} ({data.subLine})</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <Stack gap={2} mt={3}>
                    <CardObjMQ listMQ={data?.objMQ} data={data} />
                    <CardObjSA listSA={data?.objSA} data={data}/>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CardPositionEmployee