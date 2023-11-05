import { Avatar, Divider, Button, Card, Stack } from '@mui/material'
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
import { ServiceGetLayoutAndEquipment, ServiceGetLayouts, ServiceUpdateAxis } from '../Service';
import DialogDetailEquipment from '../components/DialogDetailEquipment';
import DialogAddMaster from '../components/DialogAddMaster';
import DialogCheckin from '../components/DialogCheckin';
import AttributionIcon from '@mui/icons-material/Attribution';
function Manpower() {
    const [openCheckIn, setopenCheckIn] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [layout, setLayout] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [equipmentSelected, setEquipmentSelected] = useState('');
    const [draw, setDraw] = useState(true);
    const [eqpIdTemp, setEqpIdTemp] = useState('1');
    let svgContent = '';
    let countEmp = 12;
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const setSvg = await intialData();
        if (setSvg) {
            const drag = await initialDraggle();
        }
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
                itemSvg.innerHTML = elEqp.objSvg;
                itemSvg.setAttribute('id', elEqp.eqpId);
                itemSvg.setAttribute('x', elEqp.eqpX);
                itemSvg.setAttribute('y', elEqp.eqpY);
                svg.appendChild(itemSvg);
            } else {
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
                svg.appendChild(use);
            }


            svgContent.appendChild(svg);
        });
        return true;
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function setEvent(evt) {
        var svg = evt.target;
        svg.addEventListener('click', dbClick)
    }
    function dbClick(evt) {
        if (evt.target.classList.contains('draggable')) {
            let id = evt.target.getAttribute("id");
            setEqpIdTemp(id);
            setopenCheckIn(true);
        }
    }
    const initialDraggle = async () => {
        const svgLayout = document.querySelector('#svgContent');
        svgLayout.addEventListener('load', setEvent);
        const svgs = document.querySelectorAll('svg#svgContent svg');
        svgs.forEach(element => {
            element.addEventListener('click', dbClick)
        });
    }

    function AlertEqpId() {
        alert(eqpIdTemp)
    }

    return (
        <>
            <div>
                <div className='hidden' id='divEqpId'>{eqpIdTemp}</div>
                <input type='hidden' id='inpEqpId' value={eqpIdTemp}></input>
                <Button id='btnEvent' className='hidden bg-green-500 text-white' onClick={() => AlertEqpId()}>ALERT</Button>
                <Button id='btnHideEvent' className='hidden bg-green-500 text-white' onClick={() => AlertEqpId()}>ALERT</Button>
            </div>
            <div className='h-[100%] flex flex-col select-none'>
                <div className='h-[50px] flex justify-between items-center px-[14px] shadow-lg'>
                    <div className='text-[#03a9f4] text-[3vh] flex-1'>MAN POWER </div>
                    <div className='text-black text-[3vh] flex-2'>FINAL FACTORY1 - FINAL12</div>
                    <div className='text-black flex-1 shadow-t'>
                        <Stack direction={'row'} gap={1} justifyContent={'end'}>
                            <Card className='px-3 py-1 cursor-pointer transition-all hover:scale-105'>2D</Card>
                            <Card className='px-3 py-1 cursor-pointer transition-all hover:scale-105'>3D</Card>
                        </Stack>
                    </div>
                </div>
                <div className='h-full py-6 pl-0 pr-6 w-full flex items-center gap-8'>
                    <div className='w-[20%] h-full pr-3 shadow-mstr rounded-r-lg bg-[#1b8fec]  p-3 gap-8 flex flex-col hidden'>
                        <div className='flax flex-col gap-2'>
                            <div className='text-[3.75vw] flex items-center justify-center border-[8px] rounded-3xl border-white'>
                                <span className='text-white'>15</span>
                                <span className='text-[#ddd] text-[28px] px-3'>/</span>
                                <span>20</span>
                            </div>
                            <div className='h-fit '>
                                {
                                    [...Array(20)].map((index, el) => {
                                        return <AttributionIcon key={el} className={`${(el + 1) < countEmp ? 'text-white' : 'text-black'}`} />
                                    })
                                }
                            </div>
                        </div>

                        <div className='h-[50%] flex flex-col gap-1'>
                            {
                                [...Array(4)].map((index, el) => {
                                    return <div className='flex items-center gap-1 justify-between pr-3'>
                                        <div>MFINAL1-OP1</div>
                                        <div className='flex items-center'>{el} </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='py-3 bg-white w-[100%] h-fit'  >
                        <div>
                            <svg id='svgContent' viewBox={`0 0 1200 600`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"  >
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='h-[35px] flex justify-between items-center px-[14px] shadow-lg border-t-[1px]'>
                    <div>พนักงานทั้งหมด : 14 คน</div>
                </div>
                <DialogCheckin open={openCheckIn} close={setopenCheckIn} />
            </div >
        </>
    )
}
export default Manpower