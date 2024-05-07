import React, {useEffect, useRef, useState} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import {sendMessage} from "../Handlers/SendHandler";
import {InitialiseCanvas} from "../Handlers/InitialiseCanvasHandler";
import axios from "axios";

const Canvas = observer(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, [])

    const MouseUpHandler = () => {
        // undo
    }


    return (
        <svg
            id="canvas"
            className = "canvas"
            ref={canvasRef}
            style={{background: canvasState.background, width: canvasState.width, height: canvasState.height}}
            onMouseUp={() => MouseUpHandler()}
            >
        </svg>
    );
});

export default Canvas;