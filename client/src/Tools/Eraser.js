import Brush from "./Brush";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";

class Eraser extends Brush{

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.shape.id = 'Eraser' + Math.random().toString();
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
                    type: 'eraser',
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
        const backgroundColor = window.getComputedStyle(canvasState.canvas).backgroundColor;
        const shape = document.getElementById(id);
        let currentPath = shape.getAttributeNS(null, 'd');
        currentPath += ' L ' + x + ' ' + y;
        shape.setAttributeNS(null, 'd', currentPath);
        shape.setAttributeNS(null, 'stroke', backgroundColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        shape.setAttributeNS(null, 'fill', 'none');
    }

}

export default Eraser;