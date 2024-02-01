import React, {useEffect, useRef, useState} from 'react';
import HorToolbar from "../Components/HorToolbar";
import VertToolbar from "../Components/VertToolbar";
import Canvas from "../Components/Canvas";
import Chat from "../Components/Chat";
import {useNavigate, useParams} from "react-router-dom";

const CanvasPage = () => {

    const params = useParams();
    const socket = useRef();
    const navigate = useNavigate();
    const ref = useRef({width: 0, height: 0});

    console.log(ref.current);
    useEffect(() => {
        let id = params.id
        socket.current = new WebSocket(`ws://localhost:3000/`);

        socket.current.onopen = () => {
            socket.current.send(JSON.stringify({
                id: id,
                method: "join"
            }))
        }

        socket.current.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method){
                case 'checkRoom':
                    if (!msg.connect)
                        navigate(`/`);
                    break;
            }
        }
    }, []);

    return (
        <div>
            <HorToolbar/>
            <div style = {{display: 'flex'}}>
                <VertToolbar/>
                <Canvas socket = {socket}/>
            </div>
            <input id = 'test' style = {{display: 'none', position: 'absolute'}}/>

        </div>
    );
};

export default CanvasPage;