import Tool from "./Tool";

class Text extends Tool {
    constructor(canvas) {
        super(canvas);

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
            this.Draw(this.xStart, this.yStart, text);
        }
    }

    Draw(x, y, text) {
        this.ctx.fillText(text, x, y);
    }
}

export default Text;
