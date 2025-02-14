import { Typography, Stack, Snackbar, Skeleton, Grid, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect } from 'react';
import { useState } from 'react';
import DialogAddMaster from '../../components/DialogAddMaster';
import DialogUpdateMaster from '../../components/DialogUpdateMaster';
import DialogAddObject from '../../components/DialogAddObject';
import DialogAddLayout from '../../components/DialogAddLayout';
import { useDispatch, useSelector } from 'react-redux';
import { API_GET_LAYOUT, API_GET_LAYOUT_DETAIL, API_GET_MASTER, API_GET_OBJECT_OF_LAYOUT, API_UPDATE_POSITION_OBJ } from '../../Service';
import DialogDetailEquipment from '../../components/DialogDetailEquipment';
import { useNavigate } from 'react-router';
import DialogEditObject from '../../components/DialogEditObject';
import DialogEditPriority from '../../components/DialogEditPriority';
import DialogSettingLayout from '../../components/dialog.setting.layout';
import DialogAddMP from '../../components/dialog.add.mp';
import { Select, Button } from 'antd';
import { HomeOutlined, InfoOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
function ManpowerEdit() {
    const VITE_PATH = import.meta.env.VITE_PATH;
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const navigate = useNavigate();
    const { vertical, horizontal, open } = state;
    const [openEdit, setOpenEdit] = useState(false);
    const [objCodeEdit, setObjCodeEdit] = useState('');
    const [openAddLayout, setOpenAddLayout] = useState(false);
    const [openAddObject, setOpenAddObject] = useState(false);
    const [openDetailEquipment, setOpenDetailEquipment] = useState(false);
    const [openUpdateMaster, setOpenUpdateMaster] = useState(false);
    const [openPriority, setOpenPriority] = useState(false);
    const [eqpIdDbClick, setEqpIdDbClick] = useState('');
    const [openAddMaster, setOpenAddMaster] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [draw, setDraw] = useState(true);
    const [openSettingLayout, setOpenSettingLayout] = useState(false);
    const dispatch = useDispatch();
    let coord = null;
    let offset = null;
    let selectedElement = null;
    let svgContent = '';
    const reduxLayout = useSelector(state => state.reducer?.layoutFilter);
    const [once, setOnce] = useState(true);
    const [layoutSelected, setLayoutSelected] = useState({});
    const [load, setLoad] = useState(true);
    const [openAddMP, setOpenAddMP] = useState(false);
    const [objects, setObjects] = useState([]);
    useEffect(() => {
        setLoad(true);
        if (once) {
            init();
            setOnce(false);
        }
    }, [once]);


    const getLayoutList = async () => {
        let APIGetLayouts = await API_GET_LAYOUT(); 
        setLayouts(APIGetLayouts);
    }
    async function GetLayoutDetail(layoutCode) {
        let oLayout = await API_GET_LAYOUT_DETAIL(layoutCode);
        setLayoutSelected(oLayout);
    }

    const init = async () => {
        await getLayoutList();
    }
    useEffect(() => {
        if (layouts.length) {
            let layoutCode = '';
            if (reduxLayout?.layoutCode != undefined && Object.keys(reduxLayout).length > 0) {
                layoutCode = reduxLayout.layoutCode;
            } else {
                layoutCode = layouts[0].layoutCode;
            }
            GetLayoutDetail(layoutCode)
        }
    }, [layouts])
    useEffect(() => {
        if (Object.keys(layoutSelected).length) {
            setLoad(true);
            var svgContent = document.querySelector("#svgContent");
            svgContent.innerHTML = '';
            try {
                if (layoutSelected != null && layoutSelected != undefined && Object.keys(layoutSelected).length) {
                    dispatch({ type: 'SET_LAYOUT_FILTER_SELECTED', payload: layoutSelected })
                    drawLayout();
                }
            } catch (e) {
                alert(e.message)
                setLoad(false);
            }
        }
    }, [layoutSelected])

    const openSnackbar = (newState) => () => {
        setState({ ...newState, open: true });
    };
    const handleClose = () => {
        setState({ ...state, open: false });
    };
    const drawLayout = async () => {
        const res = await drawObject();
        if (res) {
            let svgs = document.querySelectorAll('svg#svgContent svg');
            svgs.forEach((item) => {
                item.addEventListener('mousedown', startDrag);
                item.addEventListener('mousemove', moveDrag);
                item.addEventListener('mouseup', endDrag);
                item.addEventListener('mouseleave', leaveDrag);
            });
            setLoad(false);
        }
    }
    useEffect(() => {
        if (objCodeEdit != '') {
            setOpenEdit(true);
        }
    }, [objCodeEdit]);

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
        if (coord != '' && coord != null) {
            selectedElement = evt;
            let objCode = selectedElement.target.getAttribute("id");
            let axisX = coord.x - offset.x;
            let axisY = coord.y - offset.y;
            if (selectedElement != null) {
                console.log({
                    objCode: objCode,
                    objX: axisX,
                    objY: axisY
                })
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
    }
    function getMousePosition(evt) {
        var CTM = evt.target.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    const drawObject = async () => {
        const listMaster = await API_GET_MASTER();
        const object = await API_GET_OBJECT_OF_LAYOUT(layoutSelected);
        setObjects(object.map((o) => {
            return { ...o, draggable: false }
        }));
        svgContent = document.querySelector("#svgContent");
        svgContent.innerHTML = '';
        let svgMaster = '';
        let svg = '';
        object.map((elObj) => {
            let masterItem = listMaster.filter((elMaster) => {
                return elMaster.objMasterId == elObj.objMasterId
            })
            masterItem = masterItem.length ? masterItem[0] : {};
            svgMaster = masterItem.objSvg;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let title = elObj.objTitle;
            svgMaster = svgMaster.replace("{objName}", title);
            svgMaster = svgMaster.replace("{title}", elObj.eqpTitle);
            svgMaster = svgMaster.replace("{empcode}", elObj.empcode);
            svgMaster = svgMaster.replace("{title_color_bg}", elObj.empcode != '' ? 'green' : 'red');
            svgMaster = svgMaster.replace("{obj_man_skill}", '00');
            const itemSvg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );
            itemSvg.innerHTML = svgMaster;

            if (elObj.objSvg.includes("svgTxtTitle") && elObj.objSvg.includes("WidthFollowText")) {
                let textTitle = itemSvg.querySelectorAll('text');
                let bgTitle = itemSvg.querySelectorAll('svg#bgTitle');
                let bgTitleReact = itemSvg.querySelectorAll('rect.svgTxtTitleBg');
                let areaFree = document.getElementById('bg')
                let iSpan = document.createElement('span');
                iSpan.innerHTML = elObj.objTitle;
                iSpan.setAttribute('refId', elObj.objCode);
                iSpan.style.fontSize = `${elObj.objFontSize}px`
                areaFree.appendChild(iSpan)
                let oSpanAgain = areaFree.querySelector(`span[refid=${elObj.objCode}]`);
                let spanWidth = oSpanAgain.offsetWidth;
                oSpanAgain.remove();
                let width = Math.ceil(parseInt(spanWidth)) + 50;
                if (textTitle.length > 0) {
                    textTitle[0].setAttribute('fill', elObj.objFontColor);
                }
                if (Object.keys(bgTitle).length) {
                    bgTitle[0].setAttribute('width', width);
                    bgTitleReact[0].setAttribute('width', width);
                    bgTitleReact[0].style.strokeWidth = elObj.objBorderWidth;
                    bgTitleReact[0].style.stroke = elObj.objBorderColor != '' ? elObj.objBorderColor : '#000000';
                    bgTitleReact[0].style.fill = elObj.objBackgroundColor != '' ? elObj.objBackgroundColor : '#ffffff';
                }
            }
            else if (elObj.objSvg.includes("svgTxtBigTitle")) {
                let bgTitle = itemSvg.querySelectorAll('svg#bgTitle');
                let bgTitleReact = itemSvg.querySelectorAll('rect.svgTxtBigTitleBg');
                let areaFree = document.getElementById('bg')
                let iSpan = document.createElement('span');
                iSpan.innerHTML = elObj.objTitle;
                iSpan.setAttribute('refId', elObj.objCode)
                areaFree.appendChild(iSpan)
                let oSpanBuffer = areaFree.querySelector(`span[refid=${elObj.objCode}]`);
                // oSpanBuffer.styl
                let spanWidth = oSpanBuffer.offsetWidth;
                oSpanBuffer.remove();
                let len = elObj.objTitle.length;
                let width = Math.ceil(parseInt(spanWidth)) + (len < 20 ? 100 : 115);
                if (Object.keys(bgTitle).length) {
                    bgTitle[0].setAttribute('width', width);
                    bgTitleReact[0].setAttribute('width', width);
                }
            }

            // IF BAGKGROUND SET WIDTH & HEIGHT
            if (elObj.objSvg.includes('bg-set')) {
                let BgParent = itemSvg.querySelector('#bgTitle');
                let BGChild = BgParent.querySelector('rect');
                let svgChild = itemSvg.querySelector('g>svg');
                BGChild.setAttribute('width', elObj.objWidth);
                BGChild.setAttribute('height', elObj.objHeight);
                BGChild.setAttribute('fill', elObj.objBackgroundColor != '' ? elObj.objBackgroundColor : 'blue');
                BGChild.setAttribute('stroke', elObj.objBorderColor != '' ? elObj.objBorderColor : 'black')
                BGChild.setAttribute('stroke-width', elObj.objBorderWidth);
                svgChild.setAttribute('width', elObj.objWidth);
                svgChild.setAttribute('height', elObj.objHeight);
            }
            // END 
            const blob = new Blob([itemSvg.innerHTML], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use.setAttribute('href', url + '#' + elObj.objMasterId);
            use.setAttribute('id', elObj.objCode);
            use.setAttribute('x', elObj.objX);
            use.setAttribute('y', elObj.objY);
            svg.appendChild(use);
            svgContent.appendChild(svg);
        });
        return true;
    }

    function ChangeLayout(layoutCode) {
        let index = layouts.findIndex(el => el.layoutCode == layoutCode);
        setLayoutSelected(layouts[index]);
    }
    return (
        <div className=' bg-white flex  '>
            <div className='bg-[#f9f9f9] w-full p-3'>
                <Stack direction={'column'} alignItems={'end'} mb={2}>
                    <Button type='primary' icon={<HomeOutlined />} className='min-w-[10em]' onClick={() => navigate(`../${VITE_PATH}/management`)}>หน้าหลัก</Button>
                </Stack>
                <div className='bg-white rounded-xl shadow-xl h-full p-6'>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className='flex flex-row justify-between'>
                                <div className='flex gap-2'>
                                    <GridViewIcon /><div>ระบบจัดการจุดปฎิบัติงาน</div>
                                </div>
                                <div>
                                    <CloseOutlinedIcon className='text-[#bbb]' />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={'row'} pb={2} pt={1} gap={2} alignItems={'center'}>
                                <Typography className=''>พื้นที่</Typography>
                                {
                                    layouts.length ? <Select disabled={load} showSearch className='w-full' value={layoutSelected?.layoutCode} options={layouts.map((layout) => ({ label: layout.layoutName, value: layout.layoutCode }))} onChange={(e) => ChangeLayout(e)} optionRender={({ label, value }) => {
                                        return <div>{`${label} (${value})`}</div>
                                    }} /> : <Skeleton variant='rectangular' height={50} />
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className='pb-6 pt-3' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='flex  items-center gap-2'>
                                <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => setOpenAddMP(true)}>เพิ่มจุดเช็คอิน</Button>
                            </div>
                            <div className='flex  items-center gap-2'>
                                <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => setOpenAddObject(true)}>Add Object</Button>
                                <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => setOpenAddMaster(true)} >Add Master</Button>
                                <Button startIcon={<SettingOutlined />} onClick={() => setOpenSettingLayout(true)}>Setting Layout</Button>
                                <Button icon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddLayout(true)} style={{ display: 'none' }}>Add Layout</Button>
                                <Button icon={<InfoOutlined />} color='error' onClick={() => setOpenPriority(true)} >Set Priority</Button>
                                <Button icon={<PlusCircleOutlined />} onClick={() => setOpenUpdateMaster(true)} >Update Master</Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{
                            width: reduxLayout?.width,
                            height: reduxLayout?.height,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {
                                (reduxLayout != 'null' && reduxLayout != null && typeof reduxLayout == 'object' && Object.keys(reduxLayout).length) ? <svg id='svgContent' viewBox={`0 0 ${reduxLayout.width} ${reduxLayout.height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ border: '2px dotted red', width: reduxLayout.width, height: reduxLayout.height }}></svg> : ''
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
            <DialogAddMaster open={openAddMaster} close={setOpenAddMaster} snackbar={openSnackbar} />
            <DialogDetailEquipment open={openDetailEquipment} close={setOpenDetailEquipment} draw={setDraw} eqpId={eqpIdDbClick} />
            <DialogAddObject open={openAddObject} setOpen={setOpenAddObject} layout={reduxLayout} />
            <DialogUpdateMaster open={openUpdateMaster} close={setOpenUpdateMaster} />
            <DialogAddLayout open={openAddLayout} close={setOpenAddLayout} />
            <DialogEditPriority open={openPriority} close={setOpenPriority} />
            <DialogEditObject open={openEdit} close={setOpenEdit} objCode={objCodeEdit} setObjCode={setObjCodeEdit} />
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            />
            <div id="bg" style={{ color: '#e9fbff', marginLeft: -5000, position: 'absolute' }}>
            </div>
            <div className="h-[95%] hidden items-center bg-[#e9fbff] " >
                <svg
                    id="svgContent"
                    viewBox={`0 0 1200 500`}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                ></svg>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: 99999 }}
                open={load}
            >
                <div className='flex flex-col items-center gap-2'>
                    <span>กำลังโหลดข้อมูลพื้นที่ </span>
                    <CircularProgress color="inherit" />
                </div>
            </Backdrop>
            <DialogSettingLayout open={openSettingLayout} setOpen={setOpenSettingLayout} layout={layoutSelected} />
            <DialogAddMP open={openAddMP} setOpen={setOpenAddMP} layoutCode={layoutSelected?.layoutCode} once={once} setOnce={setOnce} />
        </div >
    )
}
export default ManpowerEdit