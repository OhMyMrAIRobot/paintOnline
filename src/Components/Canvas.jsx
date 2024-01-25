import React, {useEffect, useRef} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";
import brush from "../Tools/Brush";

const Canvas = observer(() => {

    const CanvasRef = useRef();

    useEffect(() => {
        canvasState.setCanvas(CanvasRef.current);
      //  toolState.setTool(new brush(CanvasRef.current))
    }, []);

    return (
        <div className = "canvas">
            <canvas
                height = '500'
                width = '500'
                ref = {CanvasRef}
            >
            </canvas>
        </div>
    );
});

export default Canvas;