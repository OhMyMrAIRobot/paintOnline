import Brush from "./Brush";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";

class Eraser extends Brush{

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.shape.id = 'Eraser' + Math.random().toString();
        const p = this.getPoint(e)
        this.x = p.x;
        this.y = p.y;
        this.shape.setAttributeNS(null, 'd', 'M ' + this.x + ' ' + this.y);
        this.canvas.appendChild(this.shape);
    }

    Draw(x, y) {
        const backgroundColor = window.getComputedStyle(canvasState.canvas).backgroundColor;
        let currentPath = this.shape.getAttributeNS(null, 'd');
        currentPath += ' L ' + x + ' ' + y;
        this.shape.setAttributeNS(null, 'd', currentPath);
        this.shape.setAttributeNS(null, 'stroke', backgroundColor);
        this.shape.setAttributeNS(null, 'stroke-width', toolState.strokeWidth);
        this.shape.setAttributeNS(null, 'fill', 'none');
    }

}

export default Eraser;