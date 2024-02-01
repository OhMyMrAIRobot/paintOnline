import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null;
    undoList = [];
    reUndoList = [];

    username = "";
    socket = null;
    session = null;


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
        let oldWidth = this.canvas.width;
        let oldHeight = this.canvas.height;
        let Url = this.canvas.toDataURL();
        let img = new Image();
        img.src = Url;
        this.canvas.width = width;
        let ctx = this.canvas.getContext('2d');
        img.onload = () => {
            ctx.drawImage(img, 0, 0, oldWidth, oldHeight);
        };
    }

    setBackground(color){
        this.canvas.style.backgroundColor = color;
    }

    setHeight(height){
        let oldWidth = this.canvas.width;
        let oldHeight = this.canvas.height;
        let Url = this.canvas.toDataURL();
        let img = new Image();
        img.src = Url;
        this.canvas.height = height;
        let ctx = this.canvas.getContext('2d');
        img.onload = () => {
            ctx.drawImage(img, 0, 0, oldWidth, oldHeight);
        };
    }

    pushToUndo(state){
        this.undoList.push(state);
    }

    pushToReUndo(state){
        this.reUndoList.push(state);
    }

    undo(){
        let ctx = this.canvas.getContext('2d');
        if (this.undoList.length > 0){
            let Url = this.undoList.pop();
            this.pushToReUndo(this.canvas.toDataURL());
            let img = new Image();
            img.src = Url;
            img.onload = () => {
                ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img,0,0, this.canvas.width, this.canvas.height);
            }
        }
    }

    reUndo(){
        let ctx = this.canvas.getContext('2d');
        if (this.reUndoList.length > 0){
            let Url = this.reUndoList.pop();
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