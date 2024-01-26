import Circle from "./Circle";

class Ellipse extends Circle{

    MouseMoveHandler(e){
        if (this.isMouseDown){
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            let Rx = Math.abs((x - this.xStart) / 2);
            let Ry = Math.abs((y - this.yStart) / 2);
            this.Draw(this.xStart, this.yStart, Rx, Ry);
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
            this.ctx.strokeStyle = "black";
            this.ctx.stroke();
        }
    }
}

export default Ellipse;