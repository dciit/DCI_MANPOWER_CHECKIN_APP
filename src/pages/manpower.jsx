import { Avatar, Divider, Button, Card, Stack } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { API_GET_LAYOUT, ServiceGetLayoutAndEquipment, ServiceGetLayouts, ServiceUpdateAxis } from '../Service';
import DialogCheckin from '../components/DialogCheckin';
function Manpower() {
    const [openCheckIn, setopenCheckIn] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const [layout, setLayout] = useState([]);
    const [equipment, setEquipment] = useState([]);
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
        const resLayouts = await API_GET_LAYOUT();
        if (layout == '') {
            setLayout(resLayouts[0])
        }
        return false;
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
                // svgMaster = svgMaster.replace("{image}", elEqp.image);
                svgMaster = svgMaster.replace("{title_color_bg}", elEqp.empcode != '' ? '#e3f25e' : '#37c5de');
                svgMaster = svgMaster.replace("{ot_color_bg}", elEqp.ot ? '#e3f25e' : '#37c5de');
                svgMaster = svgMaster.replace("{mq_color_bg}", elEqp.mq ? '#e3f25e' : '#37c5de');
                svgMaster = svgMaster.replace("{sa_color_bg}", elEqp.sa ? '#e3f25e' : '#37c5de');
                svgMaster = svgMaster.replace("{ot_color_text}", 'black');
                svgMaster = svgMaster.replace("{mq_color_text}", 'black');
                svgMaster = svgMaster.replace("{sa_color_text}", 'black');
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
    function setEvent(evt) {
        var svg = evt.target;
        svg.addEventListener('click', dbClick)
    }
    function dbClick(evt) {
        let id = evt.target.getAttribute("id");
        setEqpIdTemp(id);
        setopenCheckIn(true);
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
                <div className='hidden' id='divObjCode'>{eqpIdTemp}</div>
                <input type='hidden' id='inpObjCode' value={eqpIdTemp}></input>
                <Button id='btnEvent' className='hidden bg-green-500 text-white' onClick={() => AlertEqpId()}>ALERT</Button>
                <Button id='btnHideEvent' className='hidden bg-green-500 text-white' onClick={() => AlertEqpId()}>ALERT</Button>
            </div>
            <div className='h-[100%] flex flex-col select-none'>
                <div className='h-[50px] flex justify-between items-center px-[14px] shadow-lg'>
                    <div className='text-[#03a9f4] text-[3vh] flex-1'>MAN POWER </div>
                    <div className='text-black text-[3vh] flex-2'>FINAL FACTORY1 - FINAL12</div>
                    <div className='text-black flex-1 shadow-t'>
                    </div>
                </div>
                <div className='h-full py-6 pl-0 pr-6 w-full flex items-center gap-8'>
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