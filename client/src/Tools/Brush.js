import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";

class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen()
    }

    Listen() {
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
    }

    MouseUpHandler() {
        const serializer = new XMLSerializer();
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            canvas: serializer.serializeToString(canvasState.canvas),
            figure: {
                type: 'brush',
                shape:serializer.serializeToString(this.shape)
            }
        })
        this.canvas.removeChild(this.shape);
    }

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.shape.id = 'Brush' + Math.random().toString();
        const p = this.getPoint(e)
        this.x = p.x;
        this.y = p.y;
        this.shape.setAttributeNS(null, 'd', 'M ' + this.x + ' ' + this.y);
        this.canvas.appendChild(this.shape);
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            const p = this.getPoint(e)
            this.x = p.x;
            this.y = p.y;
            this.Draw(this.x, this.y);
        }
    }

    Draw(x, y) {
        let currentPath = this.shape.getAttributeNS(null, 'd');
        currentPath += ' L ' + x + ' ' + y;
        this.shape.setAttributeNS(null, 'd', currentPath);
        this.shape.setAttributeNS(null, 'stroke', toolState.strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', toolState.strokeWidth);
        this.shape.setAttributeNS(null, 'fill', 'none');
    }
}

export default Brush;