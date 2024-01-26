import React from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import Brush from "../Tools/Brush";
import canvasState from "../Store/CanvasState";
import Eraser from "../Tools/Eraser";
import Rect from "../Tools/Rect";
import Circle from "../Tools/Circle";

const HorToolbar = () => {
    return (
        <div className = "toolbar-h">

            <button
                className = "toolbar-btn">none
            </button>

            <button
                className = "toolbar-btn brush"
                onClick={() => toolState.setTool(new Brush(canvasState.canvas))}>

            </button>

            <button
                className = "toolbar-btn eraser"
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
            >
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
            >
                Rect
            </button>

            <button
                className = "toolbar-btn "
                onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
            >
                Circle
            </button>
        </div>
    );
};

export default HorToolbar;