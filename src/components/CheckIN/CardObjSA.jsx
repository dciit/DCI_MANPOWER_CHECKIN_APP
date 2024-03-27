import { Avatar, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material'
import React, { useEffect } from 'react'
import DialogAddSA from '../DialogAddSA'
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import { API_GET_OBJECT_INFO } from '../../Service';
function CardObjSA(props) {
    const { data, refObj, sa } = props;
    const login = useSelector(state => state.reducer.login);
    const [openDialogAddSA, setOpenDialogAddSA] = useState(false);
    const [listSA, setListSA] = useState([]);
    useEffect(() => {
        init();
    }, [openDialogAddSA]);
    async function init() {
        let getListSA = await API_GET_OBJECT_INFO({ objCode: data.objCode });
        if (getListSA != null && typeof getListSA == 'object' && Object.keys(getListSA).length) {
            setListSA(getListSA[0].objSA);
        }
    }
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
                            <TableCell className='py-1 font-sans text-[#626262]'>อบรม</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (listSA?.length) ? listSA.map((oSA, index) => {
                                let filter = (typeof sa == 'object' && sa.filter(o => o.saCode == oSA.saCode).length) ? true : false;
                                return <TableRow key={index}>
                                    <TableCell className={` ${!filter ? 'text-red-500 font-semibold' : 'text-green-600'} py-1`}>({oMQ.saCode}) </TableCell>
                                    <TableCell className={`py-1 ${!filter ? 'text-red-500 font-semibold' : 'text-green-600'}`}>{oMQ.saName}</TableCell>
                                    <TableCell className={`p-0 text-center ${!filter && 'text-red-500 font-semibold'}  `}>{!filter && 'ไม่ผ่าน'}</TableCell>
                                </TableRow>
                            }) : <TableRow><TableCell colspan={2} className='text-center font-semibold text-red-400'>* ไม่พบสกิลเฉพาะทางที่ระบบต้องการ</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <DialogAddSA open={openDialogAddSA} close={setOpenDialogAddSA} data={data} refObj={refObj} />
        </Card>
    )
}

export default CardObjSA