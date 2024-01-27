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
        toolState.setTool(new brush(CanvasRef.current))
        toolState.setFillColor("#FFFFFF");
        toolState.setStrokeColor("#000000");
        toolState.setLineWidth(1);
        toolState.setFont("16px Arial");
    }, []);

    const MouseDownHandler = () => {
        canvasState.pushToUndo(CanvasRef.current.toDataURL())
    }

    return (
        <div className = "canvas">
            <canvas
                height = {window.innerHeight - 100}
                width = {window.innerWidth - 100}
                ref = {CanvasRef}
                onMouseDown={() => MouseDownHandler()}
            >
            </canvas>
        </div>
    );
});

export default Canvas;