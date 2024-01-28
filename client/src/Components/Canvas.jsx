import React, {useEffect, useRef} from 'react';
import '../Style/Canvas.css'
import {observer} from "mobx-react-lite";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";
import brush from "../Tools/Brush";
import {useParams} from "react-router-dom";
import Brush from "../Tools/Brush";
import Eraser from "../Tools/Eraser";
import Line from "../Tools/Line";

const Canvas = observer(() => {

    const CanvasRef = useRef();
    const UsernameRef = useRef();

    useEffect(() => {
        canvasState.setCanvas(CanvasRef.current);
        // toolState.setFillColor("#FFFFFF");
        // toolState.setStrokeColor("#000000");
        // toolState.setLineWidth(1);
        // toolState.setFont("16px Arial");
    }, []);

    const MouseDownHandler = () => {
        canvasState.pushToUndo(CanvasRef.current.toDataURL())
    }

    const connectionHandler = () => {
        canvasState.setUsername(UsernameRef.current.value)
    }

    const params = useParams();

    useEffect(() => {
        if (canvasState.username){
            const socket = new WebSocket(`ws://localhost:3000/`);
            canvasState.setSocket(socket);
            canvasState.setSession(params.id);
            toolState.setTool(new brush(CanvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id:params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method){
                    case 'connection':
                        console.log(`${msg.username} connected`)
                        break;
                    case 'draw':
                        drawHandler(msg);
                        break;
                }
            }
        }
    }, [canvasState.username])

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
                break;
            case 'finish':
                ctx.beginPath();
                break;
        }
    }


    return (
        <div className = "canvas">

            <div
                style={{
                    width: '200px',
                    height: '50px',
                    border: '1px solid black',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                }}
            >
                <input ref = {UsernameRef} type = 'text'/>
                <button
                    onClick={() => connectionHandler()}
                >Enter</button>
            </div>

            <canvas
                height = {window.innerHeight - 100}
                width = {window.innerWidth - 100}
                ref = {CanvasRef}
                onMouseDown={() => MouseDownHandler()}
            >
            </canvas>
        </div>
    );
});

export default Canvas;