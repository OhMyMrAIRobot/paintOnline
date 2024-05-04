import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";

class Circle extends Tool{
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen();
    }

    // Listen(){
    //     this.canvas.onmouseup = this.MouseUpHandler.bind(this);
    //     this.canvas.onmousedown = this.MouseDownHandler.bind(this);
    //     this.canvas.onmousemove = this.MouseMoveHandler.bind(this);
    // }
    //
    // MouseUpHandler(e){
    //     this.isMouseDown = false;
    //     sendMessage(this.socket,{
    //         method: 'draw',
    //         id: this.id,
    //         figure: {
    //             type: 'circle',
    //             x: this.xStart,
    //             y: this.yStart,
    //             radius: this.radius,
    //             strokeColor: this.ctx.strokeStyle,
    //             fillColor: this.ctx.fillStyle,
    //             lineWidth: this.ctx.lineWidth,
    //         }
    //     })
    // }
    //
    // MouseDownHandler(e){
    //     this.isMouseDown = true;
    //     this.ctx.beginPath();
    //     this.xStart = e.pageX - e.target.offsetLeft;
    //     this.yStart = e.pageY - e.target.offsetTop;
    //     this.oldCanvas = this.canvas.toDataURL();
    // }
    //
    // MouseMoveHandler(e){
    //     if (this.isMouseDown){
    //         let x = e.pageX - e.target.offsetLeft;
    //         let y = e.pageY - e.target.offsetTop;
    //         let width = x - this.xStart;
    //         let height = y - this.yStart;
    //         this.radius = Math.sqrt(width*width + height*height);
    //         this.Draw(this.xStart, this.yStart, this.radius);
    //     }
    // }
    //
    // Draw(x, y, r){
    //     const img = new Image();
    //     img.src = this.oldCanvas;
    //     img.onload = () => {
    //         this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    //         this.ctx.drawImage(img, 0 ,0, this.canvas.width, this.canvas.height);
    //         this.ctx.beginPath();
    //         this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    //         this.ctx.stroke();
    //         this.ctx.fill();
    //     }
    // }
    //
    // static StaticDraw(ctx, x, y, r, strokeColor, fillColor, lineWidth){
    //     let oldStrokeWidth = ctx.lineWidth;
    //     let oldStrokeColor = ctx.strokeStyle;
    //     let oldFillColor = ctx.fillStyle;
    //
    //     ctx.beginPath();
    //     ctx.strokeStyle = strokeColor;
    //     ctx.fillStyle = fillColor;
    //     ctx.lineWidth = lineWidth;
    //     ctx.arc(x, y, r, 0, 2 * Math.PI);
    //     ctx.stroke();
    //     ctx.fill();
    //
    //     ctx.lineWidth = oldStrokeWidth;
    //     ctx.strokeStyle = oldStrokeColor;
    //     ctx.fillStyle = oldFillColor;
    // }
}

export default Circle;