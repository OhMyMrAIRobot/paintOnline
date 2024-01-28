import Circle from "./Circle";

class Ellipse extends Circle{

    MouseUpHandler(e){
        this.isMouseDown = false;
        if (!this.isMouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'ellipse',
                    x: this.xStart,
                    y: this.yStart,
                    rx: this.Rx,
                    ry: this.Ry,
                    strokeColor: this.ctx.strokeStyle,
                    fillColor: this.ctx.fillStyle,
                    lineWidth: this.ctx.lineWidth,
                }
            }))
        }
    }

    MouseMoveHandler(e){
        if (this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            this.Rx = Math.abs((x - this.xStart) / 2);
            this.Ry = Math.abs((y - this.yStart) / 2);
            this.Draw(this.xStart, this.yStart, this.Rx, this.Ry);
        }
    }

    Draw(x, y, rx, ry){
        const img = new Image();
        img.src = this.oldCanvas;
        img.onload = () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0 ,0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        }
    }

    static StaticDraw(ctx, x, y, rx, ry, strokeColor, fillColor, lineWidth){
        let oldStrokeWidth = ctx.lineWidth;
        let oldStrokeColor = ctx.strokeStyle;
        let oldFillColor = ctx.fillStyle;

        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = lineWidth;
        ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        ctx.lineWidth = oldStrokeWidth;
        ctx.strokeStyle = oldStrokeColor;
        ctx.fillStyle = oldFillColor;
    }
}

export default Ellipse;