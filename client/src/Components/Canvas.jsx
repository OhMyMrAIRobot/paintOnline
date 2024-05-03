import React, {useEffect, useRef} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import {sendMessage} from "../Handlers/SendHandler";

const Canvas = observer(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, [])

    // Сохранение полотна для отмены
    const MouseDownHandler = () => {
        sendMessage(canvasState.socket,{
            method: 'pushUndo',
            id: canvasState.session,
            data: canvasState.canvas.toDataURL()
        })
    }

    // Сохранение полотна на сервер
    const MouseUpHandler = () => {
        sendMessage(canvasState.socket,{
            method: 'saveCanvas',
            id: canvasState.session,
            data: canvasState.canvas.toDataURL(),
            width: canvasState.canvas.width,
            height: canvasState.canvas.height,
        })
    }

    return (
        <canvas
            className="canvas"
            ref={canvasRef}
            height='0px'
            width='0px'
            onMouseDown={() => MouseDownHandler()}
            onMouseUp={() => MouseUpHandler()}
        >
        </canvas>
    );
});

export default Canvas;