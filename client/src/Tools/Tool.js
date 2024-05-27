class Tool{
    constructor(canvas, socket, id) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.clear();
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

    getPoint(e) {
        let p = this.canvas.createSVGPoint();
        p.x = e.clientX;
        p.y = e.clientY;
        return p.matrixTransform(this.canvas.getScreenCTM().inverse())
    }
}

export default Tool;