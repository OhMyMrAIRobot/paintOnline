import React, {useEffect, useRef, useState} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";
import '../Style/InviteModal.css'

const HorToolbar = () => {
    const fontSizeRef = useRef();
    const fontFamilyRef = useRef();

    const ChangeFontHandler = () => {
        toolState.setFont(`${fontSizeRef.current.value}px ${fontFamilyRef.current.value}`);
    }

    const widthRef = useRef();
    const heightRef = useRef();

    const changeSizeHandler = () => {
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


    const [ModalActive, setModalActive] = useState(false)

    const navigate = useNavigate()

    return (
        <>
            <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
                <div className = "invite_modal">
                    <p className = "invite_text">Invite your friends!</p>
                    <div className = "invite_input_container">
                        <input className = "invite_input" type={'text'} defaultValue={window.location.href} readOnly={true}/>
                        <button className = "copy_button" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy</button>
                    </div>

                    <div className = "invite_input_container">
                        <input className = "invite_input" type={'text'} defaultValue={canvasState.session} readOnly={true}/>
                        <button className = "copy_button" onClick={() => navigator.clipboard.writeText(canvasState.session)}>Copy</button>
                    </div>

                    <button className = "close_invite_modal" onClick={() => setModalActive(false)}>Close</button>
                </div>
            </Modal>

            <div id = "hor" className = "toolbar-w">
                <input
                    type = "number"
                    min = {1}
                    max = {100}
                    defaultValue={1}
                    onChange={e => toolState.setLineWidth(e.target.value)}
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
                    onChange={() => {
                        ChangeFontHandler()
                    }
                    }
                />

                <select
                    ref={fontFamilyRef}
                    onChange={() => {
                        ChangeFontHandler()
                    }
                    }
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

                <button
                    onClick={() => changeSizeHandler()}
                >
                    change
                </button>

                <input
                    type = "color"
                    defaultValue = "#FFFFFF"
                    onChange={(e) => changeBackgroundHandler(e.target.value)}
                />

                <button
                    className = "button_invite"
                    onClick = {() => setModalActive(true)}
                >
                    Invite friends
                </button>

                <button
                    className = "button_leave"
                    onClick={() => {navigate('/'); navigate(0)}}
                >
                    Leave
                </button>

            </div>
        </>

    );
};

export default HorToolbar;