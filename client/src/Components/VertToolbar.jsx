import React from 'react';
import '../Resources/Styles/Toolbar.css'
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
        const svgData = new XMLSerializer().serializeToString(canvasState.canvas);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            canvas.width = canvasState.canvas.width.baseVal.value;
            canvas.height = canvasState.canvas.height.baseVal.value;
            ctx.drawImage(img, 0, 0);
            const a = document.createElement('a');
            a.download = `${canvasState.session}.png`;
            a.href = canvas.toDataURL('image/png');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }

    return (
        <div className="vertToolbar">
            <button
                className="toolbarBtn"
                onClick={() => {
                    toolState.setTool(new Pointer(canvasState.canvas, canvasState.socket, canvasState.session), "Pointer");
                }}
            >
                pointer
            </button>

            <button
                className="toolbarBtn"
                onClick={() => {
                    toolState.setTool(new Hand(canvasState.canvas, canvasState.socket, canvasState.session), "Hand");
                }}
            >
                Hand
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.session), "Brush");
                }}
            >
                Brush
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.session), "Eraser");
                }}
            >
                Eraser
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.session), "Line");
                }}
            >
                Line
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Rectangle(canvasState.canvas, canvasState.socket, canvasState.session), "Rect");
                }}
            >
                Rect
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Square(canvasState.canvas, canvasState.socket, canvasState.session), "Square");
                }}
            >
                Square
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.session), "Circle");
                }}
            >
                Circle
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Ellipse(canvasState.canvas, canvasState.socket, canvasState.session), "Ellipse");
                }}
            >
                Ellipse
            </button>

            <button
                className="toolbarBtn "
                onClick={() => {
                    toolState.setTool(new Text(canvasState.canvas, canvasState.socket, canvasState.session), "Text");
                }}
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