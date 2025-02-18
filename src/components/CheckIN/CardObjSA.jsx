import { Avatar, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material'
import React, { useEffect } from 'react'
import DialogAddSA from '../DialogAddSA'
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import { API_GET_OBJECT_INFO } from '../../Service';
function CardObjSA(props) {
    const { data, refObj, sa, refInpEmpCode } = props;
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
                                let empcode = data?.empCode ? data.empCode : '';
                                let style = 'text-blue-500';
                                let filter = false;
                                let txtCert = '';
                                try {
                                    if (empcode != '') { // มีการ checkin เข้าทำงาน

                                    } else {
                                        filter = (typeof sa == 'object' && Object.keys(sa).length  && sa.filter(o => o.saCode == oSA.saCode).length) ? true : false;
                                        if (refInpEmpCode.current.value != '') { // กำลังแตะบัตรพนักงาน
                                            if (!filter) {
                                                txtCert = 'ไม่ผ่าน'
                                                style = 'text-red-500 font-semibold'
                                            }
                                        }
                                    }
                                } catch (e) {
                                    alert(e.message)
                                }
                                return <TableRow key={index}>
                                    <TableCell className={` ${style} py-1`}>({oSA.saCode}) </TableCell>
                                    <TableCell className={` ${style} py-1`}>{oSA.saName}</TableCell>
                                    <TableCell className={`p-0 text-center ${style}`}>{txtCert}</TableCell>
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