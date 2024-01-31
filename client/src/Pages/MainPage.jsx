import React, {useEffect, useRef, useState} from 'react';
import "../Style/Mainpage.css"
import {useNavigate} from "react-router-dom";
import Modal from "../Components/Modal";
import "../Style/JoinModal.css"


const MainPage = () => {
    const socket = useRef()
    const inputRef = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        socket.current = new WebSocket(`ws://localhost:3000/`);
    }, []);

    const jumpToRoom = (id) => {
        navigate(`/${id}`);
    }

    const CreateRoomHandler = () => {
        let id = (+ new Date).toString(16)
        jumpToRoom(id);
            socket.current.send(JSON.stringify({
                id: id,
                method: "createRoom"
            }))
    }

    const [ModalActive, setModalActive] = useState(false);

    const JoinRoomHandler = () => {
        let id = inputRef.current.value;
        socket.current.send(JSON.stringify({
            id: id,
            method: "join"
        }))

        socket.current.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method){
                case 'checkRoom':
                    if (msg.connect)
                        jumpToRoom(id)
                    else
                        inputRef.current.style.borderColor = "red"
                    break;
            }
        }
    }

    return (
        <div className = "main">

            <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
                <div className = "join_modal">
                    <p className = "join_modal_text">Enter room's ID:</p>
                    <input className = "join_modal_input" ref = {inputRef} type = 'text'
                           onChange={(e) => {
                               e.target.value !== '' ?
                                   inputRef.current.style.borderColor = "green"
                                   :
                                   inputRef.current.style.borderColor = "red"
                           }}
                    />
                    <div className={"join_modal_button_container"}>
                        <button className = "join_modal_button exit" onClick={e => setModalActive(false)}>Cancel</button>
                        <button className = "join_modal_button join" onClick={JoinRoomHandler}>Join</button>
                    </div>
                </div>
            </Modal>

            <div className = "main-container">
                <button
                    className = "main-button"
                    onClick={() => CreateRoomHandler()}
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