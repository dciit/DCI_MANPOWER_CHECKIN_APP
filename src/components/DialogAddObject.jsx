import React, { useEffect } from 'react'
import { Skeleton, Stack } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { API_DELETE_OBJECT, API_GET_MASTER, API_GET_OBJECT_BY_CODE, API_UPDATE_POSITION_OBJ, API_ADD_OBJECT, API_GET_LAYOUT } from '../Service'
import { Button, Input, Modal, Select, Typography } from 'antd'
import { ThemeFalse, ThemeTrue } from '../constants'
const { Paragraph } = Typography;
function DialogAddObject(props) {
    const { open, setOpen } = props;
    const [loading, setLoading] = useState(false);
    const [layout, setLayout] = useState([]);
    const layoutSelected = useSelector(state => state.reducer.layoutFilter);
    const [layoutSelectedOption, setLayoutSelectedOption] = useState('');
    let coord = null;
    let offset = null;
    let selectedElement = null;
    const [object, setObject] = useState({
        layoutCode: '',
        objType: "OTHER",
        objTitle: "",
        objSubTitle: "",
        objX: 0,
        objY: 0,
        objWidth: 0,
        objHeight: 0
    });
    const [masters, setMasters] = useState([]);
    const [masterSelected, setMasterSelected] = useState('');
    const [masterSelectOption, setMasterSelectOption] = useState({});
    const [loadMaster, setLoadMaster] = useState(true);
    useEffect(() => {
        console.log(open)
        if (open) {
            setLoading(false);
            init();
        }
    }, [open])

    async function init() {
        setLoadMaster(true);
        getMaster();
    }
    async function getMaster() {
        const listMaster = await API_GET_MASTER('', layoutSelectedOption);
        if (masterSelected == '') {
            setMasterSelected(listMaster[0].objMasterId);
            let oOption = listMaster.filter(x => x.objMasterId == listMaster[0].objMasterId);
            if (oOption.length) {
                setMasterSelectOption({ label: `${oOption[0].mstName} (${oOption[0].objMasterId})`, value: oOption[0].objMasterId });
                setObject({ ...object, objCode: oOption[0].objMasterId })
            }
        } else {
            let oOption = masters.filter(x => x.objMasterId == masterSelected);
            if (oOption.length) {
                setMasterSelectOption({ label: `${oOption[0].mstName} (${oOption[0].objMasterId})`, value: oOption[0].objMasterId });
                setObject({ ...object, objCode: oOption[0].objMasterId })
            }
        }
        if (listMaster.length == 0) {
            setMasterSelectOption(null);
        }
        setMasters(listMaster);
        setLoadMaster(false);
        setObject({ ...object, layoutCode: layoutSelected?.layoutCode });
    }

    useEffect(() => {
        getMaster();
    }, [layoutSelectedOption])

    useEffect(() => {
        getLayout()
    }, [masters])

    async function getLayout() {
        let apiGetLayout = await API_GET_LAYOUT();
        setLayout(apiGetLayout);
    }

    async function handleAddObject() {
        if (object.objCode == '' || object.objCode == null || object.objTitle == '' || object.objTitle == null || object.layoutCode == '' || object.layoutCode == null) {
            alert('กรุณากรอกข้อมูลให้ครบ !');
        }

        try {
            setLoading(true);
            const res = await API_ADD_OBJECT({
                ...object, objMasterId: object.objCode, layoutCode: layoutSelected?.layoutCode
            });
            console.log(res)
            if (res.status == "1") {
                const getObject = await API_GET_OBJECT_BY_CODE({ objCode: res.msg });
                let svgContent = document.querySelector("#svgContent");
                let svg = '';
                getObject.map((elObj) => {
                    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    let i = 0;
                    if (elObj.objSvg.includes('animateMotion')) {
                        const itemSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        elObj.objSvg = elObj.objSvg.replace("<defs>", "");
                        elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
                        elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);

                        elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);
                        elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);

                        (elObj.mq == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                            elObj.objSvg = elObj.objSvg.replace(`{bgmq}`, theme);
                        });
                        (elObj.sa == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                            elObj.objSvg = elObj.objSvg.replace(`{bgsa}`, theme);
                        });
                        (elObj.ot == 'TRUE' ? ThemeTrue.bg : ThemeFalse.bg).map((theme, indexTheme) => {
                            elObj.objSvg = elObj.objSvg.replace(`{bgot}`, theme);
                        });
                        elObj.objSvg = elObj.objSvg.replace("{empImage}", elObj.empImage);
                        itemSvg.innerHTML = elObj.objSvg;
                        itemSvg.setAttribute('id', elObj.objCode);
                        itemSvg.setAttribute('x', elObj.objX);
                        itemSvg.setAttribute('y', elObj.objY);
                        svg.appendChild(itemSvg);
                    } else {
                        let title = elObj.objTitle;
                        elObj.objSvg = elObj.objSvg.replace("{objName}", title);
                        const itemSvg = document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "svg"
                        );
                        itemSvg.innerHTML = elObj.objSvg;
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
                        const blob = new Blob([itemSvg.innerHTML], { type: 'image/svg+xml' });
                        const url = URL.createObjectURL(blob);
                        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                        use.setAttribute('href', url + '#' + elObj.objMasterId);
                        use.setAttribute('id', elObj.objCode);
                        use.setAttribute('x', elObj.objX);
                        use.setAttribute('y', elObj.objY);
                        svg.appendChild(use);
                    }
                    initDrag(svgContent, svg);
                });
                setLoading(false);
            } else {
                alert('ไม่สามารถเพิ่ม Object ได้ !');
                setLoading(false);
            }
        } catch(e) {
            alert(e.message)
            setLoading(false)
        }
    }
    const initDrag = async (content, svg) => {
        svg.addEventListener('mousedown', startDrag);
        svg.addEventListener('mousemove', moveDrag);
        svg.addEventListener('mouseup', endDrag);
        svg.addEventListener('mouseleave', leaveDrag);
        svg.addEventListener('dblclick', dbClick);
        content.appendChild(svg);
    }
    const dbClick = async (evt) => {
        if (confirm('คุณต้องการลบ ใช่หรือไม่ ?')) {
            let id = evt.target.getAttribute("id");
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
    return (
        <Modal title='เพิ่มส่วนประกอบ' onClose={() => setOpen(false)} onCancel={() => setOpen(false)} open={open} width={800} footer={<div className='gap-2 flex  justify-end'>
            <Button onClick={() => setOpen(false)}>ปิดหน้าต่าง</Button>
            <Button type='primary' onClick={handleAddObject} loading={loadMaster}>เพิ่ม</Button>
        </div>} >
            <div className='mt-3'>
                <strong> <Paragraph copyable={layoutSelected?.layoutCode}>{`${layoutSelected?.layoutCode} (${layoutSelected?.layoutName})`}</Paragraph></strong>
                <div className='flex flex-col gap-1 border rounded-lg '>
                    {
                        loadMaster ? <Skeleton variant='rectangular' height={380} /> : <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-12'>
                                <Typography color={'text.secondary'}>ส่วนประกอบ</Typography>
                                <Select
                                    showSearch
                                    className='w-full'
                                    placeholder="ค้นหาส่วนประกอบที่คุณต้องการ"
                                    onChange={(e) => {
                                        setObject({ ...object, objCode: e });
                                    }}
                                    value={object.objCode ?? ''}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.value.toLowerCase().includes(input.toLowerCase()) ||
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {
                                        masters.map((o, i) => {
                                            return <Select.Option key={i} value={o.objMasterId}>
                                                {`${o.mstName} (${o.objMasterId})`}
                                            </Select.Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className='col-span-12'>
                                <Typography color={'text.secondary'}>ชื่อส่วนประกอบ</Typography>
                                <Input type='text' placeholder='กรุณากรอกชื่อส่วนประกอบ' value={object.objTitle ?? ''} onChange={(e) => setObject({ ...object, objTitle: e.target.value })} />
                            </div>
                            <div className='col-span-12'>
                                <Typography color={'text.secondary'}>รายละเอียด</Typography>
                                <Input type='text' placeholder='กรุณากรอกรายละเอียด' value={object.objSubTitle ?? ''} onChange={(e) => setObject({ ...object, objSubTitle: e.target.value })} />
                            </div>
                            <div className='col-span-12'>
                                <Typography color={'text.secondary'}>ประเภท</Typography>
                                <Select value={object.objType} defaultValue='OTHER' fullWidth onChange={(e) => setObject({ ...object, objType: e })}>
                                    {
                                        ["OTHER", "MP"].map((type, index) => {
                                            return <Select.Option value={type} key={index}>{type}</Select.Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className='col-span-6'>
                                <Stack>
                                    <Typography color={'text.secondary'}>ความกว้าง</Typography>
                                    <Input type='number' placeholder='กรุณาระบุความกว้างของชิ้นงาน' value={object.objWidth} onChange={(e) => setObject({ ...object, objWidth: e.target.value != '' ? parseFloat(e.target.value) : 0 })} />
                                </Stack>
                            </div>
                            <div className='col-span-6'>
                                <Stack>
                                    <Typography color={'text.secondary'}>ความสูง</Typography>
                                    <Input type='number' placeholder='กรุณาระบุความสูงของชิ้นงาน' value={object.objHeight} onChange={(e) => setObject({ ...object, objHeight: e.target.value != '' ? parseFloat(e.target.value) : 0 })} />
                                </Stack>
                            </div>
                        </div>
                    }
                </div>
            </div >
        </Modal >
    )
}

export default DialogAddObject