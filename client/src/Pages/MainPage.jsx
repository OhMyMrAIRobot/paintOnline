import React, {useState} from 'react';
import "../Resources/Styles/Mainpage.css"
import {useNavigate} from "react-router-dom";
import JoinModal from "../Components/Modals/JoinModal";
import {CreateRoomHandler} from "../Handlers/CreateRoomHandler";

const MainPage = () => {
    const navigate = useNavigate();
    const [ModalActive, setModalActive] = useState(false);

    const jumpToRoom = (id) => {
        navigate(`/${id}`);
    }

    const createRoom = () => {
        CreateRoomHandler()
            .then((res) => {
                jumpToRoom(res.data.id)
            })
            .catch((e) => console.log(e))
    }

    return (
        <div className = "main">

            <JoinModal ModalActive={ModalActive} setModalActive={setModalActive} jumpToRoom={jumpToRoom}/>

            <div className = "mainContainer">
                <button
                    className = "mainButton"
                    onClick={() => createRoom()}
                >
                    Create room
                </button>
                <button
                    className = "mainButton"
                    onClick={() => setModalActive(true)}
                >
                    Join room
                </button>
            </div>
        </div>
    );
};

export default MainPage;