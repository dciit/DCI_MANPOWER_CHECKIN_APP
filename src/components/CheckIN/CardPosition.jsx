import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, Stack } from '@mui/material'
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
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Stack>
                            <Stack direction={'row'}>
                                <Typography> WORK CODE : </Typography>
                                <Typography> {data.objCode}</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <Typography> WORK NAME : </Typography>
                                <Typography> {data?.objTitle}</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <Typography> FACTORY : </Typography>
                                <Typography> {data?.factory}</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <Typography> LINE : </Typography>
                                <Typography> {data?.line} ({data?.subLine})</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack gap={2} mt={3}>
                        <CardObjMQ listMQ = {data?.objMQ} />
                        <CardObjSA listSA = {data?.objSA} />
                    </Stack>
            </CardContent>
        </Card>
    )
}

export default CardPositionEmployee