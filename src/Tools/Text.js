import Tool from "./Tool";

class Text extends Tool {
    constructor(canvas) {
        super(canvas);

        this.textInput = document.createElement('input');
        this.textInput.type = 'text';
        this.textInput.style.position = 'absolute';
        this.textInput.style.display = 'none';
        document.body.appendChild(this.textInput);

        this.Listen();
    }

    Listen() {
        this.canvas.onmousedown = this.MouseDownHandler.bind(this);
        this.textInput.addEventListener('blur', this.TextInputBlurHandler.bind(this));
    }

    MouseDownHandler(e) {
        this.ctx.beginPath();
        this.xStart = e.pageX - e.target.offsetLeft;
        this.yStart = e.pageY - e.target.offsetTop;

        this.textInput.style.left = `${e.pageX}px`;
        this.textInput.style.top = `${e.pageY}px`;
        this.textInput.style.display = 'inline-block';
        console.log(1);
        this.textInput.value = '';
        this.textInput.focus();
        this.textInput.addEventListener('keydown', this.TextInputKeydownHandler.bind(this));
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
            this.Draw(this.xStart, this.yStart, text);
        }
    }

    Draw(x, y, text) {
        this.ctx.font = '16px Arial';
        this.ctx.fillText(text, x, y);
    }
}

export default Text;
