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

const HorToolbar = () => {
    return (
        <div className = "toolbar-h">

            <button
                className = "toolbar-btn"
                onClick={() => toolState.setTool(new Pointer(canvasState.canvas))}
            >none
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Brush(canvasState.canvas))}>
                Brush
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
            >
                Eraser
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Line(canvasState.canvas))}>
                Line
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
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


        </div>
    );
};

export default HorToolbar;