import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null;
    undoList = [];
    redoList = [];

    username = "";
    socket = null;
    session = "";

    curFigure = null;
    width = 1280;
    height = 720;
    background = 'red';

    constructor() {
        makeAutoObservable(this)
    }

    setSocket(id) {
        this.socket = id;
    }

    setSession(id) {
        this.session = id;
    }

    setUsername(name) {
        this.username = name;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    setWidth(width) {
        this.width = width;
        this.canvas.style.width = width;
    }

    setHeight(height){
        this.height = height;
        this.canvas.style.height = height;
    }

    setBackground(color){
        this.background = color;
        this.canvas.style.backgroundColor = color;
        const shapes = document.querySelectorAll('path');
        console.log(shapes);
        shapes.forEach((shape) => {
            if (shape.id.startsWith('Eraser'))
                shape.setAttributeNS(null, 'stroke', color);
        })
    }

    pushToUndo(state){
        this.undoList.push(state);
    }

    pushToRedo(state){
        this.redoList.push(state);
    }

    setCurFigure(figure) {
        this.curFigure = figure;
    }

    undo(){
        let ctx = this.canvas.getContext('2d');
        if (this.undoList.length > 0){
            let Url = this.undoList.pop();
            this.pushToRedo(this.canvas.toDataURL());
            let img = new Image();
            img.src = Url;
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img,0,0, this.canvas.width, this.canvas.height);
            }
        }
    }

    redo(){
        let ctx = this.canvas.getContext('2d');
        if (this.redoList.length > 0){
            let Url = this.redoList.pop();
            this.pushToUndo(this.canvas.toDataURL());
            let img = new Image();
            img.src = Url;
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img,0,0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

export default new CanvasState();