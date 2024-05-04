import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";

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
                strokeColor: this._strokeColor,
                strokeWidth: this._strokeWidth,
                id: this.shape.id,
            }
        })
        this.canvas.removeChild(this.shape);
    }

    MouseDownHandler(e){
        this.isMouseDown = true;
        let p = this.canvas.createSVGPoint();
        p.x = e.clientX;
        p.y = e.clientY;
        p = p.matrixTransform(this.canvas.getScreenCTM().inverse())
        this.xStart = p.x;
        this.yStart = p.y;
        this.shape = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.shape.id = Math.random().toString();
    }

    MouseMoveHandler(e){
        if(this.isMouseDown){
            let p = this.canvas.createSVGPoint();
            p.x = e.clientX;
            p.y = e.clientY;
            p = p.matrixTransform(this.canvas.getScreenCTM().inverse())
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
        this.shape.setAttributeNS(null, 'stroke', this._strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', this._strokeWidth);
        this.canvas.appendChild(this.shape);
    }

    static StaticDraw(canvas, id, xS, yS, xF, yF, strokeWidth, strokeColor){
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
}

export default Line;