import Brush from "./Brush";

class Eraser extends Brush{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth,
                }
            }))
        }
    }

    static Draw(ctx, x, y, width) {
        let oldColor = ctx.strokeStyle;
        let oldWidth = ctx.lineWidth;

        ctx.lineWidth = width;
        ctx.lineTo(x,y);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.stroke();

        ctx.lineWidth = oldWidth;
        ctx.strokeStyle = oldColor;
    }
}

export default Eraser;