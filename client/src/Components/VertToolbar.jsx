import React from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import Brush from "../Tools/Brush";
import canvasState from "../Store/CanvasState";
import Eraser from "../Tools/Eraser";
import Rectangle from "../Tools/Rectangle";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import Square from "../Tools/Square";
import Hand from "../Tools/Hand";
import Line from "../Tools/Line";
import Text from "../Tools/Text"
import {sendMessage} from "../Handlers/SendHandler";
import Pointer from "../Tools/Pointer";

const HorToolbar = () => {

    const download = () => {
        // const dataUrl = canvasState.canvas.toDataURL()
        // const a = document.createElement('a')
        // a.href = dataUrl
        // a.download = `${canvasState.session}.jpg`
        // document.body.appendChild(a)
        // a.click()
        // document.body.removeChild(a)
    }

    return (
        <div className="vertToolbar">
            <button
                className="toolbarBtn"
                onClick={() => {toolState.setTool(new Pointer(canvasState.canvas, canvasState.socket, canvasState.session))}}
            >
                pointer
            </button>

            <button
                className="toolbarBtn"
                onClick={() => {
                    toolState.setTool(new Hand(canvasState.canvas, canvasState.socket, canvasState.session))
                }}
            >
                Hand
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Brush
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Eraser
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.session));
                    console.log(toolState)
                }}
            >
                Line
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Rectangle(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Rect
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Square(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Square
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Circle
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Ellipse(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Ellipse
            </button>

            <button
                className="toolbarBtn "
                onClick={() => toolState.setTool(new Text(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Text
            </button>

            <button
                className="toolbarBtn next"
                onClick={(e) => sendMessage(canvasState.socket, {id: canvasState.session, method: 'redo'})}
            >
                Next
            </button>

            <button
                className="toolbarBtn "
                onClick={(e) => sendMessage(canvasState.socket, {id: canvasState.session, method: 'undo'})}
            >
                Prev
            </button>

            <button
                className="toolbarBtn save"
                onClick={() => download()}
            >
                Save
            </button>
        </div>
    );
};

export default HorToolbar;