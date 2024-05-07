import Tool from "./Tool";
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import {sendMessage} from "../Handlers/SendHandler";

class Pointer extends Tool{

    shapes = document.querySelectorAll('line, rect, ellipse, text');

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen()
    }

    Listen(){
        this.shapes.forEach(shape => {
            shape.addEventListener('mousedown', (e) => {
                canvasState.setCurFigure(shape);
            });
        });
    }

}

export default Pointer;