import Rectangle from "./Rectangle";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";

class Square extends Rectangle {

    MouseUpHandler() {
        const serializer = new XMLSerializer();
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            canvas: serializer.serializeToString(canvasState.canvas),
            figure: {
                type: 'square',
                shape:serializer.serializeToString(this.shape),
                id: this.shape.id,
            }
        })

        try {
            this.canvas.removeChild(this.shape);
        } catch (e) {}
    }

    Draw(xS, yS, xF, yF) {

        if (Math.abs(xF - xS) <= Math.abs(yF - yS)) {
            this.side = Math.abs(xF - xS);
        } else {
            this.side = Math.abs(yF - yS);
        }

        if (xF >= xS && yF >= yS) {
            this.x = xS;
            this.y = yS;
        } else if (xF >= xS && yF < yS) {
            this.x = xS;
            this.y = yS - this.side
        } else if (xF < xS && yF >= yS) {
            this.x = xS - this.side;
            this.y = yS;
        } else {
            this.x = xS - this.side;
            this.y = yS - this.side;
        }

        this.shape.setAttributeNS(null, 'x', this.x.toString());
        this.shape.setAttributeNS(null, 'y', this.y.toString());
        this.shape.setAttributeNS(null, 'width', this.side.toString());
        this.shape.setAttributeNS(null, 'height', this.side.toString());
        this.shape.setAttributeNS(null, 'stroke',toolState.strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', toolState.strokeWidth);
        this.shape.setAttributeNS(null, 'fill', toolState.fillColor);
        this.canvas.appendChild(this.shape);
    }

    static StaticDraw(canvas, id, x, y, side, strokeWidth, strokeColor, fillColor){
        const shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        shape.id = id;
        shape.setAttributeNS(null, 'x', x);
        shape.setAttributeNS(null, 'y', y);
        shape.setAttributeNS(null, 'width', side);
        shape.setAttributeNS(null, 'height', side);
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
        shape.setAttributeNS(null, 'fill', fillColor);
        canvas.appendChild(shape);
    }
}

export default Square;