import { Avatar, Divider, Button, Typography, Stack, Select, MenuItem } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'; '../Service';
import { API_GET_LAYOUT, API_GET_MASTER, API_GET_OBJECT_INFO, API_GET_OBJECT_OF_LAYOUT } from '../../Service';
import DialogCheckin from '../../components/DialogCheckin';
import { useParams } from 'react-router';
function ManpowerView() {

    let { layout } = useParams();

    const [openCheckIn, setOpenCheckIn] = useState(false);
    // const [layouts, setLayouts] = useState([]);
    // const [layoutSelected, setLayoutSelected] = useState('');
    const [masters, setMasters] = useState([]);
    const [objects, setObjects] = useState([]);
    const [objectCode, setObjectCode] = useState({});
    const [objSelected, setObjSelected] = useState({})
    const [layoutSelected, setLayoutSelected] = useState({});
    // const [inpEmpCode,setInpEmpCode] = useState()
    const ThemeTrue = {
        bg: ['#ffd496', '#bba17a', '#b88a45'],
        text: '#333333'
    }
    const ThemeFalse = {
        bg: ['#c82700 ', '#6d1803', '#6d210f'],
        text: '#white'
    }
    // const dispatch = useDispatch();
    let svgContent = '';
    useEffect(() => {
        init();
        if (!openCheckIn) {
            setObjSelected({});
        }
    }, [openCheckIn]);

    const init = async () => {
        const api_layout_detail = await API_GET_LAYOUT(layout);
        if (api_layout_detail != null && api_layout_detail.length) {
            setLayoutSelected(api_layout_detail[0]);
            const res = await intialData();
        }
    }
    const intialData = async () => {
        // const listLayout = await API_GET_LAYOUT();
        // if (layoutSelected == '') {
        //     setLayoutSelected(listLayout[0])
        //     dispatch({ type: 'UPDATE_LAYOUT', payload: listLayout[0] })
        // }
        const listMaster = await API_GET_MASTER();
        const object = await API_GET_OBJECT_OF_LAYOUT({
            layoutCode: layout
        });
        setMasters(listMaster);
        // setLayouts(listLayout);
        setObjects(object);
        svgContent = document.querySelector("#svgContent");
        svgContent.innerHTML = "";
        let svgMaster = '';
        let svg = '';
        object.map((elObj) => {
            // let masterItem = listMaster.filter((elMaster) => {
            //     return elMaster.objMasterId == elObj.objMasterId
            // })
            // masterItem = masterItem.length ? masterItem[0] : {};
            svgMaster = elObj.objSvg;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let i = 0;
            let x = i * 100;
            if (elObj.objSvg.includes('animateMotion')) {
                const itemSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                elObj.objSvg = elObj.objSvg.replace("<defs>", "");
                elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
                elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);

                elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);
                elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);


                elObj.objSvg = elObj.objSvg.replace("{txtMQ}", elObj.empCode);
                (elObj.mq == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                    elObj.objSvg = elObj.objSvg.replace(`{bg${indexTheme}MQ}`, theme);
                })

                elObj.objSvg = elObj.objSvg.replace("{txtSA}", elObj.empCode);
                (elObj.sa == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                    elObj.objSvg = elObj.objSvg.replace(`{bg${indexTheme}SA}`, theme);
                })

                elObj.objSvg = elObj.objSvg.replace("{txtOT}", elObj.empCode);
                (elObj.ot == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                    elObj.objSvg = elObj.objSvg.replace(`{bg${indexTheme}OT}`, theme);
                })


                elObj.objSvg = elObj.objSvg.replace("{empImage}", elObj.empImage);

                // elObj.objSvg = elObj.objSvg.replace("{title_color_bg}", elObj.empcode != '' ? 'green' : 'red');
                itemSvg.innerHTML = elObj.objSvg;
                itemSvg.setAttribute('id', elObj.objCode);
                itemSvg.setAttribute('x', elObj.objX);
                itemSvg.setAttribute('y', elObj.objY);
                itemSvg.addEventListener('click', function () {
                    setObjSelected(elObj);
                    setOpenCheckIn(true);
                })
                svg.appendChild(itemSvg);
            } else {
                svgMaster = svgMaster.replace("{objName}", elObj.objTitle);
                svgMaster = svgMaster.replace("{empcode}", elObj.empcode);
                svgMaster = svgMaster.replace("{title_color_bg}", elObj.empcode != '' ? 'green' : 'red');
                const blob = new Blob([svgMaster], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                use.setAttribute('href', url + '#' + elObj.objMasterId);
                use.setAttribute('id', elObj.objCode);
                use.setAttribute('x', elObj.objX);
                use.setAttribute('y', elObj.objY);
                use.addEventListener('click', function () {
                    if (elObj.objType == 'MP') {
                        setObjSelected(elObj);
                        setOpenCheckIn(true);
                    }
                })
                svg.appendChild(use);
            }
            svgContent.appendChild(svg);
        });
        return true;
    }




    async function refreshObject(objCode) {
        objCode = 'MP2311090099';
        const res = await API_GET_OBJECT_INFO({ objCode: objCode });
        let svg = document.querySelector(`svg#${objCode} image`).setAttribute('href', '');
        svg.querySelector(`#objName tspan`).innerHTML  = '';
        svg.querySelector(`#objName tspan`).innerHTML  = '';
    }
    return (
        <div className='h-[100%] w-[100%] bg-white flex  '>
            <input type='hidden' id='inpObjCode' value={objSelected.objCode}></input>
            <input type='hidden' id='inpLayoutCode' value={layout}></input>
            <input type='hidden' id='inpEmpCode' value={''}></input>
            <input type='hidden' id='disEmpCode' value={objSelected.empCode}></input>
            <input type='hidden' id='inpYMD' value={''}></input>
            <input type='hidden' id='inpShift' value={''}></input>
            <input type='hidden' id='inpType' value={''} ></input>
            
            <Button variant='contained' onClick={refreshObject}>refresh</Button>
            <Stack sx={{ width: '100%' }}>
                <div className='h-[5%] flex items-center justify-center shadow-sm text-xl' >
                    {layoutSelected.layoutName} ({layoutSelected.layoutCode})
                </div>
                <div className='h-[95%] flex items-center'>
                    <svg id='svgContent' viewBox={`0 0 1200 500`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    </svg>
                </div>
            </Stack>
            <DialogCheckin open={openCheckIn} close={setOpenCheckIn} objectCode={objectCode} data={objSelected} setData={setObjSelected} refObj={refreshObject} />
        </div >
    )
}
export default ManpowerView