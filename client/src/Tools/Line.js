import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";

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
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                xS: this.xStart,
                yS: this.yStart,
                xF: this.xFinish,
                yF: this.yFinish,
                strokeColor: toolState.strokeColor,
                strokeWidth: toolState.strokeWidth,
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

    static StaticDraw(canvas, id, xS, yS, xF, yF, strokeWidth, strokeColor) {
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        shape.id = id;
        shape.setAttributeNS(null, 'x1', xS);
        shape.setAttributeNS(null, 'y1', yS);
        shape.setAttributeNS(null, 'x2', xF);
        shape.setAttributeNS(null, 'y2', yF);
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        canvas.appendChild(shape);
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