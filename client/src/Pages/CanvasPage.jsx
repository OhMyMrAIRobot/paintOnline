import React, {useEffect, useRef, useState} from 'react';
import HorToolbar from "../Components/HorToolbar";
import VertToolbar from "../Components/VertToolbar";
import Canvas from "../Components/Canvas";
import {useNavigate, useParams} from "react-router-dom";
import canvasState from "../Store/CanvasState";
import {sendMessage} from "../Handlers/SendHandler";
import {CheckIsRoomValid} from "../Handlers/CheckIsRoomValid";

const CanvasPage = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [chatActive, setChatActive] = useState(false);

    const params = useParams();
    const socket = useRef();
    const navigate = useNavigate();

    // Закрытие вкладки
    window.onunload = () => {
        if (canvasState.username){
            sendMessage(canvasState.socket,{id: canvasState.session, method: 'close', username: canvasState.username})
        }
        canvasState.socket.close();
    }

    // Проверка ID комнаты
    useEffect(() => {
        socket.current = new WebSocket(`ws://localhost:3000/`);

        socket.current.onopen = () => {
            CheckIsRoomValid(params.id)
                .then(() => {
                    canvasState.setSocket(socket.current);
                    canvasState.setSession(params.id);
                })
                .catch(() => {
                    navigate(`/`)
                })

        }
    }, [params.id]);

    return (
        <div>
            <HorToolbar width={width} height={height} chatActive={chatActive} setChatActive={setChatActive}/>
            <div style = {{display: 'flex'}}>
                <VertToolbar />
                <Canvas setWidth={setWidth} setHeight={setHeight} chatActive={chatActive}/>
            </div>
        </div>
    );
};

export default CanvasPage;