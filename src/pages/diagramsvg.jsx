import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { GetPoint, InsertPoint, servGetEquipment } from "../Service";
function DiagramSVG() {
    const [mousePos, setMousePos] = useState({});
    const [equipment, setEquipment] = useState();
    const [point, setPoint] = useState();
    const [ObjSelected, setObjSelected] = useState();
    const [state, setState] = useState('');
    const [svgAxis, setSvgAxis] = useState({ x: 0, y: 15 });
    const [nameObj, setNameObj] = useState('');
    const [wObj, setWObj] = useState(0);
    const [hObj, setHObj] = useState(0);
    const [descObj, setDescObj] = useState('');
    const [translateCursor, setTranslateCursor] = useState();
    const [openAddMaster, setOpenAddMaster] = useState(false);
    const API = import.meta.env.VITE_API;
    // const reducer = useSelector((state) => state.reducer);
    // const dispatch = useDispatch();
    useEffect(() => {

        // insertSvg();
        FetchObject();
        getEquipment();
        const handleMouseMove = (event) => {
            const svg = document.getElementById('svg_selected')
            const w = svg?.getAttribute('w');
            const h = svg?.getAttribute('h');
            setMousePos({ x: event.offsetX, y: event.offsetY });
            setSvgAxis({ x: event.offsetX, y: event.offsetY });
            setTranslateCursor('translate(' + (event.offsetX - (w / 2)) + ',' + (event.offsetY - (h / 2)) + ')  ')

        };
        const svgLayout = document.getElementById('svg_layout')
        svgLayout?.addEventListener('mousemove', handleMouseMove);
        // let svg = document.querySelector("#svg_layout");
        // let rects = document.querySelectorAll("rect");
        // rects.forEach(rect => {
        //     rect.addEventListener("mouseenter", e => {
        //         svg?.appendChild(rect);
        //     });
        // });
        return () => {
            svgLayout?.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    const FetchObject = () => {
        servGetEquipment().then((res) => {
            setEquipment(res);
        })
    }
    const getEquipment = () => {
        GetPoint().then((result) => {
            setPoint(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    const AddPoint = async () => {
        // if (objSelected.objType == 'LINE' && objSelected.objAxis == 'X') {
        //     data = { objId: objSelected.objId, posId: 0, posX: mousePos.x, posY: mousePos.y, posW: (mousePos.x + parseInt(objSelected.objW)), posH: mousePos.y, posName: 'TEST', status: 'ACTIVE' }
        // } else if (objSelected.objType == 'LINE' && objSelected.objAxis == 'Y') {
        //     data = { objId: objSelected.objId, posId: 0, posX: mousePos.x, posY: mousePos.y, posW: mousePos.x, posH: mousePos.y + parseInt(objSelected.objH), posName: 'TEST', status: 'ACTIVE' }
        // } else {
        if (ObjSelected != null) {
            const svg = document.getElementById('svg_selected');
            const w = svg?.getAttribute('w');
            const h = svg?.getAttribute('h');
            let data = { ObjId: ObjSelected.objId, PosX: (mousePos.x - (w / 2)), PosY: (mousePos.y - (h / 2)), PosW: ObjSelected.objW, PosH: ObjSelected.objH, PosName: 'TEST', Status: 'ACTIVE', }
            if ((state == '' || state == 'add')) {
                let insertPoint = await InsertPoint(data);
                if (insertPoint.status) {
                    getEquipment();
                }
            }
        }
    }
    const RemovePoint = (posId) => {
        if (state == 'remove') {
            axios.get(`${API}/removepoint/${posId}`).then((res) => {
                getEquipment();
            }).catch((error) => {
                alert(error);
            });
        }
    }
    const initSVGpoint = (item, index = 0) => {
        switch (item.type) {
            case 'REAT':
                return <>
                    <text fill="red" x={item.x} y={item.y}>{item.name}</text>
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} style={{ stroke: 'black', strokeWidth: '1' }} fill='white' />
                </>
            case 'CIRCLE':
                return <circle cx={item.x} cy={item.y} r={item.r} style={{ stroke: 'black', strokeWidth: '1' }} fill="red" />
            case 'LINE':
                if (item.axis == 'X') { // เส้นตรง แนวนอน
                    return <>
                        {/* <text fill="red" x={item.x} y={item.y}>x = {item.x}, w={item.w}, y={item.y}, h={item.h}</text> */}
                        <line x1={item.x} y1={item.y} x2={item.w} y2={item.y} style={{ stroke: 'black', strokeWidth: 3 }} />
                    </>
                } else { // เส้นตรง แนวตั้ง
                    return <>
                        {/* <text fill="green" x={item.x} y={item.y}>x = {item.x}, w={item.w}, y={item.y}, h={item.h}</text> */}
                        <line x1={item.x} y1={item.y} x2={item.x} y2={item.h} style={{ stroke: 'black', strokeWidth: 3 }} />
                    </>
                }
            default:
                break;
        }
    }

    function clearPoint() {
        axios.get(`${API}/clearpoint`).then((res) => {
            getEquipment();
        }).then((error) => {
            console.log(error);
        })
    }
    function insertSvg() {
        if (nameObj.trim().length > 0 && descObj.trim().length) {
            axios.post(`${API}/insertpoint`, { title: nameObj, code: descObj, w: wObj, h: hObj }).then((res) => {
                FetchObject();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function removeSvg(objId) {
        axios.get(`${API}/removeobject/${objId}`).then((res) => {
            FetchObject();
        })
    }

    return (
        <div className="p-3">
        </div>
    );
}
export default DiagramSVG;