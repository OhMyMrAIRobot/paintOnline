import React from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import Brush from "../Tools/Brush";
import canvasState from "../Store/CanvasState";
import Eraser from "../Tools/Eraser";
import Rect from "../Tools/Rect";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import Square from "../Tools/Square";
import Pointer from "../Tools/Pointer";
import Line from "../Tools/Line";
import Text from "../Tools/Text"

const HorToolbar = () => {

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = "myCanvas.jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className = "toolbar-h">

            <button
                className = "toolbar-btn"
                onClick={() => toolState.setTool(new Pointer(canvasState.canvas))}
            >none
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.session))}>
                Brush
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Eraser
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.session))}>
                Line
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.session))}
            >
                Rect
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Square(canvasState.canvas))}
            >
                Square
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
            >
                Circle
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Ellipse(canvasState.canvas))}
            >
                Ellipse
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Text(canvasState.canvas))}
            >
                Text
            </button>

            <button
                className = "toolbar-btn next"
                onClick={() => canvasState.reUndo()}
            >
                Next
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => canvasState.undo()}
            >
                Prev
            </button>

            <button
                className = "toolbar-btn save"
                onClick={() => download()}
            >
                Save
            </button>


        </div>
    );
};

export default HorToolbar;