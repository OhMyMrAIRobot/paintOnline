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

export const drawHandler = (msg) => {
    const figure = msg.figure;
    switch (figure.type){
        case "brushStart":
            const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
            line.id = figure.id;
            line.setAttributeNS(null, 'd', 'M ' + figure.x + ' ' + figure.y);
            canvasState.canvas.appendChild(line);
            break;
        case "brushDraw":
            Brush.Draw(canvasState.canvas, figure.id, figure.x, figure.y, figure.strokeWidth, figure.strokeColor);
            break;
        case "eraser":
            Eraser.Draw(canvasState.canvas, figure.id, figure.x, figure.y, figure.strokeWidth, figure.strokeColor);
            break;
        case "line":
            Line.StaticDraw(canvasState.canvas,figure.id,figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor);
            break;
        case "rectangle":
            Rectangle.StaticDraw(canvasState.canvas,figure.id,figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "square":
            Square.StaticDraw(canvasState.canvas, figure.id, figure.x, figure.y, figure.side, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "circle":
            Circle.StaticDraw(canvasState.canvas, figure.id, figure.x, figure.y, figure.r, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "ellipse":
            Ellipse.StaticDraw(canvasState.canvas,figure.id, figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "text":
            Text.Draw(canvasState.canvas, figure.id, figure.x, figure.y, figure.text, figure.fontSize, figure.fontFamily, figure.fillColor, figure.strokeColor);
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
            break;
    }
}