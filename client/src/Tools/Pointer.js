import Tool from "./Tool";
import canvasState from "../Store/CanvasState";

class Pointer extends Tool{

    shapes = document.querySelectorAll('line, rect, ellipse, text');

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen()
    }

    Listen(){
        this.shapes.forEach(shape => {
            shape.addEventListener('mouseup', (e) => {
                canvasState.setCurFigure(shape);
            });
        });
    }

    static changeFigureParams (id, strokeWidth, stroke, fill, fontSize, fontFamily, text) {
        const shape = document.getElementById(id);
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

    static downFigure(id) {
        const children = Array.from(canvasState.canvas.children);
        const index = children.findIndex(child => child.id === id);

        if (index !== -1) {
            const movedElement = children.splice(index, 1)[0];
            children.unshift(movedElement);
            canvasState.canvas.innerHTML = '';
            children.forEach(child => canvasState.canvas.appendChild(child));
        }
    }

    static upFigure(id) {
        const children = Array.from(canvasState.canvas.children);
        const index = children.findIndex(child => child.id === id);

        if (index !== -1) {
            const movedElement = children.splice(index, 1)[0];
            children.push(movedElement);
            canvasState.canvas.innerHTML = '';
            children.forEach(child => canvasState.canvas.appendChild(child));
        }
    }

}

export default Pointer;