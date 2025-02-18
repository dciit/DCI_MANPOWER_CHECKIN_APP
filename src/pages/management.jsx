import React, { Fragment, useEffect, useState } from 'react'
import { API_GET_MQ, API_GET_MQSA_BY_CODE, API_GET_OBJECT_BY_CODE, API_GET_OBJECT_INFO, API_GET_OBJECT_OF_LAYOUT, API_MANAGEMENT_LIST } from '../Service';
import { Box, Card, CardContent, Grid, Paper, Tab, Tabs, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack, ListItem, List, Divider, IconButton, Select, MenuItem, CircularProgress } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
function Management() {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const redux = useSelector((state) => state.reducer)
    const navigate = useNavigate();
    const [once, setOnce] = useState(true);
    const [fac, setFac] = useState((redux?.tabs == undefined || redux?.tabs?.fac == undefined) ? '1' : redux.tabs.fac);
    const [layout, setLayout] = useState([]);
    const [obj, setObj] = useState([]);
    const [openMQSA, setOpenMQSA] = useState(false);
    const [objCode, setObjCode] = useState('');
    const [objSelect, setObjSelect] = useState({});
    const [mq, setMq] = useState([]);
    const [sa, setSA] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [layouts, setLayouts] = useState([]);
    const handleChange = async (_, newFac) => {
        setFac(newFac);
        dispatch({ type: 'SET_TAB_FAC', payload: newFac })
        // await reObjByLayout();
    };
    useEffect(() => {
        if (once) {
            init();
        }
    }, [once, fac]);
    // useEffect(() => {
    //     initData();
    // }, [fac])
    // async function reObjByLayout() {
    //     console.log(layout)
    //     setObj(layout.filter((v, k) => v.factory == fac))
    // }
    async function init() {
        var RESGetLayoutOfFac = await API_MANAGEMENT_LIST({ factory: fac });
        setLayouts(RESGetLayoutOfFac);
    }
    async function initData() {
        console.log(fac)
        var listFactory = await API_MANAGEMENT_LIST({ factory: fac });
        console.log(listFactory)
        setLayout(listFactory);
    }
    async function handleOpenMQSA(code) {
        setObjCode(code);
        setOpenMQSA(true);
    }
    async function handleCloseMQSA() {
        setOpenMQSA(false);
    }
    const [value, setValue] = React.useState('1');
    const handleChangeMQSA = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        initMQSA();
    }, [openMQSA])
    useEffect(() => {
        setLoading(false);
    }, [layout])
    async function initMQSA() {
        var apiObj = await API_GET_OBJECT_INFO({ objCode: objCode });
        if (typeof apiObj == 'object' && Object.keys(apiObj).length) {
            setObjSelect(apiObj[0]);
        }
        var listMQSA = await API_GET_MQSA_BY_CODE({ searchCode: objCode, searchType: "MQ" });
        setMq(listMQSA.filter((v, k) => v.dictType == 'MQ'));
        setSA(listMQSA.filter((v, k) => v.dictType == 'SA'));
    }
    async function handleOpenLayout(v) {
        navigate(`../${VITE_PATH}/view/${v.layoutCode}`)
    }
    async function handleOpenEdit() {
        navigate(`../${VITE_PATH}/edit`);
    }
    return (
        <div className='p-6'>
            <div className='flex flex-col gap-3 items-end'>
                <Button type='primary' icon={<AutoAwesomeMosaicIcon />} className='w-fit' onClick={handleOpenEdit}>จัดการตำแหน่งจุดเช็คอิน</Button>
                <Paper className='w-[100%]'>
                    <TabContext value={fac}  >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} >
                                <Tab className='font-semibold' label="FACTORY 1" value="1" />
                                <Tab className='font-semibold' label="FACTORY 2" value="2" />
                                <Tab className='font-semibold' label="FACTORY 3" value="3" />
                                <Tab className='font-semibold' label="ODM" value="ODM" />
                            </TabList>
                        </Box>
                        {
                            loading ? <Stack><CircularProgress /><Typography>กำลังโหลดข้อมูล ...</Typography></Stack> :
                                <div className='py-2'>
                                    <table className='w-full'>
                                        <tbody>
                                            {
                                                layouts.length > 0 ?
                                                    layouts.map((o, i) => {
                                                        console.log(o)
                                                        return <tr key={i} >
                                                            <td className='pl-3 w-[20%]'>{o.layoutCode}</td>
                                                            <td className='font-semibold w-[30%]'>{o.layoutName}</td>
                                                            <td className='w-[50%] pr-3 text-right'><Button onClick={() => handleOpenLayout(o)} type='primary' icon={<SearchOutlined />}>ดูเพิ่มเติม</Button></td>
                                                        </tr>
                                                    })
                                                    : <tr><td colSpan={3} className='text-center'>ไม่พบข้อมูล</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            // [...Array(3)].map((iLoop, oLoop) => {
                            //     var index = (oLoop + 1).toString();
                            //     return <TabPanel key={oLoop} value={index} className='bg-[#f6f8fa]'> {
                            //         fac == index && <Grid container >
                            //             {
                            //                 Object.keys(layout).length ? layout.map((v, k) => {
                            //                     return <Grid item xs={12} sm={6} md={6} lg={3} key={k} onClick={() => handleOpenLayout(v)}>
                            //                         <Card className='cursor-pointer '>
                            //                             <CardContent >
                            //                                 <Stack>
                            //                                     <Typography variant='h4' >{v.layoutName}</Typography>
                            //                                     <Button variant='contained' startIcon={<SearchIcon />}>ดูรายละเอียด</Button>
                            //                                 </Stack>
                            //                             </CardContent>
                            //                         </Card>
                            //                     </Grid>
                            //                 }) : <Grid container>
                            //                     <div className='p-3 text-center'>
                            //                         <span>ไม่พบข้อมูล</span>
                            //                     </div>
                            //                 </Grid>
                            //             }
                            //         </Grid>
                            //     }</TabPanel>
                            // })
                        }
                    </TabContext>
                </Paper>
            </div>
            <Dialog open={openMQSA} onClose={handleCloseMQSA} fullWidth maxWidth='sm' >
                <DialogTitle >
                    <Typography>แก้ไขข้อมูล</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Paper>
                        <Box>
                            <Typography></Typography>
                        </Box>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                                <TabList onChange={handleChangeMQSA}>
                                    <Tab label="MQ" value="1" />
                                    <Tab label="SA" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Typography>{objSelect.objTitle} {objSelect.objCode}</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={9} >
                                        <Select size='small' fullWidth>
                                            <MenuItem>asds</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={3}  >
                                        <Button variant='contained' startIcon={<ControlPointIcon />} fullWidth className='h-full'>เพิ่ม MQ</Button>
                                    </Grid>
                                </Grid>
                                <Card variant="outlined" className='mt-3 p-3'>
                                    <List className='p-0'>
                                        {
                                            mq.map((oMq, iMq) => {
                                                return <ListItem key={iMq} className='cursor-pointer select-none py-0 px-3' >
                                                    <Stack direction={'row'} alignItems={'center'} >
                                                        <Typography className='font-semibold'>{oMq.dictCode}</Typography>
                                                        <IconButton color='error' onClick={() => handleMQDelete()}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </ListItem>
                                            })
                                        }
                                    </List>
                                </Card>
                            </TabPanel>
                            <TabPanel value="2">
                            </TabPanel>
                        </TabContext>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClose={handleCloseMQSA}>ปิดหน้าต่าง</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Management