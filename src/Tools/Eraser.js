import Brush from "./Brush";

class Eraser extends Brush{
    constructor(canvas) {
        super(canvas);
    }

    Draw(x,y) {
        let tmp = this.ctx.strokeStyle;
        this.ctx.strokeStyle = "white";
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
        this.ctx.strokeStyle = tmp;
    }
}

export default Eraser;