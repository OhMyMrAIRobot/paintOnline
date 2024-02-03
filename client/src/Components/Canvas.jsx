import React, {useEffect, useRef, useState} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";
import brush from "../Tools/Brush";
import {useParams} from "react-router-dom";
import Brush from "../Tools/Brush";
import Eraser from "../Tools/Eraser";
import Line from "../Tools/Line";
import Rect from "../Tools/Rect";
import Square from "../Tools/Square";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import Text from "../Tools/Text"
import Chat from "./Chat";
import UsernameModal from "./UsernameModal";

const Canvas = observer(({canvasUrl, setWidth, setHeight, chatActive}) => {
    const params = useParams();
    const CanvasRef = useRef();
    const UsernameRef = useRef();

    const [msgArr, setMsgArr] = useState([]);

    useEffect(() => {
        canvasState.setCanvas(CanvasRef.current);
        console.log('username')

        if (canvasState.username){
            toolState.setTool(new brush(CanvasRef.current, canvasState.socket, params.id));
            toolState.setFillColor("#FFFFFF");
            toolState.setStrokeColor("#000000");
            toolState.setLineWidth(1);
            toolState.setFont("16px Arial");

            canvasState.socket.send(JSON.stringify({
                id:params.id,
                username: canvasState.username,
                method: "connection"
            }))

            canvasState.socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method){
                    case 'connection':
                        setMsgArr(prev => [...prev, {
                            type: "connect",
                            user: msg.username,
                        }])
                        break;
                    case 'draw':
                        drawHandler(msg);
                        break;
                    case 'pushUndo':
                        canvasState.pushToUndo(msg.data)
                        break;
                    case 'undo':
                        canvasState.undo();
                        break;
                    case 'reUndo':
                        canvasState.reUndo();
                        break;
                    case 'changeResolution':
                        canvasState.setWidth(msg.width);
                        canvasState.setHeight(msg.height);
                        setWidth(msg.width);
                        setHeight(msg.height)
                        break;
                    case 'changeBackground':
                        canvasState.setBackground(msg.color);
                        break;
                    case 'message':
                        setMsgArr(prev => [...prev, {
                            type: 'message',
                            user: msg.username,
                            text: msg.data,
                            time: {hour: msg.time.hour, minute: msg.time.minute}
                        }])
                        break;
                    case 'close':
                        setMsgArr(prev => [...prev, {
                            type: "disconnect",
                            user: msg.username,
                        }])
                        break;
                    default:
                        break;
                }
            }
        }
    }, [canvasState.username])

    const MouseDownHandler = () => {
        canvasState.socket.send(JSON.stringify({
            id: params.id,
            method: 'pushUndo',
            data: CanvasRef.current.toDataURL(),
        }))
    }

    // отправка текущего состояния
    const MouseUpHandler = () => {
        console.log('тык')
        canvasState.socket.send(JSON.stringify({
            id: params.id,
            method: 'saveCanvas',
            data: CanvasRef.current.toDataURL(),
        }))
    }

    // инициализация полотна
    const connectionHandler = () => {
        canvasState.socket.send(JSON.stringify({
            id:params.id,
            method: "initialise"
        }))

        canvasState.socket.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method) {
                case 'initialise':
                    console.log('initialise')
                    canvasState.setWidth(msg.width);
                    canvasState.setHeight(msg.height);
                    canvasState.setBackground(msg.color);

                    console.log('canvas: ', canvasUrl)
                    if (canvasUrl !== 'init'){
                        let ctx = CanvasRef.current.getContext('2d');
                        const img = new Image()
                        img.src = canvasUrl;
                        img.onload = () => {
                            ctx.clearRect(0, 0, CanvasRef.current.width, CanvasRef.current.height)
                            ctx.drawImage(img, 0, 0, CanvasRef.current.width, CanvasRef.current.height)
                        }
                    }

                    setWidth(msg.width);
                    setHeight(msg.height);
                    canvasState.setUsername(UsernameRef.current.value);
                    document.title = `${params.id} | ${canvasState.username}`;
                    break;
            }
        }
    }

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = CanvasRef.current.getContext('2d');
        switch (figure.type){
            case "brush":
                Brush.Draw(ctx, figure.x, figure.y, figure.strokeColor,figure.lineWidth);
                break;
            case "eraser":
                Eraser.Draw(ctx, figure.x, figure.y, figure.lineWidth);
                break;
            case "line":
                Line.StaticDraw(ctx, figure.Xs, figure.Ys, figure.Xf, figure.Yf, figure.lineWidth, figure.strokeColor);
                ctx.beginPath();
                break;
            case "rectangle":
                Rect.StaticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeColor, figure.fillColor, figure.lineWidth);
                ctx.beginPath();
                break;
            case "square":
                Square.StaticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeColor, figure.fillColor, figure.lineWidth);
                ctx.beginPath();
                break;
            case "circle":
                Circle.StaticDraw(ctx, figure.x, figure.y, figure.radius, figure.strokeColor, figure.fillColor, figure.lineWidth);
                ctx.beginPath();
                break;
            case "ellipse":
                Ellipse.StaticDraw(ctx, figure.x, figure.y, figure.rx, figure.ry, figure.strokeColor, figure.fillColor, figure.lineWidth);
                ctx.beginPath();
                break;
            case "text":
                Text.Draw(ctx, figure.x, figure.y, figure.text, figure.font,figure.fillColor);
                break;
            case 'finish':
                ctx.beginPath();
                break;
            default:
                break;
        }
    }

    const [modalActive, setModalActive] = useState(true);

    return (
        <>
            <UsernameModal
                setModalActive={setModalActive}
                UsernameRef={UsernameRef}
                modalActive={modalActive}
                connectionHandler={connectionHandler}
            />

            <div className = "canvas">
                <canvas
                    ref = {CanvasRef}
                    height = '0px'
                    width = '0px'
                    onMouseDown={() => MouseDownHandler()}
                    onMouseUp={() => MouseUpHandler()}
                >
                </canvas>

            </div>

            <Chat socket={canvasState.socket} username={canvasState.username} msgArray = {msgArr} chatActive={chatActive}/>
        </>

    );
});

export default Canvas;