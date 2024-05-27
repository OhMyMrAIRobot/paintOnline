import React, {useEffect, useRef, useState} from 'react';
import '../Resources/Styles/Toolbar.css'
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import {useNavigate} from "react-router-dom";
import '../Resources/Styles/InviteModal.css'
import InviteModal from "./Modals/InviteModal";
import {sendMessage} from "../Handlers/SendHandler";
import {autorun, reaction} from "mobx";
import Pointer from "../Tools/Pointer";
import NumberInput from "./NumberInput";
import {SaveCanvasHandler} from "../Handlers/SaveCanvasHandler";

const HorToolbar = ({chatActive, setChatActive}) => {
    const fontFamilyRef = useRef(null);
    const widthRef = useRef(null);
    const heightRef = useRef(null);
    const textRef = useRef(null);
    const canvasColorRef = useRef(null);
    const deleteRef = useRef(null);
    const upRef = useRef(null);
    const downRef = useRef(null);

    const strokeColor = useRef(null);
    const fill = useRef(null);

    const timer = useRef(null)

    const navigate = useNavigate()

    const [ModalActive, setModalActive] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [fontSize, setFontSize] = useState(16);

    autorun(() => {
        if (widthRef.current)
            widthRef.current.value = canvasState.width ?? 0;
        if (heightRef.current)
            heightRef.current.value = canvasState.height ?? 0;
        if (canvasColorRef.current)
            canvasColorRef.current.value = canvasState.background ?? '#ffffff';
    })

    useEffect(() => {
        deleteRef.current.disabled = true;
        deleteRef.current.style.cursor ='not-allowed';
        upRef.current.disabled = true;
        upRef.current.style.cursor ='not-allowed';
        downRef.current.disabled = true;
        downRef.current.style.cursor ='not-allowed';
    }, [])

    reaction(
        () => canvasState.curFigure,
        (curFigure) => {
            if (curFigure) {
                fill.current.value = curFigure.getAttributeNS(null, 'fill') ?? toolState.fillColor;
                strokeColor.current.value = curFigure.getAttributeNS(null, 'stroke') ?? toolState.strokeColor;
                textRef.current.value = curFigure.textContent ?? "";
                setStrokeWidth(curFigure.getAttributeNS(null, 'stroke-width') ?? toolState.strokeWidth);
                setFontSize(parseInt(curFigure.getAttributeNS(null, 'font-size') ?? toolState.fontSize));
                fontFamilyRef.current.value = curFigure.getAttributeNS(null, 'font-family') ?? toolState.fontFamily;

                deleteRef.current.disabled = false;
                deleteRef.current.style.cursor ='pointer';
                upRef.current.disabled = false;
                upRef.current.style.cursor ='pointer';
                downRef.current.disabled = false;
                downRef.current.style.cursor ='pointer';
                toolState.setStrokeWidth(strokeWidth);
                toolState.setStrokeColor(strokeColor.current.value);
                toolState.setFillColor(fill.current.value);
                toolState.setFontSize(fontSize);
                toolState.setFontFamily(fontFamilyRef.current.value);
            } else {
                fill.current.value = toolState.fillColor;
                strokeColor.current.value = toolState.strokeColor;
                textRef.current.value = "";
                setStrokeWidth(toolState.strokeWidth);
                setFontSize(toolState.fontSize);
                fontFamilyRef.current.value = toolState.fontFamily;

                deleteRef.current.disabled = true;
                deleteRef.current.style.cursor ='not-allowed';
                upRef.current.disabled = true;
                upRef.current.style.cursor ='not-allowed';
                downRef.current.disabled = true;
                downRef.current.style.cursor ='not-allowed';
            }
        }
    );

    const deleteHandler = () => {
        sendMessage(canvasState.socket, {
            method: 'draw',
            id: canvasState.session,
            figure: {
                type: 'removeFigure',
                shapeId: canvasState.curFigure.id,
            }
        })
    }

    const downFigureHandler = () => {
        sendMessage(canvasState.socket, {
            method: 'draw',
            id: canvasState.session,
            figure: {
                type: 'downFigure',
                shapeId: canvasState.curFigure.id,
            }
        })
    }

    const upFigureHandler = () => {
        sendMessage(canvasState.socket, {
            method: 'draw',
            id: canvasState.session,
            figure: {
                type: 'upFigure',
                shapeId: canvasState.curFigure.id,
            }
        })
    }

    const handleSend = (callback) => {
        if (canvasState.curFigure)
            Pointer.changeFigureParams(canvasState.curFigure.id, strokeWidth, strokeColor.current.value, fill.current.value, fontSize, fontFamilyRef.current.value, textRef.current.value);

        canvasState.setBackground(canvasColorRef.current.value);
        canvasState.setWidth(widthRef.current.value);
        canvasState.setHeight(heightRef.current.value);
        clearTimeout(timer.current);

        timer.current = setTimeout(callback, 500);
    }

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
        const width = widthRef.current.value;
        const height = heightRef.current.value;
        canvasState.setWidth(canvasState.oldWidth);
        canvasState.setHeight(canvasState.oldHeight);
        sendMessage(canvasState.socket,{
            method: 'changeResolution',
            id: canvasState.session,
            width: width,
            height: height,
            oldCanvas: new XMLSerializer().serializeToString(canvasState.canvas),
        })
        canvasState.setWidth(width);
        canvasState.setHeight(height);
        SaveCanvasHandler()
    }

    const changeBackgroundHandler = () => {
        const color = canvasColorRef.current.value;
        canvasState.setBackground(canvasState.oldBackground);
        sendMessage(canvasState.socket,{
            id: canvasState.session,
            method: 'changeBackground',
            color: color,
            oldCanvas: new XMLSerializer().serializeToString(canvasState.canvas)
        })
        canvasState.setBackground(color)
        SaveCanvasHandler()
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

            <div id="hor" className="horToolbar">
                <div className="groupBar">
                    <div className="groupItems">
                        <div style={{display: 'flex'}}>
                            <NumberInput
                                value={strokeWidth}
                                setValue={(newValue) => {
                                    setStrokeWidth(newValue);
                                    toolState.setStrokeWidth(newValue);
                                    if (canvasState.curFigure) handleSend(changeFigureParams);
                                }}
                                minValue={1}
                                maxValue={16}
                            />
                            <label htmlFor="strokeInput" className="toolbarBtn stroke"></label>
                        </div>

                        <div style={{display: 'flex'}}>
                            <input
                                className="colorInput"
                                id="strokeColorInput"
                                ref={strokeColor}
                                type="color"
                                defaultValue="#000000"
                                onChange={e => {
                                    toolState.setStrokeColor(e.target.value)
                                    if (canvasState.curFigure) handleSend(changeFigureParams)
                                }}
                            />
                            <label htmlFor="strokeColorInput" className="toolbarBtn strokeColor"></label>
                        </div>

                        <div style={{display: 'flex'}}>
                            <input
                                id="fillColor"
                                className="colorInput"
                                ref={fill}
                                type="color"
                                defaultValue="#FFFFFF"
                                onChange={e => {
                                    toolState.setFillColor(e.target.value)
                                    if (canvasState.curFigure) handleSend(changeFigureParams)
                                }}
                            />
                            <label htmlFor="fillColor" className="toolbarBtn fillColor"></label>
                        </div>

                    </div>
                    <p>Figure</p>
                </div>

                <span style={{height: '100%', borderRight: '1px solid black'}}></span>

                <div className="groupBar">
                    <div className="groupItems">

                        <input
                            ref={textRef}
                            className="textInput"
                            onChange={() => {
                                if (canvasState.curFigure) handleSend(changeFigureParams)
                            }}
                        />
                        <div style={{display: 'flex'}}>
                            <NumberInput
                                value={fontSize}
                                minValue={8}
                                maxValue={32}
                                setValue={(newValue) => {
                                    setFontSize(newValue);
                                    toolState.setFontSize(fontSize);
                                    if (canvasState.curFigure) handleSend(changeFigureParams)
                                }}
                            />
                            <label htmlFor="fontSize" className="toolbarBtn fontSize"></label>
                        </div>

                        <select
                            ref={fontFamilyRef}
                            onChange={(e) => {
                                toolState.setFontFamily(e.target.value)
                                if (canvasState.curFigure) handleSend(changeFigureParams)
                            }}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                        </select>
                    </div>
                    <p>Text</p>
                </div>

                <span style={{height: '100%', borderRight: '1px solid black'}}></span>

                <div className="groupBar">
                    <div className="groupItems">
                        <button
                            className="toolbarBtn down"
                            ref={downRef}
                            onClick={() => downFigureHandler()}
                        />

                        <button
                            className="toolbarBtn up"
                            ref={upRef}
                            onClick={() => upFigureHandler()}
                        />


                        <button
                            className="toolbarBtn delete"
                            ref={deleteRef}
                            onClick={() => deleteHandler()}
                        />
                    </div>
                    <p>Actions</p>
                </div>

                <span style={{height: '100%', borderRight: '1px solid black'}}></span>

                <div className="groupBar">
                    <div className="groupItems">
                        <div style={{display: 'flex'}}>
                            <input
                                ref={widthRef}
                                type="number"
                                min={100}
                                max={5000}
                                onChange={() => {
                                    handleSend(changeResolutionHandler)
                                }}
                            />
                            <label htmlFor="" className="toolbarBtn width"></label>
                        </div>

                        <div style={{display: 'flex'}}>
                            <input
                                ref={heightRef}
                                type="number"
                                min={100}
                                max={5000}
                                onChange={() => {
                                    handleSend(changeResolutionHandler)
                                }}
                            />
                            <label htmlFor="" className="toolbarBtn height"></label>
                        </div>

                        <div style={{display: 'flex'}}>
                            <input
                                id="canvasFill"
                                className="colorInput"
                                ref={canvasColorRef}
                                type="color"
                                defaultValue="#FFFFFF"
                                onChange={() =>
                                    handleSend(changeBackgroundHandler)
                                }
                            />
                            <label htmlFor="canvasFill" className="toolbarBtn fillColor"></label>
                        </div>

                    </div>
                    <p>Canvas settings</p>
                </div>

                <span style={{height: '100%', borderRight: '1px solid black'}}></span>

                <div className="groupBar">
                    <div className="groupItems">
                        <div className="buttonChatContainer">
                        <span id="newMsgSpan" className="newMsgSpan"></span>
                            <button className="buttonChat"
                                    onClick={() => {
                                        setChatActive(!chatActive);
                                        document.getElementById('newMsgSpan').style.opacity = '0';
                                    }}
                            >
                            Chat
                            </button>
                        </div>

                        <button
                            className="buttonInvite"
                            onClick={() => setModalActive(true)}
                        >
                            Invite friends
                        </button>

                        <button
                            className="buttonLeave"
                            onClick={() => leaveRoomHandler()}
                        >
                            Leave
                        </button>
                    </div>
                    <p>Navigation</p>
                </div>


            </div>
        </div>
    );
};

export default HorToolbar;