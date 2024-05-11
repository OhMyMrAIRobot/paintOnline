import canvasState from "../Store/CanvasState";
import Text from "../Tools/Text"
import {SaveCanvasHandler} from "./SaveCanvasHandler";
import Hand from "../Tools/Hand";
import Pointer from "../Tools/Pointer";

export const drawHandler = (msg) => {
    const parser = new DOMParser();
    const figure = msg.figure;
    switch (figure.type){
        case "text":
            Text.Draw(canvasState.canvas, figure.id, figure.x, figure.y, figure.text, figure.fontSize, figure.fontFamily, figure.fillColor, figure.strokeColor);
            break;
        case "removeFigure":
            canvasState.canvas.removeChild(document.getElementById(figure.shapeId));
            if (canvasState.curFigure && canvasState.curFigure.id === figure.shapeId)
                canvasState.setCurFigure(null);
            break;
        case 'move':
            const shapeType = figure.shapeId.substring(0, 4);
            const shape = document.getElementById(figure.shapeId);
            Hand.moveShape(shapeType, shape, figure.dx, figure.dy);
            break
        case 'changeFigure':
            Pointer.changeFigureParams(figure.shapeId, figure.strokeWidth, figure.stroke, figure.fill, figure.fontSize, figure.fontFamily, figure.text)
            break;
        case 'downFigure':
            Pointer.downFigure(figure.shapeId)
            break;
        case 'upFigure':
            Pointer.upFigure(figure.shapeId)
            break;
        default:
            const newSVGElement = parser.parseFromString(figure.shape, 'image/svg+xml').documentElement;
            canvasState.canvas.appendChild(newSVGElement);
    }
}