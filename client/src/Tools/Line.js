import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";

class Line extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen();
    }

    Listen(){
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
    }

    MouseUpHandler(){
        const serializer = new XMLSerializer();
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            canvas: serializer.serializeToString(canvasState.canvas),
            figure: {
                type: 'line',
                shape:serializer.serializeToString(this.shape),
                id: this.shape.id,
            }
        })

        try {
            this.canvas.removeChild(this.shape);
        } catch (e) {}
    }

    MouseDownHandler(e){
        this.isMouseDown = true;
        const p = this.getPoint(e)
        this.xStart = p.x;
        this.yStart = p.y;
        this.shape = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.shape.id = 'Line' + Math.random().toString();
    }

    MouseMoveHandler(e){
        if(this.isMouseDown){
            const p = this.getPoint(e)
            this.xFinish = p.x;
            this.yFinish = p.y;
            this.Draw(this.xStart, this.yStart, this.xFinish, this.yFinish);
        }
    }

    Draw(xS, yS, xF, yF) {
        this.shape.setAttributeNS(null, 'x1', xS);
        this.shape.setAttributeNS(null, 'y1', yS);
        this.shape.setAttributeNS(null, 'x2', xF);
        this.shape.setAttributeNS(null, 'y2', yF);
        this.shape.setAttributeNS(null, 'stroke', toolState.strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', toolState.strokeWidth);
        this.canvas.appendChild(this.shape);
    }

    static moveShape(line, dx, dy) {
        let x1 = parseFloat(line.getAttributeNS(null, 'x1')) + dx;
        let y1 = parseFloat(line.getAttributeNS(null, 'y1')) + dy;
        let x2 = parseFloat(line.getAttributeNS(null, 'x2')) + dx;
        let y2 = parseFloat(line.getAttributeNS(null, 'y2')) + dy;
        line.setAttributeNS(null, 'x1', x1);
        line.setAttributeNS(null, 'y1', y1);
        line.setAttributeNS(null, 'x2', x2);
        line.setAttributeNS(null, 'y2', y2);
    }
}

export default Line;