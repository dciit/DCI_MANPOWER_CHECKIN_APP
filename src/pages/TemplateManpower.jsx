import React from 'react'
import { Avatar } from '@mui/material'
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import btn from '../images/button.svg'
import CreateSvg from '../components/createSvg';
import newSvg from '../images/button.svg'
function Manpower() {
    // let svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="100px" viewBox="0 0 100 100" enable-background="new 0 0 64 64" xml:space="preserve"> <defs> <ref id="paramFill" param="color" default="blue"/> <ref id="paramText" param="text-label">button</ref> <ref id="paramStroke" param="outline" default="navy"/> </defs> <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="{color}" / </svg>';
    return (
        <div className='select-none'>
            <div>
                {/* <CreateSvg svg={svg} /> */}
                {/* <object type="image/svg+xml" data={newSvg}>
                    <param name="color" value="red" />
                    <param name="text-label" value="stop" />
                </object> */}
            </div>
            <div>
                <span className='text-[2.5rem] font-semibold leading-0' style={{ fontFamily: 'inter' }}>Overview</span>
            </div>
            <div className='flex gap-3 flex-col'>
                <div className='rounded-md flex flex-row gap-3 group-box'>
                    <div className='flex flex-col flex-1 bg-[#7d54f3] text-white rounded-lg pl-3 pr-3 pb-3 pt-2 leading-6' >
                        <span className='text-md'>CHECKIN-TOTAL</span>
                        <span className='number font-semibold text-[2em]'>19</span>
                        <span className='text-xs mt-1'>จำนวนจุดปฎิบัติงาน</span>
                    </div>
                    <div className='flex flex-col flex-1 bg-white text-[#ddd] rounded-lg pl-3 pr-3 pb-3 pt-2 leading-6' >
                        <span className='text-md text-[#929197]'>CHECKED-IN</span>
                        <span className='number font-semibold text-[2em] text-[#6330f4]'>14</span>
                        <span className='text-xs mt-1 text-[#bdbbbe]'>จำนวนจุดปฎิบัติงาน</span>
                    </div>
                    <div className='flex flex-col flex-1 bg-white text-[#ddd] rounded-lg pl-3 pr-3 pb-3 pt-2 leading-6' >
                        <span className='text-md text-[#929197]'>LICENSE</span>
                        <span className='number font-semibold text-[2em] text-[#6330f4]'>14</span>
                        <span className='text-xs mt-1 text-[#bdbbbe]'>จำนวนจุดปฎิบัติงาน</span>
                    </div>
                    <div className='flex flex-col flex-1 bg-white text-[#ddd] rounded-lg pl-3 pr-3 pb-3 pt-2 leading-6' >
                        <span className='text-md text-[#929197]'>SKILL</span>
                        <span className='number font-semibold text-[2em] text-[#6330f4]'>14</span>
                        <span className='text-xs mt-1 text-[#bdbbbe]'>จำนวนจุดปฎิบัติงาน</span>
                    </div>
                </div>
                <div className='rounded-md shad p-3 flex gap-3 flex-col bg-[#7d54f308]' style={{ border: '1px solid #ddd' }}>
                    <span className='text-[1rem] font-semibold leading-0 text-[#535353]'>แผนผังการทำงาน</span>
                    <div className='p-3' style={{ border: '1px solid #ddd' }}>
                        <svg viewBox='0 0 3000 1000' preserveAspectRatio="xMidYMid meet">
                            <g transform={`translate(10,10)`}>
                                <polyline points="0,0 400,0 400,150 0,150 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 5 }} />
                                <text x="35" y="105" class="title" style={{ fontSize: '5em' }}>FINAL L8</text>
                            </g>

                            <g transform={`translate(0,350)`}>
                                <polyline points="0,0 3000,0 3000,100 0,100 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 2 }} />
                                {
                                    [...Array(300)].map((el, index) => {
                                        return <line key={index} x1="0" x2="0" y1="0" y2="100" style={{ fill: '#ddd', stroke: 'black', strokeWidth: 1 }} transform={`translate(${(index) * 20},0)`} />
                                    })
                                }
                            </g>


                            <g transform={`translate(0,700)`}>
                                <polyline points="0,0 3000,0 3000,100 0,100 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 2 }} />
                                {
                                    [...Array(300)].map((el, index) => {
                                        return <><line x1="0" x2="0" y1="0" y2="100" style={{ fill: '#ddd', stroke: 'black', strokeWidth: 1 }} transform={`translate(${(index) * 20},0)`} /></>
                                    })
                                }
                            </g>

                            <g transform={`translate(65,280)`} >
                                <polyline points="0,0 150,0 150,50 0,50 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 3 }} />
                                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" transform={`translate(25,-60)`} />
                            </g>

                            <g transform={`translate(1400,280)`} >
                                <polyline points="0,0 150,0 150,50 0,50 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 3 }} />
                                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" transform={`translate(25,-60)`} />
                            </g>

                            <g transform={`translate(1900,280)`} >
                                <polyline points="0,0 150,0 150,50 0,50 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 3 }} />
                                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" transform={`translate(25,-60)`} />
                            </g>

                            <g transform={`translate(800,280)`} >
                                <polyline points="0,0 150,0 150,50 0,50 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 3 }} />
                                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" transform={`translate(25,-60)`} />
                            </g>



                            <g transform={`translate(350,200)`} >
                                <polyline points="0,0 150,0 150,100 0,100 0,0" style={{ fill: 'white', stroke: 'black', strokeWidth: 3 }} />
                                <polyline points="15,15 135,15 135,85 15,85 15,15" style={{ fill: '#3de9ff', stroke: 'black', strokeWidth: 3 }} />
                                <polyline points="15,15 135,85" style={{ fill: '#3de9ff', stroke: 'black', strokeWidth: 1 }} />
                                <polyline points="50,100 100,100 100,120 50,120 50,100" style={{ fill: 'white', stroke: 'black', strokeWidth: 3 }} />
                                <polyline points="0,120 100,120 150,120 150,170 0,170 0,120 " style={{ fill: 'white', stroke: 'black', strokeWidth: 5 }} />
                                <g>
                                    <line x1={0} y1={160} x2={150} y2={160} style={{ stroke: 'black', strokeWidth: 4 }}></line>
                                    <line x1={0} y1={150} x2={150} y2={150} style={{ stroke: 'black', strokeWidth: 4 }}></line>
                                    <line x1={0} y1={140} x2={150} y2={140} style={{ stroke: 'black', strokeWidth: 4 }}></line>
                                    <line x1={0} y1={130} x2={150} y2={130} style={{ stroke: 'black', strokeWidth: 4 }}></line>
                                </g>
                                <g>
                                    {
                                        [...Array(8)].map((el, index) => {
                                            return <line x1={index * 20} y1={120} x2={index * 20} y2={170} style={{ stroke: 'black', strokeWidth: 1 }}></line>
                                        })
                                    }
                                </g>
                                <path transform='translate(135,110)' d="M 17 15 q 15 -5 15 5" stroke="black" stroke-width="2" fill="none" />
                                <g>
                                    <ellipse cx={175} cy={150} rx={15} ry={20} style={{ fill: 'white', stroke: 'black', strokeWidth: 2 }}>
                                    </ellipse>
                                    <line x1={163} y1={145} x2={190} y2={145} style={{ stroke: 'black', strokeWidth: 2 }}></line>
                                </g>
                            </g>
                            {/* <g >
                    <polyline points="0,0 500,0" style={{ fill: '#ddd', stroke: 'red', strokeWidth: 1 }} />
                    {
                        [...Array(50)].map((el, index) => {
                            console.log(index)
                            return <><line x1="0" x2="50" y1="10" y2="10" style={{ fill: '#ddd', stroke: 'black', strokeWidth: 0.5 }} transform={`translate(0,${(index) * 10})`} /></>
                        })
                    }
                </g> */}
                        </svg>
                    </div>
                </div >

                <div className='px-6 pb-6 pt-4 shad rounded-md flex flex-col gap-6'>
                    <span className='text-[1rem] font-semibold leading-0 text-[#535353]'>รายชื่อพนักงานที่กำลังปฎิบัติงาน</span>
                    <div className='flex gap-4 bg-[#7d54f308] p-[8px] rounded-[8px]' style={{ border: '1px solid #ddd' }}>
                        {
                            [...Array(3)].map((item, index) => {
                                return <div className='flex-1 '>
                                    <div className='flex justify-between'>
                                        <span>พื้นที่</span>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-sm text-[#979191]'>ปฎิบัติงาน</span>
                                            <div className='bg-[#FF6258] text-white rounded-xl px-2'>
                                                39/41
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 flex-col mt-4 '>
                                        {
                                            [...Array(5)].map((el, item) => {
                                                return <div className=' rounded-lg flex items-center gap-2 px-3 py-2 box bg-white'>
                                                    <Avatar alt="Remy Sharp" src="http://dcihrm.dci.daikin.co.jp/PICTURE/41283.JPG" />
                                                    <div className='flex flex-col'>
                                                        <span className='text-[#006FA6] font-semibold'>นาย บิลลี่ สายหวาน</span>
                                                        <span className='text-[#888888]'>ตำแหน่ง : Foreman</span>
                                                        <span className='text-[#1E1E1E] text-sm'>อายุงาน : 10 ปี 5 เดือน</span>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                        {/* <div className='flex flex-col flex-1 gap-1'>
                            <div>&nbsp;</div>
                            {
                                [...Array(10)].map((item, index) => {
                                    return <div className='flex justify-around items-center'>
                                        <div className='flex gap-1 items-center'>
                                            <Brightness1Icon sx={{ fontSize: '14px' }} />
                                            <span>พื้นที่ : MNOP</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <div className='bg-[#FF6258] text-white rounded-lg px-2'>
                                                39/41
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Manpower