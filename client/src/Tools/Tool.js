class Tool{
    constructor(canvas, socket, id) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.clear();
    }

    // заливка
    set fillColor(color) {
       // this.ctx.fillStyle = color
        this._fillColor = color;
    }

    // цвет обводки
    set strokeColor(color) {
    //    this.ctx.strokeStyle = color
        this._strokeColor = color;
    }

    // ширина обводки
    set lineWidth(width) {
      //  this.ctx.lineWidth = width
        this._strokeWidth = width
    }

    // шрифт
    set font(font){
     //   this.ctx.font = font;
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