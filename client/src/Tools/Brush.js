import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";

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
        this.isMouseDown = false;
    }

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.shape.id = 'Brush' + Math.random().toString();
        const p = this.getPoint(e)
        this.x = p.x;
        this.y = p.y;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'brushStart',
                x: this.x,
                y: this.y,
                strokeColor: this._strokeColor,
                strokeWidth: this._strokeWidth,
                id: this.shape.id,
            }
        })
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            const p = this.getPoint(e)
            this.x = p.x;
            this.y = p.y;
            sendMessage(this.socket, {
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brushDraw',
                    x: this.x,
                    y:this.y,
                    strokeColor: this._strokeColor,
                    strokeWidth: this._strokeWidth,
                    id: this.shape.id,
                }
            })
        }
    }

    static Draw(canvas, id, x, y, strokeWidth, strokeColor) {
        const shape = document.getElementById(id);
        let currentPath = shape.getAttributeNS(null, 'd');
        currentPath += ' L ' + x + ' ' + y;
        shape.setAttributeNS(null, 'd', currentPath);
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        shape.setAttributeNS(null, 'fill', 'none');
    }
}

export default Brush;