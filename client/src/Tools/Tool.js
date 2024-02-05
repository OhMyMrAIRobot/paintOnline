class Tool{
    constructor(canvas, socket, id) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d');
        this.clear();
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

    clear() {
        this.canvas.onmouseup = null;
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        let inputs = Array.from(document.getElementsByClassName("inputText"));
        inputs.forEach(node => {
            document.body.removeChild(node);
        })
    }
}

export default Tool;