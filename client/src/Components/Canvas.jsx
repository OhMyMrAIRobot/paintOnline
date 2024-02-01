import React, {useEffect, useRef, useState} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";
import brush from "../Tools/Brush";
import {useNavigate, useParams} from "react-router-dom";
import Brush from "../Tools/Brush";
import Eraser from "../Tools/Eraser";
import Line from "../Tools/Line";
import Rect from "../Tools/Rect";
import Square from "../Tools/Square";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import Text from "../Tools/Text"
import Modal from "./Modal";
import axios from "axios";
import '../Style/UsernameModal.css'
import Chat from "./Chat";

const Canvas = observer(() => {
    const params = useParams();
    const CanvasRef = useRef();
    const UsernameRef = useRef();
    const navigate = useNavigate()
    const socket = useRef()

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

        canvasState.setCanvas(CanvasRef.current);
    }, []);

    useEffect(() => {
        if (canvasState.username){

            canvasState.setSocket(socket.current);
            canvasState.setSession(params.id);

            toolState.setTool(new brush(CanvasRef.current, socket.current, params.id));
            toolState.setFillColor("#FFFFFF");
            toolState.setStrokeColor("#000000");
            toolState.setLineWidth(1);
            toolState.setFont("16px Arial");

            socket.current.send(JSON.stringify({
                id:params.id,
                username: canvasState.username,
                method: "connection"
            }))

            socket.current.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method){
                    case 'connection':
                        console.log(`${msg.username} connected`)
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
                        break;
                    case 'changeBackground':
                        canvasState.setBackground(msg.color);
                        break;
                    default:
                        break;
                }
            }
        }
    }, [canvasState.username])

    const MouseDownHandler = () => {
        socket.current.send(JSON.stringify({
            id: params.id,
            method: 'pushUndo',
            data: CanvasRef.current.toDataURL(),
        }))
    }

    const MouseUpHandler = () => {
        axios.post(`http://localhost:3000/image?id=${params.id}`, {img: CanvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }

    const connectionHandler = () => {
        canvasState.setUsername(UsernameRef.current.value);

        socket.current.send(JSON.stringify({
            id:params.id,
            method: "initialise"
        }))

        socket.current.onmessage = (event) => {
            let msg = JSON.parse(event.data);
            switch (msg.method) {
                case 'initialise':
                    canvasState.setWidth(msg.width);
                    canvasState.setHeight(msg.height);
                    canvasState.setBackground(msg.color);
                    break;
            }
        }

        let ctx = CanvasRef.current.getContext('2d')
        axios.get(`http://localhost:3000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, CanvasRef.current.width, CanvasRef.current.height)
                    ctx.drawImage(img, 0, 0, CanvasRef.current.width, CanvasRef.current.height)
                }
            })

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
                Square.StaticDraw(ctx, figure.x, figure.y, figure.width, figure.strokeColor, figure.fillColor, figure.lineWidth);
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
            <Modal active={modalActive} setActive={setModalActive} canClose={false}>
                <div className = "username_modal">
                    <p className = "username_text">Enter your username:</p>
                    <input
                        onChange={(e) => {
                            e.target.value !== '' ?
                                UsernameRef.current.style.borderColor = "green"
                            :
                                UsernameRef.current.style.borderColor = "red"

                        }}
                        className = "username_input" ref = {UsernameRef} type = 'text'/>
                    <button className = "username_button"
                            onClick={(e) => {
                                if (UsernameRef.current.value !== "") {
                                    setModalActive(false);
                                    connectionHandler();
                                    document.getElementById("hor").style.position = "inherit";
                                } else
                                    console.log('empty')
                                }
                            }
                            >
                        Enter
                    </button>
                </div>
            </Modal>
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
            <Chat />
        </>

    );
});

export default Canvas;