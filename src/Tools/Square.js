import Rect from "./Rect";

class Square extends Rect{
    MouseMoveHandler(e) {
        if (this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            this.width = x - this.xStart;
            this.height = y - this.yStart;
            let r = Math.sqrt(this.width*this.width + this.height*this.height);
            this.Draw(this.xStart, this.yStart,r);
        }
    }

    Draw(x, y, w) {
        const img = new Image();
        img.src = this.oldCanvas;
        img.onload = () => {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.width);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = "black";
            w /= Math.sqrt(2);
            this.ctx.rect(x,y,w,w);
            this.ctx.stroke();
        }
    }
}

export default Square;