import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { InputBase, Stack, Paper, Divider, Select, MenuItem } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect } from 'react'
import { ServiceAddEquipment, ServiceGetMasterEquipment } from '../Service'
import { useState } from 'react'
function DialogSelectEquipment(props) {
    const { open, close, layout } = props;
    const [master, setMaster] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [masterSelected, setMasterSelected] = useState({
        eqpTitle: '', eqpSubTitle: ''
    });
    let msgEqpTitle = 'กรุณากรอกข้อมูล';
    useEffect(() => {
        if (open) {
            intialContent();
        }
    }, [open]);
    async function intialContent() {
        const resMaster = await ServiceGetMasterEquipment();
        console.log(resMaster)
        setMaster(resMaster)
        // const oAryObjColors = ["green"];
        // const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // let i = 0;
        // let svgContent = document.querySelector("#svgMaster");
        // resMaster.map((master, index) => {
        //     let svg_content = master.objSvg;
        //     let x = i * 100;
        //     let svgContent = svg_content.replace("{emp_name}", master.objName);
        //     svgContent = svgContent.replace("{emp_color}", oAryObjColors[i]);
        //     const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        //     const url = URL.createObjectURL(blob);
        //     const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        //     use.setAttribute('href', url + '#' + master.objId);
        //     master.layout = layout.layoutCode;
        //     use.addEventListener('click', () => {
        //         console.log(master)
        //         console.log(masterSelected)
        //         setMasterSelected({ ...masterSelected, ...master })
        //     })
        //     use.setAttribute('x', x);
        //     use.setAttribute('y', 0);
        //     svg.appendChild(use);
        //     i++;
        // });
        // svgContent.appendChild(svg);
        // setMaster(resMaster);
    }

    function handleNextCheck(nextCheck) {
        let next = {
            objMstNextDay: 0,
            objMstNextMonth: 0,
            objMstNextYear: 0,
        }
        setEquipment({ ...equipment, next })
    }

    async function handleAddEquipment() {
        if ((typeof masterSelected.eqpTitle == 'undefined' || masterSelected?.eqpTitle.length == 0) || typeof masterSelected.eqpSubTitle == 'undefined' || masterSelected?.eqpSubTitle.length == 0) {
            return false;
        }
        const resAddEquipment = await ServiceAddEquipment({
            "layoutCode": layout.layoutCode,
            "objId": masterSelected.objId,
            "eqpTitle": masterSelected.eqpTitle,
            "eqpSubTitle": masterSelected.eqpSubTitle,
            "eqpX": 0,
            "eqpW": 0,
            "eqpY": 0,
            "eqpH": 0,
            "eqpStatus": "normal",
            "layout": layout.layoutCode,
            "factory": "X",
            "eqpLastCheckBy": "string",
            "eqpRemark": "",
            "eqpTrigger": masterSelected.eqpTrigger,
        });
    }

    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth={'sm'}>
            {
                JSON.stringify(layout)
            }
            <DialogTitle className='px-3 py-2'>
                <div className='flex gap-2 items-center text-black p-0'>
                    <AddCircleOutlineOutlinedIcon />
                    <span>ADD EQUIPMENT</span>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className='w-full'>
                    <span>รายการที่สามารถเลือกได้</span>
                    <Select fullWidth value={masterSelected.objId} onChange={(e) => {
                        setMasterSelected({ ...masterSelected, ...e.target.value})
                    }}>
                        {
                            master.map((item, index) => {
                                return <MenuItem key={index} value={item}>{item.objName} ({item.objId})</MenuItem>
                            })
                        }
                    </Select>
                </div>
                <Stack direction={'row'} gap={2} p={2}>
                    <div>
                        <div className='w-[150px] h-[150px] bg-red-50'>
                            <span className='cursor-pointer' dangerouslySetInnerHTML={{ __html: equipment?.objSvg }} ></span>
                        </div>
                        <Stack direction={'row'} gap={1}>
                            <input type="checkbox" id="vehicle1" name="vehicle1" checked onChange={(e) => setMasterSelected({ ...masterSelected, eqpTrigger: e.target.value })} />
                            <label for="vehicle1">Trigger</label>
                        </Stack>
                        <Stack>
                            <span>รอบตรวจ</span>
                            <Select size='small' value={'year'} onChange={(e) => handleNextCheck(e.target.value)}>
                                <MenuItem value={'year'}>1 ปี</MenuItem>
                                <MenuItem value={'month'}>1 เดือน</MenuItem>
                                <MenuItem value={'day'}>1 วัน</MenuItem>
                            </Select>
                        </Stack>
                    </div>
                    <Stack alignItems={'start'} className='w-full' >
                        <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                            <p className='font-semibold text-[#676767] text-[14px]'>Name</p>
                            <InputBase className='text-[18px] w-full' value={masterSelected.objName} readOnly />
                        </div>
                        <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                            <p className='font-semibold text-[#676767] text-[14px]'>Code</p>
                            <InputBase className='text-[18px] w-full' value={masterSelected.objId} readOnly />
                        </div>
                        <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                            <div className='flex flex-row gap-1  items-center'>
                                <span className='font-semibold text-[#676767] text-[14px]'>Title </span>
                                <span className='text-red-500 text-sm'>{!masterSelected?.eqpTitle && (`* ${msgEqpTitle}`)}</span>
                            </div>
                            <InputBase className='text-[18px] w-full' value={masterSelected?.eqpTitle}
                                onChange={(e) => setMasterSelected({ ...masterSelected, eqpTitle: e.target.value })} />
                        </div>
                        <div className='w-full select-none' style={{ borderBottom: '1px solid #ddd' }}>
                            <div className='flex flex-row gap-1  items-center'>
                                <span className='font-semibold text-[#676767] text-[14px]'>Description </span>
                                <span className='text-red-500 text-sm'>{!masterSelected?.eqpTitle && (`* ${msgEqpTitle}`)}</span>
                            </div>
                            <InputBase className='text-[18px] w-full' value={masterSelected.eqpSubTitle}
                                onChange={(e) => setMasterSelected({ ...masterSelected, eqpSubTitle: e.target.value })} />
                        </div>
                        
                    </Stack>
                </Stack>
                <div className='list-master'>

                    <div className='border-2 flex '>
                        {/* <svg id='svgMaster' className='cursor-pointer select-none' viewBox='0 0 1200 200' width="1200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        </svg> */}
                        {/* <svg>
                            {
                                master.map((item, index) => {
                                    console.log(item.objSvg)
                                    return <span className='cursor-pointer' dangerouslySetInnerHTML={{ __html: item.objSvg }} onClick={() => {
                                        setEquipment(item);
                                    }}></span>
                                })
                            }
                        </svg> */}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => close(false)}>ปิดหน้าต่าง</Button>
                <Button variant='contained' onClick={() => handleAddEquipment()} startIcon={   <AddCircleOutlineOutlinedIcon />}>บันทึก</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSelectEquipment