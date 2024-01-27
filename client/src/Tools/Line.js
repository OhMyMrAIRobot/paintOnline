import Tool from "./Tool";

class Line extends Tool{
    constructor(canvas) {
        super(canvas);
        this.Listen();
    }

    Listen(){
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
    }

    MouseUpHandler(e){
        this.isMouseDown = false;
    }

    MouseDownHandler(e){
        this.isMouseDown = true;
        this.ctx.beginPath()
        this.oldCanvas = this.canvas.toDataURL();
        this.xStart = e.pageX - e.target.offsetLeft;
        this.yStart = e.pageY - e.target.offsetTop;
    }

    MouseMoveHandler(e){
        if(this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            this.Draw(this.xStart, this.yStart, x, y);
        }
    }

    Draw(Xs,Ys, Xf, Yf){
        const img = new Image();
        img.src = this.oldCanvas;
        img.onload = () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(Xs, Ys);
            this.ctx.lineTo(Xf,Yf);
            this.ctx.stroke();
        }
    }
}

export default Line;