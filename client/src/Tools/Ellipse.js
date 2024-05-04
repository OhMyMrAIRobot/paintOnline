import {sendMessage} from "../Handlers/SendHandler";
import Tool from "./Tool";

class Ellipse extends Tool{

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
                type: 'ellipse',
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

    MouseDownHandler(e){
        this.isMouseDown = true;
        const p = this.getPoint(e)
        this.xStart = p.x;
        this.yStart = p.y;
        this.shape = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        this.shape.id = 'Ellipse' + Math.random().toString();
    }

    MouseMoveHandler(e){
        if (this.isMouseDown){
            const p = this.getPoint(e)
            this.xFinish = p.x;
            this.yFinish = p.y;
            this.Draw(this.xStart, this.yStart, this.xFinish, this.yFinish);
        }
    }

    Draw(xS, yS, xF, yF){
        this.shape.setAttributeNS(null, 'cx', xS);
        this.shape.setAttributeNS(null, 'cy', yS);
        this.shape.setAttributeNS(null, 'rx', Math.abs(xF - xS).toString());
        this.shape.setAttributeNS(null, 'ry', Math.abs(yF - yS).toString());
        this.shape.setAttributeNS(null, 'stroke', this._strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', this._strokeWidth);
        this.shape.setAttributeNS(null, 'fill', this._fillColor);
        this.canvas.appendChild(this.shape);
    }

    static StaticDraw(canvas, id, xS, yS, xF, yF, strokeWidth, strokeColor, fillColor){
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        shape.id = id;
        shape.setAttributeNS(null, 'cx', xS);
        shape.setAttributeNS(null, 'cy', yS);
        shape.setAttributeNS(null, 'rx', Math.abs(xF - xS).toString());
        shape.setAttributeNS(null, 'ry', Math.abs(yF - yS).toString());
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        shape.setAttributeNS(null, 'fill', fillColor);
        canvas.appendChild(shape);
    }

    static moveShape(ellipse, dx, dy) {
        let cx = parseFloat(ellipse.getAttributeNS(null, 'cx')) + dx;
        let cy = parseFloat(ellipse.getAttributeNS(null, 'cy')) + dy;
        let rx = parseFloat(ellipse.getAttributeNS(null, 'rx'));
        let ry = parseFloat(ellipse.getAttributeNS(null, 'ry'));
        ellipse.setAttributeNS(null, 'cx', cx);
        ellipse.setAttributeNS(null, 'cy', cy);
        ellipse.setAttributeNS(null, 'width', rx.toString());
        ellipse.setAttributeNS(null, 'height', ry.toString());
    }
}

export default Ellipse;