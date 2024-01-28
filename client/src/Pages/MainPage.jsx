import React, {useRef, useState} from 'react';
import "../Style/Mainpage.css"
import {useNavigate} from "react-router-dom";


const MainPage = () => {
    const socket = new WebSocket(`ws://localhost:3000/`);
    const inputRef = useRef()
    const navigate = useNavigate();

    const jumpToRoom = (id) => {
        navigate(`/${id}`);
    }

    const CreateRoomHandler = () => {
        let id = (+new Date).toString(16)
        jumpToRoom(id);
            socket.send(JSON.stringify({
                id: id,
                method: "createRoom"
            }))
    }

    const JoinRoomHandler = () => {
        let id = inputRef.current.value;
        socket.send(JSON.stringify({
            id: id,
            method: "join"
        }))

        socket.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method){
                case 'checkRoom':
                    if (msg.connect)
                        jumpToRoom(id)
                    break;
            }
        }
    }

    return (
        <div className = "main">
            <input
                ref = {inputRef}
                style={{
                    position: 'absolute',
                }}
            />
            <div className = "main-container">
                <button
                    className = "main-button"
                    onClick={() => CreateRoomHandler()}
                >
                    Create room
                </button>
                <button
                    className = "main-button"
                    onClick={() => JoinRoomHandler()}
                >
                    Join room
                </button>
            </div>
        </div>
    );
};

export default MainPage;