class Tool{
    constructor(canvas, socket, id) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d');
        this.Clear();
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }

    set font(font){
        this.ctx.font = font;
    }

    Clear() {
        this.canvas.onmouseup = null;
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        // document.getElementById('test').style.display = 'none';
    }
}

export default Tool;