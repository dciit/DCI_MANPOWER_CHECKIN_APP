import { Card, CardHeader, CircularProgress, Avatar, IconButton, CardContent, Typography, Divider, Stack, Table, TableHead, TableBody, TableRow, TableCell, Grid, CardActions, Button, Badge, Box, CardMedia, Skeleton, Select, MenuItem } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CardObjMQ from './CardObjMQ';
import CardObjSA from './CardObjSA';
import { API_EDIT_OBJECT, API_GET_OBJECT_BY_CODE, API_MAN_SKILL, API_UPLOAD_FILE } from '../../Service';
import moment from 'moment';
import { useSelector } from 'react-redux';
function CardPositionEmployee(props) {
    const { data } = props;
    const [obj, setObj] = useState(data);
    const [loading, setLoading] = useState(true);
    const [manskill, setManskill] = useState();
    const refImg = useRef(null);
    let defaultImg = 'http://dciweb.dci.daikin.co.jp/dcimanpower/upload/default.jpg';
    let login = useSelector(state => state.reducer.login);
    useEffect(() => {
        init();
    }, []);
    async function init() {
        await initObj();
        await fnManSkill();
    }
    async function setImage(path) {
        setTimeout(() => {
            try{
                refImg.current.src = path != '' ? `${path}?${Math.random()}` : defaultImg;
            }catch (e){
                console.log(e.message)
            }
        }, 1000);
    }
    async function fnManSkill() {
        let apiManSkill = await API_MAN_SKILL({ objCode: data.objCode });
        setManskill(apiManSkill);
        setLoading(false)
    }
    async function handleUploadImage(e) {
        let file = e.target.files[0];
        let upload = await API_UPLOAD_FILE({ files: file, fac: data.factory, line: data.line, objCode: data.objCode });
        if (upload != null && typeof upload == 'object' && Object.keys(upload).length) {
            await initObj();
        }
    }
    async function initObj() {
        console.log(data)
        let res = await API_GET_OBJECT_BY_CODE({ objCode: data.objCode });
        if (res != null && typeof res == 'object' && Object.keys(res).length) {
            setObj(res[0]);
            setImage(res[0].objPicture);
        } else {
            setImage(defaultImg);
        }
    }

    async function handleChangePosition(param) {
        let res = await API_EDIT_OBJECT(param);
        if (typeof res == 'object' && res.status == true) {
            setObj({ ...obj, objPosition: param.objPosition });
        }
    }
    return (
        <Card variant="outlined">
            <CardHeader title="ข้อมูลพื้นที่ปฎิบัติงาน" className='px-3 py-2 pb-1 text-center' />
            <Divider />
            <CardContent >
                <Card >
                    <Grid container spacing={1} p={1}>
                        {
                            login
                        }
                        <Grid item xs={6}>
                            <Stack className='cursor-pointer ' gap={1}>
                                <img ref={refImg} className='w-[100%]  min-h-[200px] rounded-md' />
                                {
                                    (typeof login == 'boolean' && login == true) && <input type="file" accept='image/png, image/jpg, image/jpeg*' onClick={(e) => { e.currentTarget.value = null }} onChange={handleUploadImage} multiple={true} />
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Table className='w-full' size='small'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={'35%'}>รหัส </TableCell>
                                        <TableCell className='font-sans font-semibold'> {data?.objCode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ชื่อ </TableCell>
                                        <TableCell className='font-sans font-semibold'> {data?.objTitle}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>รายละเอียด </TableCell>
                                        <TableCell className='font-sans font-semibold'> {(data?.objSubtitle != '' ? data?.objSubtitle : '-')}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>โรงงาน </TableCell>
                                        <TableCell className='font-sans font-semibold'> {`FAC${data?.factory}`}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ไลน์การผลิต </TableCell>
                                        <TableCell className='font-sans font-semibold'> {data?.line} ({data?.subLine})</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ตำแหน่ง </TableCell>
                                        {
                                            login == true ? <TableCell className='font-sans font-semibold'>
                                                <Select size='small' className='w-full' value={typeof obj.objPosition != 'undefined' ? obj.objPosition : ''} onChange={(e) => handleChangePosition({ ...data, objPosition: e.target.value })}>
                                                    {
                                                        [...Array("OP", 'FO', 'LE', 'QA', 'QC')].map((oPst, iPst) => {
                                                            return <MenuItem value={oPst}>{oPst}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </TableCell> : <TableCell className='font-semibold'> {data?.objPosition}</TableCell>
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                </Card>
                <Stack gap={2} mt={3}>
                    <CardObjMQ listMQ={data?.objMQ} data={data} />
                    <CardObjSA listSA={data?.objSA} data={data} />
                    <div className='h-[300px] overflow-auto'>
                        <Grid item xs={12}>
                            <Card className='select-none'>
                                <Grid container >
                                    <Grid item xs={12} py={2} px={2} className='bg-green-600'>
                                        <Stack spacing={1}>
                                            <span className='text-white font-semibold'>MANPOWER SKILLS</span>
                                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                                <div className='bg-white text-green-600 font-bold text-lg  shadow-lg px-3 py-1 rounded-lg'>{manskill?.counter != "00" ? manskill?.counter : "-"}</div>
                                                <span className='text-white'>จำนวนพนักงานที่สามารถปฎิบัติงานทดแทนได้</span>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid container >
                                        <table className='tbBorder'>
                                            <thead>
                                                <tr className='text-[14px]'>
                                                    <th className='text-[#464646] text-left pl-3 py-3' colspan={2} width={'40%'}>
                                                        <span>ชื่อ-สกุล</span>
                                                        <Divider orientation="vertical" flexItem />
                                                    </th>
                                                    <th className='text-left'>รายละเอียด</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    loading ? <tr>
                                                        <td colspan={3} className='p-3'>
                                                            <Stack alignItems={'center'}>
                                                                <CircularProgress />
                                                                <span>กำลังโหลดข้อมูล</span>
                                                            </Stack>
                                                        </td>
                                                    </tr> :
                                                        ((typeof manskill?.employees != 'undefined' && typeof manskill?.employees === 'object' && !Object.keys(manskill?.employees).length) ? <tr>
                                                            <td colspan={3} className='text-center py-3'>ไม่พบข้อมูล</td>
                                                        </tr> : (typeof manskill?.employees != 'undefined' && typeof manskill?.employees === 'object') && manskill.employees.map((oMs, iMs) => {
                                                            let join = moment(oMs?.join, 'YYYY-MM-DDTHH:mm:ss');
                                                            let now = moment();
                                                            let diff = moment.duration(now.diff(join));
                                                            let year = diff.asYears().toFixed(0);
                                                            let month = (diff.asMonths() - (year * 12)) > 1 ? diff.asMonths() - (year * 12) : 0;
                                                            month = Math.floor(month)
                                                            return <tr key={iMs} className='hover:scale-105 transition-all duration-300 cursor-pointer'>
                                                                <td className='w-[15%] py-3'>
                                                                    <div className='flex justify-center'>
                                                                        <Avatar alt="Remy Sharp" src={`http://dcidmc.dci.daikin.co.jp/PICTURE/${oMs.code}.jpg`} style={{ border: '1px solid #dfdfdf' }} />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='flex flex-col h-fit'>
                                                                        <span>{`${oMs.name}.${oMs.surn.substring(0, 1)}`}</span>
                                                                        <span className='text-[#3366ff] text-sm'>{oMs.code}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Stack className='text-xs' direction={'row'} spacing={1}>
                                                                        <span>อายุงาน : </span>
                                                                        <span className='text-[#3366ff]'>{year}</span>
                                                                        <span>ปี</span>
                                                                        {
                                                                            month > 1 && <>
                                                                                <span className='text-[#3366ff]'>{month}</span>
                                                                                <span >เดือน</span>
                                                                            </>
                                                                        }
                                                                    </Stack>
                                                                </td>
                                                            </tr>
                                                        }))
                                                }
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CardPositionEmployee