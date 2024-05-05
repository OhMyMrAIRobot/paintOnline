import React, {useEffect, useRef, useState} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import {useNavigate} from "react-router-dom";
import '../Style/InviteModal.css'
import InviteModal from "./InviteModal";
import {sendMessage} from "../Handlers/SendHandler";

const HorToolbar = ({width, height, chatActive, setChatActive}) => {
    const fontSizeRef = useRef(null);
    const fontFamilyRef = useRef(null);
    const widthRef = useRef(null);
    const heightRef = useRef(null);

    const navigate = useNavigate()

    const [ModalActive, setModalActive] = useState(false)

    // обновление размера полотна в тулбаре
    useEffect(() => {
        widthRef.current.value = width;
        heightRef.current.value = height;
    }, [width, height]);

    const ChangeFontSizeHandler = () => {
        toolState.setFontSize(fontSizeRef.current.value);
    }

    const ChangeFontFamilyHandler = () => {
        toolState.setFontFamily(fontFamilyRef.current.value)
    }

    // обновление размера полотна
    const changeResolutionHandler = () => {
        sendMessage(canvasState.socket,{
            method: 'changeResolution',
            id: canvasState.session,
            width: widthRef.current.value,
            height: heightRef.current.value
        })
    }

    // обновление цвета полотна
    const changeBackgroundHandler = (color) => {
        sendMessage(canvasState.socket,{
            id: canvasState.session,
            method: 'changeBackground',
            color: color
        })
    }

    // обработка нажатия на кнопку выйти
    const leaveRoomHandler = () => {
        sendMessage(canvasState.socket,{
            method: 'close',
            id: canvasState.session,
            username: canvasState.username
        })
        canvasState.socket.close();
        navigate('/');
    }

    return (
        <div>
            <InviteModal ModalActive={ModalActive} setModalActive={setModalActive}/>

            <div id = "hor" className = "horToolbar">

                <input
                    type = "number"
                    min = {1}
                    max = {100}
                    defaultValue={1}
                    onChange={e => toolState.setStrokeWidth(e.target.value)}
                />

                <input
                    type = "color"
                    defaultValue = "#000000"
                    onChange={e => toolState.setStrokeColor(e.target.value)}
                />

                <input
                    type = "color"
                    defaultValue = "#FFFFFF"
                    onChange={e => toolState.setFillColor(e.target.value)}
                />

                <input
                    ref = {fontSizeRef}
                    type = "number"
                    min = {1}
                    max = {50}
                    defaultValue={16}
                    onChange={() => ChangeFontSizeHandler()}
                />

                <select
                    ref={fontFamilyRef}
                    onChange={() => ChangeFontFamilyHandler()}
                >
                    <option value = "Arial">Arial</option>
                    <option value = "Helvetica">Helvetica</option>
                    <option value = "Times New Roman">Times New Roman</option>
                </select>

                <input
                    ref = {widthRef}
                    type = "number"
                    min = {100}
                    max = {5000}
                    defaultValue = "0"
                />

                <input
                    ref = {heightRef}
                    type = "number"
                    min = {100}
                    max = {5000}
                    defaultValue = "0"
                />

                <button onClick={() => changeResolutionHandler()}>change</button>

                <input
                    type = "color"
                    defaultValue = "#FFFFFF"
                    onChange={(e) => changeBackgroundHandler(e.target.value)}
                />

                <div className = "buttonChatContainer">
                    <span id = "newMsgSpan" className = "newMsgSpan"></span>
                    <button className = "buttonChat"
                        onClick = {() => {
                            setChatActive(!chatActive);
                            document.getElementById('newMsgSpan').style.opacity = '0';
                        }}
                    >
                        Chat
                    </button>
                </div>

                <button
                    className = "buttonInvite"
                    onClick = {() => setModalActive(true)}
                >
                    Invite friends
                </button>

                <button
                    className = "buttonLeave"
                    onClick={() => leaveRoomHandler()}
                >
                    Leave
                </button>

            </div>
        </div>
    );
};

export default HorToolbar;