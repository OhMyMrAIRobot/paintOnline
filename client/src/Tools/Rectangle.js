import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";

class Rectangle extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen();
    }

    Listen(){
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
    }

    MouseUpHandler() {
        const serializer = new XMLSerializer();
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            canvas: serializer.serializeToString(canvasState.canvas),
            figure: {
                type: 'rectangle',
                shape:serializer.serializeToString(this.shape),
                id: this.shape.id,
            }
        })
        try {
            this.canvas.removeChild(this.shape);
        } catch (e) {}
    }

    MouseDownHandler(e) {
        this.isMouseDown = true;
        const p = this.getPoint(e)
        this.xStart = p.x;
        this.yStart = p.y;
        this.shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.shape.id = 'Rect' + Math.random().toString();
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            const p = this.getPoint(e)
            this.xFinish = p.x;
            this.yFinish = p.y;
            this.Draw(this.xStart, this.yStart, this.xFinish, this.yFinish);
        }
    }

    Draw(xS, yS, xF, yF) {
        this.shape.setAttributeNS(null, 'x', Math.min(xS, xF).toString());
        this.shape.setAttributeNS(null, 'y', Math.min(yS, yF).toString());
        this.shape.setAttributeNS(null, 'width', Math.abs(xS - xF).toString());
        this.shape.setAttributeNS(null, 'height', Math.abs(yS - yF).toString());
        this.shape.setAttributeNS(null, 'stroke', toolState.strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', toolState.strokeWidth);
        this.shape.setAttributeNS(null, 'fill', toolState.fillColor);
        this.canvas.appendChild(this.shape);
    }

    static moveShape(rect, dx, dy) {
        let x = parseFloat(rect.getAttributeNS(null, 'x')) + dx;
        let y = parseFloat(rect.getAttributeNS(null, 'y')) + dy;
        let width = parseFloat(rect.getAttributeNS(null, 'width'));
        let height = parseFloat(rect.getAttributeNS(null, 'height'));
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'width', width.toString());
        rect.setAttributeNS(null, 'height', height.toString());
    }
}

export default Rectangle;