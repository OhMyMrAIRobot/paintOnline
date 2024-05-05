import Ellipse from "./Ellipse";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";

class Circle extends Ellipse{

    MouseUpHandler() {
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'circle',
                x: this.xStart,
                y: this.yStart,
                r: this.radius,
                strokeColor: toolState.strokeColor,
                strokeWidth: toolState.strokeWidth,
                fillColor: toolState.fillColor,
                id: this.shape.id,
            }
        })
        this.canvas.removeChild(this.shape);
    }

    Draw(xS, yS, xF, yF) {
        this.radius = Math.sqrt(Math.pow(xF - xS, 2) + Math.pow(yF - yS, 2));

        this.shape.setAttributeNS(null, 'cx', xS);
        this.shape.setAttributeNS(null, 'cy', yS);
        this.shape.setAttributeNS(null, 'rx', this.radius.toString());
        this.shape.setAttributeNS(null, 'ry', this.radius.toString());
        this.shape.setAttributeNS(null, 'stroke', toolState.strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', toolState.strokeWidth);
        this.shape.setAttributeNS(null, 'fill', toolState.fillColor);

        this.canvas.appendChild(this.shape);
    }

    static StaticDraw(canvas, id, x, y, r, strokeWidth, strokeColor, fillColor){
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        shape.id = id;
        shape.setAttributeNS(null, 'cx', x);
        shape.setAttributeNS(null, 'cy', y);
        shape.setAttributeNS(null, 'rx', r.toString());
        shape.setAttributeNS(null, 'ry', r.toString());
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        shape.setAttributeNS(null, 'fill', fillColor);
        canvas.appendChild(shape);
    }
}

export default Circle;