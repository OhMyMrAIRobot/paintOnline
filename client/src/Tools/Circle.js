import Ellipse from "./Ellipse";
import {sendMessage} from "../Handlers/SendHandler";
import toolState from "../Store/ToolState";

class Circle extends Ellipse{

    MouseUpHandler() {
        const serializer = new XMLSerializer();
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'circle',
                shape:serializer.serializeToString(this.shape),
                id: this.shape.id,
            }
        })
        try {
            this.canvas.removeChild(this.shape);
        } catch (e) {}
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

}

export default Circle;