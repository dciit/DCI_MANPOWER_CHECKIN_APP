import { Avatar, Divider, Button, Typography, Stack, Select, MenuItem, Snackbar, Skeleton } from '@mui/material'
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
import { useDispatch } from 'react-redux';
import { API_DELETE_OBJECT, API_GET_LAYOUT, API_GET_MASTER, API_GET_OBJECT_OF_LAYOUT, API_UPDATE_POSITION_OBJ } from '../../Service';
import DialogDetailEquipment from '../../components/DialogDetailEquipment';
function ManpowerEdit() {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const [openAddLayout, setOpenAddLayout] = useState(false);
    const [openAddObject, setOpenAddObject] = useState(false);
    const [openDetailEquipment, setOpenDetailEquipment] = useState(false);
    const [openUpdateMaster, setOpenUpdateMaster] = useState(false);
    const [eqpIdDbClick, setEqpIdDbClick] = useState('');
    const [openAddMaster, setOpenAddMaster] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [layoutSelected, setLayoutSelected] = useState('');
    const [draw, setDraw] = useState(true);
    const dispatch = useDispatch();
    let coord = null;
    let offset = null;
    let selectedElement = null;
    let svgContent = '';
    useEffect(() => {
        init();
    }, []);

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
                item.addEventListener('mousedown', startDrag);
                item.addEventListener('mousemove', moveDrag);
                item.addEventListener('mouseup', endDrag);
                item.addEventListener('mouseleave', leaveDrag);
                item.addEventListener('dblclick', dbClick);
            })
        }
    }
    const dbClick = async (evt) => {
        if (confirm('คุณต้องการลบ ใช่หรือไม่ ?')) {
            let id = evt.target.getAttribute("id");
            console.log(id)
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
    const intialData = async () => {
        let bpLayout = 1;
        const listLayout = await API_GET_LAYOUT();
        if (layoutSelected == '') {
            setLayoutSelected(listLayout[bpLayout])
            dispatch({ type: 'UPDATE_LAYOUT', payload: listLayout[bpLayout] })
        }
        const listMaster = await API_GET_MASTER();
        const object = await API_GET_OBJECT_OF_LAYOUT({
            layoutCode: (layoutSelected == '' ? listLayout[bpLayout].layoutCode : layoutSelected.layoutCode),
        });
        setLayouts(listLayout);
        svgContent = document.querySelector("#svgContent");
        let svgMaster = '';
        let svg = '';
        object.map((elObj) => {
            let masterItem = listMaster.filter((elMaster) => {
                return elMaster.objMasterId == elObj.objMasterId
            })
            masterItem = masterItem.length ? masterItem[0] : {};
            svgMaster = masterItem.objSvg;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let i = 0;
            svgMaster = svgMaster.replace("{title}", elObj.eqpTitle);
            svgMaster = svgMaster.replace("{empcode}", elObj.empcode);
            svgMaster = svgMaster.replace("{title_color_bg}", elObj.empcode != '' ? 'green' : 'red');
            const blob = new Blob([svgMaster], { type: 'image/svg+xml' });
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
        setLayoutSelected({...layoutSelected,layoutCode:layout})
        intialData();
    }
    return (
        <div className='h-[97.5%] bg-white flex  '>
            <div className='bg-[#f9f9f9] w-full p-3'>
                <div className='bg-white rounded-xl shadow-xl h-[97.5%] p-6'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex gap-2'>
                            <GridViewIcon /><div>Management Layout</div>
                        </div>
                        <div>
                            <CloseOutlinedIcon className='text-[#bbb]' />
                        </div>
                    </div>
                    <Divider className='mt-3' />
                    <div className='py-3'>
                        <Stack pb={3} pt={1}>
                            <Typography>LAYOUT : </Typography>
                            {
                                layouts.length ? <Select size='small' value={layoutSelected.layoutCode} onChange={(e) => changeLayout(e.target.value)}>
                                    {
                                        layouts.map((layout, index) => (<MenuItem value={layout.layoutCode} key={index}>{layout.layoutName} ({layout.layoutCode})</MenuItem>))
                                    }
                                </Select> : <Skeleton variant='rectangular' height={50} />
                            }
                        </Stack>
                        <div className='tool pb-3 flex gap-2 items-start justify-end'>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddLayout(true)} style={{ display: 'none' }}>Add Layout</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddObject(true)}>Add Object</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddMaster(true)} >ADD Master</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenUpdateMaster(true)} >Update Master</Button>
                        </div>
                        <div >
                            <svg id='svgContent' viewBox={`0 0 1200 500`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ border: '1px solid #ddd' }}>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <DialogAddMaster open={openAddMaster} close={setOpenAddMaster} snackbar={openSnackbar} />
            <DialogDetailEquipment open={openDetailEquipment} close={setOpenDetailEquipment} draw={setDraw} eqpId={eqpIdDbClick} />
            <DialogAddObject open={openAddObject} close={setOpenAddObject} layout={layoutSelected} />
            <DialogUpdateMaster open={openUpdateMaster} close={setOpenUpdateMaster} />
            <DialogAddLayout open={openAddLayout} close={setOpenAddLayout} />
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            />
        </div >
    )
}
export default ManpowerEdit