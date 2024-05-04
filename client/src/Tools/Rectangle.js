import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";

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

    MouseUpHandler(e) {
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rectangle',
                xS: this.xStart,
                yS: this.yStart,
                xF: this.xFinish,
                yF: this.yFinish,
                strokeColor: this._strokeColor,
                strokeWidth: this._strokeWidth,
                fillColor: this._fillColor,
                id: this.shape.id,
            }
        })
       this.canvas.removeChild(this.shape);
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
        this.shape.setAttributeNS(null, 'stroke', this._strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', this._strokeWidth);
        this.shape.setAttributeNS(null, 'fill', this._fillColor);
        this.canvas.appendChild(this.shape);
    }

    static StaticDraw(canvas, id, xS, yS, xF, yF, strokeWidth, strokeColor, fillColor){
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        shape.id = id;
        shape.setAttributeNS(null, 'x', Math.min(xS, xF).toString());
        shape.setAttributeNS(null, 'y', Math.min(yS, yF).toString());
        shape.setAttributeNS(null, 'width', Math.abs(xS - xF).toString());
        shape.setAttributeNS(null, 'height', Math.abs(yS - yF).toString());
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        shape.setAttributeNS(null, 'fill', fillColor);
        canvas.appendChild(shape);
    }

    static moveShape(line, dx, dy) {
        let x = parseFloat(line.getAttributeNS(null, 'x')) + dx;
        let y = parseFloat(line.getAttributeNS(null, 'y')) + dy;
        let width = parseFloat(line.getAttributeNS(null, 'width'));
        let height = parseFloat(line.getAttributeNS(null, 'height'));
        line.setAttributeNS(null, 'x', x);
        line.setAttributeNS(null, 'y', y);
        line.setAttributeNS(null, 'width', width.toString());
        line.setAttributeNS(null, 'height', height.toString());
    }
}

export default Rectangle;