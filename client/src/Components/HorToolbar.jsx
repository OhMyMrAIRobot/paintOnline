import React, {useEffect, useRef, useState} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import {useNavigate} from "react-router-dom";
import '../Style/InviteModal.css'
import InviteModal from "./InviteModal";
import {sendMessage} from "../Handlers/SendHandler";
import {autorun} from "mobx";

const HorToolbar = ({chatActive, setChatActive}) => {
    const fontSizeRef = useRef(null);
    const fontFamilyRef = useRef(null);
    const widthRef = useRef(null);
    const heightRef = useRef(null);
    const textRef = useRef(null);
    const canvasColorRef = useRef(null);

    const stroke = useRef(null);
    const strokeColor = useRef(null);
    const fill = useRef(null);

    const navigate = useNavigate()

    const [ModalActive, setModalActive] = useState(false)

    autorun(() => {

        // update figure params
        if (canvasState.curFigure) {
            fill.current.value = canvasState.curFigure.getAttributeNS(null, 'fill') ?? toolState.fillColor;
            strokeColor.current.value = canvasState.curFigure.getAttributeNS(null, 'stroke') ?? toolState.strokeColor;
            stroke.current.value = canvasState.curFigure.getAttributeNS(null, 'stroke-width') ?? toolState.strokeWidth;
            textRef.current.value = canvasState.curFigure.textContent ?? "";
            fontSizeRef.current.value = parseInt(canvasState.curFigure.getAttributeNS(null, 'font-size') ?? toolState.fontSize);
            fontFamilyRef.current.value = canvasState.curFigure.getAttributeNS(null, 'font-family') ?? toolState.fontFamily;
            toolState.setStrokeWidth(stroke.current.value)
            toolState.setStrokeColor(strokeColor.current.value)
            toolState.setFillColor(fill.current.value)
            toolState.setFontSize(fontSizeRef.current.value)
            toolState.setFontFamily(fontFamilyRef.current.value)
        }

        // update canvas params
        widthRef.current.value = canvasState.width;
        heightRef.current.value = canvasState.height;
        canvasColorRef.current.value = canvasState.background;
    });

    const changeFigureParams = () => {
        if (canvasState.curFigure) {
            sendMessage(canvasState.socket, {
                method: 'draw',
                id: canvasState.session,
                figure: {
                    type: 'changeFigure',
                    shapeId: canvasState.curFigure.id,
                    strokeWidth: toolState.strokeWidth,
                    stroke: toolState.strokeColor,
                    fill: toolState.fillColor,
                    text: textRef.current.value,
                    fontSize: toolState.fontSize,
                    fontFamily: toolState.fontFamily,
                }
            })
        }
    }

    const changeResolutionHandler = () => {
        sendMessage(canvasState.socket,{
            method: 'changeResolution',
            id: canvasState.session,
            width: widthRef.current.value,
            height: heightRef.current.value
        })
    }

    const changeBackgroundHandler = (color) => {
        sendMessage(canvasState.socket,{
            id: canvasState.session,
            method: 'changeBackground',
            color: color
        })
    }

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
                    ref = {stroke}
                    type = "number"
                    min = {1}
                    max = {100}
                    defaultValue={1}
                    onChange={e => {
                        toolState.setStrokeWidth(e.target.value)
                        changeFigureParams()
                    }}
                />

                <input
                    ref = {strokeColor}
                    type = "color"
                    defaultValue = "#000000"
                    onChange={e => {
                        toolState.setStrokeColor(e.target.value)
                        changeFigureParams()
                    }}
                />

                <input
                    ref = {fill}
                    type = "color"
                    defaultValue = "#FFFFFF"
                    onChange={e => {
                        toolState.setFillColor(e.target.value)
                        changeFigureParams()
                    }}
                />

                <input
                    ref = {fontSizeRef}
                    type = "number"
                    min = {1}
                    max = {50}
                    defaultValue={16}
                    onChange={(e) => {
                        toolState.setFontSize(e.target.value);
                        changeFigureParams()
                    }}
                />

                <input
                    ref={textRef}
                    className="textInput"
                    onChange={() => {
                        changeFigureParams()
                    }}
                />

                <select
                    ref={fontFamilyRef}
                    onChange={(e) => {
                        toolState.setFontFamily(e.target.value)
                        changeFigureParams()
                    }}
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
                    onChange={() => {
                        changeResolutionHandler()
                    }}
                />

                <input
                    ref = {heightRef}
                    type = "number"
                    min = {100}
                    max = {5000}
                    onChange={() => {
                        changeResolutionHandler()
                    }}
                />

                <input
                    ref = {canvasColorRef}
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