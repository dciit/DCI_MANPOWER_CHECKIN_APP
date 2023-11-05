import { Avatar, Divider, Button } from '@mui/material'
import React from 'react'
import AppsIcon from '@mui/icons-material/Apps';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CropRotateOutlinedIcon from '@mui/icons-material/CropRotateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect } from 'react';
import { useState } from 'react';
import DialogSelectEquipment from '../components/DialogSelectEquipment';
import { ServiceDelEquipmentOfLayout, ServiceGetLayoutAndEquipment, ServiceGetLayouts, ServiceUpdateAxis } from '../Service';
import DialogDetailEquipment from '../components/DialogDetailEquipment';
import DialogAddMaster from '../components/DialogAddMaster';
import DialogUpdateMaster from '../components/DialogUpdateMaster';
function Home() {
    const [openSelectEquipment, setOpenSelectEquipment] = useState(false);
    const [openDetailEquipment, setOpenDetailEquipment] = useState(false);
    const [openUpdateMaster, setOpenUpdateMaster] = useState(false);
    const [eqpIdDbClick, setEqpIdDbClick] = useState('');
    const [openAddMaster, setOpenAddMaster] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [layout, setLayout] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [draw, setDraw] = useState(true);
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
            const del = await ServiceDelEquipmentOfLayout(id);
        }
    }
    function leaveDrag(evt) {
        evt.target.classList.remove('draggable');
        let eqpId = evt.target.lastElementChild.id;
        console.log(eqpId)
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
        let eqpId = selectedElement.target.getAttribute("id");
        let axisX = coord.x - offset.x;
        let axisY = coord.y - offset.y;
        if (selectedElement != null) {
            const res = await ServiceUpdateAxis({
                eqpId: eqpId,
                eqpX: axisX,
                eqpY: axisY
            });
        }
        if (selectedElement != null) {
            selectedElement.target.classList.remove('draggable')
        }
        if (eqpId != null) {
            document.querySelector(`use#${eqpId}`).classList.remove('draggable')
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
        const resLayouts = await ServiceGetLayouts();
        if (layout == '') {
            setLayout(resLayouts[0])
        }
        const res = await ServiceGetLayoutAndEquipment(layout == '' ? resLayouts[0].layoutCode : layout.layoutCode);
        setLayouts(res.layout);
        res.equipment.map((el, index) => {
            let svg = el.objSvg;
            svg = svg.replace('{name}', el.eqpTitle);
            svg = svg.replace('{color}', 'red');
            res.equipment[index].objSvg = svg;
        })
        setEquipment(res.equipment);
        svgContent = document.querySelector("#svgContent");
        let svgMaster = '';
        let svg = '';
        res.equipment.map((elEqp, indexEqp) => {
            svgMaster = elEqp.objSvg;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let i = 0;
            let x = i * 100;
            if (elEqp.objSvg.includes('animateMotion')) {
                const itemSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                elEqp.objSvg = elEqp.objSvg.replace("<defs>", "");
                console.log(elEqp.objSvg)
                itemSvg.innerHTML = elEqp.objSvg;

                itemSvg.setAttribute('id', elEqp.eqpId);
                itemSvg.setAttribute('x', elEqp.eqpX);
                itemSvg.setAttribute('y', elEqp.eqpY);
                svg.appendChild(itemSvg);
                console.log(itemSvg)
            }

            svgMaster = svgMaster.replace("{title}", elEqp.eqpTitle);
            svgMaster = svgMaster.replace("{empcode}", elEqp.empcode);
            svgMaster = svgMaster.replace("{image}", elEqp.image);
            svgMaster = svgMaster.replace("{title_color_bg}", elEqp.empcode != '' ? 'green' : 'red');
            svgMaster = svgMaster.replace("{ot_color_bg}", elEqp.ot ? 'green' : 'red');
            svgMaster = svgMaster.replace("{mq_color_bg}", elEqp.mq ? 'green' : 'red');
            svgMaster = svgMaster.replace("{sa_color_bg}", elEqp.sa ? 'green' : 'red');
            svgMaster = svgMaster.replace("{ot_color_text}", elEqp.ot ? 'white' : 'white');
            svgMaster = svgMaster.replace("{mq_color_text}", elEqp.mq ? 'white' : 'white');
            svgMaster = svgMaster.replace("{sa_color_text}", elEqp.sa ? 'white' : 'white');
            svgMaster = svgMaster.replace("{ot_text}", 'OT');
            svgMaster = svgMaster.replace("{mq_text}", 'MQ');
            svgMaster = svgMaster.replace("{sa_text}", 'SA');
            const blob = new Blob([svgMaster], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use.setAttribute('href', url + '#' + elEqp.objId);
            use.setAttribute('id', elEqp.eqpId);
            use.setAttribute('x', elEqp.eqpX);
            use.setAttribute('y', elEqp.eqpY);
            if (elEqp.objId.includes('COMPRESSOR')) {
                use.setAttribute('class', 'slide-right');
            }
            svg.appendChild(use);
            svgContent.appendChild(svg);
        });
        return true;
    }
    return (
        <div className='h-[97.5%] bg-white flex  '>
            <div className='nav-menu w-[20%] p-3 bg-[#f9f9f9]'>
                <div className='bg-white rounded-xl shadow-xl p-3'>
                    <div className='flex items-center flex-row gap-2'><HomeOutlinedIcon /><span>Home</span></div>
                    <Divider className='mt-3' />
                    <div className='py-3 flex flex-col gap-2'>
                        <div className='text-[#7b7b7b]'>Production</div>
                        <div className='flex gap-3 flex-col text-[#4d4d4d] cursor-pointer'>
                            <div className='flex items-center flex-row gap-2 '><PeopleOutlineIcon /><span>Man power</span></div>
                            <div className='flex items-center flex-row gap-2 '><GridViewIcon /><span>Management Layout</span></div>
                            <div className='flex items-center flex-row gap-2'><AirportShuttleOutlinedIcon /><span>Delivery Order</span></div>
                            <div className='flex items-center flex-row gap-2'><AppsIcon /><span>Tranform Serial</span></div>
                            <div className='flex items-center align-top  flex-row gap-2'><AppsIcon /><span>Safety Fire Extinguisher</span></div>
                            <div className='flex items-center flex-row gap-2'><AppsIcon /><span>Process Class SA</span></div>
                            <div className='flex items-center flex-row gap-2'><AppsIcon /><span>Brazing Control</span></div>
                        </div>
                    </div>
                    <Divider className='my-3' />
                    <div className='flex items-center flex-row gap-2'><SettingsOutlinedIcon /><span>Setting</span></div>
                </div>
            </div>
            <div className='bg-[#f9f9f9] w-[80%] p-3'>

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
                        <div>
                            {
                                JSON.stringify(layout)
                            }
                        </div>
                        <div className='tool pb-3 flex gap-2'>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenSelectEquipment(true)}>ADD Equipment</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenAddMaster(true)} color='error'>ADD Master</Button>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setOpenUpdateMaster(true)} color='error'>Update Master</Button>
                        </div>
                        <div >
                            <svg id='svgContent' viewBox={`0 0 1200 500`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ border: '1px solid #ddd' }}>

                                {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <g id="LIFT"><rect x="15" y="5" width="6" height="35" fill="black" stroke="black" stroke-width="0.5"></rect><rect x="40" y="5" width="6" height="35" fill="black" stroke="black" stroke-width="0.5"></rect><g className="LiftAni" class="LiftAni"><rect x="7.5" y="4.5" width="45" height="35" fill="#8A8A8A" stroke="black" stroke-width="0.5"></rect></g><rect x="10" y="0" width="2" height="80" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="20" y="0" width="2" height="80" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="30" y="0" width="2" height="80" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="40" y="0" width="2" height="80" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="50" y="0" width="2" height="80" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="10" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="20" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="30" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="40" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="50" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="60" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="70" width="60" height="2" fill="#FFD414" stroke="none" stroke-width="0.5"></rect><rect x="0" y="0" width="60" height="5" fill="#FFD414" stroke="black" stroke-width="1"></rect><rect x="0" y="75" width="60" height="5" fill="#FFD414" stroke="black" stroke-width="1"></rect><rect x="0" y="0" width="5" height="80" fill="#FFD414" stroke="black" stroke-width="1"></rect><rect x="55" y="0" width="5" height="80" fill="#FFD414" stroke="black" stroke-width="1"></rect></g>
                                    </defs>
                                   
                                </svg>
                                <use href="#LIFT" >
                                        Subtext
                                    </use> */}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <DialogAddMaster open={openAddMaster} close={setOpenAddMaster} />
            <DialogDetailEquipment open={openDetailEquipment} close={setOpenDetailEquipment} draw={setDraw} eqpId={eqpIdDbClick} />
            <DialogSelectEquipment open={openSelectEquipment} close={setOpenSelectEquipment} layout={layout} />
            <DialogUpdateMaster open={openUpdateMaster} close={setOpenUpdateMaster} />


        </div >



    )
}

export default Home