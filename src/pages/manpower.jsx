import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { API_GET_LAYOUT } from '../Service';
import DialogCheckin from '../components/DialogCheckin';
function Manpower() {
    const [openCheckIn, setopenCheckIn] = useState(false);
    const [layout, setLayout] = useState([]);
    const [eqpIdTemp, setEqpIdTemp] = useState('1');
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
    }
    function setEvent(evt) {
        var svg = evt.target;
        svg.addEventListener('click', dbClick)
    }
    function dbClick(evt) {
        let id = evt.target.getAttribute("id");
        setEqpIdTemp(id);
    }
    useEffect(() => {
        setopenCheckIn(true);
    }, [eqpIdTemp])
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