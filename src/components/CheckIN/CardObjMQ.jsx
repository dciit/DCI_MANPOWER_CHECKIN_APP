import { Avatar, Badge, Button, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogAddMQ from '../DialogAddMQ';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import { API_GET_OBJECT_INFO } from '../../Service';

function CardObjMQ(props) {
    const [openDialogAddMQ, setOpenDialogAddMQ] = useState(false);
    const { data, mq, refInpEmpCode } = props;
    const login = useSelector(state => state.reducer?.login);
    const [listMQ, setListMQ] = useState([]);
    useEffect(() => {
        init();
    }, [openDialogAddMQ]);
    async function init() {
        let getListMQ = await API_GET_OBJECT_INFO({ objCode: data.objCode });
        if (getListMQ != null && typeof getListMQ == 'object' && Object.keys(getListMQ).length) {
            setListMQ(getListMQ[0].objMQ);
        }
    }
    return (
        <Card >
            <div className='flex justify-between px-3 py-3 pb-2.5 bg-blue-600 text-white text-right'>
                <div className='flex items-center gap-2'>
                    <Avatar sx={{ bgcolor: 'white', color: 'black' }} >MQ</Avatar>
                    <Typography>ที่ระบบต้องการ</Typography>
                </div>
                <div>
                    {
                        (typeof login == 'boolean' && login == true) && <Button startIcon={<AddCircleIcon />} onClick={() => setOpenDialogAddMQ(true)} variant='contained' className='bg-white text-black '>จัดการ MQ</Button>
                    }
                </div>
            </div>
            <Divider />
            <CardContent className='p-0'>
                <Table className='bg-blue-50'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='py-1 font-sans text-[#626262]  w-[35%]'>รหัส</TableCell>
                            <TableCell className='py-1 font-sans text-[#626262]'>ชื่อหลักสูตร</TableCell>
                            <TableCell className='py-1 font-sans text-[#626262] w-[15%] text-center'>#</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (listMQ?.length) ? listMQ.map((oMQ, index) => {
                                let empcode = data?.empCode ? data.empCode : '';
                                let style = 'text-blue-500';
                                let filter = false;
                                let txtCert = '';
                                try {
                                    if (empcode != '') { // มีการ checkin เข้าทำงาน

                                    } else {
                                        filter = (typeof mq == 'object' && Object.keys(mq).length && mq.filter(o => o.mqCode == oMQ.mqCode).length) ? true : false;
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
                                    <TableCell className={` ${style} py-1`}>({oMQ.mqCode}) </TableCell>
                                    <TableCell className={` ${style} py-1`}>{oMQ.mqName}</TableCell>
                                    <TableCell className={`p-0 text-center ${style}`}>{txtCert}</TableCell>
                                </TableRow>
                            }) : <TableRow><TableCell colspan={2} className='text-center font-semibold text-red-400 py-1'>* ไม่พบหลักสูตรอบรมที่ระบบต้องการ</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <DialogAddMQ open={openDialogAddMQ} close={setOpenDialogAddMQ} data={data} />
        </Card>
    )
}

export default CardObjMQ