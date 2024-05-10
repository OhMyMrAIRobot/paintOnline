import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";
import Pointer from "../Tools/Pointer";
import Brush from "../Tools/Brush";
import Hand from "../Tools/Hand";
import Eraser from "../Tools/Eraser";
import Line from "../Tools/Line";
import Rectangle from "../Tools/Rectangle";
import Square from "../Tools/Square";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import Text from "../Tools/Text";

export const LoadCanvas = (saveHTML) => {
    const parser = new DOMParser();
    const newSVGElement = parser.parseFromString(saveHTML, 'image/svg+xml').documentElement;

    const parent = canvasState.canvas.parentNode;
    parent.removeChild(canvasState.canvas);
    parent.appendChild(newSVGElement);

    canvasState.setCanvas(newSVGElement);
    canvasState.setWidth(parseInt(window.getComputedStyle(canvasState.canvas).width));
    canvasState.setHeight(parseInt(window.getComputedStyle(canvasState.canvas).height));
    canvasState.setBackground(rgbToHex(window.getComputedStyle(canvasState.canvas).backgroundColor));

    loadTool(toolState.toolType.slice(0,4));
}

const rgbToHex = (rgb) => {
    const rgbArray = rgb.match(/\d+/g);

    return "#" +
        ("0" + parseInt(rgbArray[0], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArray[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArray[2], 10).toString(16)).slice(-2);
}

const loadTool = (tool) => {
    switch (tool) {
        case "Poin":
            toolState.setTool(new Pointer(canvasState.canvas, canvasState.socket, canvasState.session), "Pointer");
            break;
        case "Hand":
            toolState.setTool(new Hand(canvasState.canvas, canvasState.socket, canvasState.session), "Hand");
            break;
        case "Brus":
            toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.session), "Brush");
            break;
        case "Eras":
            toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.session), "Eraser");
            break;
        case "Line":
            toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.session), "Line");
            break;
        case "Rect":
            toolState.setTool(new Rectangle(canvasState.canvas, canvasState.socket, canvasState.session), "Rect");
            break
        case "Squa":
            toolState.setTool(new Square(canvasState.canvas, canvasState.socket, canvasState.session), "Square");
            break;
        case "Circ":
            toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.session), "Circle");
            break;
        case "Elli":
            toolState.setTool(new Ellipse(canvasState.canvas, canvasState.socket, canvasState.session), "Ellipse");
            break;
        case "Text":
            toolState.setTool(new Text(canvasState.canvas, canvasState.socket, canvasState.session), "Text");
            break;
        default:
            break;
    }
}