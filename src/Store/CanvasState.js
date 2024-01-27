import {makeAutoObservable} from "mobx";

class CanvasState{
    canvas = null;

    undoList = [];
    reUndoList = [];

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas){
        this.canvas = canvas;
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