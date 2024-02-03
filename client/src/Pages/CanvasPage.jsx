import React, {useEffect, useRef, useState} from 'react';
import HorToolbar from "../Components/HorToolbar";
import VertToolbar from "../Components/VertToolbar";
import Canvas from "../Components/Canvas";
import {useNavigate, useParams} from "react-router-dom";
import canvasState from "../Store/CanvasState";

const CanvasPage = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [chatActive, setChatActive] = useState(false);
    const [canvasUrl, setCanvasUrl] = useState(null);

    const params = useParams();
    const socket = useRef();
    const navigate = useNavigate();

    // Закрытие вкладки
    window.onunload = () => {
        if (canvasState.username){
            canvasState.socket.send(JSON.stringify({
                method: 'close',
                id: canvasState.session,
                username: canvasState.username
            }))
        }
        canvasState.socket.close();
    }

    // Проверка ID комнаты
    useEffect(() => {
        let id = params.id;
        socket.current = new WebSocket(`ws://localhost:3000/`);

        socket.current.onopen = () => {
            socket.current.send(JSON.stringify({
                id: id,
                method: "join"
            }))
            console.log('opened')
        }

        socket.current.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method){
                case 'checkRoom':
                    if (!msg.connect)
                        navigate(`/`);
                    else{
                        canvasState.setSocket(socket.current)
                        canvasState.setSession(params.id);

                        canvasState.socket.send(JSON.stringify({
                            method: 'getCanvas',
                            id: params.id,
                        }))

                        canvasState.socket.onmessage = (event) => {
                            let msg = JSON.parse(event.data);
                            switch (msg.method) {
                                case 'getCanvas':
                                    setCanvasUrl(msg.url);
                                    break;
                            }
                        }
                    }
                    break;
            }
        }
    }, [params.id]);

    return (
        <div>
            <HorToolbar width={width} height={height} chatActive={chatActive} setChatActive={setChatActive}/>
            <div style = {{display: 'flex'}}>
                <VertToolbar />
                <Canvas canvasUrl = {canvasUrl} setWidth={setWidth} setHeight={setHeight} chatActive={chatActive}/>
            </div>
            <input id = 'test' style = {{display: 'none', position: 'absolute'}}/>
        </div>
    );
};

export default CanvasPage;