import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";
import toolState from "../Store/ToolState";

class Text extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.input = document.createElement('input');
        this.input.className = "inputText"
        document.body.appendChild(this.input);
        this.Listen();
    }

    Listen() {
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        document.addEventListener('mousedown', this.MouseClickHandler.bind(this));
    }

    MouseDownHandler(e) {
        const p = this.getPoint(e)
        this.xStart = p.x;
        this.yStart = p.y;

        const offsetX = parseInt(window.getComputedStyle(canvasState.canvas).marginLeft);
        const offsetY = parseInt(window.getComputedStyle(canvasState.canvas).marginTop);
        this.input.style.left = `${this.xStart + offsetX}px`;
        this.input.style.top = `${this.yStart + offsetY}px`;
        this.input.style.display = 'inline-block';
        this.input.value = '';
        this.input.focus();
        this.input.addEventListener('keydown', this.TextInputKeydownHandler.bind(this));
    }

    MouseClickHandler(e){
        if (!this.canvas.contains(e.target) && e.target !== this.input) {
            this.input.style.display = 'none';
        }
    }

    TextInputKeydownHandler(e) {
        if (e.key === 'Enter') {
            this.text = this.input.value;

            if (this.text.trim() !== '') {
                sendMessage(this.socket, {
                    method: 'draw',
                    id: this.id,
                    figure: {
                        type: 'text',
                        x: this.xStart,
                        y: this.yStart,
                        id: 'Text' + Math.random(),
                        text: this.text,
                        fontSize: toolState.fontSize,
                        fontFamily: toolState.fontFamily,
                        fillColor: toolState.fillColor,
                        strokeColor: toolState.strokeColor,
                    }
                })
            }
            this.input.style.display = 'none';
        }
    }

    static Draw(canvas, id, x, y, text, fontSize, fontFamily, fillColor, strokeColor) {
        const shape = document.createElementNS("http://www.w3.org/2000/svg", "text");
        shape.id = id;
        shape.setAttributeNS(null, 'x', x);
        shape.setAttributeNS(null, 'y', y);
        shape.setAttributeNS(null, 'fill', fillColor);
        shape.setAttributeNS(null, 'stroke', strokeColor);
        shape.setAttributeNS(null, 'font-size', fontSize);
        shape.setAttributeNS(null, 'font-family', fontFamily);
        shape.textContent = text;
        canvas.appendChild(shape);
    }

    static moveShape(line, dx, dy) {
        let x = parseFloat(line.getAttributeNS(null, 'x')) + dx;
        let y = parseFloat(line.getAttributeNS(null, 'y')) + dy;
        line.setAttributeNS(null, 'x', x);
        line.setAttributeNS(null, 'y', y);
    }
}

export default Text;
