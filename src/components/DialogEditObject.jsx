import { Stack, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Select, MenuItem, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_DELETE_OBJECT, API_GET_OBJECT_INFO, API_UPDATE_OBJ, API_UPDATE_PRIORITY } from '../Service';
import { SketchPicker } from 'react-color';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import DeleteOutlined from '@ant-design/icons'
import { Button, Switch } from 'antd';
function DialogEditObject(props) {
    const { open, close, objCode, setObjCode } = props;
    const [object, setObject] = useState();
    useEffect(() => {
        if (open == true) {
            init();
        }
    }, [open]);
    async function init() {
        let ObjectCodeData = await API_GET_OBJECT_INFO({ objCode: objCode });
        if (ObjectCodeData != null && typeof ObjectCodeData != 'undefined' && ObjectCodeData.length) {
            setObject(ObjectCodeData[0]);
        }
    }
    // useEffect(() => {
    //     if (object != null && object != '' && Object.keys(object).length) {
    //         console.log(object)
    //     }
    // }, [object])
    async function handleDelete() {
        if (confirm('คุณต้องการลบ ใช่หรือไม่ ?')) {
            const del = await API_DELETE_OBJECT({ objCode: objCode });
            if (del.status) {
                document.querySelector(`#${objCode}`).remove();
                close(false);
            }
        }
    }
    function handleClose() {
        setObjCode('');
        close(false);
    }
    async function handleChangeFontColor(color) {
        let hex = color.hex;
        setObject({ ...object, objFontColor: hex })
    }

    async function handleChangeBackgroundColor(color) {
        let hex = color.hex;
        setObject({ ...object, objBackgroundColor: hex })
    }

    async function handleChangeBorderColor(color) {
        let hex = color.hex;
        setObject({ ...object, objBorderColor: hex })
    }
    async function handleSaveObj() {
        let save = await API_UPDATE_OBJ(object);
        if (save.status == true) {
            if (typeof save.obj != 'undefined' && Object.keys(save.obj).length) {
                location.reload();
            }
        }
    }
    async function handleSendToFrontToBack(action) {
        let apiSendToFront = await API_UPDATE_PRIORITY({
            objCode: object.objCode,
            objAction: action
        });
        if (typeof apiSendToFront.status != 'undefined' && apiSendToFront.status == true) {
            location.reload();
        }
    }
    return (

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md' >
            <DialogTitle>
                แก้ไขข้อมูล
            </DialogTitle>
            <DialogContent dividers  className='select-none'>
                <Grid container gap={2}>
                    <Grid item container xs={12} spacing={2}>
                        {/* <div className='pt-6 px-3 flex flex-col gap-2 justify-between'>
                            <span>การขยับ</span>
                            <div className='pl-3'>
                                <Switch checkedChildren="ขยับไม่ได้" unCheckedChildren="ขยับได้" checked = {true}/>
                            </div>
                        </div> */}
                        <Grid item xs={12}>
                            <Stack>
                                <Typography>Object Code</Typography>
                                <TextField disabled={true} size='small' type='text' value={object?.objCode} onChange={(e) => setObject({ ...object, objCode: e.target.value })} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack>
                                <Typography>Master Code</Typography>
                                <TextField disabled={true} size='small' type='text' value={object?.objMasterId} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack>
                                <Typography>Priority</Typography>
                                <TextField disabled={true} size='small' type='text' value={object?.objPriority} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack>
                                <Typography>Type</Typography>
                                {
                                    (typeof object?.objType == 'undefined') ? <Skeleton /> : <Select value={object?.objType} defaultValue={object?.objType} size='small' fullWidth onChange={(e) => setObject({ ...object, objType: e.target.value })}>
                                        {
                                            ["OTHER", "MP"].map((type, index) => {
                                                return <MenuItem value={type} key={index}>{type}</MenuItem>
                                            })
                                        }
                                    </Select>
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography>Title</Typography>
                                <TextField size='small' type='text' value={object?.objTitle} onChange={(e) => setObject({ ...object, objTitle: e.target.value })} />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography>Sub Title</Typography>
                                <TextField size='small' type='text' value={object?.objSubtitle} onChange={(e) => setObject({ ...object, objSubtitle: e.target.value })} />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography>ความกว้าง (Width)</Typography>
                                <TextField size='small' type='number' value={object?.objWidth} onChange={(e) => setObject({ ...object, objWidth: e.target.value })} />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography>ความสูง (Height)</Typography>
                                <TextField size='small' type='number' value={object?.objHeight} onChange={(e) => setObject({ ...object, objHeight: e.target.value })} />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography>ขนาดฟอนต์ (Font size)</Typography>
                                <TextField size='small' type='number' value={object?.objFontSize} onChange={(e) => setObject({ ...object, objFontSize: e.target.value })} />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography>ขนาดขอบ (ฺBorder Width)</Typography>
                                <TextField size='small' type='number' value={object?.objBorderWidth} onChange={(e) => setObject({ ...object, objBorderWidth: e.target.value })} />
                            </Stack>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography className='text-red-500'>สีตัวอักษร (Font Color)</Typography>
                                <SketchPicker color={`${object?.objFontColor}`} onChangeComplete={handleChangeFontColor} />
                            </Stack>
                        </Grid>

                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography className='text-red-500'>สีพื้นหลัง (Background Color)</Typography>
                                <SketchPicker color={`${object?.objBackgroundColor}`} onChangeComplete={handleChangeBackgroundColor} />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Typography className='text-red-500'>สีขอบ (ฺBorder Color)</Typography>
                                <SketchPicker color={`${object?.objBorderColor}`} onChangeComplete={handleChangeBorderColor} />
                            </Stack>
                        </Grid>
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type='primary' icon={<FlipToFrontIcon />} onClick={() => handleSendToFrontToBack('back')}>ย้ายไปหน้าสุด</Button>
                <Button type='primary' icon={<FlipToBackIcon />} onClick={() => handleSendToFrontToBack('front')}>ย้ายไปหลังสุด</Button>
                <Button type='primary' icon={<SaveAltIcon />} onClick={handleSaveObj}>บันทึก</Button>
                <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDelete()} startIcon={<DeleteOutlineIcon />}>ลบ</Button>
                <Button onClick={handleClose}>ปิดหน้าต่าง</Button>
            </DialogActions>
        </Dialog>

    )
}

export default DialogEditObject