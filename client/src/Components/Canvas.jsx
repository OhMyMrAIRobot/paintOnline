import React, {useEffect, useRef, useState} from 'react';
import '../Resources/Styles/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";

const Canvas = observer(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, [])

    return (
        <svg
            id="canvas"
            className = "canvas"
            ref={canvasRef}
            style={{background: canvasState.background, width: canvasState.width, height: canvasState.height}}
            >
        </svg>
    );
});

export default Canvas;