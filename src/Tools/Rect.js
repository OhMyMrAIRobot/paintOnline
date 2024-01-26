import Tool from "./Tool";

class Rect extends Tool{
    constructor(canvas) {
        super(canvas);
        this.Listen();
    }

    Listen(){
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
    }

    MouseUpHandler(e) {
        this.isMouseDown = false;
        this.width = 0;
        this.height = 0;
    }

    MouseDownHandler(e) {
        this.isMouseDown = true;
        this.ctx.beginPath();
        this.xStart = e.pageX - e.target.offsetLeft;
        this.yStart = e.pageY - e.target.offsetTop;
        this.oldCanvas = this.canvas.toDataURL();
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            this.height = y - this.yStart;
            this.width = x - this.xStart;
            this.Draw(this.xStart, this.yStart,this.width,this.height);
        }
    }

    Draw(x, y, w, h) {
        const img = new Image();
        img.src = this.oldCanvas;
        img.onload = () => {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = "black";
            this.ctx.rect(x,y,w,h);
            this.ctx.stroke();
        }
    }
}

export default Rect;