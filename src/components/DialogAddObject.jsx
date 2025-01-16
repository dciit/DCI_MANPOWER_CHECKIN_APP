import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Autocomplete, Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Select, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux'
import { API_DELETE_OBJECT, API_GET_MASTER, API_GET_OBJECT_BY_CODE, API_UPDATE_POSITION_OBJ, API_ADD_OBJECT, API_GET_LAYOUT } from '../Service'
import { LoadingButton } from '@mui/lab'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
function DialogAddObject(props) {
    const { open, close } = props;
    const [loading, setLoading] = useState(false);
    const [layout, setLayout] = useState([]);
    const layoutSelected = useSelector(state => state.reducer.layoutFilter);
    const [layoutSelectedOption, setLayoutSelectedOption] = useState('');
    let coord = null;
    let offset = null;
    let selectedElement = null;
    const [object, setObject] = useState({
        layoutCode: '',
        objType: "OTHER",
        objTitle: "",
        objSubTitle: "",
        objX: 0,
        objY: 0,
        objWidth: 0,
        objHeight: 0
    });
    const [masters, setMasters] = useState([]);
    const [masterSelected, setMasterSelected] = useState('');
    const [masterSelectOption, setMasterSelectOption] = useState({});
    const [loadMaster, setLoadMaster] = useState(true);
    useEffect(() => {
        if (open) {
            setLoading(false);
            init();
        }
    }, [open])

    async function init() {
        setLoadMaster(true);
        getMaster();
    }
    async function getMaster() {
        const listMaster = await API_GET_MASTER('', layoutSelectedOption);
        if (masterSelected == '') {
            setMasterSelected(listMaster[0].objMasterId);
            let oOption = listMaster.filter(x => x.objMasterId == listMaster[0].objMasterId);
            if (oOption.length) {
                setMasterSelectOption({ label: `${oOption[0].mstName} (${oOption[0].objMasterId})`, value: oOption[0].objMasterId });
                setObject({ ...object, objCode: oOption[0].objMasterId })
            }
        } else {
            let oOption = masters.filter(x => x.objMasterId == masterSelected);
            if (oOption.length) {
                setMasterSelectOption({ label: `${oOption[0].mstName} (${oOption[0].objMasterId})`, value: oOption[0].objMasterId });
                setObject({ ...object, objCode: oOption[0].objMasterId })
            }
        }
        if (listMaster.length == 0) {
            setMasterSelectOption(null);
        }
        setMasters(listMaster);
        setLoadMaster(false);
    }

    useEffect(() => {
        getMaster();
    }, [layoutSelectedOption])

    useEffect(() => {
        getLayout()
    }, [masters])

    async function getLayout() {
        let apiGetLayout = await API_GET_LAYOUT();
        setLayout(apiGetLayout);
    }

    async function handleAddObject() {
        try {
            setLoading(true);
            console.log(object)
            if (typeof object.objMasterId == 'undefined' || object.objMasterId == '') {
                alert('กรุณาเลือก ตัวเลือก (Master) !');
                setLoading(false);
                return false;
            }
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
                        svg.appendChild(itemSvg);
                    } else {
                        let title = elObj.objTitle;
                        elObj.objSvg = elObj.objSvg.replace("{objName}", title);
                        const itemSvg = document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "svg"
                        );
                        itemSvg.innerHTML = elObj.objSvg;
                        if (elObj.objSvg.includes("svgTxtTitleMsg") || elObj.objSvg.includes("WidthFollowText")) {
                            let bgTitle = itemSvg.querySelectorAll('svg#bgTitle');
                            let bgTitleReact = itemSvg.querySelectorAll('rect.svgTxtTitleBg');
                            let areaFree = document.getElementById('bg')
                            let iSpan = document.createElement('span');
                            iSpan.innerHTML = elObj.objTitle;
                            iSpan.setAttribute('refId', elObj.objCode)
                            iSpan.style.fontSize = '10px'
                            areaFree.appendChild(iSpan)
                            let oSpanAgain = areaFree.querySelector(`span[refid=${elObj.objCode}]`);
                            let spanWidth = oSpanAgain.offsetWidth;
                            oSpanAgain.remove();
                            let width = Math.ceil(parseInt(spanWidth)) + 50;
                            bgTitle[0].setAttribute('width', width);
                            bgTitleReact[0].setAttribute('width', width);
                        }
                        const blob = new Blob([itemSvg.innerHTML], { type: 'image/svg+xml' });
                        const url = URL.createObjectURL(blob);
                        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                        use.setAttribute('href', url + '#' + elObj.objMasterId);
                        use.setAttribute('id', elObj.objCode);
                        use.setAttribute('x', elObj.objX);
                        use.setAttribute('y', elObj.objY);
                        svg.appendChild(use);
                    }
                    initDrag(svgContent, svg);
                });
                setLoading(false);
            } else {
                alert('ไม่สามารถเพิ่ม Object ได้ !');
                setLoading(false);
            }
        } catch {
            setLoading(false)
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
    function startDrag(e) {
        if (e.which == 1) {
            e.target.classList.add('draggable');
            selectedElement = e;
            if (selectedElement.target.classList.contains('draggable')) {
                offset = getMousePosition(selectedElement);
                offset.x -= parseFloat(selectedElement.target.getAttributeNS(null, "x"));
                offset.y -= parseFloat(selectedElement.target.getAttributeNS(null, "y"));
            }
        } else if (e.which == 3) {
            document.addEventListener('contextmenu', e => e?.cancelable && e.preventDefault());
            let id = e.target.getAttribute("id");
            setObjCodeEdit(id);
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
                <div className='flex gap-2 flex-row items-center'>
                    <div className='rounded-full bg-[#5c5fc8] text-[#fff]  w-[36px] h-[36px] flex items-center justify-center'>
                        <Brightness1OutlinedIcon sx={{ fontSize: '20px' }} />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[18px]'>SELECT OBJECT</span>
                        <span className='text-[12px] text-[#939393]'>เลือกชิ้นงานลงพื้นที่</span>
                    </div>
                </div>
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
                        value={`${layoutSelected?.layoutCode} (${layoutSelected?.layoutName})`}
                    />
                    <Stack gap={1}>
                        <div className='border rounded-lg p-6 flex flex-col gap-2'>
                            <div className='text-[#5c5fc8] text-[14px]  '>
                                เครื่องมือค้นหา
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span>พื้นที่ของตัวเลือก (Layout)</span>
                                <Select className='w-full' size='small' value={layoutSelectedOption} onChange={(e) => {
                                    setLayoutSelectedOption(e.target.value);
                                    setObject({ ...object, objMasterId: e.target.value });
                                }}>
                                    {
                                        [{ layoutCode: 'ALL', layoutName: '--------------- ทั้งหมด --------------' }, ...layout].map((o, i) => {
                                            return <MenuItem key={i} value={o.layoutCode}>{`${o.layoutName} ${o.layoutCode != 'ALL' ? `(${o.layoutCode})` : ''}`}</MenuItem>
                                        })
                                    }
                                </Select>
                            </div>

                        </div>

                    </Stack>
                    <div className='flex flex-col gap-1 border rounded-lg p-6 mb-6'>
                        <div className='text-[#5c5fc8] text-[14px]  '>
                            ตัวเลือกที่ต้องการเพิ่มเข้าพื้นที่
                        </div>
                        {
                            loadMaster ? <Skeleton variant='rectangular' height={50} /> : <Autocomplete
                                size='small'
                                className='w-full'
                                disablePortal
                                id="combo-box-demo"
                                value={masterSelectOption}
                                options={masters.map((o) => {
                                    return { label: (`${o.mstName} (${o.objMasterId})`), value: o.objMasterId }
                                })}
                                onChange={(event, newValue) => {
                                    if (newValue != null) {
                                        setMasterSelected(newValue.value);
                                        let oMaster = masters.filter(x => x.objMasterId == newValue.value);
                                        if (oMaster.length > 0) {
                                            setMasterSelectOption({ label: (`${oMaster[0].mstName} (${oMaster[0].objMasterId})`), value: newValue.value })
                                        }
                                        setObject({ ...object, objCode: newValue.value })
                                    } else {
                                        setMasterSelected('');
                                        setMasterSelectOption(null)
                                        setObject({ ...object, objCode: '' })
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        }
                        {
                            loadMaster ? <Skeleton variant='rectangular' height={380} /> : <Stack mt={1} mb={0} gap={1}>
                                <Stack mb={3}>
                                    <Stack mb={1}>
                                        <div className='text-[#5c5fc8] text-[14px]  '>
                                            รายละเอียดตัวเลือก
                                        </div>
                                    </Stack>
                                    <Stack p={1}>
                                        <Typography color={'text.secondary'}>ชื่อ</Typography>
                                        <TextField size='small' placeholder='กรุณากรอกชื่อ' value={object.objTitle ?? ''} onChange={(e) => setObject({ ...object, objTitle: e.target.value })}></TextField>
                                    </Stack>
                                    <Stack p={1}>
                                        <Typography color={'text.secondary'}>รายละเอียด</Typography>
                                        <TextField size='small' placeholder='กรุณากรอกรายละเอียด' value={object.objSubTitle ?? ''} onChange={(e) => setObject({ ...object, objSubTitle: e.target.value })}></TextField>
                                    </Stack>
                                    <Grid container >
                                        <Grid item xs={12} p={1}>
                                            <Typography color={'text.secondary'}>ประเภท</Typography>
                                            <Select value={object.objType} defaultValue='OTHER' size='small' fullWidth onChange={(e) => setObject({ ...object, objType: e.target.value })}>
                                                {
                                                    ["OTHER", "MP"].map((type, index) => {
                                                        return <MenuItem value={type} key={index}>{type}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack p={1}>
                                                <Typography color={'text.secondary'}>ความกว้าง</Typography>
                                                <TextField type='number' size='small' placeholder='กรุณาระบุความกว้างของชิ้นงาน' value={object.objWidth} onChange={(e) => setObject({ ...object, objWidth: e.target.value != '' ? parseFloat(e.target.value) : 0 })}></TextField>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack p={1}>
                                                <Typography color={'text.secondary'}>ความสูง</Typography>
                                                <TextField type='number' size='small' placeholder='กรุณาระบุความสูงของชิ้นงาน' value={object.objHeight} onChange={(e) => setObject({ ...object, objHeight: e.target.value != '' ? parseFloat(e.target.value) : 0 })}></TextField>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        }
                    </div>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)} variant='outlined' className='border-[#5c5fc8] text-[#5c5fc8]'>ปิดหน้าต่าง</Button>
                <LoadingButton loading={loading ? true : false} className='bg-[#5c5fc8]' loadingPosition='start' startIcon={<SaveAltOutlinedIcon />} onClick={handleAddObject} variant='contained'>เพิ่ม</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAddObject