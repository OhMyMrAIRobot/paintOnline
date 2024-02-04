import Brush from "./Brush";
import {sendMessage} from "../Handlers/SendHandler";

class Eraser extends Brush{

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            sendMessage(this.socket, {
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth,
                }
            })
        }
    }

    static Draw(ctx, x, y, width) {
        let oldColor = ctx.strokeStyle;
        let oldWidth = ctx.lineWidth;
        let oldGlobalCompositeOperation = ctx.globalCompositeOperation;

        ctx.lineWidth = width;
        ctx.lineTo(x,y);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.stroke();

        ctx.globalCompositeOperation = oldGlobalCompositeOperation;
        ctx.lineWidth = oldWidth;
        ctx.strokeStyle = oldColor;
    }
}

export default Eraser;