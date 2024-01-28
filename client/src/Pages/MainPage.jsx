import React, {useEffect, useRef, useState} from 'react';
import "../Style/Mainpage.css"
import {useNavigate} from "react-router-dom";


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