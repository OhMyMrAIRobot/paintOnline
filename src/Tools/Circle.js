import Tool from "./Tool";

class Circle extends Tool{
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
        this.ctx.beginPath();
        this.xStart = e.pageX - e.target.offsetLeft;
        this.yStart = e.pageY - e.target.offsetTop;
        this.oldCanvas = this.canvas.toDataURL();
    }

    MouseMoveHandler(e){
        if (this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            let width = x - this.xStart;
            let height = y - this.yStart;
            let radius = Math.sqrt(width*width + height*height);
            this.Draw(this.xStart, this.yStart, radius);
        }
    }

    Draw(x, y, r){
        const img = new Image();
        img.src = this.oldCanvas;
        img.onload = () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0 ,0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.strokeStyle = "black";
            this.ctx.stroke();
        }
    }
}

export default Circle;