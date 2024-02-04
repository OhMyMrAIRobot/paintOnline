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

const initialiseTools = (CanvasRef) => {
    toolState.setTool(new brush(CanvasRef.current, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(1);
    toolState.setFont("16px Arial");
}

const Canvas = observer(({canvasUrl, setWidth, setHeight, chatActive}) => {
    const params = useParams();

    const CanvasRef = useRef();
    const UsernameRef = useRef();

    const [msgArr, setMsgArr] = useState([]);
    const [modalActive, setModalActive] = useState(true);

    // обработка подключений и сообщений
    useEffect(() => {
        canvasState.setCanvas(CanvasRef.current);

        if (canvasState.username){
            initialiseTools(CanvasRef);
            sendMessage({id:params.id, method: "connection", username: canvasState.username})
            messageHandler(setMsgArr, CanvasRef, setWidth, setHeight);
        }

    }, [canvasState.username])

    // Сохранение полотна для отмены
    const MouseDownHandler = () => {
        sendMessage({id: params.id, method: 'pushUndo', data: CanvasRef.current.toDataURL()})
    }

    // Сохранение полотна на сервер
    const MouseUpHandler = () => {
        sendMessage({id: params.id, method: 'saveCanvas', data: CanvasRef.current.toDataURL()})
    }

    // инициализация полотна
    const connectionHandler = () => {
        sendMessage({id:params.id, method: "initialise"})
        InitialiseCanvas(canvasUrl, CanvasRef, setWidth, setHeight, UsernameRef, params);
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