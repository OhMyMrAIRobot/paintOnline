import {makeAutoObservable} from "mobx";
import canvasState from "./CanvasState";

class ToolState {
    tool = null;

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool){
        this.tool = tool;
        canvasState.setCurFigure(null);
    }

    setFillColor(color){
        this.fillColor = color;
    }

    setStrokeColor(color){
        this.strokeColor = color;
    }

    setStrokeWidth(width) {
        this.strokeWidth = width
    }

    setFontSize(fontSize){
        this.fontSize = fontSize;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
    }

}

export default new ToolState();
