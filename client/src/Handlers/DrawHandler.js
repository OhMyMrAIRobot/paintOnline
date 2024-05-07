import Line from "../Tools/Line";
import Rectangle from "../Tools/Rectangle";
import Square from "../Tools/Square";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import canvasState from "../Store/CanvasState";
import Brush from "../Tools/Brush";
import Eraser from "../Tools/Eraser";
import Text from "../Tools/Text"
import {MoveFigureHandler} from "./MoveFigureHandler";
import {changeFigureParams} from "./ChangeFigureParams";
import {PushUndoHandler} from "./PushUndoHandler";
import {SaveCanvasHandler} from "./SaveCanvasHandler";

export const drawHandler = (msg) => {
    const parser = new DOMParser();
    const figure = msg.figure;
    switch (figure.type){
        case "text":
            Text.Draw(canvasState.canvas, figure.id, figure.x, figure.y, figure.text, figure.fontSize, figure.fontFamily, figure.fillColor, figure.strokeColor);
            SaveCanvasHandler();
            break;
        case 'move':
            const shapeType = figure.shapeId.substring(0, 4);
            const shape = document.getElementById(figure.shapeId);
            MoveFigureHandler(shapeType, shape, figure.dx, figure.dy);
            break
        case 'changeFigure':
            changeFigureParams(figure.shapeId, figure.strokeWidth, figure.stroke, figure.fill, figure.fontSize, figure.fontFamily, figure.text)
            break;
        default:
            const newSVGElement = parser.parseFromString(figure.shape, 'image/svg+xml').documentElement;
            canvasState.canvas.appendChild(newSVGElement);
    }
}