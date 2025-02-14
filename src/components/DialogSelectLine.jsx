import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { API_GET_LAYOUT } from '../Service'
import { useNavigate } from 'react-router'
function DialogSelectLine(props) {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const { open, close, layoutSelected } = props;
    const [layouts, setLayouts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open]);
    async function init() {
        let res = await API_GET_LAYOUT();
        setLayouts(res);
    }
    async function handleSelectLine(oLayout) {
        dispatch({ type: 'UPDATE_LAYOUT', payload: oLayout })
        navigate(`../${VITE_PATH}/view/${oLayout.layoutCode}`);
        setTimeout(() => {
            location.reload();
        }, 750);
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle>
                <Typography>เลือกไลน์การผลิต</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <TableContainer component={Paper}>
                    <Table fullWidth size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>รหัส</TableCell>
                                <TableCell>ชื่อ</TableCell>
                                <TableCell>#</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                layouts.length ? layouts.filter(o => o.layoutName != 'TEST').map((o, i) => {
                                    return <TableRow key={i}>
                                        <TableCell className='text-center'>{o.layoutCode}</TableCell>
                                        <TableCell className='text-left pl-3 font-semibold'>{o.layoutName}</TableCell>
                                        <TableCell className='text-center'>
                                            <Button variant='contained' size='small' onClick={() => handleSelectLine(o)}>เลือก</Button>
                                        </TableCell>
                                    </TableRow>
                                }) : <TableRow><TableCell className='text-center'>ไม่พบข้อมูล</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>ปิดหน้าต่าง</Button>
            </DialogActions>
        </Dialog >
    )
}

export default DialogSelectLine