import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";

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
        this.ctx.beginPath();
        this.xStart = e.pageX - e.target.offsetLeft;
        this.yStart = e.pageY - e.target.offsetTop;

        this.input.style.left = `${e.pageX}px`;
        this.input.style.top = `${e.pageY}px`;
        this.input.style.display = 'inline-block';
        this.input.value = '';
        this.input.focus();
        this.input.addEventListener('keydown', this.TextInputKeydownHandler.bind(this));
    }

    // Скрытие формы при клике вне полотна
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
                        text: this.text,
                        font: this.ctx.font,
                        fillColor: this.ctx.fillStyle,
                    }
                })
            }
            this.input.style.display = 'none';
        }
    }

    static Draw(ctx, x, y, text, font, fillColor) {
        let oldFont = ctx.font;
        let oldFillColor = ctx.fillStyle;

        ctx.font = font;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.fillText(text, x, y);

        ctx.font = oldFont;
        ctx.fillStyle = oldFillColor;
    }
}

export default Text;
