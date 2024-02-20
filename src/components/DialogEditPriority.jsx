import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { API_GET_OBJECT_OF_LAYOUT, API_UPDATE_PRIORITY } from '../Service'
import { ButtonGroup, CircularProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SyncIcon from '@mui/icons-material/Sync';
function DialogEditPriority(props) {
    const { open, close } = props;
    const layout = useSelector(state => state.reducer?.layoutFilter);
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sync, setSync] = useState();
    useEffect(() => {
        if (open) {
            initObject();
        }
    }, [open]);
    async function initObject() {
        setLoading(true);
        let res = await API_GET_OBJECT_OF_LAYOUT({ layoutCode: layout.layoutCode });
        setObjects(res);
    }
    useEffect(() => {
        if (typeof objects == 'object' && objects.length) {
            setLoading(false);
        }
    }, [objects]);

    async function handlePriority(objCode, action) {
        let api = await API_UPDATE_PRIORITY({
            objCode: objCode,
            objAction: action
        });
        if (typeof api == 'object' && Object.keys(api).length && api.status == true) {
            await initObject();
        }
    }

  

    async function handleSync(objCode, priority, index) {
        let newObject = objects;
        objects.map((o, i) => {
            objects[i]['sync'] = false;
        })
        newObject[index]['sync'] = !newObject[index]['sync'];
        console.log(sync, index)
        if (typeof sync != 'undefined' && sync != undefined && sync != '' && sync != priority) {
            console.log('change');
            console.log(sync, index)
            let changeLayer = await API_UPDATE_PRIORITY({
                objCode: objCode,
                objAction: 'change',
                prev: sync,
                next: priority
            });
            if (typeof changeLayer == 'object' && changeLayer.status) {
                initObject();
            }
            setSync('');
        } else {
            setSync(priority);
        }
        setObjects([...newObject]);
        // setSync(true);
    }
    useEffect(() => {
        if (objects.length) {
            // console.log(objects)
        }
    }, [objects])
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'md'} >
            <DialogTitle>
                Edit Layer
            </DialogTitle>
            <DialogContent dividers>
                {/* <span className='text-red-500'> ! บนสุดอยู่หลัง</span> */}
                {
                    loading ? <Stack><CircularProgress /><span>กำลังโหลดข้อมูล ...</span></Stack> : (
                        <Table size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Layer</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Sub Title</TableCell>
                                    <TableCell>#</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    objects.map((oObj, iObj) => {
                                        return <TableRow key={iObj}>
                                            <TableCell>{oObj.objPriority}</TableCell>
                                            <TableCell>{oObj.objType}</TableCell>
                                            <TableCell>{oObj.objCode}</TableCell>
                                            <TableCell>{oObj.objTitle != '' ? oObj.objTitle : '-'}</TableCell>
                                            <TableCell>{oObj.objSubtitle != '' ? oObj.objSubtitle : '-'}</TableCell>
                                            <TableCell>
                                                <ButtonGroup
                                                    disableElevation
                                                    variant="outlined"
                                                    aria-label="Disabled button group"
                                                >
                                                    <Button startIcon={<ArrowUpwardIcon />} color='success' onClick={() => handlePriority(oObj.objCode, 'up')}></Button>
                                                    <Button startIcon={<ArrowDownwardIcon />} color='error' onClick={() => handlePriority(oObj.objCode, 'down')}></Button>
                                                    <Button variant={`${sync == oObj.objPriority ? 'contained' : 'outlined'}`} startIcon={<SyncIcon className={`${oObj?.sync ? 'animate-spin' : ''}`} />} onClick={() => handleSync(oObj.objCode, oObj.objPriority, iObj)}></Button>
                                                  
                                                    <Button startIcon={<ArrowUpwardIcon/>} variant='contained' color='success' onClick={() => handlePriority(oObj.objCode,'front')}>บนสุด</Button>
                                                    <Button  startIcon={<ArrowDownwardIcon/>} variant='contained' color='error' onClick={() => handlePriority(oObj.objCode,'back')}>ล่างสุด</Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => close(false)}>ปิดหน้าต่าง</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogEditPriority