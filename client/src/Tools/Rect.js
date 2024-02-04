import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";

class Rect extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen();
    }

    Listen(){
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
    }

    MouseUpHandler(e) {
        this.isMouseDown = false;
        sendMessage(this.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rectangle',
                x: this.xStart,
                y: this.yStart,
                width: this.width,
                height: this.height,
                strokeColor: this.ctx.strokeStyle,
                fillColor: this.ctx.fillStyle,
                lineWidth: this.ctx.lineWidth,
            }
        })
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
            this.ctx.rect(x,y,w,h);
            this.ctx.stroke();
            this.ctx.fill();
        }
    }

    static StaticDraw(ctx, x, y, w, h, strokeColor, fillColor, lineWidth){
        let oldStrokeWidth = ctx.lineWidth;
        let oldStrokeColor = ctx.strokeStyle;
        let oldFillColor = ctx.fillStyle;

        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = lineWidth;
        ctx.rect(x,y,w,h);
        ctx.stroke();
        ctx.fill();

        ctx.lineWidth = oldStrokeWidth;
        ctx.strokeStyle = oldStrokeColor;
        ctx.fillStyle = oldFillColor;
    }
}

export default Rect;