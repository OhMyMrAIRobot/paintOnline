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

    static changeFigureParams (id, strokeWidth, stroke, fill, fontSize, fontFamily, text) {
        const shape = document.getElementById(id);
        console.log(shape);
        if (shape.getAttributeNS(null, 'stroke')) {
            shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        }
        if (shape.getAttributeNS(null, 'stroke')) {
            shape.setAttributeNS(null, 'stroke', stroke);
        }
        if (shape.getAttributeNS(null, 'fill')) {
            shape.setAttributeNS(null, 'fill', fill);
        }
        if (shape.getAttributeNS(null, 'font-size')) {
            shape.setAttributeNS(null, 'font-size', fontSize + 'px');
        }
        if (shape.getAttributeNS(null, 'font-family')) {
            shape.setAttributeNS(null, 'font-family', fontFamily);
        }
        if (shape.textContent !== "")
            shape.textContent = text;
    }

}

export default Pointer;