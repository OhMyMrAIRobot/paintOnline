import React, {useEffect, useRef, useState} from 'react';
import HorToolbar from "../Components/HorToolbar";
import VertToolbar from "../Components/VertToolbar";
import Canvas from "../Components/Canvas";
import {useNavigate, useParams} from "react-router-dom";
import canvasState from "../Store/CanvasState";
import {sendMessage} from "../Handlers/SendHandler";
import {CheckIsRoomValid} from "../Handlers/CheckIsRoomValid";
import UsernameModal from "../Components/UsernameModal";
import {MessageHandler} from "../Handlers/MessageHandler";
import {InitialiseCanvas} from "../Handlers/InitialiseCanvasHandler";
import Chat from "../Components/Chat";
import {InitializeTools} from "../Handlers/InitializeTools";

const CanvasPage = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [chatActive, setChatActive] = useState(false);
    const [msgArr, setMsgArr] = useState([]);
    const [usernameModalActive, setUsernameModalActive] = useState(true);

    const params = useParams();
    const socket = useRef();
    const navigate = useNavigate();

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

    // Закрытие вкладки
    window.onunload = () => {
        if (canvasState.username){
            sendMessage(canvasState.socket,{
                id: canvasState.session,
                method: 'close',
                username: canvasState.username})
        }
        canvasState.socket.close();
    }

    useEffect(() => {
        if (canvasState.username){
           // InitialiseCanvas(canvasState.canvas, setWidth, setHeight, canvasState.username, canvasState.session);
            InitializeTools();
            sendMessage(canvasState.socket,{
                method: "connection",
                id:params.id,
                username: canvasState.username
            })
            MessageHandler(setMsgArr, setWidth, setHeight);
        }
    }, [canvasState.username])

    return (
        <div>
            <UsernameModal
                setModalActive={setUsernameModalActive}
                modalActive={usernameModalActive}
            />
            <HorToolbar
                width={width}
                height={height}
                chatActive={chatActive}
                setChatActive={setChatActive}/>
            <div style = {{display: 'flex'}}>
                <VertToolbar />
                <Canvas
                    setWidth={setWidth}
                    setHeight={setHeight}
                    chatActive={chatActive}
                />
            </div>
            <Chat
                socket={canvasState.socket}
                username={canvasState.username}
                msgArray={msgArr}
                chatActive={chatActive}
            />
        </div>
    );
};

export default CanvasPage;