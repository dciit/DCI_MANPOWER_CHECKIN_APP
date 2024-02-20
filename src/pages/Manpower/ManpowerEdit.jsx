import { Avatar, Divider, Button, Typography, Stack, Select, MenuItem, Snackbar, Skeleton, Grid } from '@mui/material'
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
import { API_DELETE_OBJECT, API_GET_LAYOUT, API_GET_MASTER, API_GET_OBJECT_OF_LAYOUT, API_UPDATE_POSITION_OBJ } from '../../Service';
import DialogDetailEquipment from '../../components/DialogDetailEquipment';
import { useNavigate } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import DialogEditObject from '../../components/DialogEditObject';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DialogEditPriority from '../../components/DialogEditPriority';
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
    const dispatch = useDispatch();
    let coord = null;
    let offset = null;
    let selectedElement = null;
    let svgContent = '';
    const layoutFilter = useSelector(state => state.reducer?.layoutFilter);
    useEffect(() => {
        init();
    }, [layoutFilter]);

    const openSnackbar = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    const init = async () => {
        const res = await intialData();
        if (res) {
            let svgs = document.querySelectorAll('svg#svgContent svg');
            svgs.forEach((item) => {
                // item.addEventListener('dblclick', dbClick);
                item.addEventListener('mousedown', startDrag);
                item.addEventListener('mousemove', moveDrag);
                item.addEventListener('mouseup', endDrag);
                item.addEventListener('mouseleave', leaveDrag);
            });
        }
    }
    // const dbClick = async (evt) => {
    //     let id = evt.target.getAttribute("id");
    //     console.log(id)
    //     // if (confirm('คุณต้องการลบ ใช่หรือไม่ ?')) {
    //     //     let id = evt.target.getAttribute("id");
    //     //     const del = await API_DELETE_OBJECT({ objCode: id });
    //     //     if (del.status) {
    //     //         document.querySelector(`#${id}`).remove();
    //     //     }
    //     // }
    //     setObjCodeEdit(id);
    // }

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
            console.log(axisX, axisY)
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
    }
    function getMousePosition(evt) {
        var CTM = evt.target.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }
    const intialData = async () => {
        const listLayout = await API_GET_LAYOUT();
        if (layoutFilter == null) {
            dispatch({ type: 'SET_LAYOUT_FILTER_SELECTED', payload: listLayout[0] });
        }
        const listMaster = await API_GET_MASTER();
        const object = await API_GET_OBJECT_OF_LAYOUT({
            layoutCode: layoutFilter?.layoutCode,
        });
        setLayouts(listLayout);
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

            // IF BAGKGROUND SET WIDTH & HEIGHT
            if (elObj.objSvg.includes('bg-set')) {
                let BgParent = itemSvg.querySelector('#bgTitle');
                let BGChild = BgParent.querySelector('rect');
                let svgChild = itemSvg.querySelector('g>svg');
                BGChild.setAttribute('width', elObj.objWidth);
                BGChild.setAttribute('height', elObj.objHeight);
                BGChild.setAttribute('fill', elObj.objBackgroundColor != '' ? elObj.objBackgroundColor : 'blue');
                BGChild.setAttribute('stroke', elObj.objBorderColor != '' ? elObj.objBorderColor : 'black')
                if (elObj.objBorderColor != '') {
                    BGChild.setAttribute('stroke-width', elObj.objBorderColor != '' ? 3 : 0)
                }
                svgChild.setAttribute('width', elObj.objWidth);
                svgChild.setAttribute('height', elObj.objHeight);

                // console.log(itemSvg)
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

    function changeLayout(layout) {
        let index = layouts.findIndex(el => el.layoutCode == layout);
        dispatch({ type: 'SET_LAYOUT_FILTER_SELECTED', payload: layouts[index] })
    }

    return (
        <div className=' bg-white flex  '>
            <div className='bg-[#f9f9f9] w-full p-3'>
                <Stack direction={'column'} alignItems={'end'} mb={2}>
                    <Button variant='contained' startIcon={<HomeIcon />} className='min-w-[10em]' onClick={() => navigate(`../${VITE_PATH}/management`)}>หน้าหลัก</Button>
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
                                <Typography className=''>พื้นที่ </Typography>
                                {
                                    layouts.length ? <Select className='w-full' size='small' value={layoutFilter?.layoutCode} onChange={(e) => changeLayout(e.target.value)}>
                                        {
                                            layouts.map((layout, index) => (<MenuItem value={layout.layoutCode} key={index}>{layout.layoutName} ({layout.layoutCode})</MenuItem>))
                                        }
                                    </Select> : <Skeleton variant='rectangular' height={50} />
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={'row'} gap={1} justifyContent={'end'} pb={2}>
                                <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddLayout(true)} style={{ display: 'none' }}>Add Layout</Button>
                                <Button variant="contained" startIcon={<PriorityHighIcon />} color='error' onClick={() => setOpenPriority(true)} >Set Priority</Button>
                                <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddObject(true)}>ADD OBJECT</Button>
                                <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddMaster(true)} >ADD Master</Button>
                                <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenUpdateMaster(true)} >Update Master</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                (layoutFilter != 'null' && layoutFilter != null && typeof layoutFilter == 'object' && Object.keys(layoutFilter).length) ? <svg id='svgContent' viewBox={`0 0 ${layoutFilter.width} ${layoutFilter.height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ border: '2px dotted red' }}></svg> : ''
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
            <DialogAddMaster open={openAddMaster} close={setOpenAddMaster} snackbar={openSnackbar} />
            <DialogDetailEquipment open={openDetailEquipment} close={setOpenDetailEquipment} draw={setDraw} eqpId={eqpIdDbClick} />
            <DialogAddObject open={openAddObject} close={setOpenAddObject} layout={layoutFilter} />
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
            <div className="h-[95%] flex items-center bg-[#e9fbff]" >
                <svg
                    id="svgContent"
                    viewBox={`0 0 1200 500`}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                ></svg>
            </div>
        </div >
    )
}
export default ManpowerEdit