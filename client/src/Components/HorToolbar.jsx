import React, {useEffect, useRef, useState} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";
import '../Style/InviteModal.css'
import InviteModal from "./InviteModal";
import {set} from "mobx";

const HorToolbar = ({width, height}) => {
    const fontSizeRef = useRef();
    const fontFamilyRef = useRef();
    const widthRef = useRef();
    const heightRef = useRef();

    // обновление размера полотна в тулбаре
    useEffect(() => {
        widthRef.current.value = width;
        heightRef.current.value = height;
    }, [width, height]);

    const ChangeFontHandler = () => {
        toolState.setFont(`${fontSizeRef.current.value}px ${fontFamilyRef.current.value}`);
    }

    const changeResolutionHandler = () => {
        canvasState.socket.send(JSON.stringify({
            id: canvasState.session,
            method: 'changeResolution',
            width: widthRef.current.value,
            height: heightRef.current.value,
        }))
    }

    const changeBackgroundHandler = (color) => {
        canvasState.socket.send(JSON.stringify({
            id: canvasState.session,
            method: 'changeBackground',
            color: color,
        }))
    }

    const navigate = useNavigate()

    const leaveRoomHandler = () => {
        canvasState.socket.send(JSON.stringify({
            method: 'close',
            id: canvasState.session,
            username: canvasState.username
        }))
        canvasState.socket.close();
        navigate('/'); navigate(0);
    }

    const [ModalActive, setModalActive] = useState(false)

    return (
        <div>
            <InviteModal ModalActive={ModalActive} setModalActive={setModalActive}/>

            <div id = "hor" className = "toolbar-w">

                {/*Ширина линии*/}
                <input
                    type = "number"
                    min = {1}
                    max = {100}
                    defaultValue={1}
                    onChange={e => toolState.setLineWidth(e.target.value)}
                />

                {/*Цвет линии*/}
                <input
                    type = "color"
                    defaultValue = "#000000"
                    onChange={e => toolState.setStrokeColor(e.target.value)}
                />

                {/*Цвет заливки*/}
                <input
                    type = "color"
                    defaultValue = "#FFFFFF"
                    onChange={e => toolState.setFillColor(e.target.value)}
                />

                {/*Размер шрифта*/}
                <input
                    ref = {fontSizeRef}
                    type = "number"
                    min = {1}
                    max = {50}
                    defaultValue={16}
                    onChange={() => ChangeFontHandler()}
                />

                {/*Шрифт*/}
                <select
                    ref={fontFamilyRef}
                    onChange={() => ChangeFontHandler()}
                >
                    <option value = "Arial">Arial</option>
                    <option value = "Helvetica">Helvetica</option>
                    <option value = "Times New Roman">Times New Roman</option>
                </select>

                {/*Ширина полотна*/}
                <input
                    ref = {widthRef}
                    type = "number"
                    min = {100}
                    max = {5000}
                    defaultValue = "0"
                />

                {/*Высота полотна*/}
                <input
                    ref = {heightRef}
                    type = "number"
                    min = {100}
                    max = {5000}
                    defaultValue = "0"
                />

                {/*Кнопка сменить разрешение*/}
                <button onClick={() => changeResolutionHandler()}>change</button>

                {/*Цвет полотна*/}
                <input
                    type = "color"
                    defaultValue = "#FFFFFF"
                    onChange={(e) => changeBackgroundHandler(e.target.value)}
                />

                {/*Кнопка пригласить*/}
                <button
                    className = "button_invite"
                    onClick = {() => setModalActive(true)}
                >
                    Invite friends
                </button>

                {/*Кнопка выйти*/}
                <button
                    className = "button_leave"
                    onClick={() => leaveRoomHandler()}
                >
                    Leave
                </button>

            </div>
        </div>

    );
};

export default HorToolbar;