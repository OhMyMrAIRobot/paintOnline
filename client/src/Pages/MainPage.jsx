import React, {useEffect, useRef, useState} from 'react';
import "../Style/Mainpage.css"
import {useNavigate} from "react-router-dom";
import JoinModal from "../Components/JoinModal";
import {CreateRoomHandler} from "../Handlers/CreateRoomHandler";
import {JoinRoomHandler} from "../Handlers/JoinRoomHandler";

const MainPage = () => {
    const socket = useRef()
    const inputRef = useRef()

    const navigate = useNavigate();

    const [ModalActive, setModalActive] = useState(false);

    // Создание сокета на главной странице
    useEffect(() => {
        socket.current = new WebSocket(`ws://localhost:3000/`);
    }, []);

    // Переход к комнате
    const jumpToRoom = (id) => {
        navigate(`/${id}`);
    }

    return (
        <div className = "main">

            <JoinModal inputRef={inputRef} ModalActive={ModalActive} setModalActive={setModalActive} socket={socket} jumpToRoom={jumpToRoom}/>

            <div className = "main-container">
                <button
                    className = "main-button"
                    onClick={() => CreateRoomHandler(jumpToRoom, socket.current)}
                >
                    Create room
                </button>
                <button
                    className = "main-button"
                    onClick={() => setModalActive(true)}
                >
                    Join room
                </button>
            </div>
        </div>
    );
};

export default MainPage;