import Tool from "./Tool";

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

    MouseUpHandler(e) {
        this.isMouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    strokeColor: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth,
                }
            }))
        }
    }

    static Draw(ctx, x, y, color, width) {
        let oldWidth = ctx.lineWidth;
        let oldColor = ctx.strokeStyle;

        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineTo(x,y);
        ctx.stroke();

        ctx.lineWidth = oldWidth;
        ctx.strokeStyle = oldColor;

    }
}

export default Brush;