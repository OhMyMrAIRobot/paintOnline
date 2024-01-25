import Tool from "./Tool";

class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
        this.Listen()
    }

    Listen() {
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
    }

    MouseUpHandler(e) {
        this.isMouseDown = false;
    }

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            this.Draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

    Draw(x,y) {
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
    }
}

export default Brush;