import Rectangle from "./Rectangle";
import {sendMessage} from "../Handlers/SendHandler";

class Square extends Rectangle {

    // constructor(canvas, socket, id) {
    //     super(canvas, socket, id);
    //     super.Listen();
    // }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            const p = this.getPoint(e)
            this.xFinish = p.x;
            this.yFinish = p.y;
            this.Draw(this.xStart, this.yStart, this.xFinish, this.yFinish);
        }
    }

    Draw(xS, yS, xF, yF) {
        let side, x, y;

        if (Math.abs(xF - xS) <= Math.abs(yF - yS)) {
            side = Math.abs(xF - xS);
        } else {
            side = Math.abs(yF - yS);
        }

        if (xF >= xS && yF >= yS) {
            x = xS;
            y = yS;
        } else if (xF >= xS && yF < yS) {
            x = xS;
            y = yS - side
        } else if (xF < xS && yF >= yS) {
            x = xS - side;
            y = yS;
        } else {
            x = xS - side;
            y = yS - side;
        }

        this.shape.setAttributeNS(null, 'x', x.toString());
        this.shape.setAttributeNS(null, 'y', y.toString());
        this.shape.setAttributeNS(null, 'width', side.toString());
        this.shape.setAttributeNS(null, 'height', side.toString());
        this.shape.setAttributeNS(null, 'stroke', this._strokeColor);
        this.shape.setAttributeNS(null, 'stroke-width', this._strokeWidth);
        this.shape.setAttributeNS(null, 'fill', this._fillColor);
        this.canvas.appendChild(this.shape);
    }
}

export default Square;