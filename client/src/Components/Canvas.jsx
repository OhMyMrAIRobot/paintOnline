import React, {useEffect, useRef, useState} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";
import brush from "../Tools/Brush";
import {useParams} from "react-router-dom";
import Chat from "./Chat";
import UsernameModal from "./UsernameModal";
import {messageHandler} from "../Handlers/MessageHandler";
import {sendMessage} from "../Handlers/SendHandler";
import {InitialiseCanvas} from "../Handlers/InitialiseCanvasHandler";

const initialiseTools = () => {
    //toolState.setTool(new brush(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(1);
    toolState.setFont("16px Arial");
}

const Canvas = observer(({setWidth, setHeight, chatActive}) => {
    const params = useParams();

    const CanvasRef = useRef();
    const UsernameRef = useRef();

    const [msgArr, setMsgArr] = useState([]);
    const [modalActive, setModalActive] = useState(true);

    // обработка подключений и сообщений
    useEffect(() => {
        canvasState.setCanvas(CanvasRef.current);

        if (canvasState.username){
            initialiseTools();
            sendMessage(canvasState.socket,{id:params.id, method: "connection", username: canvasState.username})
            messageHandler(setMsgArr, canvasState.canvas, setWidth, setHeight);
        }

    }, [canvasState.username])

    // Сохранение полотна для отмены
    const MouseDownHandler = () => {
        sendMessage(canvasState.socket,{id: params.id, method: 'pushUndo', data: canvasState.canvas.toDataURL()})
    }

    // Сохранение полотна на сервер
    const MouseUpHandler = () => {
        sendMessage(canvasState.socket,{
            id: params.id,
            method: 'saveCanvas',
            data: canvasState.canvas.toDataURL(),
            width: canvasState.canvas.width,
            height: canvasState.canvas.height,
        })
    }

    // инициализация полотна
    const connectionHandler = () => {
        InitialiseCanvas(canvasState.canvas, setWidth, setHeight, UsernameRef.current.value, params.id);
    }

    return (
        <>
            <UsernameModal
                setModalActive={setModalActive}
                UsernameRef={UsernameRef}
                modalActive={modalActive}
                connectionHandler={connectionHandler}
            />

            <div className = "canvas">
                <canvas
                    ref = {CanvasRef}
                    height = '0px'
                    width = '0px'
                    onMouseDown={() => MouseDownHandler()}
                    onMouseUp={() => MouseUpHandler()}
                >
                </canvas>

            </div>

            <Chat socket={canvasState.socket} username={canvasState.username} msgArray = {msgArr} chatActive={chatActive}/>
        </>

    );
});

export default Canvas;