import Tool from "./Tool";

class Text extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);

        this.textInput = document.getElementById('test');
        this.textInput.style.position = 'absolute';
        this.textInput.style.display = 'none';
        this.Listen();
    }

    Listen() {
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.textInput.addEventListener('blur', this.TextInputBlurHandler.bind(this));
        document.addEventListener('mousedown', this.MouseClickHandler.bind(this));
    }

    MouseDownHandler(e) {
        this.ctx.beginPath();
        this.xStart = e.pageX - e.target.offsetLeft;
        this.yStart = e.pageY - e.target.offsetTop;

        this.textInput.style.left = `${e.pageX}px`;
        this.textInput.style.top = `${e.pageY}px`;
        this.textInput.style.display = 'inline-block';
        this.textInput.value = '';
        this.textInput.focus();
        this.textInput.addEventListener('keydown', this.TextInputKeydownHandler.bind(this));
    }

    MouseClickHandler(e){
        if (!this.canvas.contains(e.target) && e.target !== this.textInput) {
            this.textInput.style.display = 'none';
        }
    }

    TextInputKeydownHandler(e) {
        if (e.key === 'Enter') {
            this.textInput.blur();
            this.textInput.style.display = 'none';
        }
    }

    TextInputBlurHandler() {
        const text = this.textInput.value;
        this.textInput.removeEventListener('keydown', this.TextInputKeydownHandler);
        if (text.trim() !== '') {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'text',
                    x: this.xStart,
                    y: this.yStart,
                    text: text,
                    font: this.ctx.font,
                    fillColor: this.ctx.fillStyle,
                }
            }))
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
