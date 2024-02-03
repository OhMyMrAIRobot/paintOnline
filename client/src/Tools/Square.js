import Rect from "./Rect";

class Square extends Rect{

    MouseUpHandler(e) {
        this.isMouseDown = false;
        if (!this.isMouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'square',
                    x: this.xStart,
                    y: this.yStart,
                    width: this.width / Math.sqrt(2),
                    height: this.height / Math.sqrt(2),
                    strokeColor: this.ctx.strokeStyle,
                    fillColor: this.ctx.fillStyle,
                    lineWidth: this.ctx.lineWidth,
                }
            }))
        }
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            this.width = x - this.xStart;
            this.height = y - this.yStart;
            let sideLength = Math.sqrt(this.width*this.width + this.height*this.height);
            this.width < 0 ? this.width = -sideLength : this.width = sideLength;
            this.height < 0 ? this.height = -sideLength : this.height = sideLength;
            this.Draw(this.xStart, this.yStart, this.width / Math.sqrt(2), this.height / Math.sqrt(2));
        }
    }

    Draw(x, y, w, h) {

        const img = new Image();
        img.src = this.oldCanvas;
        img.onload = () => {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.width);
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

export default Square;