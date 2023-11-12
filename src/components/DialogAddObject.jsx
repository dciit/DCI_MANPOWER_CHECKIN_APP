import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Select, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux'
import { API_ADD_OBJECT, API_DELETE_OBJECT, API_GET_MASTER, API_GET_OBJECT_BY_CODE, API_UPDATE_POSITION_OBJ } from '../Service'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save';
function DialogAddObject(props) {
    const { open, close } = props;
    const [loading, setLoading] = useState(false);
    const layoutSelected = useSelector(state=>state.reducer.layoutFilter)
    let coord = null;
    let offset = null;
    let selectedElement = null;
    const ThemeTrue = {
        bg: ['yellow', '#bba17a', '#b88a45'],
        text: '#333333'
    }
    const ThemeFalse = {
        bg: ['#fff', '#6d1803', '#6d210f'],
        text: 'white'
    }
    const [object, setObject] = useState({
        layoutCode: '',
        objType: "MP",
        objTitle: "",
        objSubTitle: "",
        objX: 0,
        objY: 0
    });
    const [masters, setMasters] = useState([]);
    const [masterSelected, setMasterSelected] = useState('');
    useEffect(() => {
        if (open) {
            init();
        }
    }, [open])

    async function init() {
        const listMaster = await API_GET_MASTER();
        if (masterSelected == '') {
            setMasterSelected(listMaster[0].objMasterId)
        }
        setMasters(listMaster);
    }

    async function handleAddObject() {
        setLoading(true);
        const res = await API_ADD_OBJECT({
            ...object, objMasterId: masterSelected, layoutCode: layoutSelected?.layoutCode
        });
        if (res.status == "1") {
            const getObject = await API_GET_OBJECT_BY_CODE({ objCode: res.msg });
            let svgContent = document.querySelector("#svgContent");
            let svg = '';
            getObject.map((elObj) => {
                svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                let i = 0;
                if (elObj.objSvg.includes('animateMotion')) {
                    const itemSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    elObj.objSvg = elObj.objSvg.replace("<defs>", "");
                    elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
                    elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);

                    elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);
                    elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);

                    (elObj.mq == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                        elObj.objSvg = elObj.objSvg.replace(`{bgmq}`, theme);
                    });
                    (elObj.sa == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                        elObj.objSvg = elObj.objSvg.replace(`{bgsa}`, theme);
                    });
                    (elObj.ot == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                        elObj.objSvg = elObj.objSvg.replace(`{bgot}`, theme);
                    });
                    elObj.objSvg = elObj.objSvg.replace("{empImage}", elObj.empImage);
                    itemSvg.innerHTML = elObj.objSvg;
                    itemSvg.setAttribute('id', elObj.objCode);
                    itemSvg.setAttribute('x', elObj.objX);
                    itemSvg.setAttribute('y', elObj.objY);
                    // itemSvg.addEventListener('click', function () {
                    //     // setOpenCheckIn(true);
                    // })
                    svg.appendChild(itemSvg);
                } else {
                    const blob = new Blob([elObj.objSvg], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                    use.setAttribute('href', url + '#' + elObj.objMasterId);
                    use.setAttribute('id', elObj.objCode);
                    use.setAttribute('x', elObj.objX);
                    use.setAttribute('y', elObj.objY);
                    // use.addEventListener('click', function () {
                    //     if (elObj.objType == 'MP') {
                    //         setOpenCheckIn(true);
                    //     }
                    // })
                    svg.appendChild(use);
                }
                initDrag(svgContent, svg);
            });
            setLoading(false);
        } else {
            alert('ไม่สามารถเพิ่ม Object ได้ !');
            setLoading(false);
        }


    }
    const initDrag = async (content, svg) => {
        svg.addEventListener('mousedown', startDrag);
        svg.addEventListener('mousemove', moveDrag);
        svg.addEventListener('mouseup', endDrag);
        svg.addEventListener('mouseleave', leaveDrag);
        svg.addEventListener('dblclick', dbClick);
        content.appendChild(svg);
    }
    const dbClick = async (evt) => {
        if (confirm('คุณต้องการลบ ใช่หรือไม่ ?')) {
            let id = evt.target.getAttribute("id");
            const del = await API_DELETE_OBJECT({ objCode: id });
            if (del.status) {
                document.querySelector(`#${id}`).remove();
            }
        }
    }
    function leaveDrag(evt) {
        evt.target.classList.remove('draggable');
        let eqpId = evt.target.lastElementChild.id;
        document.querySelector(`use#${eqpId}`).classList.remove('draggable')
    }
    function startDrag(evt) {
        evt.target.classList.add('draggable');
        selectedElement = evt;
        if (selectedElement.target.classList.contains('draggable')) {
            offset = getMousePosition(selectedElement);
            offset.x -= parseFloat(selectedElement.target.getAttributeNS(null, "x"));
            offset.y -= parseFloat(selectedElement.target.getAttributeNS(null, "y"));
        }
    }
    function moveDrag(evt) {
        selectedElement = evt;
        if (selectedElement.target.classList.contains('draggable')) {
            selectedElement.preventDefault();
            coord = getMousePosition(selectedElement);
            selectedElement.target.setAttributeNS(null, "x", coord.x - offset.x);
            selectedElement.target.setAttributeNS(null, "y", coord.y - offset.y);
        }
    }
    async function endDrag(evt) {
        selectedElement = evt;
        let objCode = selectedElement.target.getAttribute("id");
        let axisX = coord.x - offset.x;
        let axisY = coord.y - offset.y;
        if (selectedElement != null) {
            const res = await API_UPDATE_POSITION_OBJ({
                objCode: objCode,
                objX: axisX,
                objY: axisY
            });
        }
        if (selectedElement != null) {
            selectedElement.target.classList.remove('draggable')
        }
        if (objCode != null) {
            document.querySelector(`use#${objCode}`).classList.remove('draggable')
        }
        evt.target.classList.remove('draggable')
        selectedElement = null;
    }
    function getMousePosition(evt) {
        var CTM = evt.target.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }
    const handleClose = () => {
        close(false)
    }
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            <DialogTitle className='px-6 pt-4 pb-3' id="customized-dialog-title">
                ADD OBJECT
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stack >
                    <Typography variant="h5" component="div">Layout</Typography>
                    <Typography color="text.secondary" className='pl-3'>
                        พื้นที่ที่คุณกำลังใช้งาน
                    </Typography>
                </Stack>
                <Stack mt={1} mb={0} gap={2}>
                    <TextField
                        label="Layout Selected"
                        placeholder="กรุณากรอก Master Name "
                        disabled
                        variant='filled'
                        value={`${layoutSelected?.layoutCode } (${layoutSelected?.layoutName })`}
                    />
                    <Stack mb={3}>
                        <Stack mb={1}>
                            <Typography variant="h5" component="div">Master List</Typography>
                            <Typography color="text.secondary">
                                กรุณาเลือก Master ที่ต้องการ
                            </Typography>
                        </Stack>
                        {
                            masters.length ? <Select value={masterSelected} onChange={(e) => setMasterSelected(e.target.value)} size='small'>
                                {
                                    masters.map((master, index) => {
                                        return <MenuItem value={master.objMasterId} key={index}>{master.mstName} ({master.objMasterId})</MenuItem>
                                    })
                                }
                            </Select> : <Skeleton variant='rectangular' height={50} />
                        }
                    </Stack>
                </Stack>
                <Divider />
                {
                    masters.length ? <Card >
                        <CardContent className='p-3'>
                            <Stack mt={1} mb={0} gap={2}>
                                <Stack mb={3}>
                                    <Stack mb={1}>
                                        <Typography variant="h5" component="div">Object Detail</Typography>
                                        <Typography color="text.secondary">
                                            กรุณากรอกข้อมูล Object ที่คุณต้องการ
                                        </Typography>
                                    </Stack>
                                    <Stack p={1}>
                                        <Typography color={'text.secondary'}>Title</Typography>
                                        <TextField size='small' placeholder='กรุณากรอกชื่อ' value={object.objTitle ?? ''} onChange={(e) => setObject({ ...object, objTitle: e.target.value })}></TextField>
                                    </Stack>
                                    <Stack p={1}>
                                        <Typography color={'text.secondary'}>SubTitle</Typography>
                                        <TextField size='small'  placeholder='กรุณากรอกรายละเอียด' value={object.objSubTitle ?? ''} onChange={(e) => setObject({ ...object, objSubTitle: e.target.value })}></TextField>
                                    </Stack>
                                    <Grid container >
                                        <Grid item xs={12} gap={1} p={1}>
                                            <Typography color={'text.secondary'}>Object Type</Typography>
                                            <Select value={object.objType} defaultValue='OTHER' size='small' fullWidth onChange={(e) => setObject({ ...object, objType: e.target.value })}>
                                                {
                                                    [ "OTHER","MP"].map((type, index) => {
                                                        return <MenuItem value={type} key={index}>{type}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card> : <Skeleton variant='rectangular' height={380} />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)} >ปิดหน้าต่าง</Button>
                <LoadingButton loading={loading ? true : false} loadingPosition='start' startIcon={<SaveIcon />} onClick={handleAddObject} variant='contained'>เพิ่ม</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddObject