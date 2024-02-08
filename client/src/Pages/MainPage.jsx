import React, {useRef, useState} from 'react';
import "../Style/Mainpage.css"
import {useNavigate} from "react-router-dom";
import JoinModal from "../Components/JoinModal";
import {CreateRoomHandler} from "../Handlers/CreateRoomHandler";

const MainPage = () => {
    const inputRef = useRef()

    const navigate = useNavigate();

    const [ModalActive, setModalActive] = useState(false);

    // Переход к комнате
    const jumpToRoom = (id) => {
        navigate(`/${id}`);
    }

    return (
        <div className = "main">

            <JoinModal inputRef={inputRef} ModalActive={ModalActive} setModalActive={setModalActive} jumpToRoom={jumpToRoom}/>

            <div className = "main-container">
                <button
                    className = "main-button"
                    onClick={() => CreateRoomHandler(jumpToRoom)}
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