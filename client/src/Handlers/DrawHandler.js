import canvasState from "../Store/CanvasState";
import Text from "../Tools/Text"
import {changeFigureParams} from "./ChangeFigureParams";
import {SaveCanvasHandler} from "./SaveCanvasHandler";
import Hand from "../Tools/Hand";

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
            Hand.moveShape(shapeType, shape, figure.dx, figure.dy);
            break
        case 'changeFigure':
            changeFigureParams(figure.shapeId, figure.strokeWidth, figure.stroke, figure.fill, figure.fontSize, figure.fontFamily, figure.text)
            break;
        default:
            const newSVGElement = parser.parseFromString(figure.shape, 'image/svg+xml').documentElement;
            canvasState.canvas.appendChild(newSVGElement);
    }
}