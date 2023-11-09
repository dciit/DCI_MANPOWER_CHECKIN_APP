import { Avatar, Divider, Button, Typography, Stack, Select, MenuItem } from '@mui/material'
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
    const [openAddLayout, setOpenAddLayout] = useState(false);
    const [openAddObject, setOpenAddObject] = useState(false);
    const [openDetailEquipment, setOpenDetailEquipment] = useState(false);
    const [openUpdateMaster, setOpenUpdateMaster] = useState(false);
    const [eqpIdDbClick, setEqpIdDbClick] = useState('');
    const [openAddMaster, setOpenAddMaster] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [layoutSelected, setLayoutSelected] = useState('');
    const [draw, setDraw] = useState(true);
    const [masters, setMasters] = useState([]);
    const [objects, setObjects] = useState([]);
    const dispatch = useDispatch();
    let coord = null;
    let offset = null;
    let selectedElement = null;
    let svgContent = '';
    useEffect(() => {
        init();
    }, []);

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
            const del = await API_DELETE_OBJECT({ objCode: id });
            if(del.status){
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
        const listLayout = await API_GET_LAYOUT();
        if (layoutSelected == '') {
            setLayoutSelected(listLayout[0])
            dispatch({ type: 'UPDATE_LAYOUT', payload: listLayout[0] })
        }
        const listMaster = await API_GET_MASTER();
        // const object = await API_GET_OBJECT_OF_LAYOUT({
        //     layoutCode: (layoutSelected == '' ? listLayout[0].layoutCode : layoutSelected.layoutCode),
        // });
        const object = await API_GET_OBJECT_OF_LAYOUT({
            layoutCode: (layoutSelected == '' ? listLayout[0].layoutCode : layoutSelected.layoutCode),
        });
        console.log(object)
        setMasters(listMaster);
        setLayouts(listLayout);
        setObjects(object);
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
            let x = i * 100;
            // if (masterItem?.objSvg.includes('animateMotion')) {
            //     const itemSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            //     masterItem.objSvg = masterItem.objSvg.replace("<defs>", "");
            //     itemSvg.innerHTML = masterItem.objSvg;
            //     itemSvg.setAttribute('id', elObj.objCode);
            //     itemSvg.setAttribute('x', elObj.objX);
            //     itemSvg.setAttribute('y', elObj.objY);
            //     svg.appendChild(itemSvg);
            // }

            svgMaster = svgMaster.replace("{title}", elObj.eqpTitle);
            svgMaster = svgMaster.replace("{empcode}", elObj.empcode);
            // svgMaster = svgMaster.replace("{image}", elObj.image);
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
                            <Typography>LAYOUT NAME : </Typography>
                            <Select size='small' value={layoutSelected.layoutCode}>
                                {
                                    layouts.map((layout, index) => (<MenuItem value={layout.layoutCode} key={index}>{layout.layoutName} ({layout.layoutCode})</MenuItem>))
                                }
                            </Select>
                        </Stack>
                        <div className='tool pb-3 flex gap-2'>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddLayout(true)}>Add Layout</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddObject(true)}>Add Object</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddMaster(true)} color='error'>ADD Master</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenUpdateMaster(true)} color='error'>Update Master</Button>
                        </div>
                        <div >
                            <svg id='svgContent' viewBox={`0 0 1200 500`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ border: '1px solid #ddd' }}>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <DialogAddMaster open={openAddMaster} close={setOpenAddMaster} />
            <DialogDetailEquipment open={openDetailEquipment} close={setOpenDetailEquipment} draw={setDraw} eqpId={eqpIdDbClick} />
            <DialogAddObject open={openAddObject} close={setOpenAddObject} layout={layoutSelected} />
            <DialogUpdateMaster open={openUpdateMaster} close={setOpenUpdateMaster} />
            <DialogAddLayout open={openAddLayout} close={setOpenAddLayout} />
        </div >
    )
}
export default ManpowerEdit