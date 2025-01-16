import { Stage, Layer, Text, Image, Group, Rect } from "react-konva";
import React, { Component, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import useImage from 'use-image';
import { API_GET_LAYOUT_DETAIL, API_GET_OBJECT_OF_LAYOUT } from "../Service";


const LoadImage = ({ obj }) => {
    obj.objSvg = obj.objSvg.replace('{objTitle}',obj.objTitle);
    obj.objSvg = obj.objSvg.replace('{objEmpcode}',obj.empCode);
    obj.objSvg = obj.objSvg.replace('{empImage}','https://konvajs.org/assets/lion.png')
    console.log(obj)
    const [loadImage] = useImage(`data:image/svg+xml,${encodeURIComponent(obj.objSvg)}`);
    return <Image image={loadImage} x={obj.objX} y={obj.objY} draggable onClick={()=>alert('123')}
        onDragStart={() => {
            setRectProps({
                draggable: true,
            });
        }}
        onDragEnd={(e) => console.log(e)} />;
};

function MPLayoutEdit() {
    const [once, setOnce] = useState(1);
    const [layoutInfo, setLayoutInfo] = useState({});
    const [objects, setObjects] = useState([]);
    const [rectProps, setRectProps] = useState({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: 'red',
        draggable: true,
    });


    const handleDragEnd = (e) => {
        setRectProps({
            ...rectProps,
            x: e.target.x(),
            y: e.target.y(),
        });
    };
    useEffect(() => {
        console.log(rectProps)
    }, [rectProps])
    useEffect(() => {
        if (once) {
            initLayout();
            setOnce(0);
        }
    }, [once])
    const initLayout = async () => {
        let RESGetLayoutDetail = await API_GET_LAYOUT_DETAIL('LAY23011');
        setLayoutInfo(RESGetLayoutDetail);
        let RESGetObjectByLayout = await API_GET_OBJECT_OF_LAYOUT({ layoutCode: 'LAY23011' });
        setObjects(RESGetObjectByLayout)
    }
    useEffect(() => {
        if (objects.length > 0) {
        }
    }, [objects])

    return (
        <div className="flex items-center justify-center">
            <Stage width={layoutInfo.width} height={layoutInfo.height}>
                <Layer>
                    {/* <Text
                        text="Draggable Text"
                        x={rectProps.x}
                        y={rectProps.y}
                        draggable
                        fill={rectProps.draggable ? 'green' : 'black'}
                        onDragStart={() => {
                            setRectProps({
                                draggable: true,
                            });
                        }}
                        onDragEnd={(e) => handleDragEnd(e)}
                    /> */}
                    {
                        objects.map((obj, key) => {
                            return (
                                <LoadImage obj={obj} />
                            )
                        })
                    }
                </Layer>
            </Stage>
        </div>
    )
}

export default MPLayoutEdit