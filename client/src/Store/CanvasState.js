import {makeAutoObservable} from "mobx";
import {LoadCanvas} from "../Handlers/LoadCanvas";

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
    background = '#ffffff';
    oldWidth = 1280;
    oldHeight = 720;
    oldBackground = '#ffffff'

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
        shapes.forEach((shape) => {
            if (shape.id.startsWith('Eraser'))
                shape.setAttributeNS(null, 'stroke', color);
        })
    }

    setOldWidth(width) {
        this.oldWidth = width;
    }

    setOldHeight(height) {
        this.oldHeight = height;
    }

    setOldBackground(color) {
        this.oldBackground = color;
    }

    pushToUndo(data){
        this.undoList.push(data);
    }

    pushToRedo(state){
        this.redoList.push(state);
    }

    setCurFigure(figure) {
        this.curFigure = figure;
    }

    undo(){
        if (this.undoList.length > 0) {
            const serializer = new XMLSerializer();
            const saveHTML = this.undoList.pop();
            this.pushToRedo(serializer.serializeToString(this.canvas));
            LoadCanvas(saveHTML);
        }
    }

    redo(){
        if (this.redoList.length > 0) {
            const serializer = new XMLSerializer();
            const saveHTML = this.redoList.pop();
            this.pushToUndo(serializer.serializeToString(this.canvas));
            LoadCanvas(saveHTML);
        }
    }
}

export default new CanvasState();